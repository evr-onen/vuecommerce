<template>
  <div class="w-full flex justify-center font-Krub text-sm font-semibold mt-12">
    <div class="w-full max-w-[1240px] min-h-screen">
      <div class="head">
        <BreadCrumb class="" :data="data.wishlist" />
        <h1 class="font-Krub font-normal text-5xl text-center">Your Wishlist</h1>
      </div>
      <div class="cartPanel flex gap-4 mt-12">
        <div class="flex-[3] rounded-lg">
          <div class="cartTable wrapper flex flex-wrap gap-8">
            <WishProductCard
              class=""
              v-for="product in wishlistProducts"
              :product="product"
              :key="product.id"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
//NOTE - Cores
import { onBeforeMount } from 'vue'
import { storeToRefs } from 'pinia'

//NOTE - Components
import WishProductCard from './wishProductCard.vue'
import BreadCrumb from '@/components/global/breadCrumb/BreadCrumb.vue'

//NOTE - Composables
import products from '@/composables/product'
const { getProducts } = products()
import categories from '@/composables/category'
const { getCats } = categories()

//NOTE - Constants
import data from '@/constant/breadCrumbs'

//NOTE - Stores
import { useProductStore } from '@/stores/productStore'
const ProductStore = useProductStore()
const { wishlistProducts } = storeToRefs(ProductStore)

//NOTE - Lifecycles
onBeforeMount(() => {
  getProducts()
  getCats()
})
</script>

<style scoped></style>
