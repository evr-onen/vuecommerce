<template>
  <div class="banner w-full h-68 rounded-xl relative overflow-hidden font-Krub">
    <img
      :src="`http://127.0.0.1:8000${bannerData.imgSrc}`"
      alt=""
      class="rounded-xl object-contain duration-300"
    />
    <div
      class="overlay bg-black/20 absolute z-50 top-0 left-0 right-0 bottom-0 px-8 py-8 flex flex-col cursor-pointer"
    >
      <p class="text-white capitalize bg-primary px-3 py-1 rounded-2xl w-fit text-xs font-semibold">
        {{ bannerData.upperText }}
      </p>
      <p class="text-white mt-3 text-3xl font-bold w-1/2">
        {{ bannerData.title }}
      </p>
      <p class="text-white/50 mt-3 text-lg font-thin w-1/2">
        {{ bannerData.text }}
      </p>
      <div class="flex mt-2">
        <p class="text-white font-semibold w-fit capitalize">shop now</p>
        <ArrowRightIcon class="text-white fill-white ml-4 w-4 stroke-white" />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(['bannerData'])
import ArrowRightIcon from '@/assets/svg/ArrowRightIcon.vue'
</script>

<style scoped>
.banner:hover img {
  transform: scale(1.05);
}
</style>
