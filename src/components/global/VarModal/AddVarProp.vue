<template>
  <div class="h-full">
    <h2 class="text-center mt-8">Create Variant Propertise</h2>
    <div class="w-full h-full">
      <form class="p-4 w-full h-full" @submit.prevent="onSubmit">
        <div class="w-full flex flex-col items-center relative">
          <div class="!w-full flex flex-col items-center">
            <label for="dropdown">Select a Variant Type:</label>
            <Dropdown
              name="varType"
              v-bind="varType"
              :options="variantTypeState"
              :option-label="(optionItem) => optionItem.name"
              :option-value="(optionItem) => optionItem.id"
              class="mt-1 w-1/2"
              filter
              :pt="{
                input: {
                  class:
                    ' min-w-[7rem]   rounded-2xl   py-3 pl-4 pr-0 focus:!shadow-none capitalize font-medium'
                },
                filterInput: {
                  class: '!p-2 !m-0'
                },
                header: {
                  class: '!p-2 '
                },
                item: {
                  class: '!p-2 text-sm capitalize font-medium'
                },
                root: {
                  class: ' rounded-2xl  border border-formPlaceholder focus:outline-1 flex'
                },
                container: {
                  class: ' rounded-2xl px-4 py-0 border-none'
                }
              }"
            />
          </div>
          <p class="text-xs text-red-500 mainCatErr">
            {{ errors.varType }}
          </p>
        </div>

        <div class="">
          <p class="text-center mt-4">Variant Propertise</p>

          <div class="flex flex-col items-center relative">
            <div class="flex w-full items-center">
              <Field v-slot="{ field, value }" type="text" name="varPropNameTR">
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
            <p class="text-xs text-red-500 absolute -bottom-4 left-8">{{ errors.varPropNameTR }}</p>
          </div>
          <div class="flex flex-col items-center relative mt-8">
            <div class="flex w-full items-center">
              <Field v-slot="{ field, value }" type="text" name="varPropNameEN">
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
            <p class="text-xs text-red-500 absolute -bottom-4 left-8">{{ errors.varPropNameEN }}</p>
          </div>
        </div>
        <div class="flex !mt-16">
          <button
            class="buttonStyle dangerButtonStyle !w-[20%] ml-auto"
            type="button"
            @click="emits('closeModal')"
          >
            Cancel
          </button>
          <button class="buttonStyle !w-[20%] ml-4" type="submit">Create</button>
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

const { createVariant } = variants()

// ** Store
import { storeToRefs } from 'pinia'
import { useVariantStore } from '@/stores/VariantStore'
const VarStore = useVariantStore()
const { variantTypeState } = storeToRefs(VarStore)

const initialData = {
  varPropNameTR: null,
  varPropNameEN: null,
  varType: null
}
const schema = yup.object().shape({
  varPropNameTR: yup.string().required('Please fill Variant Propertise'),
  varPropNameEN: yup.string().required('Please fill Variant Propertise'),
  varType: yup.number().required('please select a Variant Type')
})

const { errors, handleSubmit, defineComponentBinds, resetForm } = useForm({
  initialValues: initialData,
  validationSchema: schema,
  validateOnMount: false
})
const varType = defineComponentBinds('varType')

configure({
  bails: false,
  validateOnInput: true
})

// const mainOptions = ref(catState.mainCategoriesStore)

// watch(
//   () => catState.mainCategoriesStore,
//   () => {
//     mainOptions.value = catState.mainCategoriesStore
//   }
// )

watch(
  () => props.isOpen,
  () => {
    resetForm()
  }
)

const onSubmit = handleSubmit((data) => {
  createVariant({
    name: { en: data.varPropNameEN, tr: data.varPropNameTR },
    variant_type_id: data.varType
  })
  // resetForm()
})
</script>

<style scoped>
.dangerButtonStyle {
  @apply !bg-danger/50 hover:!bg-danger/80 duration-300;
}

.mainCatErr {
  position: absolute;
  left: 50%;
  top: 100%;
  transform: translateX(-50%);
}
</style>
