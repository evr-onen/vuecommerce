<template>
  <div class="flex w-full">
    <div class="slider flex-[2] flex flex-col overflow-hidden">
      <div class="flex overflow-hidden">
        <Swiper
          :slidesPerView="1"
          :pagination="{
            clickable: true
          }"
          :thumbs="{ swiper: thumbsSwiper }"
          :space-between="0"
          :navigation="true"
          :modules="modules"
          class="sliderSiper !rounded-lg border border-gray-300 !w-full"
        >
          <SwiperSlide
            class="!rounded-lg"
            v-for="(image, index) in productData?.product_images"
            :key="index"
          >
            <img
              class="object-cover !w-full !h-auto !rounded-lg no-select"
              :src="'http://127.0.0.1:8000' + image?.path"
              :alt="image"
            />
          </SwiperSlide>
        </Swiper>
      </div>
      <div class="flex w-full">
        <Swiper
          style="height: min-content"
          @swiper="setThumbsSwiper"
          :spaceBetween="10"
          :slidesPerView="4"
          :freeMode="true"
          :watchSlidesProgress="true"
          :modules="modules"
          class="mt-2 !mx-0 w-full h-min"
        >
          <SwiperSlide
            class="border border-gray-300 rounded-lg"
            style="height: min-content"
            v-for="(image, index) in productData?.product_images"
            :key="index"
          >
            <img
              class="object-cover !w-full !h-auto max-h-[115px] rounded-lg"
              :src="'http://127.0.0.1:8000' + image?.path"
              :alt="image"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
    <div class="summary flex-[3] px-8">
      <h1 class="uppercase text-4xl font-Krub font-semibold">{{ productData?.name }}</h1>
      <p
        class="uppercase mt-4 text-xs font-Krub font-semibold px-2 py-1 bg-primary/30 text-text w-fit rounded-md"
      >
        {{ getCatName(productData?.category_id) }}
      </p>
      <div class="ratings w-full flex items-center">
        <Rating
          class=""
          v-model="retingVal"
          readonly
          :cancel="false"
          size="small"
          :pt="{
            onIcon: { class: '!text-yellow-500 h-3' },
            offIcon: { class: ' h-3' },
            item: { class: 'w-3 ml-1' }
          }"
        />
        <p class="ml-2">{{ productData?.comments?.length }} reviews</p>
      </div>
      <div class="flex">
        <p class="text-3xl">{{ currentPrice }}&#8378;</p>
        <p class="line-through text-xl text-text/50 ml-2" v-if="regularPrice !== currentPrice">
          {{ regularPrice }}&#8378;
        </p>
      </div>
      <VariantArea :product="productData" :lang="lang" @variantID="variantID" />
      <p class="mt-8">{{ shortDesc }}</p>
      <div class="quantity mt-4 flex">
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
              class: 'h-12'
            },
            input: {
              class: 'w-20 text-center h-12 py-2'
            }
          }"
        />
        <div
          class="bg-secondary/80 hover:bg-secondary ml-4 px-8 flex items-center text-white text-lg font-Krub font-semibold rounded-md cursor-pointer"
          @click="addToCartHandler"
        >
          Add to Cart
        </div>
        <div
          class="ml-auto rounded-lg border border-gray-200 flex px-4 hover:bg-gray-50 cursor-pointer"
          @click="wishlistToggleHandler"
          v-if="token.length"
        >
          <HeartIcon class="text-primary w-6 h-6 m-auto" v-if="!isWished" />
          <HeartFillIcon class="text-primary w-6 h-6 m-auto" v-else />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, toRefs, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { VueCookieNext } from 'vue-cookie-next'
import { useRouter } from 'vue-router'

const router = useRouter()

//NOTE - Components
import VariantArea from './VariantArea.vue'

//NOTE - SVGs
import HeartIcon from '@/assets/svg/HeartIcon.vue'
import HeartFillIcon from '@/assets/svg/HeartFillIcon.vue'

//NOTE - props
const props = defineProps(['productData', 'isOpen'])
const { productData, isOpen } = toRefs(props)
const emits = defineEmits(['update:isOpen'])

//NOTE - swiper
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Navigation, Thumbs } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/thumbs'

// ** Swiper
const modules = [Pagination, Navigation, Thumbs]
const thumbsSwiper = ref(null)
const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper
}

import setProductData from '@/hooks/setProductData'

onMounted(() => {
  console.log(setProductData(productData.value))
})
//NOTE - Stores
import { useUserStore } from '@/stores/UserStore'
const UserStore = useUserStore()
const { lang, token } = storeToRefs(UserStore)
import { useCategoryStore } from '@/stores/CategoryStore'
const CategoryStore = useCategoryStore()
const { subCategoriesStore } = storeToRefs(CategoryStore)
import { useProductStore } from '@/stores/productStore'
const ProductStore = useProductStore()
const { wishlistProducts, editProductData } = storeToRefs(ProductStore)

// ** Swal
import { Toast } from '@/layouts/sweetAlert'
const { SuccessToast } = Toast()

//NOTE - Composables
import wishlists from '@/composables/wishlist'
const { createWishlist, deleteWishlist } = wishlists()

//NOTE - refs
const shortDesc = ref('')
const retingVal = ref(1)
const regularPrice = ref()
const currentPrice = ref()
const discount = ref()
const currentStock = ref()
const quantity = ref(1)
const selectedVariant = ref()

//NOTE - setting Values
const getCatName = (id) => {
  return subCategoriesStore.value.find((item) => item.id === id)?.name
}

const variantID = (id) => {
  selectedVariant.value = id
  if (productData.value?.to_variant_products.length !== 0) {
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
    } else {
      const theVarProduct = productData.value?.to_variant_products[0]
      currentPrice.value = Math.floor(
        theVarProduct?.price * (1 - theVarProduct?.discount_percent / 100) -
          theVarProduct?.discount_flat
      )
      regularPrice.value = theVarProduct?.price
      discount.value = Math.floor((1 - currentPrice.value / regularPrice.value) * 100)
      currentStock.value = theVarProduct?.stock
    }
  }
}

//NOTE - set Data
const isWished = computed({
  get() {
    const index = wishlistProducts.value?.findIndex(
      (item) => item.product_id === productData.value?.id
    )
    if (index === -1) {
      return false
    } else {
      return true
    }
  },
  set(newValue) {
    return newValue
  }
})

const setProductValues = (productDataValue) => {
  if (productDataValue.value?.short_description) {
    shortDesc.value =
      JSON.parse(JSON.parse(productDataValue.value?.short_description))[lang.value] || ''
  }
  regularPrice.value = productDataValue.value?.price

  if (productDataValue.value?.price) {
    currentPrice.value = Math.floor(
      productDataValue.value.price * (1 - productDataValue.value?.discount_percent / 100) -
        productDataValue.value?.discount_flat
    )
  }

  discount.value = Math.floor((1 - currentPrice.value / regularPrice.value) * 100)
  currentStock.value = productDataValue.value?.stock

  if (productDataValue.value?.comments) {
    let sum = 0
    productDataValue.value?.comments?.map((comment) => (sum += comment.rating))
    retingVal.value = sum / productDataValue.value?.comments.length
  }
}

// **NOTE - Handlers
const wishlistToggleHandler = () => {
  if (!wishlistProducts.value.some((product) => product.product_id == productData.value.id)) {
    createWishlist({ user_id: Number(UserStore.getUserID), product_id: productData.value.id })
  } else {
    deleteWishlist({ user_id: UserStore.getUserID, product_id: productData.value.id })
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

  document.body.style.overflowY = 'auto'
  SuccessToast('Success', 'The Product succesfully added to cart.')
  if (isOpen.value) {
    emits('update:isOpen', false)
  } else {
    router.push('/shop/cart')
  }
}

//NOTE - lifecycles
onMounted(() => {
  setProductValues(editProductData)
  variantID()
})

watch(productData, () => {
  setProductValues(productData)
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
  width: max-content;
}
</style>
