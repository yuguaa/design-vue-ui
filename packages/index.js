import dConfig from './_utils/dConfig.js'
// 暴露组件
import DTooltip from './d-tooltip'
import DTable from './d-table'
import DScrollBar from './d-table/scroll-bar.vue'
import DCascader from './d-cascader'
import DTextarea from './d-textarea'
import DInput from './d-input'
import DInputNumber from './d-input-number'
import DSelect from './d-select'
import DTitle from './d-title'
import DSearch from './d-search'
import DTour from './d-tour'
import DMultipleSelect from './d-multiple-select'
import DWatermark from './d-watermark'
import PageLoading from './page-loading'
import Loading from './page-loading/loading.js'

DWatermark.install = (vue) => {
  vue.component(DWatermark.name, DWatermark)
}
DTitle.install = (vue) => {
  vue.component(DTitle.name, DTitle)
}
DTour.install = (vue) => {
  vue.component(DTour.name, DTour)
}
DTooltip.install = (vue) => {
  vue.component(DTooltip.name, DTooltip)
}
DSearch.install = (vue) => {
  vue.component(DSearch.name, DSearch)
}

PageLoading.install = (vue) => {
  vue.component(PageLoading.name, PageLoading)
}

DTable.install = (vue) => {
  vue.component(DTable.name, DTable)
}

DScrollBar.install = (vue) => {
  vue.component(DScrollBar.name, DScrollBar)
}

DCascader.install = (vue) => {
  vue.component(DCascader.name, DCascader)
}

DTextarea.install = (vue) => {
  vue.component(DTextarea.name, DTextarea)
}

DInput.install = (vue) => {
  vue.component(DInput.name, DInput)
}

DInputNumber.install = (vue) => {
  vue.component(DInputNumber.name, DInputNumber)
}

DSelect.install = (vue) => {
  vue.component(DSelect.name, DSelect)
}

DMultipleSelect.install = (vue) => {
  vue.component(DMultipleSelect.name, DMultipleSelect)
}

const components = [
  PageLoading,
  DTooltip,
  DTour,
  DTable,
  DCascader,
  DTextarea,
  DScrollBar,
  DWatermark,
  DInput,
  DTitle,
  DInputNumber,
  DSearch,
  DSelect,
  DMultipleSelect
]

const install = function (Vue) {
  components.forEach((component) => {
    Vue.component(component.name, component)
  })

  //  里面会用到，顺带一起了
  Vue.prototype.$xmLoading = Loading
  Vue.prototype.$xmConfig = config
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

const config = {
  $apiFc: function () {},
  $dConfig: dConfig
}

export {
  DTooltip,
  PageLoading,
  DTable,
  DCascader,
  DTextarea,
  DScrollBar,
  DWatermark,
  DInput,
  DSearch,
  DTitle,
  DTour,
  DInputNumber,
  DSelect,
  DMultipleSelect
}

export default {
  install,
  config
}
