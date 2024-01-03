<template>
  <div
    class="wrapper w-[256px] h-[400px] p-4 font-Krub border border-info rounded-lg group/card !shadow"
  >
    <div class="relative">
      <router-link
        :to="'/products/' + product.id"
        class="img-wrapper rounded-lg w-[224px] h-[224px] relative"
      >
        <img
          class="rounded-lg border border-info"
          :src="`http://127.0.0.1:8000${cardData?.mainImage}`"
          alt=""
        />
        <span
          class="absolute top-4 left-2 px-3 py-1 rounded-xl bg-primary text-white"
          v-if="cardData?.currentPrice !== cardData?.price"
          >{{ Math.floor((1 - cardData?.currentPrice / cardData?.price) * 100) }} %</span
        >
      </router-link>
      <span
        class="absolute top-4 right-2 h-8 w-8 rounded-full bg-slate-50 border border-gray-300 flex shadow cursor-pointer"
        @click="wishlistToggleHandler(product.id)"
      >
        <HeartIcon class="text-primary w-6 h-6 m-auto" v-if="!isWished" />
        <HeartFillIcon class="text-primary w-6 h-6 m-auto" v-else
      /></span>
      <span
        class="absolute top-16 right-0 h-8 w-8 rounded-full bg-slate-50 border border-gray-300 flex shadow cursor-pointer invisible opacity-0 group-hover/card:visible group-hover/card:opacity-100 group-hover/card:right-2 duration-300"
        @click="() => emits('toggleViewHandler')"
      >
        <EyeIcon class="text-text w-6 h-6 m-auto" />
      </span>
    </div>
    <div class="text-wrapper mt-2 flex flex-col justify-between h-[159px]">
      <div class="title font-Krub font-semibold tracking-wider !mb-2">
        <router-link
          :to="`/shop/?cat=${product.category_id}`"
          class="uppercase text-xs font-semibold bg-primary/40 text-white px-2 py-1 rounded-lg"
          >{{ CategoryStore.toCatName(product.category_id) }}</router-link
        >
      </div>
      <div class="title font-Krub font-semibold tracking-wider">
        <router-link :to="'/products/' + product.id" class="uppercase text-base">{{
          cardData?.name
        }}</router-link>
      </div>
      <div class="ratings w-full flex items-center">
        <Rating
          class=""
          v-model="value"
          readonly
          :cancel="false"
          size="small"
          :pt="{
            onIcon: { class: '!text-yellow-500 h-3' },
            offIcon: { class: ' h-3' },
            item: { class: 'w-3 ml-1' }
          }"
        />
        <p class="ml-2" v-if="cardData?.commentsCount === 0">no review yet</p>
        <p class="ml-2" v-else-if="cardData?.commentsCount === 1">
          {{ cardData?.commentsCount }} review
        </p>
        <p class="ml-2" v-else>{{ cardData?.commentsCount }} reviews</p>
      </div>
      <div class="flex justify-between">
        <div class="" v-if="cardData?.currentPrice === cardData?.price">
          <div class="currentPrice font-semibold text-2xl">
            {{ cardData?.currentPrice }} &#8378;
          </div>
        </div>
        <div class="" v-else>
          <div class="price line-through opacity-50">{{ cardData?.price }} &#8378;</div>
          <div class="currentPrice text-primary font-semibold text-2xl">
            {{ cardData?.currentPrice }} &#8378;
          </div>
        </div>
        <div class="">
          <CartIcon
            class="h-10 w-10 bg-textBlur/60 hover:bg-textBlur/80 cursor-pointer rounded-xl p-2"
            @click="addToCartHandler"
          />
        </div>
      </div>
      <div class="inStock flex justify-center mt-auto" v-if="cardData?.stock">
        <BoxesIcon />
        <p class="ml-2">in stock</p>
      </div>
    </div>
  </div>
</template>

<script setup>
//NOTE - core
import { computed, onMounted, ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { VueCookieNext } from 'vue-cookie-next'

//NOTE - defines
const props = defineProps(['product'])
const { product } = toRefs(props)
const emits = defineEmits(['toggleViewHandler', 'toggleVariantViewHandler'])

//NOTE - stores
import { useProductStore } from '@/stores/productStore'
const ProductStore = useProductStore()
import { useCategoryStore } from '@/stores/categoryStore'
const CategoryStore = useCategoryStore()
const { wishlistProducts } = storeToRefs(ProductStore)
import { useUserStore } from '@/stores/UserStore'
const UserStore = useUserStore()

//NOTE - SVGs
import CartIcon from '@/assets/svg/CartIcon.vue'
import BoxesIcon from '@/assets/svg/BoxesIcon.vue'
import HeartIcon from '@/assets/svg/HeartIcon.vue'
import HeartFillIcon from '@/assets/svg/HeartFillIcon.vue'
import EyeIcon from '@/assets/svg/EyeIcon.vue'

//NOTE - Composables
import wishlists from '@/composables/wishlist'
const { createWishlist, deleteWishlist } = wishlists()

// ** Swal
import { Toast } from '@/layouts/sweetAlert'
const { SuccessToast } = Toast()

//NOTE - Global Funcs
import setProductData from '@/hooks/setProductData'

// ** refs
const value = ref(3)
const cardData = ref()

//NOTE - Hooks
const router = useRouter()
const { dataForCard } = setProductData()

onMounted(() => {
  cardData.value = dataForCard(product.value)
  value.value = cardData.value?.rating
})

const isWished = computed({
  get() {
    const index = wishlistProducts.value.findIndex((item) => item.id == product.value?.id)
    if (index === -1) {
      return false
    } else {
      return true
    }
  },
  
})

const addToCartHandler = () => {
  if (product.value.to_variant_products.length === 0) {
    let cartCookie = []

    const tmpCartProduct = {
      id: product.value.id,
      quantity: 1,
      price: cardData.value?.currentPrice
    }

    if (VueCookieNext.isCookieAvailable('cart')) {
      cartCookie = JSON.parse(VueCookieNext.getCookie('cart'))
    }
    cartCookie.push(tmpCartProduct)
    VueCookieNext.setCookie('cart', JSON.stringify(cartCookie))
    UserStore.addCartItem(tmpCartProduct)

    document.body.style.overflowY = 'auto'
    SuccessToast('Success', 'The Product succesfully added to cart.')
  } else {
    emits('toggleVariantViewHandler')
  }
}

const wishlistToggleHandler = (id) => {
  if (UserStore.token.length > 0) {
    if (product.value) {
      if (
        !wishlistProducts.value.some((product) => {
          return product.id === id
        })
      ) {
        createWishlist({ user_id: Number(UserStore.getUserID), product_id: product.value.id })
      } else {
        deleteWishlist({ user_id: UserStore.getUserID, product_id: product.value.id })
      }
    }
  } else {
    router.push('/auth#login')
  }
}
</script>

<style scoped></style>
