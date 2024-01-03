<template>
  <div class="w-full items">
    <div
      class="flex justify-between bg-secondary text-white rounded-lg px-3 py-1 w-full cursor-pointer"
      @click="isOpen = !isOpen"
    >
      <p class="capitalize">{{ labelName }}</p>
      <RightChavronIcon class="duration-500" :class="{ 'rotate-90': isOpen }" />
    </div>
    <div
      class="h-0 opacity-0 invisible overflow-hidden duration-500"
      :class="{ openItem: isOpen, addHeight: isOpen }"
    >
      <div class="item flex pl-4 text-sm my-2 items-center" v-for="cat in data" :key="cat?.id">
        <input
          class="w-4 h-4"
          type="checkbox"
          :id="labelName + cat.id.toString()"
          @input="(e) => handleChange(e.target.value)"
          :value="cat?.id"
          :checked="selectedItem == cat.id"
        />

        <label :for="labelName + cat.id.toString()" class="ml-2 uppercase text-xs font-bold"
          >{{ cat?.name }}
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, toRefs, watch } from 'vue'

import RightChavronIcon from '@/assets/svg/RightChavronIcon.vue'
const props = defineProps(['data', 'labelName', 'selectedItem'])
const { data, labelName, selectedItem } = toRefs(props)
const emits = defineEmits(['saveData'])

// ** refs
const isOpen = ref(false)

const totalHeight = computed(() => data.value?.length * 24 + 'px')

watch(selectedItem, () => {
  if (selectedItem.value) {
    isOpen.value = true
  }
})

const handleChange = (id) => {
  emits('saveData', id, labelName.value.toLowerCase())
}
// const handleChange = (id) => {
//   const index = values.value.indexOf(id)
//   if (index === -1) {
//     values.value.push(id)
//   } else {
//     values.value.splice(index, 1)
//   }
//   emits('saveData', values.value, labelName.value.toLowerCase())
// }
</script>

<style scoped>
.openItem {
  opacity: 1;
  visibility: visible;
}
.addHeight {
  height: v-bind(totalHeight);
}
</style>
