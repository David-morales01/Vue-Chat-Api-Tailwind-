import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { plugin, defaultConfig } from '@formkit/vue'
import './index.css'

import App from './App.vue'
import router from './router' 

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp(App)

app.use(VueSweetalert2);
app.use(createPinia())
app.use(router)
app.use(plugin, defaultConfig)
app.mount('#app')
