<script setup>
import { watch, toRefs } from 'vue'
const props = defineProps({
  isOpen: {
    default: false
  },
  isPadding: {
    default: true
  },
  buttons: {
    default: false
  },
  headerClass: {
    default: ''
  },
  contentClass: {
    default: ''
  },
  actionClass: {
    default: ''
  },
  modalClass: {
    default: ''
  },
  action: {}
})
const { isOpen } = toRefs(props)
watch(
  () => isOpen.value,
  () => {
    if (isOpen.value) {
      document.body.style.overflowY = 'hidden'
    } else {
      document.body.style.overflowY = 'auto'
    }
  }
)
</script>

<template>
  <div
    class="overlay flex justify-center items-center z-[999]"
    @click.self="$emit('update:isOpen', false)"
    :class="{ openModal: isOpen }"
  >
    <div
      class="bg-white flex flex-col justify-between mx-4 p-4 max-h-[85%] !min-w-fit !overflow-y-auto"
      :class="modalClass"
    >
      <div class="title">
        <h3 class="capitalize" :class="headerClass"><slot name="header" /></h3>
      </div>
      <div class="content">
        <div class="" :class="contentClass">
          <slot />
        </div>
      </div>
      <div class="actions" :class="actionClass" v-if="buttons">
        <slot v-if="$slots.actions" name="actions" />
        <div v-else class="flex w-full justify-end">
          <button class="buttonOne" @click="action ? action() : $emit('update:isOpen', false)">
            Ok
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  @apply left-0 right-0 top-0 bottom-0 fixed bg-black/70 opacity-0 invisible duration-500;
}
.openModal {
  @apply !opacity-100 !visible;
}
</style>
