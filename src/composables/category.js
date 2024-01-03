import { ref } from 'vue'
import Axios from 'axios'
// import { useUserStore } from '@/stores/UserStore'
import { useCategoryStore } from '@/stores/CategoryStore'

// ** Swal
import { Toast } from '@/layouts/sweetAlert'
const { SuccessToast, ErrorToast } = Toast()

const categories = () => {
  const categoryData = ref()
  const categoryFetchErrors = ref([])

  const getCats = async () => {
    categoryFetchErrors.value = []
    // const { token } = useUserStore()
    const { splitCategories } = useCategoryStore()

    Axios.post('http://127.0.0.1:8000/api/category/all')
      .then((response) => {
        categoryData.value = response.data

        splitCategories(response.data.categories)
      })
      .catch((error) => {
        categoryFetchErrors.value.push(error.message)
      })
  }

  const createCats = async (body) => {
    categoryFetchErrors.value = []
    // const { token } = useUserStore()

    Axios.post('http://127.0.0.1:8000/api/category/create', {
      name: body.name,
      parent_id: body.parent_id
    })
      .then((response) => {
        console.log(response.data)
        SuccessToast('Success', 'The Category succesfully created.')
        getCats() // 2 farkli yol var ben bunu sectim. diger yol datayi state e ekleme
        categoryData.value = response.data
      })
      .catch((error) => {
        ErrorToast('Error', 'The Category could not be created.')
        categoryFetchErrors.value.push(error.message)
      })
  }
  const updateCat = async (body) => {
    categoryFetchErrors.value = []
    // const { token } = useUserStore()

    Axios.post('http://127.0.0.1:8000/api/category/update', body)
      .then((response) => {
        console.log(response.data)
        SuccessToast('Success', 'The Category succesfully updated.')
        getCats() // 2 farkli yol var ben bunu sectim. diger yol datayi state e ekleme
        categoryData.value = response.data
      })
      .catch((error) => {
        ErrorToast('Error', 'The Category could not be updated.')
        categoryFetchErrors.value.push(error.message)
      })
  }
  const deleteCat = async (id) => {
    categoryFetchErrors.value = []
    // const { token } = useUserStore()

    Axios.post('http://127.0.0.1:8000/api/category/delete', { id })
      .then((response) => {
        console.log(response.data)
        SuccessToast('Success', 'The Category succesfully deleted.')
        getCats() // 2 farkli yol var ben bunu sectim. diger yol datayi state e ekleme
        categoryData.value = response.data
      })
      .catch((error) => {
        ErrorToast('Error', 'The Category could not be deleted.')
        categoryFetchErrors.value.push(error.message)
      })
  }

  return { categoryData, categoryFetchErrors, getCats, createCats, updateCat, deleteCat }
}

export default categories
