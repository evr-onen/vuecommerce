<template>
  <div class="multiselect-wrapper w-full relative" tabindex="1">
    <label for="container" class="block text-sm">{{ label }}</label>
    <div class="containerValues flex w-fit" ref="containerValuesRef">
      <div class="" v-if="valueComp.length > 3">
        {{ valueComp.length + ' / ' + options.length + ' Selected' }}
      </div>
      <div class="" v-else v-for="value in valueComp" :key="value.id">{{ value.name }}</div>
    </div>
    <input
      @click="focusTogleHandler"
      @blur="isFocused = false"
      id="searchbox"
      class="w-full rounded-2xl mt-2 border border-formPlaceholder py-3 pl-4 focus-visible:outline-info focus-visible:outline-8"
      type="text"
      tabindex="1"
      ref="containerRef"
      @input="inputHandler"
    />
    <div
      class="container-panel invisible opacity-0 absolute top-full left-0 right-0 border border-info"
    >
      <p
        class="option capitalize"
        v-for="option in newOptions"
        :key="option.id"
        @click="selectOptionHandler(option)"
      >
        <!-- :class="{ selectedOption: optionCheck(option.name) }" -->
        {{ option.name }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, toRefs, computed, onUpdated } from 'vue'
const props = defineProps(['values', 'options', 'label'])
const emits = defineEmits(['update:values'])
const { values, options } = toRefs(props)

const containerRef = ref()
const isFocused = ref(false)
const containerValuesRef = ref()
const valueContainerWidth = ref(0)
const searchValue = ref('')
const newOptions = ref([...options.value])

const valueComp = computed({
  get() {
    console.log(values.value.modelValue)
    return values.value.modelValue
  },
  set(newValue) {
    emits('update:values', newValue)
  }
})

const focusTogleHandler = () => {
  if (isFocused.value) {
    containerRef.value.blur()
  } else {
    isFocused.value = true
  }
}

const selectOptionHandler = (option) => {
  let optionIndex = valueComp.value.findIndex((item) => item.id === option.id)
  if (optionIndex === -1) {
    valueComp.value.push(option)
  } else {
    valueComp.value.splice(optionIndex, 1)
  }

  let tmpContainer = []
  valueComp.value.map((item) => {
    tmpContainer.push(item.name + ' - ')
  })

  searchValue.value = ''
  newOptions.value = options.value
}

// const optionCheck = (optionName) => {
//   return valueComp.value.findIndex((option) => option?.name === optionName) !== -1
// }

onUpdated(() => {
  valueContainerWidth.value = containerValuesRef.value.clientWidth
  containerRef.value.style.paddingLeft = valueContainerWidth.value + 16 + 'px'
})

const inputHandler = (e) => {
  let target = e.target.value

  searchValue.value = target

  if (searchValue.value !== '') {
    newOptions.value = options.value.filter((item) =>
      item.name.toLowerCase().includes(searchValue.value.toLowerCase())
    )
  } else {
    newOptions.value = options.value
  }
}
</script>

<style scoped>
#searchbox:focus-visible + div,
.multiselect-wrapper:focus .container-panel {
  @apply visible opacity-100;
}
.option {
  @apply even:bg-formActive py-1 hover:bg-formPlaceholder hover:text-body;
  padding-left: 1rem;
  cursor: pointer;
}
#searchbox {
  @apply font-bold !uppercase;
}
.selectedOption {
  @apply !bg-secondary;
}
.containerValues {
  @apply absolute top-9;
}
.containerValues div {
  @apply bg-primary/40 text-white py-1 px-3 rounded-2xl ml-2;
}
</style>

<!-- 
  ## usage ##

  <div class="productCategory mt-6 ml-4 w-1/4">
  <MultiSelectUI :options="productCats" v-model:values="categoryValues" label="Categories" />
  </div>
-->
