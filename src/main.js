import App from '@/App.vue'
import { createPinia } from 'pinia'
import { registerPlugins } from '@core/utils/plugins'
import { createApp } from 'vue'

// Styles
import '@core/scss/template/index.scss'
import '@styles/styles.scss'

// Create vue app
const app = createApp(App)
const pinia = createPinia()

// Register plugins
registerPlugins(app)

app.use(pinia)

// Mount vue app
app.mount('#app')
