<template>
  <div class="wrapper w-full flex items-center flex-col">
    <div class="w-full max-w-[1240px] px-4 flex mt-4" v-if="editProductData.id == route.params.id">
      <QuickView :productData="editProductData" />
    </div>
    <div class="wrapper w-full flex items-center flex-col h-screen" v-else>
      <ProgressSpinner class="m-auto" />
    </div>
    <div class="tabSection mt-12 w-full max-w-[1240px]" v-if="!isLoading">
      <TabSection :productData="editProductData" />
    </div>
  </div>
</template>

<script setup>
//NOTE -  cores
import { watchEffect, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

//NOTE - components
import QuickView from '@/components/global/quickView/QuickView.vue'
import TabSection from './TabSection.vue'

//NOTE -  composables
import products from '@/composables/product'
const { getSingleProduct } = products()
import categories from '@/composables/category'
const { getCats } = categories()
import variants from '@/composables/variant'
const { getVariants } = variants()

// NOTE - Stores
import { useProductStore } from '@/stores/ProductStore'
const ProductStore = useProductStore()
const { editProductData, isLoading } = storeToRefs(ProductStore)

// ** hooks
const route = useRoute()

//NOTE - Lifecycles
onBeforeMount(() => {
  getVariants()
  getCats()
})
watchEffect(() => {
  getSingleProduct(route.params.id)
})
</script>

<style scoped></style>
