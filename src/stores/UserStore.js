import { defineStore } from 'pinia'
import { jwtDecode } from 'jwt-decode'
import { VueCookieNext } from 'vue-cookie-next'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    name: '',
    email: '',
    token: '',
    account_type: '',
    profileImage: '',
    lang: 'tr',
    cartItems: []
  }),
  getters: {
    getUserID() {
      if (this.token.length) {
        const cookieData = jwtDecode(this.token)

        return cookieData.sub
      }
      return null
    },
    getUserName() {
      if (this.token.length) {
        const cookieData = jwtDecode(this.token)
        return cookieData.username
      }
    }
  },
  actions: {
    getCartItemsFromCookie(cookieData) {
      if (cookieData) {
        this.cartItems = JSON.parse(cookieData)
      }
    },
    addCartItem(data) {
      this.cartItems.push(data)
    },
    removeCartItem(ind) {
      if (VueCookieNext.isCookieAvailable('cart')) {
        let cartCookie = JSON.parse(VueCookieNext.getCookie('cart'))
        cartCookie.splice(ind, 1)
        VueCookieNext.setCookie('cart', JSON.stringify(cartCookie))
        this.cartItems.splice(ind, 1)
      }
    },
    updateCartItem(ind, newQuantity) {
      this.cartItems[ind].quantity = newQuantity
    },

    getUserDetailFromCookie(token) {
      const cookieData = jwtDecode(token)
      this.userID = cookieData.sub
      this.name = cookieData.username
      this.account_type = cookieData.account_type
      this.token = token
      // console.log(this.name, this.account_type, )
    },
    setUserDetailFromFetch(token) {
      const cookieData = jwtDecode(token)
      this.name = cookieData.username
      this.account_type = cookieData.account_type
      this.token = token

      // console.log(this.name, this.account_type, )
    },
    changeLang(newLang) {
      this.lang = newLang

      // console.log(this.name, this.account_type, )
    }
  }
})
