<template>
  <div class="w-full flex justify-center min-h-screen">
    <div class="w-full max-w-[1240px] px-4">
      <BreadCrumb class="mt-4" :data="data.shop" />
      <FullBanner class="mt-4" :bannerData="shopBannerData" />
      <div class="flex w-full items-center mt-12">
        <h1 class="font-Cinzel text-5xl text-center uppercase">All products</h1>
        <div class="ml-auto flex w-1/2">
          <div
            class="text-xs text-white bg-red-300 rounded-2xl px-4 py-1 mr-4 capitalize"
            v-for="catID in allFilterValue.category"
            :key="catID"
          >
            {{ subCategoriesStore.find((item) => item.id === Number(catID)).name }}
          </div>
          <div
            class="text-xs text-white bg-blue-300 rounded-2xl px-4 py-1 capitalize"
            v-for="varID in allFilterValue.variants"
            :key="varID"
          >
            {{ variantPropState.find((item) => item.id === Number(varID)).name }}
          </div>
        </div>
      </div>
      <div class="flex gap-4 min-h-screen mt-8">
        <div class="filters border border-info flex-1 p-2">
          <div class="sticky top-8">
            <div class="w-full flex flex-col items-center mb-8">
              <div class="flex flex-col w-full items-center">
                <p class="bg-secondary text-white rounded-lg px-3 py-1 w-full mb-2">
                  Price: {{ priceSlider[0] }}&#8378; - {{ priceSlider[1] }}&#8378;
                </p>
                <InputNumber
                  v-model="priceSlider[0]"
                  inputId="currency-trMin"
                  mode="currency"
                  currency="TRY"
                  locale="tr-TR"
                  size="small"
                  class="w-1/2 mb-2"
                  :pt="{
                    input: {
                      class: 'h-4 !w-24'
                    }
                  }"
                />
                <InputNumber
                  v-model="priceSlider[1]"
                  inputId="currency-trMax"
                  mode="currency"
                  currency="TRY"
                  locale="tr-TR"
                  size="small"
                  class="w-1/2"
                  :pt="{
                    input: {
                      class: 'h-4 !w-24'
                    }
                  }"
                />
                <div class="w-full mt-4">
                  <Slider class="w-full" v-model="priceSlider" range :min="0" :max="maxPrice" />
                </div>
              </div>
            </div>
            <FilterTable
              :data="subCategoriesStore"
              labelName="Category"
              @saveData="saveData"
              :selectedItem="selectedItem"
            />
            <FilterTable
              class="mt-4"
              v-for="(props, type) in variantScaffold"
              :data="props"
              :labelName="type"
              @saveData="saveData"
              :key="type"
            />
          </div>
        </div>
        <div class="products flex-[4] flex flex-wrap gap-6">
          <div class="productCard" v-for="product in shopFilterProducts" :key="product.id">
            <ProductCard
              :product="product"
              @maxPrice="takeMaxPrice"
              @toggleViewHandler="() => toggleViewHandler(product.id)"
              @toggleVariantViewHandler="toggleVariantViewHandler"
            />
          </div>
        </div>
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
//NOTE - cores
import { onBeforeMount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

//NOTE - Components
import FullBanner from '@/components/global/banners/FullBanner.vue'
import BreadCrumb from '@/components/global/breadCrumb/BreadCrumb.vue'
import FilterTable from '@/components/global/filterTable/FilterTable.vue'
import ProductCard from '@/components/global/productCards/ProductCard.vue'
import QuickView from '@/components/global/quickView/QuickView.vue'
import ModalUI from '@/components/ui/ModalUI.vue'
import VarantView from '@/components/global/VarantView/VarantView.vue'
import { shopBannerData } from '@/constant/banners'

//NOTE - Constants
import data from '@/constant/breadCrumbs'

//NOTE -  Composables
import categories from '@/composables/category'
import products from '@/composables/product'
import variants from '@/composables/variant'
const { getVariants } = variants()
const { getCats } = categories()
const { getProducts } = products()

//NOTE -  Stores
import { useCategoryStore } from '@/stores/CategoryStore'
const CatagoryStore = useCategoryStore()
const { subCategoriesStore } = storeToRefs(CatagoryStore)
import { useProductStore } from '@/stores/ProductStore'
const ProductStore = useProductStore()
const { shopFilterProducts, productsStore } = storeToRefs(ProductStore)
import { useVariantStore } from '@/stores/VariantStore'
const VariantStore = useVariantStore()
const { variantScaffold, variantPropState } = storeToRefs(VariantStore)

//NOTE - Hooks
const route = useRoute()

//NOTE - refs
const allFilterValue = ref({ category: [], variants: [] })
const maxPrice = ref(0)
const selectedItem = ref()
const priceSlider = ref([20, 10000])
const isVariantViewOpen = ref(false)
const isViewOpen = ref(false)
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

const takeMaxPrice = (price) => {
  if (maxPrice.value < price) {
    maxPrice.value = price
  }
  priceSlider.value = [0, maxPrice.value]
}

const saveData = (val, label) => {
  if (label === 'category') {
    const index = allFilterValue.value['category'].indexOf(val)
    if (index === -1) {
      allFilterValue.value['category'].push(val)
    } else {
      allFilterValue.value['category'].splice(index, 1)
    }
  } else {
    const index = allFilterValue.value['variants'].indexOf(val)
    if (index === -1) {
      allFilterValue.value['variants'].push(val)
    } else {
      allFilterValue.value['variants'].splice(index, 1)
    }
  }
  ProductStore.productFilter(allFilterValue.value)
}

//NOTE - Lifecycles
onBeforeMount(() => {
  getCats()
  getVariants()
  getProducts()
})

onMounted(() => {
  if (route.query.cat) {
    allFilterValue.value.category.push(route.query.cat)
    selectedItem.value = route.query.cat
  }
})

watch(viewID, () => {
  modalProductData.value = productsStore.value.find((product) => product?.id === viewID.value)
})

watch(
  () => priceSlider.value,
  () => {
    allFilterValue.value.price = priceSlider.value
    ProductStore.productFilter(allFilterValue.value)
  }
)
</script>

<style scoped></style>
