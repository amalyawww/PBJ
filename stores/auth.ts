export interface AuthUserData {
  name: string;
  email: string;
}

export interface AuthLoginData {
  email: string;
  password: string;
}

export interface IAuthState {
  authenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;


  token?: string; // kalo udah login, tokennya disimpan disini
  user?: AuthUserData; // data user yang login disimpan disini
}

export const useAuth = defineStore("auth", {
  state: (): IAuthState => ({
    token: undefined,
    user: undefined,
    authenticated: false,
    isLoading: false,
    isInitialized: false,
  }),
  actions: {
    // fetch user
    async _fetchUser() {
      try {
        const res = await $fetch('/api/auth/profile', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${this.token}`, // setiap api yang butuh token atau user harus login, wajib pake ini
          }
        })

        if (res.ok) {
          this.user = res.data.user;
          this.authenticated = true;
          return res;
        }
      } catch (error) {
        console.error(error);
        this.authenticated = false;
        this.token = undefined;
      }

      return false;
    },

    // init
    async init() {
      if (this.isInitialized) return; // fungsi init harus dipanggil sekali saja
      if (this.isLoading) return; // jika sedang loading, jangan panggil init lagi untuk mencegah pemanggilan lebih dari sekali
      this.isLoading = true; // set loading menjadi true

      // di nuxt bisa pake useCookie dan key nya, kita bisa langsung nyimpan atau get cookie nya dari sini
      let logout = false;
      try {
        const cookie_token = useCookie<string>("_auth_access_token");
        if (cookie_token?.value) {
          // console.log('AUTH 2')
          this.token = cookie_token.value;
          const res = await this._fetchUser(); // ini fungsi untuk fetch profile kita pake token yang ada
          if (!res || (res && !res.ok)) {
            logout = true;
          }
        }
      } catch (error) {
        logout = true;
        console.error(error);
      }

      try {
        // logout jika ada error
        if (logout) await this.logout();
      } catch (error) {

      }

      this.isInitialized = true;
      this.isLoading = false;
    },

    // akses fungsi login dengan email dan password
    async login(data: AuthLoginData) {
      try {
        console.log("login", data);
        const res = await $fetch('/api/auth/login', {
          method: 'POST',
          body: data,
        })

        if (res.ok) {
          this.token = res.data.token
          this.user = res.data.user
          this.authenticated = true;

          // set cookie
          const cookie_token = useCookie<string>("_auth_access_token");
          cookie_token.value = this.token;

          return true;
        }
      } catch (error) {
        console.error(error)
      }

      return false;
    },

    // logout
    async logout() {
      try {
        // remove cookie
        const cookie_token = useCookie<string | undefined>("_auth_access_token");
        cookie_token.value = undefined;
        this.token = undefined;

        // reset
        this.user = undefined;
        this.authenticated = false;

        // navigate to login
        navigateTo("/login");
        return true;
      } catch (error) {
      }
      return false;
    },
  },
});
