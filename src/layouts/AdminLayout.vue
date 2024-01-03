<template>
  <div class="dashboardLayout bg-cyan-50 h-full">
    <HeaderSection
      :isExpand="isExpand"
      @toggleIsExpand="toggleIsExpand"
      class="fixed top-0 w-full"
    />
    <SideNav v-model:isExpand="isExpand" class="mt-9 pb-5">
      <slot />
    </SideNav>
  </div>
</template>
<script setup>
import HeaderSection from './adminSideNav/HeaderSection.vue'
import SideNav from './adminSideNav/SideNav.vue'
import { ref, watch } from 'vue'

const isExpand = ref(window.innerWidth > 840 ? true : false)
const toggleIsExpand = () => {
  isExpand.value = !isExpand.value
}
watch(isExpand, () => {
  console.log(isExpand.value)
})
const screenRef = ref(window.innerWidth)
console.log(screenRef.value)
</script>
<style></style>
