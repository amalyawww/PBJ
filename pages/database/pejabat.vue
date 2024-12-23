<script lang="ts" setup>

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})


</script>

<template>
  <Container class="py-8">
    <h1 class="text-4xl font-semibold text-center mt-4 mb-4">Data Pejabat</h1>
    <DataTablesFromSheet url-api="/api/pejabat" />
  </Container>
</template>