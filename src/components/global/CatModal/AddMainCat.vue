<template>
  <div class="h-full">
    <h2 class="text-center mt-8">Create Main Category</h2>
    <div class="w-full h-full">
      <form class="p-4 w-full" @submit.prevent="onSubmit">
        <div class="h-full">
          <p class="text-center mt-4">Main Category</p>

          <div class="flex flex-col items-center relative">
            <div class="flex w-full items-center">
              <Field v-slot="{ field, value }" type="text" name="catNameTR">
                <label class="mr-4">TR</label>
                <InputText
                  v-bind="field"
                  :model-value="value"
                  type="text"
                  size="large"
                  autocomplete="off"
                  :pt="{
                    root: {
                      class:
                        'w-full rounded-2xl mt-1 py-3 pl-4 pr-16 focus:!shadow-none border border-formPlaceholder focus:outline-1 focus:border focus:border-info'
                    }
                  }"
                />
              </Field>
            </div>
            <p class="text-xs text-red-500 absolute -bottom-4 left-8">{{ errors.catNameTR }}</p>
          </div>
          <div class="flex flex-col items-center relative mt-8">
            <div class="flex w-full items-center">
              <Field v-slot="{ field, value }" type="text" name="catNameEN">
                <label class="mr-4">EN</label>
                <InputText
                  v-bind="field"
                  :model-value="value"
                  type="text"
                  size="large"
                  autocomplete="off"
                  :pt="{
                    root: {
                      class:
                        'w-full rounded-2xl mt-1 py-3 pl-4 pr-16 focus:!shadow-none border border-formPlaceholder focus:outline-1 focus:border focus:border-info'
                    }
                  }"
                />
              </Field>
            </div>
            <p class="text-xs text-red-500 absolute -bottom-4 left-8 text-left w-full">
              {{ errors.catNameEN }}
            </p>
          </div>
        </div>
        <div class="flex mt-40">
          <button
            class="buttonStyle dangerButtonStyle !w-[20%] ml-auto"
            type="button"
            @click="emits('closeModal')"
          >
            Cancel
          </button>
          <button class="buttonStyle ml-4 !w-[20%]" type="submit">Create</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
//NOTE - ores
import { ref, watch } from 'vue'

//NOTE - Defines
const props = defineProps(['isOpen'])
const emits = defineEmits(['closeModal'])

//NOTE - Forms
import * as yup from 'yup'
import { useForm, configure, Field } from 'vee-validate'
import categories from '@/composables/category'

const initialData = {
  catNameTR: null,
  catNameEN: null
}
const schema = yup.object().shape({
  catNameTR: yup.string().required('Please fill Sub Category'),
  catNameEN: yup.string().required('Please fill Sub Category')
})

const { errors, handleSubmit, resetForm } = useForm({
  initialValues: initialData,
  validationSchema: schema,
  validateOnMount: false
})

configure({
  bails: false,
  validateOnInput: true
})

const { getCats, categoryData, createCats } = categories()
getCats()

const mainOptions = ref([])

watch(
  () => categoryData.value,
  () => {
    mainOptions.value = categoryData.value?.categories
  }
)

watch(
  () => props.isOpen,
  () => {
    resetForm()
  }
)

const onSubmit = handleSubmit((data) => {
  // console.log(JSON.stringify(data))
  console.log(data)
  createCats({ name: { en: data.catNameEN, tr: data.catNameTR } })
  resetForm()
})
</script>

<style scoped></style>
