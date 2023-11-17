import App from '@/App.vue'
import { registerPlugins } from '@core/utils/plugins'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import i18n from './i18n'

// Styles
import '@core/scss/template/index.scss'
import '@styles/styles.scss'

// Create vue app
const app = createApp(App)
const pinia = createPinia()

// Register plugins
registerPlugins(app)
app.use(i18n())
app.use(pinia)

// Mount vue app
app.mount('#app')
