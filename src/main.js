import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { useUserDataStore } from './store/userData';

import config from './config';
import 'element-plus/dist/index.css'

const app = createApp(App)

/**
 * 按钮权限
 */
app.directive('has', {
  beforeMount(el, binding) {
    const btnListRole = useUserDataStore()
    if (!btnListRole.role.includes(binding.value)) {
      el.style.dispay = 'none',
        setTimeout(function () {
          el.parentNode.removeChild(el)
        }, 0)
    }
  }
})


/**
 * 使用 mock
 */
if (config.MOCK_CONFIG) {
  require('./mock/index')
}

/**
 * pinia 持久化
 */
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

/**
 * Element Plus Icons Vue
 */
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(pinia).use(ElementPlus).use(router).mount('#app')
