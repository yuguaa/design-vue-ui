/**
 * api 调取相关的放在这
 * 后续处理相关方便
 */
import { exsitVal } from '../_utils/index'
export default {
  props: {},
  data () {
    return {
      apiArr: []
    }
  },
  mounted () {
    this.initApiOpts()
    this.startGetData()
  },
  methods: {
    initApiOpts () {
      const _arr = []
      this.opts.forEach((element) => {
        if (element.api) {
          _arr.push({
            ...element.api,
            param: element.param
          })
        }
      })
      this.apiArr = _arr
    },
    startGetData () {
      const formKeys = Object.keys(this.form)
      const _form = this.form
      // 过滤需要马上执行的数组
      const _startArr = this.apiArr.filter((v) => v.trigger === 'start')
      _startArr.forEach((v) => {
        // 是否需要某个form参数存在值才能过滤
        const exists = formKeys.some(item => !v.triggerValid || (v.triggerValid.includes(item) && exsitVal(_form[item])))
        exists && this.searchData(v)
      })
    },
    async searchData (apiData) {
      const _data = {
        url: apiData.url,
        method: apiData.method || 'get',
        header: apiData.header || {}
      }
      const res = await this.$xmConfig.$apiFc(_data)
      const result = apiData.resultParams.reduce((acc, key) => acc && acc[key], res || {})
      console.log(result)
      this.handleGetData(result)
    },
    handleGetData (data) {
      console.log(data)
    }
  }
}
