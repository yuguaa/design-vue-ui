<template>
  <!-- 查询功能 -->
  <div class="uc-search-table">
    <a-form-model class="rule_form" ref="ruleForm" :model="form" layout="inline">
      <a-row :gutter="36" type="flex">
        <a-col v-for="(item, index) in configData" v-bind="item.col || searchCol" :key="index">
          <a-form-model-item
            :label="item.labelName"
            :prop="item.param"
            :rules="item.rules"
            :labelCol="item.labelCol || {}"
            :wrapperCol="{ flex: 1 }"
            :class="item.class"
          >
            <!-- input -->
            <a-input
              v-if="item.tagName === 'input'"
              autoComplete="off"
              v-model.trim="form[item.param]"
              allowClear
              v-bind="item.bind"
              style="width: 100%"
            />
            <!-- input-number -->
            <a-input-number
              v-else-if="item.tagName === 'number'"
              autoComplete="off"
              v-model.trim="form[item.param]"
              allowClear
              v-bind="item.bind"
              style="width: 100%"
              :disabled="item.disabled"
            />
            <!-- 选择器 -->
            <a-select
              v-else-if="item.tagName === 'select'"
              not-found-content="暂无数据"
              v-model="form[item.param]"
              v-bind="item.bind"
              @change="selectChange($event, item, form)"
              :style="{ width: item.width || '100%' }"
              :disabled="item.disabled"
            >
              <a-select-option
                v-for="option in item.options"
                :label="option[item.optionProp.label]"
                :key="option[item.optionProp.key || item.optionProp.value]"
                :value="option[item.optionProp.value]"
              >
                {{ option[item.optionProp.label] }}
              </a-select-option>
            </a-select>

            <a-select
              v-else-if="item.tagName === 'selectGroup'"
              not-found-content="暂无数据"
              v-model="form[item.param]"
              v-bind="item.bind"
              @change="selectChange($event, item, form)"
              :style="{ width: item.width || '100%' }"
              :disabled="item.disabled"
            >
              <a-select-opt-group
                v-for="group in item.options"
                :label="group[item.optionProp.label]"
                :key="group[item.optionProp.key || item.optionProp.value]"
              >
                <a-select-option
                  v-for="option in group.children"
                  :label="option[item.optionProp.label]"
                  :key="option[item.optionProp.key || item.optionProp.value]"
                  :value="option[item.optionProp.value]"
                >
                  {{ option[item.optionProp.label] }}
                </a-select-option>
              </a-select-opt-group>
            </a-select>
            <a-range-picker
              @change="(date, dateString) => onRangeChange(dateString, item.param)"
              v-model="item.modelValue"
              :show-time="item.bind.showtime || showtime"
              v-bind="item.bind"
              style="width: 100%"
              :disabled-date="disabledEndDate"
              v-else-if="item.tagName === 'rangePicker'"
            >
              <template #suffixIcon>
                <a-icon type="calendar" />
              </template>
            </a-range-picker>
            <c-address
              v-else-if="item.tagName === 'cityAddress'"
              v-model="item.modelValue"
              v-bind="item.bind"
              @change="(value) => onAddressChange(value, item, form)"
            />
            <slot name="search_item" v-else-if="item.tagName === 'custom'" :item="item" :form="form"></slot>
          </a-form-model-item>
        </a-col>
        <a-col>
          <a-form-model-item>
            <a-button type="primary" @click="handleSubmit()" :loading="loading" :disabled="btnDisabled">
              <!-- <a-icon type="search"></a-icon> -->
              搜索
            </a-button>
            <a-button type="reset" style="margin-left: 10px" @click="handleSubmit(true)"> 重置 </a-button>
            <slot name="search_btn" :btnDisabled="btnDisabled" :form="form"></slot>
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>
  </div>
</template>

<script>
import { getDataByUrl } from '@/http/api'
import { SearchCol } from '@/enum'
import moment from 'moment'
import CAddress from '../CAddress/index.vue'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

export default {
  name: 'CSearch',
  components: {
    CAddress
  },
  props: {
    configData: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    searchInitParam: {
      type: Object,
      default: () => {
        return {}
      }
    },
    autoHandle: {
      type: Boolean,
      default: true
    },
    clearInitData: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    btnDisabled () {
      const _form = this.form
      const isDisabled = this.configData.some((v) => {
        if (v.required && (!_form || !_form[v.param])) return true
      })
      return isDisabled
    }
  },
  data () {
    return {
      form: null,
      showtime: { defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')] },
      defaultForm: {},
      handleLen: 0,
      optionProp: {
        key: 'value',
        label: 'label',
        value: 'value'
      },
      searchCol: SearchCol,
      onceHandle: false
    }
  },
  created () {
    this.init()
    // this.showtime =
  },
  methods: {
    disabledEndDate (endValue) {
      return endValue > moment().endOf('day')
    },
    onRangeChange (dateString = [], item) {
      this.form[item[0]] = dateString[0] || ''
      this.form[item[1]] = dateString[1] || ''
      this.$forceUpdate()
    },
    setDefaultModeValue (item) {
      if (item.tagName === 'rangePicker' && !!item.defaultValue) {
        item.modelValue = [moment(item.defaultValue[0]), moment(item.defaultValue[1])]
      } else item.modelValue = undefined
    },
    async init () {
      const configData = this.configData
      const defaultValue = {}
      configData.map((item) => {
        this.setDefaultModeValue(item)
        //  默认值
        if (!!item.defaultValue || item.defaultValue === 0) {
          // 是否值是一个数组 数组-循环赋值
          if (typeof item.param === 'object') {
            const valueIsArray = typeof item.defaultValue === 'object'
            item.param.map((paramItem, index) => {
              defaultValue[paramItem] = valueIsArray ? item.defaultValue[index] : item.defaultValue
            })
          } else defaultValue[item.param] = item.defaultValue
        }
        if (item.isNeedHandle) {
          this.handleLen++
          this.onceHandle = true
        }
        if (item.tagName === 'select' || item.tagName === 'selectGroup') {
          !item.optionProp && (item.optionProp = this.optionProp)
          !item.options && (item.options = [])
        }
        if (!item.remote || !item.remote.url) return
        if (item.remote.rely) return

        this.getData(item)
      })
      this.defaultForm = defaultValue
      this.form = this.searchInitParam ? { ...defaultValue, ...this.searchInitParam } : { ...defaultValue }
      this.handleLen === 0 && this.autoHandle && this.handleSubmit()
    },
    // 根据数组返回 结果  ==== 接口返回数据
    getParamData (data, resultParam) {
      if (typeof resultParam === 'string') return data[resultParam]
      let _data = data
      let _temp = []
      resultParam.map((item) => {
        _temp = _data
        _data = _temp[item]
      })
      return _data
    },
    async getData (itemData) {
      const resultParam = itemData.remote.resultParam
      const { data = [], code } = await getDataByUrl(itemData.remote.url, itemData.remote.param, itemData.remote.type || 'get')
      if (code !== 200) return
      if (this.handleLen !== 0) this.handleLen--
      const _result = itemData.remote.resultParam ? this.getParamData(data, resultParam) : data
      itemData.options = _result
      itemData.allowOwn && _result && _result.length && this.$set(this.form, itemData.param, _result[0][itemData.optionProp.value])
      this.$forceUpdate()
      if (this.handleLen === 0 && this.onceHandle) this.handleSubmit()
    },
    selectChange (value, item, form) {
      // tp 对应的联动的 另一个下拉框等  param名称
      // toParam 是给 param 的下拉框 获取数据时传的key值
      if (item.remote?.to) {
        const toItem = this.getConfigDataItem(item.remote.to, value)
        // this.form[toItem.param] = undefined
        this.$set(this.form, toItem.param, undefined)
        toItem.options = []
        if (value === undefined || value === '') return
        toItem.remote.param = toItem.remote.param || {}
        item.remote.toParam && (toItem.remote.param[item.remote.toParam] = value)
        this.getData(toItem)
      }
      this.$emit('selectChange', value, item, form)
    },
    getConfigDataItem (toParam) {
      const _arr = this.configData.filter((item) => item.param === toParam)
      return _arr[0]
    },
    reset () {
      this.$emit('reset')

      if (this.clearInitData) this.form = this.searchInitParam ? { ...this.searchInitParam } : {}
      else this.form = this.searchInitParam ? { ...this.searchInitParam, ...this.defaultForm } : { ...this.defaultForm }
      this.configData.map((item) => {
        this.setDefaultModeValue(item)
      })
    },
    // 查询
    handleSubmit (isReset) {
      if (isReset) {
        this.reset()
      }
      if (this.btnDisabled) return
      this.$nextTick(() => {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.$emit('searchClick', this.form, isReset)
          }
        })
      })
    },
    onAddressChange (value, item, form) {
      form[item.param] = value && value.length ? value[value.length - 1] : ''
    }
  },
  watch: {}
}
</script>
<style lang="less">
.uc-search-table {
  background-color: #fff;
  .rule_form.ant-form-inline {
    .ant-form-item {
      margin-right: 0;
      margin-bottom: 0 !important;
      display: flex !important;
      // flex-wrap: wrap;
    }
  }

  .ant-form-item-control-wrapper {
    overflow: hidden;
  }
  .ant-form-item-control-wrapper {
    flex: 1 !important;
    padding-bottom: 16px;
  }
}
</style>
