<template>
  <div id="collapsed" class="editCatModal">
    <div class="h-max duration-300 overflow-hidden" :class="{ iscollapsed: !iscollapsed }">
      <div>
        <div class="">
          <form id="top" class="p-4 relative" @submit.prevent="onSubmit">
            <div class="">
              <Field v-slot="{ field, handleChange, errorMessage }" type="text" :name="`varTypeTr`">
                <label class="block w-full">Variant Type TR</label>
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
                <p class="text-xs text-red-500 absolute capitalize">{{ errorMessage }}</p>
              </Field>
            </div>
            <div class="mt-6">
              <Field v-slot="{ field, handleChange, errorMessage }" type="text" :name="`varTypeEn`">
                <label class="block w-full">Variant Type EN</label>
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
            <div class="mt-6">
              <Field v-slot="{ field, handleChange, errorMessage }" type="text" :name="`varPropTr`">
                <label class="block w-full">Variant Propertise TR</label>
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
            <div class="mt-6">
              <Field v-slot="{ field, handleChange, errorMessage }" type="text" :name="`varPropEn`">
                <label class="block w-full">Variant Propertise EN</label>
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
            <div class="mt-4">
              <button
                class="buttonStyle dangerButtonStyle !w-[20%] ml-auto"
                type="submit"
                @click="iscollapsed = false"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="">
      <DataTable
        v-model:filters="filters"
        :value="VariantStore.variantsTable"
        paginator
        :rows="10"
        dataKey="id"
        filterDisplay="row"
        size="small"
      >
        <template #header>
          <div class="flex justify-content-end"></div>
        </template>
        <template #empty> No customers found. </template>
        <template #loading> Loading customers data. Please wait. </template>

        <Column
          field="type"
          header="Variant Type"
          filterField="type.id"
          sortable
          style="min-width: 10rem"
          class="h-12"
        >
          <template #body="{ data }">
            <p class="w-full text-left">{{ data?.type?.name }}</p>
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <Dropdown
              v-model="filterModel.value"
              @change="filterCallback(filterModel.value)"
              :options="variantTypeState"
              :optionLabel="(option) => option.name"
              option-value="id"
              placeholder="Select Variant Type"
              class="p-column-filter !min-w-[10rem]"
              :showClear="true"
              :pt="{
                input: {
                  class:
                    ' min-w-[3rem]   rounded-2xl   py-[6px] pl-4 pr-0 focus:!shadow-none capitalize font-medium'
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
            >
            </Dropdown>
          </template>
        </Column>
        <Column
          header="Used Count"
          field="count"
          filterField="count"
          sortable
          style="min-width: 3rem"
          class="h-12"
        >
          <template #body="{ data }">
            <p class="w-full text-left">{{ data?.count }}</p>
          </template>
        </Column>
        <Column
          field="prop"
          header="Variant Propertise"
          filterField="prop.id"
          sortable
          :showFilterMenu="false"
          :filterMenuStyle="{ width: '14rem' }"
          style="min-width: 6rem"
        >
          <template #body="{ data }">
            <p class="w-full text-left">{{ data?.prop?.name }}</p>
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <Dropdown
              v-model="filterModel.value"
              @change="filterCallback(filterModel.value)"
              :options="variantPropState"
              :optionLabel="(option) => option.name"
              option-value="id"
              placeholder="Select Varinat Propertise"
              class="p-column-filter !min-w-[10rem]"
              :showClear="true"
              :pt="{
                input: {
                  class:
                    ' min-w-[3rem]   rounded-2xl   py-[6px] pl-4 pr-0 focus:!shadow-none capitalize font-medium'
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
            >
            </Dropdown>
          </template>
        </Column>
        <Column field="actions" header="Actions" style="min-width: 6rem">
          <template #body="{ data }">
            <div class="flex">
              <div class="buttons_wrapper flex">
                <a
                  class="buttonStyle !py-1 !h-8 px-3"
                  @click="prepareCategory(data.type, data.prop)"
                  href="#collapsed"
                >
                  Edit
                </a>
              </div>
              <div class="buttons_wrapper flex">
                <button
                  class="buttonStyle !py-1 !h-8 px-3 ml-2"
                  @click="deleteHandler(data.prop.id)"
                >
                  Delete
                </button>
              </div>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
    <div class="flex justify-end !mt-16">
      <button
        class="buttonStyle !w-[20%] ml-4"
        type="submit"
        @click.self="$emit('update:isOpen', false)"
      >
        Back
      </button>
    </div>
  </div>
</template>

<script setup>
//NOTE - Cores
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

//NOTE - Defines
defineProps(['isOpen'])

//NOTE - Composables
import variants from '@/composables/variant'
const { updateVariant, deleteVariant } = variants()

//NOTE -  ui
import { FilterMatchMode } from 'primevue/api'

//NOTE -  Stores
import { useVariantStore } from '@/stores/VariantStore'
const VariantStore = useVariantStore()
const { variantPropState, variantTypeState, rawVariantPropState, rawVariantTypeState } =
  storeToRefs(VariantStore)

//NOTE - Refs
const iscollapsed = ref(false)
const filters = ref({
  'type.id': { value: null, matchMode: FilterMatchMode.EQUALS },
  'prop.id': { value: null, matchMode: FilterMatchMode.EQUALS }
})

//NOTE - Forms
import * as yup from 'yup'
import { useForm, configure, Field } from 'vee-validate'

const schema = yup.object().shape({
  varTypeTr: yup.string().required('Please fill the input Field'),
  varTypeEn: yup.string().required('Please fill the input Field'),
  varPropTr: yup.string().required('Please fill the input Field'),
  varPropEn: yup.string().required('Please fill the input Field')
})

const initialData = {
  typeID: '',
  propID: '',
  varTypeTr: '',
  varTypeEn: '',
  varPropTr: '',
  varPropEn: ''
}

const { handleSubmit, setValues } = useForm({
  initialValues: initialData,
  validationSchema: schema,
  validateOnMount: false
})

configure({
  bails: false,
  validateOnInput: true
})
const onSubmit = handleSubmit((data) => {
  console.log(data)
  updateVariant(data)
})

//NOTE - Handlers
const deleteHandler = (id) => {
  deleteVariant(id)
}

//NOTE - Prepare Data
const prepareCategory = (varType, varProp) => {
  iscollapsed.value = false
  const typeName = rawVariantTypeState.value.find((cat) => cat.id === varType.id).name
  const propName = rawVariantPropState.value.find((cat) => cat.id === varProp.id).name
  setValues({
    typeID: varType.id,
    propID: varProp.id,
    varTypeTr: typeName.tr,
    varTypeEn: typeName.en,
    varPropTr: propName.tr,
    varPropEn: propName.en
  })
  iscollapsed.value = true
}
</script>

<style scoped>
.iscollapsed {
  height: 0;
}
html,
body,
.editCatModal {
  scroll-behavior: smooth !important;
}
</style>
