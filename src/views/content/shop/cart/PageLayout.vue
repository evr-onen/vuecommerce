<template>
  <div class="w-full flex justify-center font-Krub text-sm font-semibold mt-12">
    <div class="w-full max-w-[1240px] min-h-screen">
      <div class="cartPanel flex gap-4">
        <div class="flex-[3] rounded-lg">
          <div class="cartTable wrapper">
            <div class="tableHeader flex">
              <div class="flex-[4] p-2"><p class="text-center text-text/50">Product Name</p></div>
              <div class="flex-[1] p-2"><p class="text-center text-text/50">Category</p></div>
              <div class="flex-[1] p-2"><p class="text-center text-text/50">Price</p></div>
              <div class="flex-[2] p-2"><p class="text-center text-text/50">Quantity</p></div>
              <div class="flex-[1] p-2"><p class="text-center text-text/50">Subtotal</p></div>
            </div>
            <CartItem
              v-for="(cartData, ind) in cartProducts"
              :key="cartData.id"
              :data="cartData"
              @quantityChangeHandler="(val) => quantityChangeHandler(ind, val)"
              @deleteHandler="() => deleteHandler(ind)"
            />
          </div>
        </div>
        <div class="flex-1 border border-info rounded-lg p-8 mt-10 h-min">
          <p class="uppercase font-bold text-base pb-4 border-b border-gray-200">CART TOTALS</p>
          <div class="border-b border-gray-200 py-4 flex justify-between items-center">
            <p class="capitalize font-semibold text-[13px]">Subtotal</p>
            <p class="font-normal text-sm">{{ Number.parseFloat(subTotal).toFixed(2) }}&#8378;</p>
          </div>
          <div class="py-4 flex justify-between items-center">
            <p class="capitalize font-semibold text-[13px]">Tax 18%</p>
            <p class="font-normal text-sm">
              {{ Number.parseFloat(subTotal * (18 / 100)).toFixed(2) }}&#8378;
            </p>
          </div>
          <div class="border-b border-gray-200 py-4 flex justify-between items-center">
            <p class="capitalize font-bold text-lg">Total</p>
            <p class="font-bold text-lg">
              {{ Number.parseFloat(subTotal * (118 / 100)).toFixed(2) }}&#8378;
            </p>
          </div>
          <button class="bg-primary hover:bg-primary/90 text-white py-2 w-full rounded-md mt-4">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
//NOTE - Cores
import { ref, computed, onBeforeMount, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { VueCookieNext } from 'vue-cookie-next'

//NOTE - Components
import CartItem from './CartItem.vue'

//NOTE - Composables
import products from '@/composables/product'
const { getProducts } = products()
import categories from '@/composables/category'
const { getCats } = categories()

//NOTE - Stores
import { useProductStore } from '@/stores/productStore'
const ProductStore = useProductStore()
const { productsStore } = storeToRefs(ProductStore)
import { useUserStore } from '@/stores/userStore'
const UserStore = useUserStore()

//NOTE - refs
const subTotal = ref()

const cartProducts = computed({
  get() {
    let cartCookie = []
    const cartArr = []
    if (VueCookieNext.isCookieAvailable('cart')) {
      cartCookie = JSON.parse(VueCookieNext.getCookie('cart'))
    }
    cartCookie.map((cookieCartProduct) => {
      const tmpProduct = {}
      const productIndex = productsStore.value.findIndex(
        (product) => product.id === cookieCartProduct.id
      )
      const currentProduct = productsStore.value[productIndex]
      if (currentProduct) {
        tmpProduct.id = currentProduct.id
        tmpProduct.name = currentProduct.name
        tmpProduct.category_id = currentProduct.category_id
        tmpProduct.quantity = cookieCartProduct.quantity
        tmpProduct.imagePath = currentProduct.product_images.find((img) => img.priority === 0).path

        if (productsStore.value[productIndex].to_variant_products.length === 0) {
          const currentPrice =
            currentProduct.price * (1 - currentProduct.discount_percent / 100) -
            currentProduct.discount_flat
          const totalDiscount = 1 - currentPrice / currentProduct.price

          tmpProduct.currentPrice = Math.floor(currentPrice)
          tmpProduct.totalDiscount = Math.floor(totalDiscount)

          cartArr.push(tmpProduct)
        } else {
          const variantIndex = productsStore.value[productIndex].to_variant_products.findIndex(
            (varProduct) => varProduct.id === cookieCartProduct.selectedVariant
          )
          const variantProduct = productsStore.value[productIndex].to_variant_products[variantIndex]
          const currentPrice =
            variantProduct.price * (1 - variantProduct.discount_percent / 100) -
            variantProduct.discount_flat

          const totalDiscount = 1 - currentPrice / variantProduct.price
          tmpProduct.currentPrice = Math.floor(currentPrice)
          tmpProduct.totalDiscount = Math.floor(totalDiscount)

          cartArr.push(tmpProduct)
        }
      }
      productsStore.value[productIndex]
    })

    return cartArr
  },
  set(newValue) {
    return newValue
  }
})

onBeforeMount(() => {
  getProducts()
  getCats()
})

const makeTotal = () => {
  let total = 0
  cartProducts.value.map((item) => {
    total += item.currentPrice * item.quantity
  })
  subTotal.value = total
}

const quantityChangeHandler = (ind, val) => {
  cartProducts.value[ind].quantity = val
  let cartCookie = []
  if (VueCookieNext.isCookieAvailable('cart')) {
    cartCookie = JSON.parse(VueCookieNext.getCookie('cart'))
  }
  cartCookie[ind].quantity = val
  UserStore.updateCartItem(ind, val)
  VueCookieNext.setCookie('cart', JSON.stringify(cartCookie))
  makeTotal()
}
const deleteHandler = (ind) => {
  cartProducts.value.splice(ind, 1)
  UserStore.removeCartItem(ind)
  makeTotal()
}

watch(cartProducts, () => {
  makeTotal()
})
</script>

<style scoped></style>
