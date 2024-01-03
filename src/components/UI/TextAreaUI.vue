<template>
  <div class="">
    <div class="flex">
      <label for="productName" class="text-sm"> {{ label }} </label>
      <p v-if="maxCharacters > 0" class="ml-auto">
        {{ maxCharacters - textValue.length + 'characters left.' }}
      </p>
    </div>
    <textarea
      id="productName"
      class="w-full rounded-2xl mt-2 border border-formPlaceholder py-3 pl-4 pr-16 focus-visible:outline-info focus-visible:outline-8"
      type=""
      autocomplete="off"
      v-model="textValue"
      :maxlength="maxCharacters"
    />
  </div>
</template>

<script setup>
import { toRefs, computed, watch, ref } from 'vue'
const props = defineProps(['label', 'value', 'maxCharacters'])
const { value, maxCharacters } = toRefs(props)
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

watch(textValue, (newVal) => {
  valueComp.value = newVal
})
</script>

<style scoped></style>
