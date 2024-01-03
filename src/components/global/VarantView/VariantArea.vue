<template>
  <div class="">
    <div class="flex flex-col">
      <div class="" v-for="(varProps, varType) in variantScaffold" :key="varType">
        <div class="flex mt-4">
          <div class="w-16">
            <p class="capitalize font-semibold text-base">
              {{ rawVariantTypeState.find((item) => item.id == varType).name[lang] }}
            </p>
          </div>
          <div class="flex">
            <div
              class="ml-2"
              v-for="prop in varProps"
              :key="prop.id"
              @click="variantChangeHandler(varType, prop)"
            >
              <p
                class="bg-secondary/60 rounded-sm px-2 py-1 text-sm text-white cursor-pointer capitalize border border-white"
                :class="{
                  '!bg-secondary border-black': selectedVar[varType]?.id === prop.id
                }"
              >
                {{ prop.name }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
//NOTE - Cores
import { ref, toRefs, watch } from 'vue'
import { storeToRefs } from 'pinia'

//NOTE - Props
const props = defineProps(['product', 'lang'])
const emits = defineEmits(['variantID'])
const { product, lang } = toRefs(props)

//NOTE - Stores
import { useVariantStore } from '@/stores/VariantStore'
const VariantStore = useVariantStore()
const { rawVariantTypeState } = storeToRefs(VariantStore)

//NOTE - refs
const variantScaffold = ref({})
const selectedVar = ref({})
const selectedVarProduct = ref()

//NOTE - Handlers
const variantChangeHandler = (varType, prop) => {
  selectedVar.value[varType] = prop

  product.value.to_variant_products.map((varProduct) => {
    const props = varProduct.to_pivot_props
    const isSelectedProduct = props.every((prop) => {
      const varTypeID = prop.to_variant_prop_from_pivot_product.variant_type_id
      if (varTypeID in selectedVar.value) {
        return selectedVar.value[varTypeID].id === prop.variant_prop_id
      }
    })
    if (isSelectedProduct) {
      selectedVarProduct.value = varProduct.id
    }
  })
  emits('variantID', selectedVarProduct.value)
}

//NOTE - Lifecycles
watch(product, () => {
  const tmpObj = {}
  product.value.to_variant_products.map((varProduct, index) => {
    varProduct.to_pivot_props.map((prop) => {
      const varTypeId = prop.to_variant_prop_from_pivot_product.variant_type_id
      if (index === 0) {
        variantChangeHandler(varTypeId, {
          id: prop.to_variant_prop_from_pivot_product.id,
          name: JSON.parse(prop.to_variant_prop_from_pivot_product.name)[lang.value]
        })
      }

      if (varTypeId in tmpObj) {
        const propIndex = tmpObj[varTypeId].findIndex((item) => {
          return item.id === prop.to_variant_prop_from_pivot_product.id
        })

        if (propIndex === -1) {
          tmpObj[varTypeId].push({
            id: prop.to_variant_prop_from_pivot_product.id,
            name: JSON.parse(prop.to_variant_prop_from_pivot_product.name)[lang.value]
          })
        }
      } else {
        tmpObj[varTypeId] = [
          {
            id: prop.to_variant_prop_from_pivot_product.id,
            name: JSON.parse(prop.to_variant_prop_from_pivot_product.name)[lang.value]
          }
        ]
      }
    })
  })
  variantScaffold.value = tmpObj
})
</script>

<style scoped></style>
