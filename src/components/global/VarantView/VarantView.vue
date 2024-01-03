<template>
  <div class="flex w-full">
    <div class="summary px-8 w-full">
      <!-- <h1 class="uppercase text-4xl font-Krub font-semibold">{{ productData?.name }}</h1> -->

      <VariantArea :product="productData" :lang="lang" @variantID="variantID" />
      <div class="flex mt-4">
        <p class="text-3xl">{{ currentPrice }}&#8378;</p>
        <p class="line-through text-xl text-text/50 ml-2" v-if="regularPrice !== currentPrice">
          {{ regularPrice }}&#8378;
        </p>
      </div>
      <div class="flex items-center !justify-between mt-8 w-full">
        <InputNumber
          v-model="quantity"
          inputId="horizontal-buttons"
          showButtons
          buttonLayout="horizontal"
          :step="1"
          decrementButtonClass="bg-secondary"
          incrementButtonClass="bg-secondary"
          incrementButtonIcon="pi pi-plus"
          decrementButtonIcon="pi pi-minus"
          :pt="{
            root: {
              class: 'h-6'
            },
            input: {
              class: 'w-20 text-center h-6 py-2'
            }
          }"
        />
        <div
          class="bg-secondary/80 hover:bg-secondary ml-4 px-8 flex items-center text-white text-lg font-Krub font-semibold rounded-md cursor-pointer h-6"
          @click="addToCartHandler"
        >
          Add to Cart
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, toRefs, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { VueCookieNext } from 'vue-cookie-next'

//NOTE - Components
import VariantArea from './VariantArea.vue'

//NOTE - props
const props = defineProps(['productData'])
const emits = defineEmits(['update:isOpen'])
const { productData } = toRefs(props)

//NOTE - Stores
import { useUserStore } from '@/stores/UserStore'
const UserStore = useUserStore()
const { lang } = storeToRefs(UserStore)

// ** Swal
import { Toast } from '@/layouts/sweetAlert'
const { SuccessToast } = Toast()

//NOTE - refs
const shortDesc = ref('')
const regularPrice = ref()
const currentPrice = ref()
const discount = ref()
const currentStock = ref()
const quantity = ref(1)
const selectedVariant = ref()

const variantID = (id) => {
  selectedVariant.value = id
  if (id) {
    const index = productData.value.to_variant_products.findIndex(
      (varProduct) => varProduct.id === id
    )

    const theVarProduct = productData.value.to_variant_products[index]
    currentPrice.value = Math.floor(
      theVarProduct?.price * (1 - theVarProduct?.discount_percent / 100) -
        theVarProduct?.discount_flat
    )
    regularPrice.value = theVarProduct?.price
    discount.value = Math.floor((1 - currentPrice.value / regularPrice.value) * 100)
    currentStock.value = theVarProduct?.stock
  }
}

const addToCartHandler = () => {
  let cartCookie = []

  const tmpCartProduct = {
    id: productData.value.id,
    selectedVariant: selectedVariant.value,
    quantity: quantity.value,
    price: currentPrice.value
  }

  if (VueCookieNext.isCookieAvailable('cart')) {
    cartCookie = JSON.parse(VueCookieNext.getCookie('cart'))
  }
  cartCookie.push(tmpCartProduct)
  VueCookieNext.setCookie('cart', JSON.stringify(cartCookie))
  UserStore.addCartItem(tmpCartProduct)
  quantity.value = 1
  SuccessToast('Success', 'The Product succesfully added to cart.')
  document.body.style.overflowY = 'auto'

  emits('update:isOpen', false)
}

//NOTE - Lifecycles
watch(productData, () => {
  shortDesc.value = JSON.parse(JSON.parse(productData.value.short_description))[lang?.value] || ''
  regularPrice.value = productData.value.price

  currentPrice.value = Math.floor(
    productData.value?.price * (1 - productData.value?.discount_percent / 100) -
      productData.value?.discount_flat
  )

  discount.value = Math.floor((1 - currentPrice.value / regularPrice.value) * 100)
  currentStock.value = productData.value?.stock
  console.log(productData.value)
})
</script>

<style scoped>
.swiper-slide-thumb-active {
  border: 1px solid black !important;
}
.swiper-wrapper {
  width: 100% !important;
  height: min-content !important;
}
.swiper-slide {
  height: min-content !important;
}
</style>
