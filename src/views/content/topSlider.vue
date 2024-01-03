<template>
  <div class="topSlider h-full">
    <Swiper
      :slidesPerView="1"
      :loop="true"
      :pagination="{
        clickable: true
      }"
      :space-between="0"
      :navigation="true"
      :modules="modules"
      class="h-full rounded-lg"
    >
      <SwiperSlide
        class="!flex overflow-hidden h-full relative rounded-lg"
        v-for="image in sliderImages"
        :key="image.id"
      >
        <img class="object-cover !w-full !h-auto" :src="image.href" :alt="`slider_${image.id}`" />
        <p class="absolute top-[20%] left-[10%] text-body font-Krub text-base capitalize">
          {{ image.upperTitle }}
        </p>
        <p
          class="absolute top-[25%] left-[10%] text-body font-Krub text-[44px] w-[26rem] leading-[3.5rem] font-bold capitalize"
        >
          {{ image.title }}
        </p>
        <p
          class="absolute top-[47%] left-[10%] text-body/70 font-Krub text-base w-[31rem] capitalize"
        >
          {{ image.description }}
        </p>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup>
// ** Constants
import sliderImages from '@/constant/sliderImages'

// ** Swiper
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'

// ** Spiper Modules
const modules = [Pagination, Navigation]
</script>

<style scoped></style>
