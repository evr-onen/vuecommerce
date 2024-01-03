<template>
  <div class="w-full p-4">
    <Rating
      class=""
      v-model="commentData.rating"
      readonly
      :cancel="false"
      size="small"
      :pt="{
        onIcon: { class: '!text-yellow-500 h-3' },
        offIcon: { class: ' h-3' },
        item: { class: 'w-3 ml-1 sss' }
      }"
    />
    <p class="capitalize">{{ commentData?.user?.name }}</p>
    <TextArea
      class="w-full text-sm"
      autoResize
      rows="3"
      cols="30"
      size="small"
      :value="commentData?.comment"
      readonly
      :pt="{
        root: {
          class:
            'w-full rounded-2xl mt-1 py-2 pl-4 pr-16 !shadow-none border  outline-1 border border-info cursor-default'
        }
      }"
    />
  </div>
</template>

<script setup>
//NOTE - Cores
import { ref, toRefs, watch } from 'vue'

//NOTE - Defines
const props = defineProps(['commentData'])
const { commentData } = toRefs(props)

//NOTE - refs
const ratingRef = ref()

watch(commentData, () => {
  ratingRef.value = commentData.value.rating
  console.log(commentData.value.rating)
  console.log(commentData.value)
})
</script>

<style scoped>
.p-rating-item {
  @apply h-6;
}
</style>
