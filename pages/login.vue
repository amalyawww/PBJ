<script setup lang="ts">
import { z } from 'zod'
// import { useRouter } from 'vue-router'
// import { reactive } from 'vue'

// Schema validation
const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters')
})

type Schema = z.output<typeof schema>

const state = reactive({
  email: '',
  password: ''
})

const alertMessage = reactive({ value: '' })

// Router for navigation
const router = useRouter()
const auth = useAuth()

// Handle form submit
async function onSubmit(event: Event) {
  event.preventDefault()

  // logic nya dipindah ke `server/api/auth/login.ts`

  // if (state.email === 'amaliadev@gmail.com' && state.password === 'adminsuper') {
  //   alertMessage.value = 'Login successful!'
  //   // Redirect to the homepage (index.vue)
  //   router.push('/home')
  // } else if (state.email !== 'amaliadev@gmail.com' && state.password !== 'adminsuper') {
  //   alertMessage.value = 'Email and Password are not recognized.'
  // } else if (state.email !== 'amaliadev@gmail.com') {
  //   alertMessage.value = 'Email is not recognized.'
  // } else {
  //   alertMessage.value = 'Password is incorrect.'
  // }

  // pangil fungsi login dari auth store
  const success = await auth.login({
    email: state.email,
    password: state.password
  })
  if (success) {
    // router.push('/home')
    navigateTo('/home')
  }
  else {
    alertMessage.value = 'Email atau Password Tidak Terdaftar!'
  }
}

onMounted(() => {
  // Redirect to the homepage if the user is already logged in
  if (auth.authenticated) {
    navigateTo('/home')
  }
})
</script>

<template>
  <div class="login-container">
    <NuxtLink class="flex justify-center my-2 " to="/">
      <img 
        src="/logo2.png" 
        alt="Logo" 
        width="140px" 
        class="spin-vertical"/>
    </NuxtLink>

    <!-- Login Box -->
    <div class="login-box w-[300px]">
      <UCard>
        <template #header>
          <NuxtLink class="flex-1 flex items-center pt-2" to="/">
            <img src="/logo.png" alt="Company Logo" class="logo" />
          </NuxtLink>
        </template>
        <form @submit="onSubmit" class="flex flex-col gap-3">
          <UFormGroup label="Email" name="email">
            <UInput
              v-model="state.email"
              type="email"
              :ui="{
                placeholder: 'placeholder-black',
                color: {
                  white: {
                    outline: 'ring-2 ring-[#007bff] dark:ring-[#007bff]'
                  }
                }
              }"
            />
          </UFormGroup>

          <UFormGroup label="Password" name="password">
            <UInput
              v-model="state.password"
              type="password"
              :ui="{
                color: {
                  white: {
                    outline: 'ring-2 ring-[#007bff] dark:ring-[#007bff]'
                  }
                }
              }"
            />
          </UFormGroup>

          <p v-if="alertMessage.value" class="alert">{{ alertMessage.value }}</p>

          <UButton
            type="submit"
            label="Login"
            :ui="{
              base: 'flex items-center justify-center'
            }"
          />
        </form>
      </UCard>

      <div class="flex justify-center items-center mt-4">
        <ToggleTheme />
      </div>
    </div>

    <!-- Moving Text Animation -->
    <div class="moving-text-container mb-2">
      <div class="moving-text text-primary-600 dark:text-primary-400 font-semibold">
        <!-- Duplicate the content for seamless scrolling -->
        <span v-for="i in 2" :key="i">
          {{ Array.from({ length: 25 }).map(() => "INDONESIA MARITIME GATEWAY").join(" • ") }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Align items to the top */
  height: 100vh;
  /* White background for login */
  /* background-color: black;
  font-family: 'Poppins', sans-serif; */
  padding: 0; /* No padding for the container */
  padding-bottom: 100px;
}

.moving-text-container {
  position: absolute; /* Fix to the bottom */
  bottom: 0;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
}

.moving-text {
  display: inline-block;
  animation: moveText 100s linear infinite; /* Continuous smooth animation */
}

.moving-text span {
  padding: 0 10px; /* Spacing between repeating elements */
}

@keyframes moveText {
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(-100%);
  }
}


.logo {
  width: 100px;
  margin-bottom: 5px; /* Reduced margin */
}

.alert {
  color: red;
  margin: 10px 0;
}


.submit-btn {
  display: block;
  width: 100%;
  margin-top: 20px;
  background-color: #007bff; /* Pelindo Blue for the button */
  color: white;
  border: none;
  padding: 10px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  justify-content: center;
  text-align: center;
}

.submit-btn:hover {
  background-color: #0056b3; /* Darker blue on hover */
}

.login-form {
  display: flex;
  color: #fff;
  flex-direction: column;
  gap: 10px; /* Spacing between input fields */
}
</style>
