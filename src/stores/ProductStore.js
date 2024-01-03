import { defineStore } from 'pinia'
import { useUserStore } from '@/stores/UserStore'
import { storeToRefs } from 'pinia'

export const useProductStore = defineStore('productStore', {
  state: () => ({
    rawData: [],
    productsStore: [],
    scaffold: {},
    productsForTable: [],
    editProductData: {},
    shopFilterProducts: [],
    wishlistProducts: [],
    isLoading: true
  }),

  getters: {},
  actions: {
    prepareProducts(fetchData) {
      this.productsStore = fetchData
      this.prepareForTable(fetchData)
      this.productFilter({ category: [], variants: [] })
    },
    getWishlistFromFetch(data) {
      const tmpArr = []
      data.map((item) => tmpArr.push(item.products))
      this.wishlistProducts = tmpArr
    },
    deleteWislist(id) {
      this.wishlistProducts = this.wishlistProducts.filter((item) => item.id !== id)
    },
    addWislist(item) {
      this.wishlistProducts.push(item.products)
    },

    productFilter(data) {
      let tmpArr = []

      this.productsStore.map((product) => {
        let isOK = true
        if (data.category.length !== 0) {
          isOK = data.category.indexOf(product.category_id.toString()) !== -1
        }
        if (data.variants.length !== 0 && isOK) {
          console.log(data)
          isOK = product.to_variant_products.some((varProduct) => {
            return varProduct.to_pivot_props.some((prop) => {
              return data.variants.indexOf(prop.variant_prop_id.toString()) !== -1
            })
          })
        }
        if (Object.keys(data).indexOf('price') !== -1 && isOK) {
          if (product.to_variant_products.length === 0) {
            const tmpPrice =
              product.price * (1 - product.discount_percent / 100) - product.discount_flat

            isOK = data.price[0] < tmpPrice && data.price[1] >= tmpPrice
          } else {
            isOK = product.to_variant_products.some((varProduct) => {
              const tmpPrice =
                varProduct.price * (1 - varProduct.discount_percent / 100) -
                varProduct.discount_flat
              return data.price[0] < tmpPrice && data.price[1] >= tmpPrice
            })
          }
        }
        if (isOK) tmpArr.push(product)
      })

      this.shopFilterProducts = tmpArr
    },
    getEditProductData(data) {
      this.isLoading = true
      this.editProductData = data
      this.isLoading = false
    },

    prepareForTable(data) {
      const UserStore = useUserStore()
      const { lang } = storeToRefs(UserStore)
      const tmpTable = []

      data.map((item) => {
        const tmpItem = {}
        const isVariant = item.to_variant_products.length !== 0

        tmpItem.isVariant = isVariant
        tmpItem.name = item.name
        tmpItem.categoryId = item.category_id
        tmpItem.productImages = item.product_images
        if (!isVariant) {
          tmpItem.price = item.price
          tmpItem.id = item.id
          tmpItem.stock = item.stock
          tmpItem.discountFlat = item.discount_flat
          tmpItem.discountPercent = item.discount_percent

          tmpTable.push(tmpItem)
        } else {
          item.to_variant_products.map((variantProduct) => {
            const tmpVariantProduct = { ...tmpItem }
            tmpVariantProduct.id = item.id
            tmpVariantProduct.variantProductId = variantProduct.id
            tmpVariantProduct.price = variantProduct.price
            tmpVariantProduct.stock = variantProduct.stock
            tmpVariantProduct.discountFlat = variantProduct.discount_flat
            tmpVariantProduct.discountPercent = variantProduct.discount_percent
            const tmpVariants = []

            variantProduct.to_pivot_props.map((variant) => {
              const toPivotData = variant.to_variant_prop_from_pivot_product
              const propName = JSON.parse(toPivotData.name)[lang.value]

              tmpVariants.push({
                typeID: toPivotData.variant_type_id,
                propID: toPivotData.id,
                propName: propName
              })
            })
            tmpVariantProduct.vars = tmpVariants
            tmpTable.push(tmpVariantProduct)
          })
        }
      })
      this.productsForTable = tmpTable
    }
  }
})
