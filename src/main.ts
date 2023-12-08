import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createClient } from '@supabase/supabase-js';

const app = createApp(App)
app.use(router)
app.config.globalProperties.$supabase
app.mount('#app')
