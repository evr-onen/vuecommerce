<template>
  <div class="multiselect-wrapper w-full relative" tabindex="1">
    <label for="container" class="block text-sm">{{ label }}</label>

    <input
      @click="focusTogleHandler"
      @blur="isFocused = false"
      id="searchbox"
      class="w-full rounded-2xl mt-2 border border-formPlaceholder py-3 pl-4 pr-16 focus-visible:outline-info focus-visible:outline-8"
      type="text"
      tabindex="1"
      ref="inputRef"
      :value="selectedContainer"
      @input="inputHandler"
    />
    <div
      class="container-panel invisible opacity-0 absolute top-full left-0 right-0 border border-info max-h-[250px] overflow-y-auto"
    >
      <p
        class="option capitalize"
        v-for="option in newOptions"
        :class="{ selectedOption: optionCheckSelect(option.name) }"
        :key="option.id"
        @click="selectOptionHandler(option)"
      >
        {{ option.name }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, toRefs, watch } from 'vue'
const props = defineProps(['values', 'options', 'label', 'value'])
const emits = defineEmits(['update:values', 'update'])
const { options } = toRefs(props)

const inputRef = ref()
const isFocused = ref(false)
const selectedContainer = ref('')
const searchValue = ref('')
const newOptions = ref([...options.value])
const valueObject = ref(null)

const focusTogleHandler = () => {
  if (isFocused.value) {
    inputRef.value.blur()
  } else {
    isFocused.value = true
  }
}

const selectOptionHandler = (option) => {
  if (option.name !== valueObject.value?.name) {
    valueObject.value = option
    selectedContainer.value = option.name
  } else {
    valueObject.value = null
    selectedContainer.value = ''
    console.log(valueObject.value)
  }

  searchValue.value = ''
  newOptions.value = options.value
}

const optionCheckSelect = (optionName) => {
  if (valueObject?.value?.name) {
    return valueObject.value.name === optionName
  } else {
    return false
  }
}

const inputHandler = (e) => {
  searchValue.value = e.target.value
  selectedContainer.value = searchValue.value
  if (searchValue.value !== '') {
    newOptions.value = options.value.filter((item) =>
      item.name.toLowerCase().includes(searchValue.value.toLowerCase())
    )
  } else {
    newOptions.value = options.value
  }
}
watch(valueObject, (newVal) => {
  emits('update', newVal)
})
</script>

<style scoped>
#searchbox:focus-visible + div,
.multiselect-wrapper:focus .container-panel {
  @apply visible opacity-100;
}
.option {
  @apply bg-white even:bg-formActive py-1 hover:bg-formPlaceholder hover:text-body;
  padding-left: 1rem;
  cursor: pointer;
}
#searchbox {
  @apply font-bold !uppercase;
}
.selectedOption {
  @apply !bg-secondary;
}
</style>
