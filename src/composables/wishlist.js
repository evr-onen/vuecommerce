import { ref } from 'vue'
import Axios from 'axios'
// import { useUserStore } from '@/stores/UserStore'
import { useProductStore } from '@/stores/ProductStore'

// ** Swal
import { Toast } from '@/layouts/sweetAlert'
const { SuccessToast, ErrorToast } = Toast()

const wishlists = () => {
  const productFetchData = ref()
  const productFetchErrors = ref([])
  const ProductStore = useProductStore()
  const { getWishlistFromFetch, deleteWislist, addWislist } = ProductStore

  const getWishlists = async (body) => {
    productFetchErrors.value = []
    // const { token } = useUserStore()

    Axios.post('http://127.0.0.1:8000/api/wishlist/getwishlists', body)
      .then((response) => {
        // console.log(response.data)
        productFetchData.value = response.data
        getWishlistFromFetch(response.data)
      })
      .catch((error) => {
        productFetchErrors.value.push(error.message)
      })
  }

  const createWishlist = async (body) => {
    productFetchErrors.value = []

    Axios.post('http://127.0.0.1:8000/api/wishlist/create', body)
      .then((response) => {
        console.log(body)
        addWislist(response.data)

        SuccessToast('Success', 'The Product succesfully added to Wishlist.')
      })
      .catch((error) => {
        console.log(error)
        ErrorToast('Error', 'The Product could not be created to Wishlist.')
      })
  }

  const deleteWishlist = async (body) => {
    productFetchErrors.value = []
    // const { token } = useUserStore()

    Axios.post('http://127.0.0.1:8000/api/wishlist/delete', {
      user_id: body.user_id,
      product_id: body.product_id
    })
      .then((response) => {
        // console.log(response.data)
        deleteWislist(body.product_id)
        SuccessToast('Success', 'The Product succesfully deleted from Wishlist.')
        productFetchData.value = response.data
      })
      .catch((error) => {
        productFetchErrors.value.push(error.message)
        ErrorToast('Error', 'The Product could not be deleted from Wishlist.')
      })
  }

  return {
    getWishlists,
    productFetchErrors,
    productFetchData,
    createWishlist,
    deleteWishlist
  }
}

export default wishlists
