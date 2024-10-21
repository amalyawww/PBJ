<script setup lang="ts">
import { z } from 'zod'
import { useRouter } from 'vue-router'
import { Directive, reactive } from 'vue'

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

// Handle form submit
async function onSubmit(event: Event) {
  event.preventDefault()

  if (state.email === 'amaliadev@gmail.com' && state.password === 'adminsuper') {
    alertMessage.value = 'Login successful!'
    // Redirect to the homepage (index.vue)
    router.push('/home')
  } else if (state.email !== 'amaliadev@gmail.com' && state.password !== 'adminsuper') {
    alertMessage.value = 'Email and Password are not recognized.'
  } else if (state.email !== 'amaliadev@gmail.com') {
    alertMessage.value = 'Email is not recognized.'
  } else {
    alertMessage.value = 'Password is incorrect.'
  }
}

</script>

<template>
  <div class="login-container">
    <!-- Moving Text Animation -->
    <div class="moving-text-container">
      <p class="moving-text">
        INDONESIA MARITIME GATEWAY • INDONESIA MARITIME GATEWAY • INDONESIA MARITIME GATEWAY • INDONESIA MARITIME GATEWAY • INDONESIA MARITIME GATEWAY • INDONESIA MARITIME GATEWAY • INDONESIA MARITIME GATEWAY • INDONESIA MARITIME GATEWAY • INDONESIA MARITIME GATEWAY •INDONESIA MARITIME GATEWAY • INDONESIA MARITIME GATEWAY • INDONESIA MARITIME GATEWAY • INDONESIA MARITIME GATEWAY • INDONESIA MARITIME GATEWAY • INDONESIA MARITIME GATEWAY •
      </p>
    </div>

    <!-- Login Box -->
    <div class="login-box">
      <img src="/logo.png" alt="Company Logo" class="logo" />

      <form @submit="onSubmit" class="login-form">
        <UFormGroup label="Email" name="email">
          <UInput v-model="state.email" type="email" class="input-field" />
        </UFormGroup>

        <UFormGroup label="Password" name="password">
          <UInput v-model="state.password" type="password" class="input-field" />
        </UFormGroup>

        <p v-if="alertMessage.value" class="alert">{{ alertMessage.value }}</p>

        <UButton type="submit" class="submit-btn">
          <span>Login</span>
        </UButton>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #333333;
  font-family: 'Poppins', sans-serif;
}

.moving-text-container {
    position: absolute;
    top: 10px;
    width: 100%;
    overflow: hidden;
    height: 50px;
    white-space: nowrap; /* Mencegah teks terputus */
}

.moving-text {
    display: inline-block;
    animation: moveText 50s linear infinite; /* Animasi berjalan */
}

@keyframes moveText {
    0% {
        transform: translateX(100%); /* Mulai dari luar kanan */
    }
    100% {
        transform: translateX(-100%); /* Bergerak ke luar kiri */
    }
  }

.login-box {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  border: 2px solid #007bff; /* Pelindo Blue for the outline */
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);
  text-align: center;
  width: 300px;
  position: relative;
}

.logo {
  width: 100px;
  margin-bottom: 20px;
}

.input-field {
  border: 1px solid #007bff; /* Pelindo Blue for input border */
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
  flex-direction: column;
  gap: 10px;
}
</style>
