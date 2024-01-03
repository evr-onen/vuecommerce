<template>
  <div class="h-full">
    <h2 class="text-center mt-8">Create Variant Type</h2>
    <div class="w-full h-full">
      <form class="p-4 w-full" @submit.prevent="onSubmit">
        <div class="h-full">
          <p class="text-center mt-4">Variant Type</p>

          <div class="flex flex-col items-center relative">
            <div class="flex w-full items-center">
              <Field v-slot="{ field, value }" type="text" name="varTypeNameTR">
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
            <p class="text-xs text-red-500 absolute -bottom-4 left-8">{{ errors.varTypeNameTR }}</p>
          </div>
          <div class="flex flex-col items-center relative mt-8">
            <div class="flex w-full items-center">
              <Field v-slot="{ field, value }" type="text" name="varTypeNameEN">
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
              {{ errors.varTypeNameEN }}
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
import { watch } from 'vue'
const props = defineProps(['isOpen'])
const emits = defineEmits(['closeModal'])

import * as yup from 'yup'
import { useForm, configure, Field } from 'vee-validate'
import variants from '@/composables/variant'

const { createVariantType } = variants()

const initialData = {
  varTypeNameTR: null,
  varTypeNameEN: null
}
const schema = yup.object().shape({
  varTypeNameTR: yup.string().required('Please fill Sub Category'),
  varTypeNameEN: yup.string().required('Please fill Sub Category')
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

// watch(
//   () => categoryData.value,
//   () => {
//     mainOptions.value = categoryData.value?.categories
//   }
// )

watch(
  () => props.isOpen,
  () => {
    resetForm()
  }
)

const onSubmit = handleSubmit((data) => {
  console.log(data)
  createVariantType({ name: { en: data.varTypeNameEN, tr: data.varTypeNameTR } })
  resetForm()
})
</script>

<style scoped>
.dangerButtonStyle {
  @apply !bg-danger/50 hover:!bg-danger/80 duration-300;
}
</style>
