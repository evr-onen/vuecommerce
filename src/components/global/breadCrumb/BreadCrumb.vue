<template>
  <div class="wrapper w-full flex">
    <div class=""><router-link to="/" class="capitalize font-thin">Home</router-link></div>
    <div class="flex" v-for="itemData in data?.items" :key="itemData?.id">
      <RightChavronIcon />
      <router-link :to="itemData.href" class="capitalize">{{ itemData.label }}</router-link>
    </div>
  </div>
</template>

<script setup>
defineProps(['data'])

import RightChavronIcon from '@/assets/svg/RightChavronIcon.vue'
</script>

<style scoped></style>
