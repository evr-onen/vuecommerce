<template>
  <div id="dashboardHeader" class="min-h-[5vh] bg-body text-cyan-950 flex shadow z-50">
    <div class="min-w-[260px] flex">
      <p class="!m-auto font-Cinzel text-3xl">Logo area</p>
    </div>
    <div class="w-[calc(100%-260px)] flex">
      <div
        v-if="innerWidthRef"
        class="ml-2 my-auto px-4 py-1 rounded-md shadow-2xl hover:opacity-70 cursor-pointer SideBarIcon h-8"
        @click="() => clickHandler()"
      >
        <DotCircleIcon v-if="isExpand" class="w-5 h-5" />
        <CircleIcon v-else class="w-5 h-5" />
      </div>
      <router-link to="/" class="my-auto buttonStyle px-4 !py-1 !w-32 rounded-md">Home</router-link>
      <button
        class="buttonStyle !w-max rounded-md !py-1 my-auto !px-4 ml-4"
        @click="changeLangHandler"
      >
        change language to {{ lang === 'tr' ? 'en' : 'tr' }}
      </button>
      <p class="!m-auto">Dashboard Header</p>
    </div>
  </div>
</template>

<script setup>
import CircleIcon from '@/assets/svg/CircleIcon.vue'
import DotCircleIcon from '@/assets/svg/DotCircleIcon.vue'
import { useUserStore } from '@/stores/UserStore'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const userStore = useUserStore()
const { lang } = storeToRefs(userStore)
const innerWidthRef = ref(window.innerWidth > 840 ? true : false)
const { isExpand } = defineProps(['isExpand'])
const isExpandRef = ref(isExpand)
console.log(isExpandRef.value)
const emit = defineEmits(['toggleIsExpand'])

const changeLangHandler = () => {
  if (lang.value === 'en') {
    userStore.changeLang('tr')
  } else {
    userStore.changeLang('en')
  }
}

const clickHandler = () => {
  emit('toggleIsExpand')
}
</script>

<style scoped>
.shadow-bottom {
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
}
.padY-0 {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}
</style>
