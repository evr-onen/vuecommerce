import { ref } from 'vue'
import Axios from 'axios'
import Cookies from 'js-cookie'
import { useUserStore } from '@/stores/UserStore'

const auth = () => {
  const authData = ref()
  const fetchErrors = ref([])

  const loginAuth = async (body) => {
    fetchErrors.value = []
    const { setUserDetailFromFetch } = useUserStore()

    Axios.post('http://127.0.0.1:8000/api/auth/login', body)
      .then((response) => {
        console.log(response.data.token)
        authData.value = response.data
        Cookies.set('token', response.data.token)
        setUserDetailFromFetch(response.data.token)
      })
      .catch((err) => {
        console.log(err)
        fetchErrors.value.push(err.response.data.error)
      })
  }

  const registerAuth = async (body) => {
    fetchErrors.value = []
    const { setUserDetailFromFetch } = useUserStore()

    Axios.post('http://127.0.0.1:8000/api/auth/register', body)
      .then((response) => {
        console.log(response)
        authData.value = response.data

        Cookies.set('token', response.data.token)
        setUserDetailFromFetch(response.data.token)
      })
      .catch((error) => {
        fetchErrors.value.push(error.message)
        console.log(error)
      })
  }
  const logoutAuth = async (token) => {
    fetchErrors.value = []

    Axios.post('http://127.0.0.1:8000/api/auth/register', token)
      .then((response) => {
        authData.value = response.data
      })
      .catch((error) => {
        console.log(error)
        fetchErrors.value.push(error.message)
      })
  }
  return { authData, fetchErrors, loginAuth, registerAuth, logoutAuth }
}

export default auth
