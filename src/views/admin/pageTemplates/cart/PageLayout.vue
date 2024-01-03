Field
<template>
  <div class="w-full">
    <form class="" @submit.prevent="onSubmit">
      <div class="flex flex-col">
        <label class="variantTypes">Variant Types</label>
        <Field v-slot="{ field, handleChange, errorMessage }" name="variantTypes">
          <MultiSelect
            class="mt-1 w-max"
            v-model="field.value"
            @change="(e) => handleChange(e.value)"
            :optionLabel="(option) => option.name"
            :options="variantTypeState"
            :pt="{
              input: {
                class: ' min-w-[290px]   rounded-2xl   py-3 pl-4 pr-0 focus:!shadow-none'
              },
              panel: {
                class: '!w-fit'
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
                class:
                  'min-w-[290px] rounded-2xl  border border-formPlaceholder focus:outline-1 flex'
              },
              container: {
                class: ' rounded-2xl px-4 py-0 border-none'
              }
            }"
          />
          <p class="text-xs text-red-500">{{ errorMessage }}</p>
        </Field>
      </div>
      <div class="" v-for="(variantsField, arrIndex) in variantsFields" :key="variantsField.key">
        <div
          class=""
          v-for="(variantType, typeIndex) in values.variantTypes"
          :key="variantType.key"
        >
          <div class="productCategory mt-6 w-1/5 flex flex-col">
            <label class="productCategory">{{ values.variantTypes[typeIndex].name }}</label>
            <Field
              v-slot="{ field, handleChange }"
              :name="`variants[${arrIndex}].variantPropertise[${typeIndex}]`"
            >
              <Dropdown
                filter
                class="mt-1 w-max"
                v-model="field.value"
                @change="(e) => handleChange(e.value)"
                :optionLabel="(option) => option.name"
                :options="variantScaffold[values.variantTypes[typeIndex].name]"
                :pt="{
                  input: {
                    class:
                      ' min-w-[7rem]   rounded-2xl   py-3 pl-4 pr-0 focus:!shadow-none capitalize font-medium'
                  },
                  panel: {
                    class: '!w-[2rem]'
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

              <p class="text-xs text-red-500">{{ errors.productCategory }}</p>
            </Field>
          </div>
        </div>
        <div class="">
          <Field v-slot="{ field, handleChange }" :name="`variants[${arrIndex}].price`">
            <InputText
              v-model="field.value"
              @input="(e) => handleChange(e.target.value)"
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
            {{ variantsField }}
          </Field>
        </div>
        <div class="">
          <Field v-slot="{ field, handleChange }" :name="`variants[${arrIndex}].stock`">
            <InputText
              v-model="field.value"
              @input="(e) => handleChange(e.target.value)"
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
        {{ values }}
      </div>
      <button class="buttonStyle mt-8 !w-[10%] ml-auto" @click="push({})">add</button>
      <button class="buttonStyle mt-8 !w-[10%] ml-auto" type="submit">Submit</button>
      <button
        class="buttonStyle mt-8 !w-[10%] ml-auto"
        @click="
          setValues({
            variantTypes: [
              { id: 1, name: 'renk' },
              { id: 2, name: 'beden' },
              { id: 4, name: 'mutfak' }
            ],
            variants: [
              {
                variantPropertise: [
                  { id: 1, name: 'beyaz' },
                  { id: 2, name: 'buyuk' },
                  { id: 5, name: 'Catal kasik takimi' }
                ],
                price: '123123',
                stock: '123'
              },
              {
                variantPropertise: [
                  { id: 4, name: 'Sari' },
                  { id: 2, name: 'buyuk' },
                  { id: 5, name: 'Catal kasik takimi' }
                ],
                price: '12312',
                stock: '123123'
              }
            ]
          })
        "
      >
        setValues</button
      ><button class="buttonStyle mt-8 !w-[10%] ml-auto" @click="resetForm()">clear</button>
    </form>
  </div>
</template>

<script setup>
import * as yup from 'yup'
import { useForm, configure, useFieldArray, Field } from 'vee-validate'
import { storeToRefs } from 'pinia'
import { useVariantStore } from '@/stores/VariantStore'

const VariantStore = useVariantStore()

const { variantTypeState, variantScaffold } = storeToRefs(VariantStore)

import variants from '@/composables/variant'
import categories from '@/composables/category'
const { getCats } = categories()
const { getVariants } = variants()
getVariants()
getCats()
const initialData = {
  variantTypes: [],
  variants: [
    {
      variantPropertise: [],
      price: '',
      stock: ''
    }
  ]
}

const schema = yup.object().shape({
  variants: yup.array().when('isVariant', {
    is: true,
    then: () =>
      yup.array().of(
        yup.object().shape({
          variantPropertise: yup.array().of(
            yup
              .object()
              .shape({
                id: yup.number(),
                name: yup.string()
              })
              .required('properti seciniz')
          ),
          price: yup.number().typeError('need number ').required('price yaziniz'),
          stock: yup.number().typeError('need number ').required('stock yaziniz')
        })
      )
  })
})
const { errors, handleSubmit, values, resetForm, setValues } = useForm({
  initialValues: initialData,
  validationSchema: schema,
  validateOnMount: false
})
const { fields: variantsFields, push } = useFieldArray('variants')

configure({
  bails: false,
  validateOnInput: true
})

const onSubmit = handleSubmit((data) => {
  console.log(data)
})
</script>

<style scoped></style>

const initialData = {
  productName: '',
  productCategory: null,
  isVariant: false,
  descriptionTR: '',
  descriptionEN: '',
  shortDescriptionTR: '',
  shortDescriptionEN: '',
  mainImage: null,
  variantsTypes: [],
  variants: [
    {
      variantPropertise: [],
      price: '',
      stock: '',
      discountFlat: '0',
      discountPercent: '0'
    }
  ],
  productPrice: '',
  productStock: '',
  productDiscountFlat: '0',
  productDiscountPercent: '0',
  gallery: []
}
