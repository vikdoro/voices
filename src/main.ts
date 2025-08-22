import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Import global styles (optional, e.g. Sass entry file)
import './styles/main.scss'

const app = createApp(App)

app.use(router)

app.mount('#app')
