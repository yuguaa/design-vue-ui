import Vue from 'vue'
import App from './App.vue'
import router from './router'
import dConfig from './utils/dConfig'
import DesignUI from '../../lib/design-vue-ui.umd'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
import '../../lib/design-vue-ui.less'
Vue.use(Antd)
Vue.use(DesignUI)
Vue.config.productionTip = false
DesignUI.config.$dConfig = dConfig
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
