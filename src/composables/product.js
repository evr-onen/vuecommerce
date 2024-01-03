import { ref } from 'vue'
import Axios from 'axios'
// import { useUserStore } from '@/stores/UserStore'
import { useProductStore } from '@/stores/ProductStore'

// ** Swal
import { Toast } from '@/layouts/sweetAlert'
const { SuccessToast, ErrorToast } = Toast()

const products = () => {
  const productFetchData = ref()
  const productFetchErrors = ref([])
  const ProductStore = useProductStore()
  const { prepareProducts, getEditProductData } = ProductStore

  const getProducts = async () => {
    productFetchErrors.value = []
    // const { token } = useUserStore()

    Axios.get('http://127.0.0.1:8000/api/product/getall')
      .then((response) => {
        productFetchData.value = response.data
        prepareProducts(response.data)
      })
      .catch((error) => {
        productFetchErrors.value.push(error.message)
      })
  }

  const createProduct = async (body) => {
    productFetchErrors.value = []
    console.log(body)
    const formData = new FormData()
    formData.append('thumbnail', body.mainImage)

    formData.append('name', body.productName)
    formData.append('price', body.productPrice || 0)
    formData.append('discount_flat', body.productDiscountFlat || 0)
    formData.append('discount_percent', body.productDiscountPercent || 0)
    formData.append('category_id', body.productCategory.id)
    formData.append('stock', body.productStock || 0)
    formData.append(
      'description',
      JSON.stringify({ en: body.descriptionEN, tr: body.descriptionTR })
    )
    formData.append(
      'short_description',
      JSON.stringify({ en: body.shortDescriptionEN, tr: body.shortDescriptionTR })
    )
    formData.append('isVariant', body.isVariant)
    formData.append('variants', JSON.stringify(body.variants))

    body.gallery.map((imageItem, index) => {
      formData.append(`slider_${index}`, imageItem.file)
    })

    Axios.post('http://127.0.0.1:8000/api/product/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((response) => {
        console.log(response.data)
        SuccessToast('Success', 'The Product succesfully created.')
      })
      .catch((error) => {
        console.log(error)
        ErrorToast('Error', 'The Product could not be created.')
      })
  }

  const getSingleProduct = async (id) => {
    productFetchErrors.value = []
    // const { token } = useUserStore()

    Axios.post('http://127.0.0.1:8000/api/product/getproduct', { id })
      .then((response) => {
        productFetchData.value = response.data
        getEditProductData(response.data)
      })
      .catch((error) => {
        productFetchErrors.value.push(error.message)
      })
  }
  const deleteProduct = async (id) => {
    productFetchErrors.value = []
    // const { token } = useUserStore()

    Axios.post('http://127.0.0.1:8000/api/product/delete', { id })
      .then((response) => {
        console.log(response.data)
        SuccessToast('Success', 'The Product succesfully Deleted.')
        productFetchData.value = response.data
        getProducts()
      })
      .catch((error) => {
        productFetchErrors.value.push(error.message)
        ErrorToast('Error', 'The Product could not be deleted.')
      })
  }
  const updateProduct = async (body) => {
    productFetchErrors.value = []
    console.log(body)
    const formData = new FormData()
    formData.append('id', body.id)
    formData.append('var_ids', JSON.stringify(body.varIDs))
    formData.append('imageOrders', JSON.stringify(body.imageOrders))
    formData.append('thumbnail', body.mainImage)
    formData.append('name', body.productName)
    formData.append('price', body.productPrice || 0)
    formData.append('discount_flat', body.productDiscountFlat || 0)
    formData.append('discount_percent', body.productDiscountPercent || 0)
    formData.append('category_id', body.productCategory.id)
    formData.append('stock', body.productStock || 0)
    formData.append(
      'description',
      JSON.stringify({ en: body.descriptionEN, tr: body.descriptionTR })
    )
    formData.append(
      'short_description',
      JSON.stringify({ en: body.shortDescriptionEN, tr: body.shortDescriptionTR })
    )

    formData.append('isVariant', body.isVariant)
    body.isVariant && formData.append('variants', JSON.stringify(body.variants))

    body.gallery.map((imageItem, index) => {
      if (imageItem) formData.append(`slider_${index}`, imageItem.file)
    })

    Axios.post('http://127.0.0.1:8000/api/product/update', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((response) => {
        SuccessToast('Success', 'The Product succesfully edited.')
        getProducts()
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
        ErrorToast('Error', 'The Product could not be edited.')
      })
  }

  return {
    getProducts,
    productFetchErrors,
    productFetchData,
    createProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct
  }
}

export default products
