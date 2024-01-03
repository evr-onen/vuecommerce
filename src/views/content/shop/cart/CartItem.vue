<template>
  <div class="cartItem flex border border-gray-200 my-1">
    <div class="flex-[4] flex items-center p-2 relative">
      <img class="h-12 w-12 mr-4" :src="`http://127.0.0.1:8000${data.imagePath}`" alt="" />
      <router-link :to="'/products/' + data.id" class="text-center font-normal text-text">{{
        data.name
      }}</router-link>
      <div
        class="delete absolute left-0 top-0 h-4 w-4 bg-primary rounded-full flex justify-center items-center text-white p-1 cursor-pointer"
        @click="() => $emit('deleteHandler')"
      >
        <CrossIcon />
      </div>
    </div>
    <div class="flex-[1] flex items-center justify-center p-2">
      <p class="text-center">
        {{ subCategoriesStore.find((item) => item.id == data?.category_id)?.name }}
      </p>
    </div>
    <div class="flex-[1] flex items-center justify-center p-2">
      <p class="text-center">{{ Number.parseFloat(data.currentPrice).toFixed(2) }}&#8378;</p>
    </div>
    <div class="flex-[2] flex items-center justify-center p-2">
      <InputNumber
        v-model="quantity"
        inputId="horizontal-buttons"
        showButtons
        buttonLayout="horizontal"
        :step="1"
        decrementButtonClass="bg-secondary w-10"
        incrementButtonClass="bg-secondary w-10"
        incrementButtonIcon="pi pi-plus"
        decrementButtonIcon="pi pi-minus"
        :pt="{
          root: {
            class: 'h-6'
          },
          input: {
            class: 'w-12 text-center h-6 py-2'
          }
        }"
      />
      <!-- <p class="text-center">{{ data.quantity }}</p> -->
    </div>
    <div class="flex-[1] flex items-center justify-center p-2">
      <p class="text-center">
        {{ Number.parseFloat(data.quantity * data.currentPrice).toFixed(2) }}&#8378;
      </p>
    </div>
  </div>
</template>

<script setup>
//NOTE - Cores
import { ref, watch } from 'vue'

//NOTE - svg
import CrossIcon from '@/assets/svg/CrossIcon.vue'

//NOTE - Defines
const props = defineProps(['data'])
const emits = defineEmits(['quantityChangeHandler', 'deleteHandler'])

//NOTE - Stores
import { useCategoryStore } from '@/stores/CategoryStore'
import { storeToRefs } from 'pinia'
const CategoryStore = useCategoryStore()
const { subCategoriesStore } = storeToRefs(CategoryStore)

//NOTE - refs
const quantity = ref(props.data.quantity)

watch(quantity, (nevVal) => {
  emits('quantityChangeHandler', nevVal)
})
</script>

<style scoped></style>
