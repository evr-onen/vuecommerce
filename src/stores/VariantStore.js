import { defineStore } from 'pinia'
import { useUserStore } from '@/stores/UserStore'

import { storeToRefs } from 'pinia'
const userStore = useUserStore()
const { lang } = storeToRefs(userStore)

export const useVariantStore = defineStore('variantStore', {
  state: () => ({
    isFetched: false,
    rawVariants: [],
    variantTypeState: [],
    variantPropState: [],
    rawVariantPropState: [],
    rawVariantTypeState: [],
    variantScaffold: {}
  }),
  getters: {
    variantsTable() {
      const tmpArr = []
      this.rawVariants?.map((varType) => {
        varType.to_variant_prop.map((varProp) => {
          tmpArr.push({
            type: { id: varType.id, name: JSON.parse(varType.name)[lang.value] },
            prop: { id: varProp.id, name: JSON.parse(varProp.name)[lang.value] },
            count: varProp.to_pivot_variant_products.length
          })
        })
      })
      return tmpArr
    }
  },
  actions: {
    turnToFetched() {
      this.isFetched = true
    },
    deleteData(id) {
      this.rawVariants.map((varType) => {
        const index = varType.to_variant_prop.findIndex((item) => item.id === id)
        if (index !== -1) {
          varType.to_variant_prop.splice(index, 1)
        }
      })
    },
    updateData(fetchData) {
      this.rawVariants.some((varType) => {
        if (varType.id == fetchData.typeID) {
          varType.name = JSON.stringify({ en: fetchData.varTypeEn, tr: fetchData.varTypeTr })
          const index = varType.to_variant_prop.findIndex((item) => item.id === fetchData.propID)
          varType.to_variant_prop[index].name = JSON.stringify({
            en: fetchData.varPropEn,
            tr: fetchData.varPropTr
          })
          return true
        }
      })
    },
    // createPropData(fetchData, propId) {
    //   console.log(fetchData)
    //   console.log(this.rawVariants)
    //   const index = this.rawVariants.findIndex((typeItem) => typeItem.id === fetchData.typeID)

    //   const tmpObj = {
    //     id: 1,
    //     name: '{"en": "white", "tr": "beyaz"}',
    //     variant_type_id: 1,
    //     to_pivot_variant_products: []
    //   }
    //   const tmpTo_pivot_variant_products=
    //   if (index !== -1) {
    //     this.rawVariants[index].to_variant_prop.push()
    //   }

    //   this.rawVariants.some((varType) => {
    //     if (varType.id == fetchData.typeID) {
    //       const index = varType.to_variant_prop.findIndex((item) => item.id === fetchData.propID)
    //       varType.to_variant_prop[index].name = JSON.stringify({
    //         en: fetchData.varPropEn,
    //         tr: fetchData.varPropTr
    //       })
    //       return true
    //     }
    //   })
    // },
    prepareState() {
      let tmpScaffold = {}
      const tmpType = []
      const tmpProp = []
      this.rawVariants.map((typeItem) => {
        let name = JSON.parse(typeItem.name)[lang.value]

        tmpType.push({ id: typeItem.id, name })

        tmpScaffold[name] = []

        typeItem.to_variant_prop.map((propItem) => {
          tmpScaffold[name].push({ id: propItem.id, name: JSON.parse(propItem.name)[lang.value] })
          this.rawVariantPropState.push({ id: propItem.id, name: JSON.parse(propItem.name) })
          this.rawVariantTypeState.push({ id: typeItem.id, name: JSON.parse(typeItem.name) })
          tmpProp.push({ id: propItem.id, name: JSON.parse(propItem.name)[lang.value] })
        })
      })

      this.variantPropState = tmpProp
      this.variantTypeState = tmpType
      this.variantScaffold = tmpScaffold
    },
    splitVariants(allVars) {
      this.rawVariants = allVars

      let tmpScaffold = {}
      const tmpType = []
      const tmpProp = []
      allVars.map((typeItem) => {
        let name = JSON.parse(typeItem.name)[lang.value]

        tmpType.push({ id: typeItem.id, name })

        tmpScaffold[name] = []

        typeItem.to_variant_prop.map((propItem) => {
          tmpScaffold[name].push({ id: propItem.id, name: JSON.parse(propItem.name)[lang.value] })
          this.rawVariantPropState.push({ id: propItem.id, name: JSON.parse(propItem.name) })
          this.rawVariantTypeState.push({ id: typeItem.id, name: JSON.parse(typeItem.name) })
          tmpProp.push({ id: propItem.id, name: JSON.parse(propItem.name)[lang.value] })
        })
      })

      this.variantPropState = tmpProp
      this.variantTypeState = tmpType
      this.variantScaffold = tmpScaffold
    },
    changeLangVariants() {
      let tmpScaffold = {}
      const tmpType = []
      const tmpProp = []
      this.rawVariants.map((typeItem) => {
        let name = JSON.parse(typeItem.name)[lang.value]

        tmpType.push({ id: typeItem.id, name })

        tmpScaffold[name] = []

        typeItem.to_variant_prop.map((propItem) => {
          tmpScaffold[name].push({ id: propItem.id, name: JSON.parse(propItem.name)[lang.value] })
          tmpProp.push({ id: propItem.id, name: JSON.parse(propItem.name)[lang.value] })
        })
      })

      this.variantPropState = tmpProp
      this.variantTypeState = tmpType
      this.variantScaffold = tmpScaffold
    }
  }
})
