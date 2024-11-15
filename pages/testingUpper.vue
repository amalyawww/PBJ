<template>
    <div>
      <!-- Form untuk input Pekerjaan -->
      <UFormGroup label="Pekerjaan" name="Pekerjaan">
        <UInput v-model="state.Pekerjaan" />
      </UFormGroup>
  
      <!-- Tombol untuk submit dan menampilkan hasil -->
      <button @click="handleSubmit">Submit</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  // Definisikan state untuk input Pekerjaan dan Pekerjaan_UP
  const state = ref({
    Pekerjaan: "",
    Pekerjaan_UP: "",
  });
  
  // Watcher untuk memperbarui Pekerjaan_UP ketika Pekerjaan berubah
  watch(
    () => state.value.Pekerjaan,
    (newValue) => {
      state.value.Pekerjaan_UP = newValue.toUpperCase();
    }
  );
  
  // Fungsi untuk menangani submit dan menampilkan payload
  const handleSubmit = () => {
    console.log("Payload:", {
      Pekerjaan: state.value.Pekerjaan, // Input Asli
      Pekerjaan_UP: state.value.Pekerjaan_UP, // Input Uppercase
    });
  };
  </script>
  
  <style scoped>
  /* CSS bisa disesuaikan sesuai kebutuhan */
  </style>
  