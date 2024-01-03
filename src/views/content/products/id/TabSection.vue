<template>
  <div class="wrapper w-full flex flex-col border border-gray-300 rounded-lg">
    <div class="inputs flex flex-col w-full">
      <input hidden id="desc" type="radio" name="tab" value="0" checked />
      <input hidden id="comments" type="radio" name="tab" value="1" />
      <input hidden id="details" type="radio" name="tab" value="2" />
      <div class="labels w-full flex h-10">
        <label
          for="desc"
          class="desc_label flex-1 h-full max-w-[200px] text-center rounded-tl-lg cursor-pointer flex items-center justify-center"
          >Description</label
        >
        <label
          for="comments"
          class="comments_label flex-1 h-full max-w-[200px] text-center cursor-pointer flex items-center justify-center"
          >Comments</label
        >
        <label
          for="details"
          class="details_label flex-1 h-full max-w-[200px] text-center cursor-pointer flex items-center justify-center"
          >Product Details</label
        >
      </div>
      <div class="contents">
        <div class="desc_content hidden p-4">
          {{ desc[lang] }}
        </div>
        <div class="comments_content hidden">
          <CommentsTabSection
            :commentsData="commentsData"
            :productID="productData.id"
            @addCommentHandler="addCommentHandler"
          />
        </div>
        <div class="details_content hidden">under construction</div>
      </div>
    </div>
  </div>
</template>

<script setup>
//NOTE - cores
import { toRefs, ref, watchEffect } from 'vue'

//NOTE - defines
const props = defineProps(['productData'])
const { productData } = toRefs(props)

//NOTE - Components
import CommentsTabSection from './CommentsTabSection.vue'

//NOTE - stores
import { useUserStore } from '@/stores/UserStore'
import { storeToRefs } from 'pinia'
const UserStore = useUserStore()
const { lang } = storeToRefs(UserStore)

//NOTE - refs
const desc = ref('')
const commentsData = ref([])

//NOTE - watches
watchEffect(() => {
  desc.value = JSON.parse(JSON.parse(productData.value?.description))
  for (let i = 0; i < productData.value.comments.length; i++) {
    commentsData.value.push(productData.value.comments[i])
  }
})

//NOTE - Handlers
const addCommentHandler = (newComment) => {
  commentsData.value.push(newComment)
}
</script>

<style scoped>
label {
  @apply border-r border-b border-gray-200 hover:bg-primary/20 duration-300;
}

#desc:checked ~ .contents > .desc_content {
  @apply flex;
}
#comments:checked ~ .contents > .comments_content {
  @apply flex;
}
#details:checked ~ .contents > .details_content {
  @apply flex;
}
#desc:checked ~ .labels .desc_label {
  @apply bg-primary/60  text-white;
}
#comments:checked ~ .labels .comments_label {
  @apply bg-primary/60  text-white;
}
#details:checked ~ .labels .details_label {
  @apply bg-primary/60  text-white;
}
.labels label {
  @apply text-lg;
}
</style>
