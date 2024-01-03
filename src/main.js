import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import App from './App.vue'
import router from './router'
// import VueCookies from 'vue-cookies'
import { VueCookieNext } from 'vue-cookie-next'

// ** Prime UI Components
import AutoComplete from 'primevue/Autocomplete'
import MultiSelect from 'primevue/multiselect'
import InputSwitch from 'primevue/InputSwitch'
import InputText from 'primevue/InputText'
import TextArea from 'primevue/TextArea'
import Dropdown from 'primevue/Dropdown'
import Panel from 'primevue/Panel'
import Slider from 'primevue/Slider'
import Rating from 'primevue/Rating'
import ProgressSpinner from 'primevue/progressspinner'
import InputNumber from 'primevue/InputNumber'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Tag from 'primevue/Tag'
import ColumnGroup from 'primevue/columngroup'
import Row from 'primevue/row'

import 'primevue/resources/themes/md-light-indigo/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

// ** Sweetalert option
const options = {
  confirmButtonColor: '#41b882',
  cancelButtonColor: '#ff7674'
}
const app = createApp(App)
app.use(VueSweetalert2, options)
// app.use(VueCookies, { expires: '7d', httpOnly: false, sameSite: 'Lax' })

app.use(router)
app.use(VueCookieNext)
app.use(createPinia())
app.use(PrimeVue, {
  primevue: {
    cssLayerOrder: 'tailwind-base, primevue, tailwind-utilities'
  }
})
// app.use(vuetify)
app.component('AutoComplete', AutoComplete)
app.component('MultiSelect', MultiSelect)
app.component('InputSwitch', InputSwitch)
app.component('TextArea', TextArea)
app.component('InputText', InputText)
app.component('Dropdown', Dropdown)
app.component('ProgressSpinner', ProgressSpinner)
app.component('Slider', Slider)
app.component('Rating', Rating)
app.component('InputNumber', InputNumber)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('Panel', Panel)
app.component('ColumnGroup', ColumnGroup)
app.component('Row', Row)
app.component('Tag', Tag)
app.mount('#app')
