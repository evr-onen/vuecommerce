<template>
  <div class="wrapper w-full">
    <div class="top flex border-b border-info">
      <div class="title w-fit">
        <h3 class="font-bold border-r border-info pr-8">Featured Products</h3>
      </div>
      <div class="flex categoryTitles items-center">
        <div
          class="cat-item pb-4 duration-300 transition-colors relative"
          :class="{ currentItem: catIndex === 0 }"
        >
          <p class="capitalize text-base cursor-pointer" @click="catIndex = 0">
            Auto Safety & Security
          </p>
        </div>
        <div
          class="cat-item pb-4 duration-300 transition-colors relative"
          :class="{ currentItem: catIndex === 1 }"
        >
          <p class="capitalize text-base cursor-pointer" @click="catIndex = 1">
            Interior Accessories
          </p>
        </div>
        <div
          class="cat-item pb-4 duration-300 transition-colors relative"
          :class="{ currentItem: catIndex === 2 }"
        >
          <p class="capitalize text-base cursor-pointer" @click="catIndex = 2">Motor Oils</p>
        </div>
        <div
          class="cat-item pb-4 duration-300 transition-colors relative"
          :class="{ currentItem: catIndex === 3 }"
        >
          <p class="capitalize text-base cursor-pointer" @click="catIndex = 3">Tires & Wheels</p>
        </div>
      </div>
    </div>
    <div class="mt-8 flex flex-wrap">
      <Swiper
        :slidesPerView="5"
        :loop="true"
        :navigation="{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }"
        :space-between="5"
        :modules="modules"
        class="h-full rounded-lg relative !mb-8"
      >
        <SwiperSlide
          v-for="product in products"
          :key="product.id"
          class="!flex overflow-x-hidden h-full rounded-lg"
        >
          <MiniProductCard
            :product="product"
            @toggleViewHandler="() => emits('toggleViewHandler', product.id)"
            @toggleVariantViewHandler="() => emits('toggleVariantViewHandler', product.id)"
          />
        </SwiperSlide>
        <div class="swiper-button-next"><RightChavronIcon2 /></div>
        <div class="swiper-button-prev"><LeftChavronIcon2 /></div>
      </Swiper>
    </div>
  </div>
</template>

<script setup>
//NOTE - Cores
import { onMounted, ref } from 'vue'

//NOTE - Defines
defineProps(['products'])
const emits = defineEmits(['toggleViewHandler', 'toggleVariantViewHandler'])

//NOTE -  Components
import MiniProductCard from '../../components/global/productCards/miniProductCard.vue'

//NOTE -  Swiper
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import 'swiper/css/pagination'
import LeftChavronIcon2 from '@/assets/svg/LeftChavronIcon2.vue'
import RightChavronIcon2 from '@/assets/svg/RightChavronIcon2.vue'

//NOTE -  Spiper Modules
const modules = [Navigation]

//NOTE -  refs
const catIndex = ref(0)

//NOTE - Lifecycles
onMounted(() => {})
</script>

<style scoped>
.categoryTitles > div {
  margin-left: 2rem;
}
.currentItem {
  @apply text-primary border-b-2 border-primary -mb-[2px];
}
.swiper-button-next::after,
.swiper-button-prev::after {
  content: '';
}

.swiper-button-next,
.swiper-button-prev {
  background-color: #fff;
  color: #000;
  @apply border border-info;
  opacity: 0;
  visibility: hidden;
  transition: 300ms;
}
.swiper:hover .swiper-button-next,
.swiper:hover .swiper-button-prev {
  opacity: 1;
  visibility: visible;
}
</style>
