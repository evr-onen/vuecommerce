<template>
  <div
    class="wrapper w-[256px] min-h-[400px] p-4 font-Krub border border-info rounded-lg relative shadow-lg"
  >
    <div
      class="delete absolute left-0 top-0 h-7 w-7 bg-primary rounded-full flex justify-center items-center text-white p-1 cursor-pointer z-50"
      @click="() => deleteWishlist({ user_id: UserStore.getUserID, product_id: cardData?.id })"
    >
      <CrossIcon class="h-4 w-4" />
    </div>

    <router-link
      :to="'/products/' + cardData?.id"
      class="img-wrapper rounded-lg w-[224px] h-[224px] relative"
    >
      <img
        class="rounded-lg border border-info"
        :src="`http://127.0.0.1:8000${cardData?.mainImage}`"
        alt=""
      />
      <span
        class="absolute top-4 left-2 px-3 py-1 rounded-xl bg-primary text-white"
        v-if="cardData?.price !== cardData?.currentPrice"
        >{{ Number.parseFloat(cardData?.totalDiscount).toFixed(2) }} %</span
      >
    </router-link>
    <div class="text-wrapper mt-4 flex flex-col justify-between">
      <div class="title font-Krub font-semibold tracking-wider">
        <router-link to="/#" class="uppercase text-base">{{ cardData?.name }}</router-link>
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
            offIcon: { class: 'h-3' },
            item: { class: 'w-3 ml-1' }
          }"
        />
        <p class="ml-2">1 review</p>
      </div>
      <div class="flex justify-between">
        <div class="h-[52px]" v-if="product.price === product.currentPrice">
          <div class="currentPrice font-semibold text-2xl">
            {{ cardData?.currentPrice }} &#8378;
          </div>
        </div>
        <div class="h-[52px]" v-else>
          <div class="price line-through opacity-50">{{ cardData?.price }} &#8378;</div>
          <div class="currentPrice text-primary font-semibold text-2xl">
            {{ cardData?.currentPrice }} &#8378;
          </div>
        </div>

        <router-link :to="'/products/' + cardData?.id">
          <CartIcon
            class="h-10 w-10 bg-textBlur/60 hover:bg-textBlur/80 cursor-pointer rounded-xl p-2"
          />
        </router-link>
      </div>
      <div class="inStock flex justify-center pt-4" v-if="product.stock > 0">
        <BoxesIcon />
        <p class="ml-2">in stock</p>
      </div>
    </div>
  </div>
</template>

<script setup>
//NOTE - Cores
import { onMounted, ref, toRefs } from 'vue'

//NOTE - Defines
const props = defineProps(['product'])
const { product } = toRefs(props)

//NOTE - SVG
import CartIcon from '@/assets/svg/CartIcon.vue'
import BoxesIcon from '@/assets/svg/BoxesIcon.vue'
import CrossIcon from '@/assets/svg/CrossIcon.vue'

//NOTE - Stores
import { useUserStore } from '@/stores/userStore'
const UserStore = useUserStore()

// NOTE - composables
import wishlists from '@/composables/wishlist'
const { deleteWishlist } = wishlists()

//NOTE - Global Funcs
import setProductData from '@/hooks/setProductData'
const { dataForCard } = setProductData()

//NOTE - refs
const value = ref(3)
const cardData = ref()

onMounted(() => {
  cardData.value = dataForCard(product.value)
  value.value = cardData.value?.rating
})
</script>

<style scoped></style>
