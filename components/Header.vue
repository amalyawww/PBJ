<script lang="ts" setup>

const $router = useRouter()
const $auth = useAuth()

function goBack() {
  $router.go(-1); // Kembali ke halaman sebelumnya
}
function logout() {
  console.log('Logging out...');
  $auth.logout()
}

const menus = [
  { name: 'About', path: '/about' },
  { name: 'Login', path: '/login' }
]


const menusAuth = [
  { name: 'Dashboard', path: '/home' },
  { name: 'Surat', path: '/surat' },
  { name: 'Database', path: '/database' },
]

const menusByCondition = computed(() => {
  // Jika user sudah login, tampilkan menu yang berbeda
  return $auth.authenticated ? menusAuth : menus
})

const isPathActive = (path: string) => {
  return $router.currentRoute.value.path === path
}
</script>

<template>
  <header
    class="w-screen h-[58px] z-50 fixed top-0 border-b border-gray-500/30 dark:border-gray-500/50 bg-white/30 dark:bg-gray-900/30 backdrop-blur-lg"
  >
    <!-- <Container class="flex-1 flex relative"> -->
    <Container class="w-full h-full flex items-center justify-center">
      <div class="flex-1 flex justify-between items-center relative">
        <NuxtLink to="/">
          <img
            src="/logo.png"
            alt="Company Logo"
            class="logo h-[30px] w-auto"
          />
        </NuxtLink>
        <div class="flex gap-2 relative">
          <nav class="nav-links">
            <UButton
              v-for="menu in menusByCondition"
              :key="menu.name"
              :to="menu.path"
              :label="menu.name"
              variant="ghost"
              class="text-gray-500 dark:text-gray-400"
              active-class="text-gray-900 dark:text-gray-100"
            />
          </nav>
          <div v-if="$auth.authenticated" class="">
            <UDropdown
              :items="[
                [
                  { label: 'Logout', icon: 'ph:sign-out', click: logout }
                ]
              ]"
              :popper="{ placement: 'bottom-end' }"
            >
              <UButton
                variant="ghost"
                icon="ph:user"
                trailing-icon="ph:caret-down"
                :label="`${$auth.user?.name} (${$auth.user?.email})`"
                class="text-gray-900 dark:text-gray-100"
              />
            </UDropdown>
          </div>
          <div class="w-0.5 my-2 h-auto bg-gray-500/50" />
          <div>
            <ToggleTheme />
          </div>
        </div>
      </div>
    </Container>
    <!-- </Container> -->
  </header>
</template>

<style scoped>
/* header {
  background-color: #f8f9fa;
  padding: 10px;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.back-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  color: #4A90E2;
}

.nav-links {
  display: flex;
  gap: 20px;
  align-items: center;
}

.nav-links a {
  text-decoration: none;
  color: #4A90E2;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
}

.logout-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #4A90E2;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
} */
</style>