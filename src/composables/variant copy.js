import { ref } from 'vue'
import Axios from 'axios'
import { useVariantStore } from '@/stores/VariantStore'

// ** Swal
import { Toast } from '@/layouts/sweetAlert'
const { SuccessToast, ErrorToast } = Toast()

const variants = () => {
  const variantData = ref()
  const variantFetchErrors = ref([])

  const getVariants = async () => {
    variantFetchErrors.value = []

    // const { token } = useUserStore()
    const { splitVariants } = useVariantStore()
    Axios.get('http://127.0.0.1:8000/api/variant/all')
      .then((response) => {
        variantData.value = response.data

        splitVariants(response.data)
      })
      .catch((error) => {
        variantFetchErrors.value.push(error.message)
      })
  }

  const createVariant = async (body) => {
    variantFetchErrors.value = []
    // const { token } = useUserStore()

    Axios.post('http://127.0.0.1:8000/api/variant/create', {
      name: body.name,
      variant_type_id: body.variant_type_id
    })
      .then((response) => {
        console.log(response.data)
        SuccessToast('Success', 'The Variant Propertise succesfully created.')
        getVariants()
        variantData.value = response.data
      })
      .catch((error) => {
        ErrorToast('Error', 'The Variant Propertise could not be created.')
        variantFetchErrors.value.push(error.message)
      })
  }
  const updateVariant = async (body) => {
    variantFetchErrors.value = []
    // const { token } = useUserStore()

    Axios.post('http://127.0.0.1:8000/api/variant/update', body)
      .then((response) => {
        console.log(response.data)
        SuccessToast('Success', 'The Variant Propertise succesfully updated.')
        getVariants()
        variantData.value = response.data
      })
      .catch((error) => {
        ErrorToast('Error', 'The Variant Propertise could not be updated.')
        variantFetchErrors.value.push(error.message)
      })
  }
  const deleteVariant = async (id) => {
    variantFetchErrors.value = []
    // const { token } = useUserStore()

    Axios.post('http://127.0.0.1:8000/api/variant/delete', { id })
      .then((response) => {
        console.log(response.data)
        SuccessToast('Success', 'The Variant Propertise succesfully delete.')
        
        getVariants()
        variantData.value = response.data
      })
      .catch((error) => {
        ErrorToast('Error', 'The Variant Propertise could not be delete.')
        variantFetchErrors.value.push(error.message)
      })
  }
  const createVariantType = async (body) => {
    variantFetchErrors.value = []
    // const { token } = useUserStore()
    console.log(body)
    Axios.post('http://127.0.0.1:8000/api/variant/createtype', {
      name: body.name
    })
      .then((response) => {
        console.log(response.data)
        SuccessToast('Success', 'The Variant Type succesfully created.')
        getVariants()
        variantData.value = response.data
      })
      .catch((error) => {
        ErrorToast('Error', 'The Variant Type could not be created.')
        variantFetchErrors.value.push(error.message)
      })
  }
  return {
    variantData,
    variantFetchErrors,
    getVariants,
    createVariant,
    createVariantType,
    updateVariant,
    deleteVariant
  }
}

export default variants
