import { createApp } from 'vue'
import App from './App.vue'

//import axios and your wrapper
import axios from 'axios'
import VueAxios from 'vue-axios'

//import router from router/index.js
import router from './router'

//import styles and tailwind css
import '@/assets/css/tailwind.css'
import '@/assets/css/app.css'


const app = createApp(App)
app.use(VueAxios, axios)
app.use(router)
app.mount('#app')
