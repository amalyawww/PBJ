<template>
  <nav class="flex justify-between mb-4 w-full">
        <NuxtLink to="/home" class="text-white hover:underline">Home</NuxtLink>
        <div>
          <NuxtLink to="/logout" class="text-white hover:underline mr-4">Log Out</NuxtLink>
          <NuxtLink to="/database" class="text-white hover:underline">Database</NuxtLink>
        </div>
      </nav>
  <div class="container">
    <h2>Generate Surat Word</h2>
    <form @submit.prevent="generateWord">
      <div class="form-group">
        <label for="nama">Nama:</label>
        <input
          type="text"
          id="nama"
          v-model="nama"
          class="form-control"
          required
        />
      </div>
      <div class="form-group">
        <label for="pekerjaan">Pekerjaan:</label>
        <input
          type="text"
          id="pekerjaan"
          v-model="pekerjaan"
          class="form-control"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">Generate Word</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nama: "", // Variabel untuk menyimpan input nama
      pekerjaan: "", // Variabel untuk menyimpan input pekerjaan
    };
  },
  methods: {
    async generateWord() {
      try {
        const response = await fetch("api/dpp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nama: this.nama,
            pekerjaan: this.pekerjaan,
          }),
        });

        if (!response.ok) {
          throw new Error("Error generating document");
        }

        const blob = await response.blob();
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "output.docx"; // Nama file hasil download
        link.click();
      } catch (error) {
        console.error("Error:", error);
        alert("Gagal menghasilkan dokumen Word.");
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.btn {
  margin-top: 10px;
}
</style>
