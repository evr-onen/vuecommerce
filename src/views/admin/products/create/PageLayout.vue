<template>
  <div class="w-full">
    <div class="flex justify-between">
      <h1>Create Product</h1>
      <div class="flex">
        <button class="buttonStyle !w-[8rem] h-[3.5rem] ml-8" @click="isVarModal = !isVarModal">
          + Variant
        </button>
        <button class="buttonStyle !w-[8rem] ml-8" @click="isCatModal = !isCatModal">
          + Category
        </button>
      </div>
    </div>
    <form class="p-4" @submit.prevent="onSubmit">
      <div class="first flex flex-wrap gap-x-4 justify-between">
        <div class="productName mt-6 w-3/5">
          <label class="block w-full"> Name</label>
          <Field v-slot="{ field, handleChange, errorMessage }" name="productName">
            <InputText
              v-model="field.value"
              @input="(e) => handleChange(e.target.value)"
              type="text"
              size="small"
              :pt="{
                root: {
                  class:
                    'w-full rounded-2xl mt-1 py-2 pl-4 pr-16 focus:!shadow-none border border-formPlaceholder focus:outline-1 focus:border focus:border-info font-medium'
                }
              }"
            />

            <p class="text-xs text-red-500 absolute z-0 capitalize">{{ errorMessage }}</p>
          </Field>
        </div>
        <div class="productCategory mt-6 w-1/5 flex flex-col">
          <div class="">
            <label class="productCategory">Category</label>
            <Field v-slot="{ field, handleChange, errorMessage }" name="productCategory">
              <Dropdown
                filter
                class="mt-1 w-max"
                v-model="field.value"
                @change="(e) => handleChange(e.value)"
                :optionLabel="(option) => option.name"
                :options="subCategoriesStore"
                size="small"
                :pt="{
                  input: {
                    class:
                      ' min-w-[7rem]   rounded-2xl   py-[6px] pl-4 pr-0 focus:!shadow-none capitalize font-medium'
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

              <p class="text-xs text-red-500 absolute z-0 capitalize">{{ errorMessage }}</p>
            </Field>
          </div>
        </div>
        <div class="mt-6 flex flex-col items-center pt-6 w-[15%]">
          <label>Has It a variant?</label>
          <InputSwitch
            v-bind="isVariant"
            @change="
              () =>
                isVariant &&
                variantProductReplace([
                  {
                    discountFlat: '0',
                    discountPercent: '0',
                    price: '',
                    stock: '',
                    variantPropertise: []
                  }
                ])
            "
          />
        </div>
        <div class="flex w-full gap-x-20" v-if="!values.isVariant">
          <div class="productPrice mt-6 w-1/2">
            <label class="block w-full">Product Price</label>
            <Field v-slot="{ field, handleChange, errorMessage }" name="productPrice">
              <InputText
                v-model="field.value"
                @input="(e) => handleChange(e.target.value)"
                type="text"
                size="small"
                :pt="{
                  root: {
                    class:
                      'w-full font-medium rounded-2xl mt-1 py-2 pl-4 pr-16 focus:!shadow-none border border-formPlaceholder focus:outline-1 focus:border focus:border-info'
                  }
                }"
              />

              <p class="text-xs text-red-500 absolute z-0 capitalize">{{ errorMessage }}</p>
            </Field>
          </div>
          <div class="productStock mt-6 w-1/2">
            <label class="block w-full">Stock</label>
            <Field v-slot="{ field, handleChange, errorMessage }" name="productStock">
              <InputText
                v-model="field.value"
                @input="(e) => handleChange(e.target.value)"
                type="text"
                size="small"
                :pt="{
                  root: {
                    class:
                      'w-full font-medium rounded-2xl mt-1 py-2 pl-4 pr-16 focus:!shadow-none border border-formPlaceholder focus:outline-1 focus:border focus:border-info'
                  }
                }"
              />

              <p class="text-xs text-red-500 absolute z-0 capitalize">{{ errorMessage }}</p>
            </Field>
          </div>
          <div class="productDiscountFlat mt-6 w-1/2">
            <label class="block w-full">Discount Flat</label>
            <Field v-slot="{ field, handleChange, errorMessage }" name="productDiscountFlat">
              <InputText
                v-model="field.value"
                @input="(e) => handleChange(e.target.value)"
                type="text"
                size="small"
                :pt="{
                  root: {
                    class:
                      'w-full font-medium rounded-2xl mt-1 py-2 pl-4 pr-16 focus:!shadow-none border border-formPlaceholder focus:outline-1 focus:border focus:border-info'
                  }
                }"
              />

              <p class="text-xs text-red-500 absolute z-0 capitalize">{{ errorMessage }}</p>
            </Field>
          </div>
          <div class="productDiscountPercent mt-6 w-1/2">
            <label class="block w-full">Discount %</label>
            <Field v-slot="{ field, handleChange, errorMessage }" name="productDiscountPercent">
              <InputText
                v-model="field.value"
                @input="(e) => handleChange(e.target.value)"
                type="text"
                size="small"
                :pt="{
                  root: {
                    class:
                      'w-full font-medium rounded-2xl mt-1 py-2 pl-4 pr-16 focus:!shadow-none border border-formPlaceholder focus:outline-1 focus:border focus:border-info'
                  }
                }"
              />

              <p class="text-xs text-red-500 absolute z-0 capitalize">
                {{ errorMessage }}
              </p>
            </Field>
          </div>
        </div>
        <div class="flex flex-col w-full" v-else>
          <div class="flex flex-col">
            <div class="productCategory mt-6 w-full flex items-end">
              <div class="flex flex-col">
                <label class="variantTypes">Variant Types</label>
                <Field v-slot="{ field, handleChange, errorMessage }" name="variantsTypes">
                  <MultiSelect
                    filter
                    class="mt-1 w-max"
                    v-model="field.value"
                    @change="(e) => handleChange(e.value)"
                    :optionLabel="(option) => option.name"
                    :options="variantTypeState"
                    size="small"
                    display="chip"
                    @complete="variantSearch"
                    :pt="{
                      input: {
                        class: ' min-w-[290px]   rounded-2xl  pl-4 pr-0 focus:!shadow-none'
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
                      token: {
                        class: '!h-6 p-3 '
                      },
                      item: {
                        class: '!p-2 text-sm capitalize font-medium'
                      },
                      labelcontainer: {
                        class: ''
                      },
                      label: {
                        class: 'p-0 capitalize h-full flex items-center pl-2 '
                      },
                      root: {
                        class:
                          'min-w-[290px] h-10 rounded-2xl  border border-formPlaceholder focus:outline-1 flex'
                      },
                      container: {
                        class: ' rounded-2xl px-4 py-0 border-none'
                      }
                    }"
                  />

                  <p class="text-xs text-red-500 absolute z-0 capitalize">{{ errorMessage }}</p>
                </Field>
              </div>
            </div>
          </div>

          <div class="flex flex-col">
            <div
              v-for="(productField, productFieldIdx) in variantProductFields"
              :key="productField.key"
              class="flex justify-between items-center w-full bg-dashBody rounded-2xl p-6 mt-4"
            >
              <div class="w-1/2 flex gap-4">
                <div
                  class=""
                  v-for="(variantType, typeIndex) in values.variantsTypes"
                  :key="variantType.key"
                >
                  <div class="productCategory mt-6 w-1/5 flex flex-col">
                    <label class="productCategory capitalize">{{
                      values.variantsTypes[typeIndex].name
                    }}</label>
                    <Field
                      v-slot="{ field, handleChange, errorMessage }"
                      :name="`variants[${productFieldIdx}].variantPropertise[${typeIndex}]`"
                    >
                      <Dropdown
                        filter
                        class="mt-1 w-max"
                        v-model="field.value"
                        @change="(e) => handleChange(e.value)"
                        :optionLabel="(option) => option.name"
                        :options="variantScaffold[values.variantsTypes[typeIndex].name]"
                        :pt="{
                          input: {
                            class:
                              ' min-w-[7rem]   rounded-2xl   py-[6px] pl-4 pr-0 focus:!shadow-none capitalize font-medium'
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
                            class:
                              ' rounded-2xl  border border-formPlaceholder focus:outline-1 flex'
                          },
                          container: {
                            class: ' rounded-2xl px-4 py-0 border-none'
                          }
                        }"
                      />

                      <p class="text-xs text-red-500 absolute z-0 capitalize">{{ errorMessage }}</p>
                    </Field>
                  </div>
                </div>
              </div>
              <div class="flex w-1/2 gap-4 items-end h-full">
                <div class="productPrice w-full max-w-[10rem] flex flex-col justify-center">
                  <div class="">
                    <Field
                      v-slot="{ field, errorMessage, handleChange }"
                      :name="`variants[${productFieldIdx}].price`"
                    >
                      <label class="block w-full">Product Price</label>
                      <InputText
                        v-model="field.value"
                        @input="(e) => handleChange(e.target.value)"
                        type="text"
                        size="small"
                        :pt="{
                          root: {
                            class:
                              'w-full font-medium rounded-2xl mt-1 py-2 pl-4 pr-16 focus:!shadow-none border border-formPlaceholder focus:outline-1 focus:border focus:border-info'
                          }
                        }"
                      />

                      <p class="text-xs text-red-500 absolute z-0 capitalize">{{ errorMessage }}</p>
                    </Field>
                  </div>
                </div>
                <div class="productStock w-full max-w-[10rem] flex flex-col justify-center">
                  <div class="">
                    <Field
                      v-slot="{ field, errorMessage, handleChange }"
                      :name="`variants[${productFieldIdx}].stock`"
                    >
                      <label class="block w-full">Stock</label>
                      <InputText
                        v-model="field.value"
                        @input="(e) => handleChange(e.target.value)"
                        type="text"
                        size="small"
                        :pt="{
                          root: {
                            class:
                              'w-full font-medium rounded-2xl mt-1 py-2 pl-4 pr-16 focus:!shadow-none border border-formPlaceholder focus:outline-1 focus:border focus:border-info'
                          }
                        }"
                      />
                      <p class="text-xs text-red-500 absolute z-0 capitalize">{{ errorMessage }}</p>
                    </Field>
                  </div>
                </div>
                <div class="productDiscountFlat w-full max-w-[10rem] flex flex-col justify-center">
                  <div class="">
                    <Field
                      v-slot="{ field, handleChange, errorMessage }"
                      type="text"
                      :name="`variants[${productFieldIdx}].discountFlat`"
                    >
                      <label class="block w-full">Discount Flat</label>
                      <InputText
                        v-model="field.value"
                        @input="(e) => handleChange(e.target.value)"
                        type="text"
                        size="small"
                        :pt="{
                          root: {
                            class:
                              'w-full font-medium rounded-2xl mt-1 py-2 pl-4 pr-16 focus:!shadow-none border border-formPlaceholder focus:outline-1 focus:border focus:border-info'
                          }
                        }"
                      />

                      <p class="text-xs text-red-500 absolute z-0 capitalize">{{ errorMessage }}</p>
                    </Field>
                  </div>
                </div>
                <div
                  class="productDiscountPercent w-full max-w-[10rem] flex flex-col justify-center"
                >
                  <div class="">
                    <Field
                      v-slot="{ field, handleChange, errorMessage }"
                      type="text"
                      :name="`variants[${productFieldIdx}].discountPercent`"
                    >
                      <label class="block w-full">Discount %</label>

                      <InputText
                        v-model="field.value"
                        @input="(e) => handleChange(e.target.value)"
                        type="text"
                        size="small"
                        :pt="{
                          root: {
                            class:
                              'w-full font-medium rounded-2xl mt-1 py-2 pl-4 pr-16 focus:!shadow-none border border-formPlaceholder focus:outline-1 focus:border focus:border-info'
                          }
                        }"
                      />

                      <p class="text-xs text-red-500 absolute z-0 capitalize">{{ errorMessage }}</p>
                    </Field>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="button"
              @click="
                variantProductPush({
                  variantPropertise: [],
                  price: '',
                  stock: '',
                  discountFlat: '0',
                  discountPercent: '0'
                })
              "
              class="buttonStyle mt-4"
            >
              Add Product +
            </button>
          </div>
        </div>
        <div class="description w-full mt-6">
          <div class="description w-full">
            <Field v-slot="{ field, errorMessage, handleChange }" name="descriptionTR">
              <label class="block w-full">Description TR</label>
              <TextArea
                class="w-full"
                autoResize
                rows="3"
                cols="30"
                size="small"
                v-model="field.value"
                @input="(e) => handleChange(e.target.value)"
                :pt="{
                  root: {
                    class:
                      'w-full font-medium rounded-2xl mt-1 py-2 pl-4 pr-16 focus:!shadow-none border border-formPlaceholder focus:outline-1 focus:border focus:border-info'
                  }
                }"
              />
              <p class="text-xs text-red-500 absolute z-0 capitalize">{{ errorMessage }}</p>
            </Field>
          </div>
          <div class="description w-full flex flex-col mt-6">
            <div class="">
              <Field v-slot="{ field, errorMessage, handleChange }" name="shortDescriptionTR">
                <label class="block w-full">Short Description TR</label>
                <TextArea
                  class="w-full"
                  autoResize
                  rows="2"
                  cols="30"
                  v-model="field.value"
                  @input="(e) => handleChange(e.target.value)"
                  :maxCharacters="50"
                  :pt="{
                    root: {
                      class:
                        'w-full font-medium rounded-2xl mt-1 py-2 pl-4 pr-16 focus:!shadow-none border border-formPlaceholder focus:outline-1 focus:border focus:border-info'
                    }
                  }"
                />

                <p class="text-xs text-red-500 absolute z-0 capitalize">{{ errorMessage }}</p>
              </Field>
            </div>
          </div>
        </div>
        <div class="description w-full">
          <div class="description w-full mt-6">
            <Field v-slot="{ field, errorMessage, handleChange }" name="descriptionEN">
              <label class="block w-full">Description EN</label>
              <TextArea
                class="w-full"
                autoResize
                rows="3"
                cols="30"
                v-model="field.value"
                @input="(e) => handleChange(e.target.value)"
                :pt="{
                  root: {
                    class:
                      'w-full font-medium rounded-2xl mt-1 py-2 pl-4 pr-16 focus:!shadow-none border border-formPlaceholder focus:outline-1 focus:border focus:border-info'
                  }
                }"
              />
              <p class="text-xs text-red-500 absolute z-0 capitalize">{{ errorMessage }}</p>
            </Field>
          </div>
          <div class="description w-full flex flex-col mt-6">
            <div class="">
              <Field v-slot="{ field, errorMessage, handleChange }" name="shortDescriptionEN">
                <label class="block w-full">Short Description EN</label>
                <TextArea
                  class="w-full"
                  autoResize
                  rows="2"
                  cols="30"
                  v-model="field.value"
                  @input="(e) => handleChange(e.target.value)"
                  :maxCharacters="50"
                  :pt="{
                    root: {
                      class:
                        'w-full font-medium rounded-2xl mt-1 py-2 pl-4 pr-16 focus:!shadow-none border border-formPlaceholder focus:outline-1 focus:border focus:border-info'
                    }
                  }"
                />

                <p class="text-xs text-red-500 absolute z-0 capitalize">{{ errorMessage }}</p>
              </Field>
            </div>
          </div>
        </div>
        <div class="images w-full flex justify-between gap-x-4 mt-8 items-end">
          <div class="mainImage w-1/4">
            <p class="">Thumbnail Image</p>
            <UploadImageUI
              name="mainImage"
              v-bind="mainImage"
              class="w-full h-[300px] border border-formPlaceholder"
            />

            <p class="text-xs text-red-500 absolute">{{ errors.mainImage }}</p>
          </div>
          <div class="galleryImages flex !w-full flex-col !h-[320px]">
            <p>Gallery Images</p>
            <div class="flex flex-col justify-end gap-x-4 h-full border-formPlaceholder border p-4">
              <FieldArray
                name="gallery"
                v-slot="{ fields, push, update, swap, remove }"
                class="!w-full flex"
              >
                <button
                  type="button"
                  class="flex buttonStyle !max-w-[10%] !h-fit opacity-0 invisible"
                  :class="{
                    '!opacity-100': values.gallery.length < 5,
                    '!visible': values.gallery.length < 5
                  }"
                  @click="push({ file: null })"
                  v-if="values.gallery.length < 5"
                >
                  <p class="text-xs">Add image +</p>
                </button>
                <div class="flex h-full gap-8">
                  <fieldset
                    class="InputGroup mt-2 flex flex-col items-center !h-full w-[200px]"
                    v-for="(field, idx) in fields"
                    :key="field.key"
                  >
                    <UploadImageUI
                      :name="`gallery[${idx}].file`"
                      v-bind="field"
                      class="flex-1 !max-h-[150px] !max-w-[150px] w-full h-full border"
                      @setValue="(val) => update(idx, { file: val })"
                    />
                    <ErrorMessage :name="`gallery[${idx}].file`" />
                    <div class="flex justify-between gap-2">
                      <button
                        type="button"
                        class="flex mt-4 buttonStyle !w-fit !h-fit !text-xs !px-4"
                        @click="swap(idx, idx - 1)"
                        :class="{ 'opacity-0': idx === 0 }"
                      >
                        <LeftChavronIcon2 class="text-body" /></button
                      ><button
                        type="button"
                        class="flex mt-4 buttonStyle !w-fit !h-fit !text-xs !px-4"
                        @click="remove(idx)"
                      >
                        <DeleteIcon class="text-body" /></button
                      ><button
                        type="button"
                        class="flex mt-4 buttonStyle !w-fit !h-fit !text-xs !px-4"
                        :class="{ 'opacity-0': idx === values.gallery.length - 1 }"
                        @click="swap(idx, idx + 1)"
                      >
                        <RightChavronIcon2 class="text-body" />
                      </button>
                    </div>
                  </fieldset>
                </div>
              </FieldArray>
            </div>
          </div>
        </div>

        <button class="buttonStyle mt-8 !w-[10%] ml-auto" type="submit">Submit</button>
      </div>
    </form>
    <ModalUI v-model:isOpen="isCatModal" modalClass="max-w-[30rem] !w-full rounded-2xl">
      <template #header>Create Category</template>

      <div class="modalContent"><CatModal :isOpen="isCatModal" /></div>
    </ModalUI>
    <ModalUI v-model:isOpen="isVarModal" modalClass="max-w-[30rem] !w-full rounded-2xl">
      <template #header>Create Variant</template>

      <div class="modalContent"><VarModal :isOpen="isVarModal" /></div>
    </ModalUI>
  </div>
</template>

<script setup>
//NOTE - Cores
import { onBeforeMount, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import * as yup from 'yup'
import { FieldArray, useForm, configure, ErrorMessage, useFieldArray, Field } from 'vee-validate'

//NOTE -  Constant
import { variantsArray } from '@/constant/variants.js'

//NOTE -  Stores
import { useCategoryStore } from '@/stores/CategoryStore'
import { useVariantStore } from '@/stores/VariantStore'
import { useUserStore } from '@/stores/UserStore'
const CatStore = useCategoryStore()
const VariantStore = useVariantStore()
const userStore = useUserStore()

const { lang } = storeToRefs(userStore)
const { subCategoriesStore } = storeToRefs(CatStore)
const { variantTypeState, variantScaffold } = storeToRefs(VariantStore)

// ** Validate

//NOTE - Components
import ModalUI from '@/components/UI/ModalUI.vue'
import CatModal from '@/components/global/CatModal/CatModal.vue'
import VarModal from '@/components/global/VarModal/VarModal.vue'

//NOTE - SVGs
import UploadImageUI from '@/components/UI/UploadImageUI.vue'
import RightChavronIcon2 from '@/assets/svg/RightChavronIcon2.vue'
import LeftChavronIcon2 from '@/assets/svg/LeftChavronIcon2.vue'
import DeleteIcon from '@/assets/svg/DeleteIcon.vue'

//NOTE - Composable
import variants from '@/composables/variant'
import products from '@/composables/product'
const { getVariants } = variants()
const { createProduct } = products()

//NOTE - Lifecycles
onBeforeMount(() => {
  getVariants()
})

//NOTE -  refs
const variantItems = ref([...variantsArray])
const isCatModal = ref(false)
const isVarModal = ref(false)

//NOTE - Form
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

const schema = yup.object().shape({
  productName: yup.string().required('it must not be empty'),
  productCategory: yup
    .object()
    .shape({ id: yup.number(), name: yup.string() })
    .required('please select a category'),
  isVariant: yup.boolean(),
  descriptionTR: yup.string().required('Please write Description for the product'),
  descriptionEN: yup.string().required('Please write Description for the product'),
  shortDescriptionTR: yup.string().required('Please write Short Description for the product'),
  shortDescriptionEN: yup.string().required('Please write Short Description for the product'),
  mainImage: yup.mixed().test('fileType', 'invalid file type', (value) => {
    // console.log(value)
    // console.log(value instanceof File)
    if (!value) return false
    if (value instanceof File) {
      return value.type.startsWith('image/')
    }
    return true
  }),
  productPrice: yup.string().when('isVariant', {
    is: false,
    then: () => yup.number().typeError('need number ').required('Please fill Price Field')
  }),
  productStock: yup.string().when('isVariant', {
    is: false,
    then: () => yup.number().typeError('need number ').required('Please fill Stock Quantity field')
  }),
  productDiscountFlat: yup.string().when('isVariant', {
    is: false,
    then: () => yup.number().typeError('need number ').required('Please fill Discount Flat Field')
  }),
  productDiscountPercent: yup.string().when('isVariant', {
    is: false,
    then: () =>
      yup.number().typeError('need number ').required('Please fill Discount Percent Field')
  }),
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
          stock: yup.number().typeError('need number ').required('stock yaziniz'),
          discountFlat: yup.number().typeError('need number '),
          discountPercent: yup.number().typeError('need number ')
        })
      )
  }),
  gallery: yup.array().of(
    yup.object().shape({
      file: yup.mixed().test('fileType', 'invalid file type', (value) => {
        if (!value) return false
        if (value instanceof File) {
          return value.type.startsWith('image/')
        }
        return true
      })
    })
  )
})

const { errors, handleSubmit, values, defineInputBinds, defineComponentBinds, resetForm } = useForm(
  {
    initialValues: initialData,
    validationSchema: schema,
    validateOnMount: false
  }
)

const {
  fields: variantProductFields,
  push: variantProductPush,
  replace: variantProductReplace
} = useFieldArray('variants')
configure({
  bails: false,
  validateOnInput: true
})

const isVariant = defineComponentBinds('isVariant')
const mainImage = defineInputBinds('mainImage')

const onSubmit = handleSubmit((data) => {
  console.log(data)
  createProduct(data)
  resetForm()
})

// ** UI Functions
const variantSearch = (e) => {
  variantItems.value = variantsArray.filter((variant) => {
    values.variantsTypes.map((variantType) => {
      if (variantType.name === variant.name) return false
    })
    return variant.name.toLowerCase().includes(e.query)
  })
}

// ** Watchers
watch(lang, () => {
  VariantStore.changeLangVariants()
  CatStore.changeLangCategories()
  console.log('change to ' + lang.value)
})
</script>

<style scoped></style>
