<template>
  <div class="">
    <label :for="name" class="text-sm"> {{ label }} </label>
    <input
      :id="name"
      class="w-full rounded-2xl mt-2 border border-formPlaceholder py-3 pl-4 pr-16 focus-visible:outline-info focus-visible:outline-8"
      :type="type"
      autocomplete="off"
      :value="textValue"
      @input="inputHandler"
    />
  </div>
</template>

<script setup>
import { toRefs, computed, watch, ref } from 'vue'

const props = defineProps({
  label: {
    default: ''
  },
  value: {},
  type: {
    default: 'text'
  },
  name: {
    default: 'text'
  }
})
const { value, type } = toRefs(props)
const emits = defineEmits(['update:value'])

const textValue = ref('')
const valueComp = computed({
  get() {
    return value.value
  },
  set(newValue) {
    emits('update:value', newValue)
  }
})

const inputHandler = (e) => {
  if (type.value === 'number') {
    if (e.data > 0) textValue.value = e.target.value
  } else {
    textValue.value = e.target.value
  }
}

watch(textValue, (newVal) => {
  valueComp.value = newVal
})
</script>

<style scoped></style>
