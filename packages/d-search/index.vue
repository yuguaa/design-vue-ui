<script>

import { deepMerge } from '../_utils/index'
import dConfig from '../_utils/dConfig'

export default {
  name: 'DSearch',
  props: {
    showBtn: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    const searchConfig = deepMerge(dConfig.searchConfig, this.$xmConfig.$dConfig.searchConfig)
    return {
      form: {},
      searchConfig,
      col: searchConfig.searchCol,
      btnObj: searchConfig.btn,
      compObj: searchConfig.comps
    }
  },
  mounted () {
    console.log(this.$slots.default)
  },
  methods: {
    searchBind (customBind) {
      return { ...(this.searchConfig.searchBind || {}), ...(customBind || {}) }
    },
    handleSubmit () { }
  },
  render (h) {
    return (
      <div class="xm_search">
        <a-form-model class="xm_search_form" ref="ruleForm" model={this.form} layout="inline">
          <a-row gutter={36} type="flex">
            {this.$slots.default &&
              this.$slots.default.map((node, index) => (
                <a-col {...(node.col || this.col)} key={index}>
                  <a-form-model-item labelCol={node.labelCol || {}} wrapperCol={{ flex: 1 }}>
                    {node}
                  </a-form-model-item>
                </a-col>
              ))}
            {this.showBtn && (
              <a-col>
                <a-form-model-item>
                  {this.btnObj.search.show && (
                    <a-button
                      type={this.btnObj.search.type}
                      onClick={() => this.handleSubmit()}
                      loading={this.loading}
                    >
                      {this.btnObj.search.icon && <a-icon type={this.btnObj.search.icon} />}
                      {this.btnObj.search.text}
                    </a-button>
                  )}
                  {this.btnObj.reset.show && (
                    <a-button
                      type={this.btnObj.reset.type}
                      style="margin-left: 10px"
                      onClick={() => this.handleSubmit(true)}
                    >
                      {this.btnObj.reset.icon && <a-icon type={this.btnObj.reset.icon} />}
                      {this.btnObj.reset.text}
                    </a-button>
                  )}
                  {this.$slots.search_btn && <slot name="search_btn" form={this.form}></slot>}
                </a-form-model-item>
              </a-col>
            )}
          </a-row>
        </a-form-model>
      </div>
    )
  }
}
</script>
