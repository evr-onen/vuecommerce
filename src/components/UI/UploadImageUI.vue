<template>
  <label :for="'imageInput' + name" class="cursor-pointer flex justify-center items-center">
    <img v-if="rawImage" :src="imageBlob" alt="" class="object-cover h-full w-full" />
    <img
      v-else-if="fillerImage"
      :src="`http://127.0.0.1:8000${fillerImage}`"
      alt=""
      class="object-cover h-full w-full"
    />
    <img
      v-else-if="!rawImage && !fillerImage"
      src="@/assets/png/upload_icon.png"
      alt=""
      class="w-14 h-14"
    />
    <input :name="name" :id="'imageInput' + name" type="file" hidden @change="fileChangeHandler" />
  </label>
</template>

<script setup>
import { ref, watch, toRefs } from 'vue'
const props = defineProps(['name', 'fillerImage', 'value'])
const { value, fillerImage } = toRefs(props)
const emits = defineEmits(['setValue'])
const rawImage = ref(null)
const imageBlob = ref()
const fileChangeHandler = (e) => {
  rawImage.value = e?.target?.files[0]
  imageBlob.value = URL.createObjectURL(rawImage?.value)

  emits('setValue', e?.target?.files[0])
}

watch(
  () => value.value,
  () => {
    if (!value.value) {
      rawImage.value = null
    }
  }
)
</script>

<style scoped></style>
