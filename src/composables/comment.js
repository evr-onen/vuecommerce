import { ref } from 'vue'
import Axios from 'axios'
// import { useUserStore } from '@/stores/UserStore'
import { useCategoryStore } from '@/stores/CategoryStore'

// ** Swal
import { Toast } from '@/layouts/sweetAlert'
const { SuccessToast, ErrorToast } = Toast()

const comments = () => {
  const commentData = ref()
  const commentFetchErrors = ref([])

  const createComment = async (body) => {
    commentFetchErrors.value = []
    // const { token } = useUserStore()

    Axios.post('http://127.0.0.1:8000/api/comment/create', body)
      .then((response) => {
        console.log(response.data)
        SuccessToast('Success', 'Your Comment succesfully created.')

        commentData.value = response.data
      })
      .catch((error) => {
        ErrorToast('Error', 'Your Comment could not be created.')
        commentFetchErrors.value.push(error.message)
      })
  }
  //   const updateCat = async (body) => {
  //     categoryFetchErrors.value = []
  //     // const { token } = useUserStore()

  //     Axios.post('http://127.0.0.1:8000/api/category/update', body)
  //       .then((response) => {
  //         console.log(response.data)
  //         SuccessToast('Success', 'The Category succesfully updated.')
  //         getCats() // 2 farkli yol var ben bunu sectim. diger yol datayi state e ekleme
  //         categoryData.value = response.data
  //       })
  //       .catch((error) => {
  //         ErrorToast('Error', 'The Category could not be updated.')
  //         categoryFetchErrors.value.push(error.message)
  //       })
  //   }
  //   const deleteCat = async (id) => {
  //     categoryFetchErrors.value = []
  //     // const { token } = useUserStore()

  //     Axios.post('http://127.0.0.1:8000/api/category/delete', { id })
  //       .then((response) => {
  //         console.log(response.data)
  //         SuccessToast('Success', 'The Category succesfully deleted.')
  //         getCats() // 2 farkli yol var ben bunu sectim. diger yol datayi state e ekleme
  //         categoryData.value = response.data
  //       })
  //       .catch((error) => {
  //         ErrorToast('Error', 'The Category could not be deleted.')
  //         categoryFetchErrors.value.push(error.message)
  //       })
  //   }

  return { commentData, commentFetchErrors, createComment }
}

export default comments
