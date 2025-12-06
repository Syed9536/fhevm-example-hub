import DefaultTheme from 'vitepress/theme'
import './style.css' // <--- Ye line sabse important hai CSS load karne ke liye

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // register your custom global components
  }
}