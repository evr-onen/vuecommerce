<template>
  <header class="header w-full h-[135px] flex flex-col items-center">
    <div class="header-top h-[42px] border-b border-info w-full flex justify-center">
      <div class="max-w-[1240px] w-full px-4 flex justify-between">
        <div class="header-top_left pages flex">
          <router-link
            v-for="page in mainHeaderPages"
            class="h-full text-xs hover:text-primary duration-300 flex justify-center items-center"
            :class="{ 'ml-4': page.id != 1 }"
            :to="page.href"
            :key="page.id"
            >{{ page?.label }}</router-link
          >
        </div>
        <div class="header-top_right info flex items-center">
          <span class="mr-8 text-xs font-light"
            >Need help? <span class="text-description font-light"> Call us :</span>
            <span class="font-medium"> (+800) 1234 5678 90 </span> or
            <span class="font-medium">info@company.com </span>
          </span>
          <ul class="pl-8 h-full border-l border-info flex items-center">
            <li>English</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="header-mid h-[90px] border-b border-info w-full flex justify-center">
      <div class="max-w-[1240px] w-full px-4 flex justify-between">
        <div class="header-mid_left logo flex items-center justify-between">
          <ThreeBars class="w-6 h-6 mr-8 cursor-pointer" />
          <router-link to="/">
            <h1 class="font-Cinzel text-5xl mr-8">LOGO</h1>
          </router-link>
          <NotifierUI>
            <BoltIcon class="w-6 h-6" />
            <template #note> Find the Right Parts Faster </template>
          </NotifierUI>
        </div>
        <div
          class="header-mid_mid search flex justify-center items-center max-w-[33rem] w-full relative"
        >
          <div class="w-full relative">
            <input
              type="text"
              placeholder="Search for products..."
              class="searchInput w-full rounded-md border border-formPlaceholder py-3 pl-4 pr-16 focus:outline-primary"
              v-model="searchVal"
            />
            <SearchIcon class="absolute top-1/2 -translate-y-1/2 right-4 w-6 h-6 cursor-pointer" />
            <div class="opacity-0 invisible absolute top-full left-0 right-0 z-50 p-1 duration-500">
              <router-link
                :to="'/products/' + product.id"
                class="!h-10 my-1 !py-1 pl-1 rounded-lg flex bg-white border border-gray-400 items-center"
                v-for="product in searchProducts"
                :key="product.id"
              >
                <div class="mainImg !h-full">
                  <img
                    :src="`http://127.0.0.1:8000${product.image}`"
                    alt=""
                    class="rounded-xl object-cover !h-full !w-auto"
                  />
                </div>
                <div class="ml-8">
                  <p>{{ product.name }}</p>
                </div>
                <div class="pr-8 ml-auto">
                  <div class="flex" v-if="product.currentPrice !== product.nominalPrice">
                    <p class="line-through text-gray-400">{{ product.nominalPrice }}&#8378;</p>
                    <p class="ml-4">{{ product.currentPrice }}&#8378;</p>
                  </div>
                  <div class="" v-else>
                    <p>{{ product.currentPrice }}&#8378;</p>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
        <div class="header-mid_right buttons flex justify-between">
          <div class="myAccount flex flex-col h-full justify-center">
            <DropdownUI class="!z-[99]">
              <div class="flex items-center">
                <p>My Acoount</p>
                <DownChavronIcon class="w-5 h-5 ml-2" />
              </div>
              <p>Hello, {{ UserStore.getUserName || 'Sign in' }}</p>
              <template #menu>
                <div class="flex flex-col w-[280px] p-4">
                  <p class="text-center text-sm mb-4 capitalize">
                    Sign up now and enjoy discounted shopping!
                  </p>
                  <div class="">
                    <router-link class="buttonStyle" to="/auth/#login">log in</router-link>
                  </div>
                  <p class="mt-4 text-sm text-center capitalize">
                    new customer?
                    <router-link
                      class="text-secondary hover:text-linkHover capitalize"
                      to="/auth/#register"
                      >sign up</router-link
                    >
                  </p>
                </div>
              </template>
            </DropdownUI>
          </div>
          <div class="flex items-center relative ml-4" v-if="token.length">
            <router-link :to="token.length > 0 ? '/shop/wishlist' : '/auth'" class="relative">
              <HeartIcon class="h-8 w-8 cursor-pointer" />
              <span
                class="absolute top-0 -right-2 text-body bg-primary w-4 h-4 rounded-full flex justify-center items-center"
                >{{ wishlistProducts?.length }}</span
              >
            </router-link>
          </div>
          <div class="flex items-center ml-8">
            <router-link to="/shop/cart" class="relative">
              <CartIcon class="h-7 w-7 cursor-pointer" />
              <span
                class="absolute top-0 -right-2 text-body bg-primary w-4 h-4 rounded-full flex justify-center items-center"
                >{{ cartItems.length }}</span
              >
            </router-link>
            <div class="flex flex-col ml-6">
              <p class="font-light text-xs" v-if="cartItems.length">{{ cartItems.length }} item</p>
              <p class="font-light text-xs" v-else>The Cart is empty</p>
              <p class="font-bold text-lg">
                {{ Number.parseFloat(cartPrice()).toFixed(2) }}&#8378;
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
<script setup>
//NOTE -  Cores
import { onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { mainHeaderPages } from '@/constant/mainHeaderPages'

//NOTE -  Components
import NotifierUI from '@/components/UI/NotifierUI.vue'
import DropdownUI from '@/components/UI/DropdownUI.vue'

//NOTE - Composables
import wishlists from '@/composables/wishlist'
const { getWishlists } = wishlists()

//NOTE - SVG
import ThreeBars from '@/assets/svg/ThreeBarsIcon.vue'
import BoltIcon from '@/assets/svg/BoltIcon.vue'
import SearchIcon from '@/assets/svg/SearchIcon.vue'
import DownChavronIcon from '@/assets/svg/DownChavronIcon.vue'
import HeartIcon from '@/assets/svg/HeartIcon.vue'
import CartIcon from '@/assets/svg/CartIcon.vue'

//NOTE - Stores
import { useProductStore } from '@/stores/ProductStore'
import { useUserStore } from '@/stores/UserStore'
import { useCategoryStore } from '@/stores/CategoryStore'
const CategoryStore = useCategoryStore()
const ProductStore = useProductStore()
const UserStore = useUserStore()
const { token, cartItems } = storeToRefs(UserStore)
const { wishlistProducts } = storeToRefs(ProductStore)

const cartPrice = () => {
  let total = 0
  cartItems.value.map((item) => {
    total += item.price * item.quantity
  })

  return total * 1.18
}

//NOTE - refs
const searchProducts = ref([])
const searchVal = ref('')

//NOTE - lifecycles
onMounted(() => {
  getWishlists({ user_id: UserStore.getUserID })
})

const searchProductsHandler = () => {
  ProductStore.productsStore.map((item) => {
    const tmpObj = {}
    if (item.name.toLowerCase().includes(searchVal.value)) {
      tmpObj.id = item.id
      tmpObj.name = item.name
      tmpObj.catName = CategoryStore.toCatName(item.category_id)
      tmpObj.image = item.product_images.find((img) => img.priority === 0).path
      if (item.to_variant_products.length > 0) {
        item.to_variant_products.map((varProduct, index) => {
          if (index === 0) {
            const currentPrice =
              varProduct.price * (1 - varProduct.discount_percent / 100) - varProduct.discount_flat
            tmpObj.nominalPrice = varProduct.price
            tmpObj.currentPrice = currentPrice
            tmpObj.discount = varProduct.price / currentPrice
          }
        })
      } else {
        const currentPrice = item.price * (1 - item.discount_percent / 100) - item.discount_flat
        tmpObj.nominalPrice = item.price
        tmpObj.currentPrice = currentPrice
        tmpObj.discount = item.price / currentPrice
      }
      searchProducts.value.push(tmpObj)
    }
  })
}

watch(searchVal, () => {
  searchProducts.value = []
  if (searchVal.value.length) {
    searchProductsHandler()
  } else {
    searchProducts.value = []
  }
})
</script>

<style scoped>
.searchInput:focus ~ div {
  @apply visible opacity-100;
}
</style>
