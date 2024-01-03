<template>
  <div class="w-full">
    <div class="flex justify-end">
      <button class="buttonStyle !w-[8rem] h-[2rem] !p-0 ml-8" @click="isVarModal = !isVarModal">
        Edit Variant
      </button>
      <button class="buttonStyle !w-[8rem] h-[2rem] !p-0 ml-8" @click="isCatModal = !isCatModal">
        Edit Category
      </button>
    </div>
    <DataTable
      v-model:filters="filters"
      :value="productsForTable"
      paginator
      :rows="10"
      dataKey="id"
      filterDisplay="row"
      size="small"
      headerClass="centertt"
    >
      <template #header>
        <div class="flex justify-content-end"></div>
      </template>
      <template #empty> No customers found. </template>
      <template #loading> Loading customers data. Please wait. </template>
      <Column
        field="productImages"
        header="Image"
        filterField="productImages"
        style="min-width: 14rem"
      >
        <template #body="{ data }">
          <div class="h-10 border border-gray-400 rounded-lg w-fit">
            <img
              class="object-cover w-auto h-full rounded-lg"
              :src="`http://127.0.0.1:8000${
                data.productImages.find((img) => img.priority === 0)?.path
              }`"
              alt=""
            />
          </div>
        </template>
      </Column>
      <Column
        header="Name"
        field="name"
        filterField="name"
        sortable
        style="min-width: 20rem"
        class="h-12"
      >
        <template #body="{ data }">
          <p class="w-full text-left">{{ data.name }}</p>
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter h-8"
            placeholder="Search by name"
            size="small"
            :pt="{
              root: {
                class:
                  'w-full font-medium rounded-2xl mt-1 py-2 pl-4 pr-16 focus:!shadow-none border border-formPlaceholder focus:outline-1 focus:border focus:border-info'
              }
            }"
          />
        </template>
      </Column>
      <Column
        field="categoryId"
        header="Category"
        filterField="categoryId"
        :showFilterMenu="false"
        :filterMenuStyle="{ width: '14rem' }"
        style="min-width: 7rem"
      >
        <template #body="{ data }">
          <p class="w-full text-left">{{ turnToStringCategory(data.categoryId) }}</p>
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <Dropdown
            id="filterCatInput"
            v-model="filterModel.value"
            @change="filterCallback(filterModel.value)"
            :options="subCategoriesStore"
            :optionLabel="(option) => option.name"
            option-value="id"
            placeholder="Select Category"
            class="p-column-filter"
            style="min-width: 12rem"
            :showClear="true"
            :pt="{
              input: {
                class:
                  ' min-w-[7rem]  text-sm rounded-2xl !h-8  py-[6px] pl-4  focus:!shadow-none capitalize font-medium'
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
                class: ' rounded-2xl px-4  border-none'
              }
            }"
          >
          </Dropdown>
        </template>
      </Column>
      <Column
        field="price"
        header="Price"
        :showFilterMenu="false"
        :filterMenuStyle="{ width: '14rem' }"
        style="min-width: 7rem"
      >
        <template #body="{ data }">
          <p class="w-full text-left">{{ data.price }} &#8378;</p>
        </template>
      </Column>
      <Column field="stock" header="Stock" dataType="number" style="min-width: 6rem">
        <template #body="{ data }">
          <p class="w-full text-left">{{ data.stock }}</p>
        </template>
      </Column>
      <Column field="discountFlat" header="Discount Flat" dataType="number" style="min-width: 6rem">
        <template #body="{ data }">
          <p class="w-full text-center">{{ data.discountFlat }}</p>
        </template>
      </Column>
      <Column
        field="discountPercent"
        header="Discount Percent"
        dataType="number"
        style="min-width: 6rem"
      >
        <template #body="{ data }"
          ><p class="w-full text-center">{{ data.discountPercent }} %</p></template
        >
      </Column>
      <Column field="actions" header="Actions" style="min-width: 6rem">
        <template #body="{ data }">
          <div class="buttons_wrapper flex">
            <router-link
              class="buttonStyle !h-6 px-2 !flex justify-center items-center"
              :to="'/admin/products/edit/' + data.id"
            >
              <p class="">Edit</p>
            </router-link>
          </div>
        </template>
      </Column>
    </DataTable>
    <ModalUI v-model:isOpen="isCatModal" modalClass="max-w-[30%] !w-full rounded-2xl">
      <template #header>Edit Category</template>

      <div class="modalContent"><CategoryModal v-model:isOpen="isCatModal" /></div>
    </ModalUI>
    <ModalUI v-model:isOpen="isVarModal" modalClass="max-w-[30%] !w-full rounded-2xl">
      <template #header>Edit Variant</template>

      <div class="modalContent"><VariantModal v-model:isOpen="isVarModal" /></div>
    </ModalUI>
  </div>
</template>

<script setup>
//NOTE -  Core
import { onMounted, ref, watch } from 'vue'

//NOTE -  UI
import { FilterMatchMode } from 'primevue/api'

//NOTE -  Composables
import products from '@/composables/product'
import variants from '@/composables/variant'
const { getVariants } = variants()
const { getProducts } = products()

//NOTE -  UI
import ModalUI from '@/components/UI/ModalUI.vue'
import CategoryModal from './categoryModal.vue'
import VariantModal from './variantModal.vue'

//NOTE -  Stores
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/UserStore'
import { useProductStore } from '@/stores/ProductStore'
import { useCategoryStore } from '@/stores/CategoryStore'
import { useVariantStore } from '@/stores/VariantStore'
const ProductStore = useProductStore()
const CategoryStore = useCategoryStore()
const VariantStore = useVariantStore()
const { productsForTable } = storeToRefs(ProductStore)
const { subCategoriesStore } = storeToRefs(CategoryStore)
const userStore = useUserStore()
const { lang } = storeToRefs(userStore)

//NOTE -  Table filter propertise Object
const filters = ref({
  name: { value: null, matchMode: FilterMatchMode.CONTAINS },
  id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  categoryId: { value: null, matchMode: FilterMatchMode.EQUALS }
})

//NOTE - Refs
const isCatModal = ref(false)
const isVarModal = ref(false)

//NOTE - Lifecycles
onMounted(() => {
  if (!VariantStore.isFetched) {
    console.log(VariantStore.isFetched)
    getVariants()
    VariantStore.turnToFetched()
    console.log(VariantStore.isFetched)
  }
  getProducts()
})

watch(lang, () => {
  VariantStore.changeLangVariants()
  CategoryStore.changeLangCategories()
  console.log('change to ' + lang.value)
})

//NOTE - Functions
const turnToStringCategory = (id) => {
  return subCategoriesStore.value.find((cat) => cat.id === id).name
}
</script>

<style scoped>
.centertt {
  display: flex;
  justify-content: center;
  text-align: center !important;
}
</style>
