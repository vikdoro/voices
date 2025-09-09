import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Import global styles (optional, e.g. Sass entry file)
import './styles/main.scss'

const app = createApp(App)

app.use(router)

// Font loading detection
async function waitForFontLoad() {
  const showContent = () => {
    const appElement = document.getElementById('app')
    if (appElement) {
      appElement.classList.remove('font-loading')
      appElement.classList.add('font-loaded')
    }
  }

  // Show content immediately if font loading is not supported
  if (!('fonts' in document)) {
    showContent()
    return
  }

  try {
    // Wait for the custom font to load with a timeout
    const fontLoadPromise = Promise.all([
      document.fonts.load('400 16px ClashDisplay-Variable'),
      document.fonts.load('500 16px ClashDisplay-Variable'),
      document.fonts.load('700 16px ClashDisplay-Variable'),
      document.fonts.ready
    ])
    
    // Race between font loading and timeout (max 2 seconds for better UX)
    await Promise.race([
      fontLoadPromise,
      new Promise(resolve => setTimeout(resolve, 2000))
    ])
  } catch (error) {
    console.warn('Font loading failed, falling back to system fonts:', error)
  }
  
  // Show content regardless of font loading success
  showContent()
}

// Mount the app immediately but keep text hidden until font loads
app.mount('#app')

// Wait for font to load, then show text
waitForFontLoad()
