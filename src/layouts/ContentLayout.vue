<template>
  <Header />
  <slot />
  <Footer class="mt-20" />
</template>
<script setup>
import Header from '@/views/headers/MainHeader.vue'
import Footer from '@/views/footers/MainFooter.vue'
</script>

<style></style>
