import * as ElIconsVue from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'virtual:svg-icons-register'
import './styles'
import 'uno.css'

const app = createApp(App)

app
  .use(router)
  .use(ElementPlus)
  .mount('#app')

for (const [key, component] of Object.entries(ElIconsVue)) {
  app.component(key, component)
}
