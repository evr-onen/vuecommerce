<template>
  <div class="editCatModal">
    <div class="h-max duration-300 overflow-hidden" :class="{ iscollapsed: !iscollapsed }">
      <div>
        <div class="">
          <form id="top" class="p-4 relative" @submit.prevent="onSubmit">
            <div class="">
              <Field v-slot="{ field, handleChange, errorMessage }" type="text" :name="`mainCatTr`">
                <label class="block w-full">Main Category TR</label>
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
              <Field v-slot="{ field, handleChange, errorMessage }" type="text" :name="`mainCatEn`">
                <label class="block w-full">Main Category EN</label>
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
              <Field v-slot="{ field, handleChange, errorMessage }" type="text" :name="`subCatTr`">
                <label class="block w-full">Sub Category TR</label>
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
              <Field v-slot="{ field, handleChange, errorMessage }" type="text" :name="`subCatEn`">
                <label class="block w-full">Sub Category EN</label>
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
        :value="CategoryStore.catsTable"
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
          field="main"
          header="Main Category"
          filterField="main.id"
          sortable
          style="min-width: 10rem"
          class="h-12"
        >
          <template #body="{ data }">
            <p class="w-full text-left">{{ data?.main?.name }}</p>
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <Dropdown
              v-model="filterModel.value"
              @change="filterCallback(filterModel.value)"
              :options="mainCategoriesStore"
              :optionLabel="(option) => option.name"
              option-value="id"
              placeholder="Select Category"
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
          field="sub"
          header="Sub Category"
          filterField="sub.id"
          sortable
          :showFilterMenu="false"
          :filterMenuStyle="{ width: '14rem' }"
          style="min-width: 6rem"
        >
          <template #body="{ data }">
            <p class="w-full text-left">{{ data?.sub?.name }}</p>
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <Dropdown
              v-model="filterModel.value"
              @change="filterCallback(filterModel.value)"
              :options="subCategoriesStore"
              :optionLabel="(option) => option.name"
              option-value="id"
              placeholder="Select Category"
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
                  @click="prepareCategory(data.main.id, data.sub.id)"
                  href="#top"
                >
                  Edit
                </a>
              </div>
              <div class="buttons_wrapper flex">
                <button
                  class="buttonStyle !py-1 !h-8 px-3 ml-2"
                  @click="deleteHandler(data.sub.id)"
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
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'

//NOTE - Defines
defineProps(['isOpen'])

//NOTE -  Composables
import categories from '@/composables/category'
const { getCats, updateCat, deleteCat } = categories()

//NOTE -  UI imports
import { FilterMatchMode } from 'primevue/api'

//NOTE - Stores
import { useCategoryStore } from '@/stores/CategoryStore'
const CategoryStore = useCategoryStore()
const { mainCategoriesStore, subCategoriesStore, rawCategories } = storeToRefs(CategoryStore)

//NOTE - Refs
const iscollapsed = ref(false)
const filters = ref({
  'main.id': { value: null, matchMode: FilterMatchMode.EQUALS },
  'sub.id': { value: null, matchMode: FilterMatchMode.EQUALS }
})

//NOTE - Forms
import * as yup from 'yup'
import { useForm, configure, Field } from 'vee-validate'

const schema = yup.object().shape({
  mainCatTr: yup.string().required('Please fill the input Field'),
  mainCatEn: yup.string().required('Please fill the input Field'),
  subCatTr: yup.string().required('Please fill the input Field'),
  subCatEn: yup.string().required('Please fill the input Field')
})

// ** Default values
const initialData = {
  mainID: '',
  subID: '',
  mainCatTr: '',
  mainCatEn: '',
  subCatTr: '',
  subCatEn: ''
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
  updateCat(data)
})

// Handlers
const deleteHandler = (id) => {
  console.log(id)
  deleteCat(id)
}

const prepareCategory = (mainID, subID) => {
  iscollapsed.value = false
  const mainName = JSON.parse(rawCategories.value.find((cat) => cat.id === mainID).name)
  const subName = JSON.parse(rawCategories.value.find((cat) => cat.id === subID).name)
  setValues({
    mainID,
    subID,
    mainCatTr: mainName.tr,
    mainCatEn: mainName.en,
    subCatTr: subName.tr,
    subCatEn: subName.en
  })
  iscollapsed.value = true
}

//NOTE - Lifecycles
onMounted(() => {
  getCats()
})
</script>

<style scoped>
.iscollapsed {
  height: 0;
}
html {
  scroll-behavior: smooth;
}
</style>
