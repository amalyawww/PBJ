<template>
  <div class="relative min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
    <!-- Header Section -->
    <Header />

    <!-- page -->
    <div class="flex-1 flex flex-col pt-[58px]">
      <slot />
    </div>

    <!-- footer -->
    <footer class="w-full border-t border-gray-500/30 dark:border-gray-500/50">
      <Container class="py-2">
        <div class="text-xs">&copy; 2024 PT. Pelabuhan Indonesia (Persero) Regional 3</div>
      </Container>
    </footer>
  </div>
</template>