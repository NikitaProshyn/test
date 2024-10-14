import { createApp } from 'vue'
import { createPinia } from 'pinia'

import router from '@/router'
import App from '@/App.vue'

import Delivery from '@/delivery'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.provide('delivery', new Delivery())

app.mount('#app')
