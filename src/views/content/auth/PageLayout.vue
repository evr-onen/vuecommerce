<template>
  <div class="page items-center">
    <div class="max-w-[530px] w-full min-h-[600px] border border-info flex flex-col">
      <div class="flex justify-evenly h-40 items-center">
        <p
          class="uppercase text-textBlur cursor-pointer text-lg font-semibold"
          :class="{ activeBtnStyle: activeButton == 0 }"
          @click="activeButton = 0"
        >
          login
        </p>
        <p
          class="uppercase text-textBlur cursor-pointer text-lg font-semibold"
          :class="{ activeBtnStyle: activeButton == 1 }"
          @click="activeButton = 1"
        >
          register
        </p>
      </div>
      <div class="flex overflow-x-hidden min-h-[440px] relative">
        <div
          class="login min-h-[440px] max-w-[530px] w-full absolute -left-full right-full top-0 bottom-0 duration-700"
          :class="{ activeContentStyle: activeButton == 0 }"
        >
          <LoginContent />
        </div>
        <div
          class="register min-h-[440px] max-w-[530px] w-full absolute left-full -right-full top-0 bottom-0 duration-700"
          :class="{ activeContentStyle: activeButton == 1 }"
        >
          <RegisterContent />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
//NOTE - Core
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'

//NOTE - Components
import LoginContent from './LoginContent.vue'
import RegisterContent from './RegisterContent.vue'

// **NOTE -  Hooks
const route = useRoute()

//NOTE - refs
const activeButton = ref(0)

//NOTE - lifecycles
onMounted(() => {
  const activeArea = route.hash.replace('#', '')
  if (activeArea === 'login') {
    activeButton.value = 0
  } else {
    activeButton.value = 1
  }
})

//NOTE - Watchers
watch(
  () => route.hash,
  () => {
    const activeArea = route.hash.replace('#', '')
    if (activeArea === 'login') {
      activeButton.value = 0
    } else {
      activeButton.value = 1
    }
  }
)

//NOTE - Params
</script>

<style scoped>
.activeBtnStyle {
  @apply text-text;
}
.activeContentStyle {
  @apply top-0 left-0 right-0 bottom-0;
}
</style>
