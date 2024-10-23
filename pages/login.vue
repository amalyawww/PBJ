<script setup lang="ts">
import { z } from 'zod'
import { useRouter } from 'vue-router'
import { reactive } from 'vue'

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
    <div class="flex justify-center my-2">
      <img 
        src="/logo2.png" 
        alt="Logo" 
        width="140px" 
        class="spin-vertical"/>
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

    <!-- Moving Text Animation -->
    <div class="moving-text-container">
      <p class="moving-text">
        INDONESIA MARITIME GATEWAY • INDONESIA MARITIME GATEWAY • INDONESIA MARITIME GATEWAY • INDONESIA MARITIME GATEWAY • INDONESIA MARITIME GATEWAY • INDONESIA MARITIME GATEWAY • INDONESIA MARITIME GATEWAY • INDONESIA MARITIME GATEWAY • INDONESIA MARITIME GATEWAY •INDONESIA MARITIME GATEWAY • INDONESIA MARITIME GATEWAY • INDONESIA MARITIME GATEWAY • INDONESIA MARITIME GATEWAY • INDONESIA MARITIME GATEWAY • INDONESIA MARITIME GATEWAY •
      </p>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* Align items to the top */
  height: 100vh;
  background-color: black; /* White background for login */
  font-family: 'Poppins', sans-serif;
  padding: 0; /* No padding for the container */
}

.moving-text-container {
  position: absolute; /* Changed to absolute to fix it at the bottom */
  bottom: 0; /* Anchored to the bottom of the container */
  width: 100%;
  overflow: hidden;
  height: 50px;
  color: aliceblue;
  white-space: nowrap; /* Prevent text from wrapping */
}

.moving-text {
  display: inline-block;
  animation: moveText 50s linear infinite; /* Text animation */
  color: #007bff; /* Blue color for text */
  background: linear-gradient(to right, white, #007bff); /* Gradient for moving text */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; /* Make text transparent for gradient effect */
}

@keyframes moveText {
  0% {
    transform: translateX(100%); /* Start from right */
  }
  100% {
    transform: translateX(-100%); /* Move to left */
  }
}

.login-box {
  background-color: black; /* Black inner background */
  padding: 20px;
  border-radius: 8px;
  border: 2px solid #007bff; /* Blue outline for the box */
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);
  text-align: center;
  width: 300px;
  position: relative;
  margin-top: 10px; /* Reduced margin to bring form closer to logo */
}

.logo {
  width: 100px;
  margin-bottom: 5px; /* Reduced margin */
}

.input-field {
  border: 1px solid #007bff; /* Pelindo Blue for input border */
  background-color: #fff; /* White background for input fields */
  color: black; /* Black text for input fields */
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
