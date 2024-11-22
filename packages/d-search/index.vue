<template>
  <!-- 查询功能 -->
  <div class="xm_search">
    <a-form-model
      class="xm_search_form"
      ref="ruleForm"
      :model="form"
      layout="inline"
    >
      <a-row :gutter="36" type="flex">
        <a-col
          v-for="(item, index) in opts"
          v-bind="item.col || col"
          :key="index"
        >
          <a-form-model-item
            :labelCol="item.labelCol || {}"
            :wrapperCol="{ flex: 1 }"
            :label="item.label"
            :prop="item.param"
            :class="item.class"
            :rules="item.rules"
          >
            <slot
              name="search_item"
              v-if="item.type === 'custom'"
              :item="item"
              :form="form"
            ></slot>
            <component
              v-else
              :is="compObj[item.type]"
              v-model.trim="form[item.param]"
              v-bind="searchBind(item.bind)"
              v-on="item.on"
            >
            <template v-if="item.customRender">
              {{ item.customRender(item.options) }}
            </template>
            </component>
          </a-form-model-item>
        </a-col>
        <a-col>
          <a-form-model-item>
            <a-button
              :type="btnObj.search.type"
              @click="handleSubmit()"
              :loading="loading"
              v-if="btnObj.search.show"
            >
              <a-icon
                :type="btnObj.search.icon"
                v-if="btnObj.search.icon"
              ></a-icon>
              {{ btnObj.search.text }}
            </a-button>
            <a-button
              v-if="btnObj.reset.show"
              :type="btnObj.reset.type"
              style="margin-left: 10px"
              @click="handleSubmit(true)"
            >
              <a-icon
                :type="btnObj.reset.icon"
                v-if="btnObj.reset.icon"
              ></a-icon>
              {{ btnObj.reset.text }}
            </a-button>
            <slot name="search_btn" :form="form"></slot>
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>
  </div>
</template>
<script>
import dConfig from '../_utils/dConfig'
import { deepMerge } from '../_utils/index'
import apiMixin from './apiMixin'
export default {
  name: 'DSearch',
  mixin: [apiMixin],
  props: {
    opts: {
      type: Array,
      default: () => []
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
  created () {
  },
  methods: {
    searchBind (customBind) {
      return { ...(this.searchConfig.searchBind || {}), ...(customBind || {}) }
    },
    handleSubmit () {}
  }
}
</script>
<style lang="less" scoped>
@import url("./style/index.less");
</style>
