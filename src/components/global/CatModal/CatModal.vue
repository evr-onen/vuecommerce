<template>
  <div class="catContent mt-8 min-h-[30rem]">
    <div class="tabHeaders flex h-10">
      <div
        class="tabHeader bg-info w-1/2 flex duration-700 cursor-pointer rounded-l-2xl"
        :class="{ 'bg-secondary': tabIndex === 0, 'text-body': tabIndex === 0 }"
        @click="tabIndex = 0"
      >
        <p class="m-auto text-lg">Sub Category</p>
      </div>
      <div
        class="tabHeader bg-info w-1/2 flex duration-700 cursor-pointer rounded-r-2xl"
        :class="{ 'bg-secondary': tabIndex === 1, 'text-body': tabIndex === 1 }"
        @click="tabIndex = 1"
      >
        <p class="m-auto text-lg">Main Category</p>
      </div>
    </div>

    <div class="tabContents h-[30rem] flex relative overflow-hidden">
      <div
        class="tabContent-1 h-full"
        :class="{
          'tabContent-1_active': tabIndex === 0
        }"
      >
        <AddSubCat :isOpen="isOpen" @closeModal="closeModalHandler" />
      </div>
      <div class="tabContent-2 h-full" :class="{ 'tabContent-2_active': tabIndex === 1 }">
        <AddMainCat :isOpen="isOpen" @closeModal="closeModalHandler" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
defineProps(['isOpen'])
const emits = defineEmits(['update:isOpen'])
import AddSubCat from './AddSubCat.vue'
import AddMainCat from './AddMainCat.vue'

// ** refs
const tabIndex = ref(0)

const closeModalHandler = () => {
  emits('update:isOpen', false)
}
</script>

<style scoped>
.tabContent-1 {
  position: absolute;
  top: 0;
  left: -100%;
  right: 100%;
  bottom: 0;
  transition: 1000ms;
}
.tabContent-1_active {
  left: 0%;
  right: 0%;
}
.tabContent-2 {
  position: absolute;
  top: 0;
  left: 100%;
  right: -100%;
  bottom: 0;
  transition: 1000ms;
}
.tabContent-2_active {
  left: 0%;
  right: 0%;
}
</style>
