import { defineStore } from 'pinia'
import { useUserStore } from '@/stores/UserStore'
import { storeToRefs } from 'pinia'

export const useCategoryStore = defineStore('categoryStore', {
  state: () => ({
    rawCategories: [],
    categoriesStore: [],
    mainCategoriesStore: [],
    subCategoriesStore: []
  }),
  getters: {
    catsTable() {
      const userStore = useUserStore()
      const { lang } = storeToRefs(userStore)
      const tmpArr = []
      this.rawCategories.map((cat) => {
        if (cat.parent_id) {
          const mCat = this.mainCategoriesStore.find((mainCat) => mainCat.id === cat.parent_id)

          tmpArr.push({
            main: mCat,
            sub: { id: cat.id, name: JSON.parse(cat.name)[lang.value] },
            count: cat.products.length
          })
        }
      })
      return tmpArr
    },
    scaffoldCats() {
      const userStore = useUserStore()
      const { lang } = storeToRefs(userStore)
      const tmpObj = {}
      this.rawCategories.map((cat) => {
        if (cat.parent_id) {
          const mCat = this.mainCategoriesStore.find((mainCat) => mainCat.id === cat.parent_id).name

          if (cat.products) {
            tmpObj[mCat]?.push({
              id: cat.id,
              name: JSON.parse(cat.name)[lang.value],
              quantity: cat.products.length
            })
          }
        } else {
          const catName = JSON.parse(cat.name)[lang.value]
          if (!(catName in tmpObj)) {
            tmpObj[catName] = []
          }
        }
      })
      return tmpObj
    }
  },

  actions: {
    toCatName(catID) {
      return this.subCategoriesStore.find((item) => item.id === catID)?.name
    },
    splitCategories(allCats) {
      const userStore = useUserStore()
      const { lang } = storeToRefs(userStore)
      this.rawCategories = allCats
      this.categoriesStore = allCats

      const tmpMain = []
      const tmpSub = []

      allCats.map((cat) => {
        if (cat.parent_id === null) {
          tmpMain.push({ id: cat.id, name: JSON.parse(cat.name)[lang.value] })
        } else {
          tmpSub.push({ id: cat.id, name: JSON.parse(cat.name)[lang.value] })
        }
      })
      this.subCategoriesStore = tmpSub
      this.mainCategoriesStore = tmpMain
    },

    changeLangCategories() {
      const userStore = useUserStore()
      const { lang } = storeToRefs(userStore)
      const tmpMain = []
      const tmpSub = []

      this.rawCategories.map((cat) => {
        if (cat.parent_id === null) {
          tmpMain.push({ id: cat.id, name: JSON.parse(cat.name)[lang.value] })
        } else {
          tmpSub.push({ id: cat.id, name: JSON.parse(cat.name)[lang.value] })
        }
      })
      this.subCategoriesStore = tmpSub
      this.mainCategoriesStore = tmpMain
    }
  }
})
