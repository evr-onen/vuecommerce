<template>
  <div class="w-full flex flex-col items-center">
    <div class="border-b border-info w-full flex justify-center">
      <div class="max-w-[1240px] w-full flex justify-between">
        <CategoriesHeader class="w-[20rem] mr-4" />
        <HeaderNav class="w-full" />
      </div>
    </div>
    <div class="max-w-[1240px] w-full flex flex-col">
      <div class="w-full flex justify-end mt-4 ml-4">
        <div class="max-w-[970px] w-full h-[510px]">
          <TopSlider />
        </div>
      </div>

      <div class="w-full mt-8">
        <FeaturedProducts
          :products="productsStore"
          @toggleViewHandler="toggleViewHandler"
          @toggleVariantViewHandler="toggleVariantViewHandler"
        />
      </div>
      <div class="flex gap-4">
        <OneToThreeBanner
          v-for="bannerData in homeBannersData"
          :key="bannerData.id"
          :bannerData="bannerData"
        />
      </div>
    </div>
    <ModalUI class="" v-model:isOpen="isViewOpen" modalClass="!max-w-[30%] !w-full rounded-2xl">
      <template #header>Quick View</template>

      <div class="modalContent max-w-[800px]">
        <QuickView class="" v-model:isOpen="isViewOpen" :productData="modalProductData" />
      </div>
    </ModalUI>
    <ModalUI
      class=""
      v-model:isOpen="isVariantViewOpen"
      modalClass="!max-w-[30%] !w-full rounded-2xl"
    >
      <template #header>Variants View</template>

      <div class="modalContent w-full">
        <VarantView class="" v-model:isOpen="isVariantViewOpen" :productData="modalProductData" />
      </div>
    </ModalUI>
  </div>
</template>

<script setup>
//NOTE -  Cores
import { ref, onBeforeMount, watch } from 'vue'
import { storeToRefs } from 'pinia'

//NOTE -  constants
import { homeBannersData } from '@/constant/banners'

//NOTE -  Components
import HeaderNav from './headerNav.vue'
import CategoriesHeader from './categoriesHeader.vue'
import TopSlider from './topSlider.vue'
import FeaturedProducts from './featuredProducts.vue'
import OneToThreeBanner from '@/components/global/banners/OneToThreeBanner.vue'
import QuickView from '@/components/global/quickView/QuickView.vue'
import VarantView from '@/components/global/VarantView/VarantView.vue'
import ModalUI from '@/components/ui/ModalUI.vue'

//NOTE -  Stores
import { useProductStore } from '@/stores/productStore'
const ProductStore = useProductStore()
const { productsStore } = storeToRefs(ProductStore)

//NOTE -  Composables
import products from '@/composables/product'
const { getProducts } = products()

//NOTE - Composables
import variants from '@/composables/variant'
const { getVariants } = variants()
import categories from '@/composables/category'
const { getCats } = categories()

//NOTE - refs
const isViewOpen = ref(false)
const isVariantViewOpen = ref(false)
const viewID = ref()
const modalProductData = ref()

//NOTE - Handlers
const toggleViewHandler = (productID) => {
  viewID.value = productID
  isViewOpen.value = true
}

const toggleVariantViewHandler = (productID) => {
  viewID.value = productID
  isVariantViewOpen.value = true
}

//NOTE -  lifecycles
onBeforeMount(() => {
  getProducts()
  getVariants()
  getCats()
})

watch(viewID, () => {
  modalProductData.value = productsStore.value.find((product) => product?.id === viewID.value)
})
</script>

<style scoped></style>
