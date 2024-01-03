<template>
  <div class="wrapper h-12">
    <div class="h-full">
      <p
        class="bg-primary text-body flex justify-center items-center tracking-widest h-full cursor-pointer rounded-t-xl text-base"
        @click="isOpen = !isOpen"
      >
        All Categories
      </p>
      <div
        class="border border-info duration-300 h-0 rounded-b-xl relative bg-white"
        :class="{ open: isOpen }"
      >
        <ul>
          <li
            class="group/item"
            v-for="(catItem, key) in scaffoldCats"
            :key="key"
            :class="{ hideItem: !isOpen }"
          >
            <p
              class="mainCatListItem h-8 flex justify-center items-center cursor-pointer text-dashText"
              v-if="catItem.length !== 0"
            >
              {{ key }}
            </p>
            <ul
              class="z-30 bg-white absolute left-[90%] top-0 invisible opacity-0 group-hover/item:opacity-100 group-hover/item:visible group-hover/item:left-[101%] duration-300 border border-info rounded-lg w-full"
            >
              <li
                class="pl-2 m-2 hover:bg-menuHover text-dashText hover:text-primary duration-100 rounded-lg h-8 flex items-center cursor-pointer"
                v-for="cat in catItem"
                :key="cat.id"
              >
                <router-link :to="`/shop/?cat=${cat.id}`">
                  <p class="w-full">{{ cat.name }}</p>
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
//NOTE - Cores
import { onBeforeMount, ref } from 'vue'

//NOTE -  Stores
import { useCategoryStore } from '@/stores/CategoryStore'
import { storeToRefs } from 'pinia'
const CategoryStore = useCategoryStore()
const { scaffoldCats } = storeToRefs(CategoryStore)

//NOTE -  Composables
import categories from '@/composables/category'
const { getCats } = categories()

//NOTE -  Refs
const isOpen = ref(true)
const heightSize = ref('530px')

//NOTE - Lifecycles
onBeforeMount(() => {
  getCats()
})
</script>

<style scoped>
.open {
  height: v-bind(heightSize);
}
.hideItem {
  opacity: 0;
  visibility: hidden;
}
</style>
