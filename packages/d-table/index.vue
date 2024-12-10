<template>
  <!-- 全局table-带查询 -->
  <div class="xm_global_table" ref="tableRef">
    <!-- 表格 -->
    <div class="table-wrap">
      <div class="header-wrap">
        <div class="left">
          <slot name="headerLeft"></slot>
        </div>
        <div class="setting-icon">
          <table-set
            v-if="columns && columnSet.showTableSet"
            :columns="columns"
            :isCache="columnSet.isCache || false"
            :suffix="columnSet.suffix || ''"
            @change="(value) => $emit('setColumns', value)"
          />
        </div>
      </div>
      <a-table
        :columns="columns"
        :transformCellText="({ text }) => (!text && text !== 0 ? '--' : text)"
        :pagination="!pagination ? false : {
          'show-total': (total) => `共 ${total} 条`,
          'show-quick-jumper': true,
          'show-size-changer': true,
          'onShowSizeChange': changeSize,
          'onChange': changeSize,
          ...pagination
        }"
        v-bind="$attrs"
        v-on="filteredListeners"
        ref="atableRef"
      >
        <span slot="c-index" slot-scope="text, record, index">
          {{ index | indexFilter(pagination) }}
        </span>
        <template
          v-for="column in tableSlots"
          :slot="column.scopedSlots.customRender"
          slot-scope="text, record, index"

        >
          <component :key="column.dataIndex || column.key"
            :is="comsConfig[column.scopedSlots.customRenderCopy].is"
            v-bind="comFilter( column.scopedSlots, { text, record, index })"
            v-if="comsConfig[column.scopedSlots.customRenderCopy].txtType === 'text'">
            {{ {text, record, index} | txtFilter(comsConfig, column) }}
          </component>
          <component :key="column.dataIndex || column.key + ''"
            :is="comsConfig[column.scopedSlots.customRenderCopy].is"
            v-bind="comFilter( column.scopedSlots, { text, record, index })"
            v-else>
          </component>
        </template>
        <template
          v-for="item in scopedSlots.filter((v) => v.islot)"
          :slot="item.key"
          slot-scope="text, record, index, expanded"
        >
          <slot :name="item.key"  v-bind="slotFilter( [text, record, index, expanded], item)">
          </slot>
        </template>
        <template
          v-for="item in scopedSlots.filter((v) => !v.islot)"
          :slot="item.key"
        >
          <slot :name="item.key">
          </slot>
        </template>

      </a-table>
    </div>
    <scroll-bar v-if="sticky" :scrollNodeEl="barEl" :rootEl="rootEl"/>
  </div>
</template>

<script>
import DTooltip from '../d-tooltip/index.vue'
import TableSet from './set.vue'
import ScrollBar from './scroll-bar.vue'
import props from './config/prop'
import { Table, Badge } from 'ant-design-vue'
import dConfig from '../_utils/dConfig'

export default {
  name: 'DTable',
  props,
  components: {
    TableSet,
    DTooltip,
    ATable: Table,
    ABadge: Badge,
    ScrollBar
  },
  data () {
    const { DTable = {} } = this.$xmConfig.$dConfig
    return {
      selectedRowKeys: [], // 已选择的key
      tableSlots: [],
      scopedSlots: [],
      columnsCopy: [],
      badgeProps: DTable.BadgeProps || {},
      barEl: null,
      comKeys: [...dConfig.DTable.comKeys, ...(DTable.comKeys || [])],
      comsConfig: {
        ...dConfig.DTable.comsConfig,
        ...(DTable.comsConfig || {})
      }
    }
  },
  created () {
    this.initColumns()
    this.getSlots(this.columns)
  },
  mounted () {
    this.findFirstBox()
    this.initScopedSlots()
  },
  filters: {
    valueFilter (val, emptyTxt) {
      if (!val && val !== 0) return emptyTxt
      return val
    },
    txtFilter ({ text, record, index }, comsConfig, column) {
      if (column.scopedSlots.txtRender) return column.scopedSlots.txtRender(text, record, index)
      if (comsConfig[column.scopedSlots.customRenderCopy].txtRender) return comsConfig[column.scopedSlots.customRenderCopy].txtRender(text, record, index)
      return text
    },
    indexFilter (index, pag) {
      if (!pag) return index
      return pag.current > 1 ? index + 1 + (pag.current - 1) * pag.pageSize : index + 1
    }
  },
  computed: {
    filteredListeners () {
      const { changeSize, setColumns, ...otherEvents } = this.$listeners
      return otherEvents
    }
  },
  methods: {
    comFilter (scopedSlots, { text, record, index }) {
      // console.log(comsConfig[renderKey], index)
      const comsConfig = this.comsConfig
      const renderKey = scopedSlots.customRenderCopy
      const _bind = {
        ...(comsConfig[renderKey]?.bind || {})
      }
      const bindObj = comsConfig[renderKey].bindObj || []
      Object.keys(bindObj).forEach(v => {
        _bind[v] = bindObj[v](text, record, index)
      })

      const _cBind = {
        ...(scopedSlots.bind || {})
      }
      const _cBindObj = scopedSlots.bindObj || []
      Object.keys(_cBindObj).forEach(v => {
        _cBind[v] = _cBindObj[v](text, record, index)
      })
      return {
        ..._bind, ..._cBind
      }
    },
    slotFilter (val, item) {
      const _slotProps = {
        expandedRowRender: 'record,index,indent,expanded',
        expandIcon: 'props',
        footer: 'currentPageData',
        title: 'currentPageData',
        filterIcon: 'filtered,column',
        customRender: 'text,record,index',
        filterDropdown: 'a'
      }
      const _currentSlotScope = _slotProps[item.type || item.key]?.split(',') || []
      if (_currentSlotScope.length === 1) return val[0]
      const _obj = {}
      _currentSlotScope.forEach((v, index) => {
        _obj[v] = val[index]
      })
      return _obj
    },
    findFirstBox () {
      const container = this.$refs.tableRef
      this.barEl = container.querySelector('.ant-table-body')
    },
    initScopedSlots () {
      // 获取 外面组件的slot集合
      const _scopedSlots = this.$scopedSlots

      const _slotKeys = Object.keys(this.$slots)
      for (const key in _scopedSlots) {
        if (Object.prototype.hasOwnProperty.call(_scopedSlots, key)) {
          const _type = this.getScopedSlotsType(key)
          this.scopedSlots.push({
            key: key,
            type: _type,
            islot: _slotKeys.indexOf(key)
          })
        }
      }
    },
    getScopedSlotsType (key) {
      let _type = ''
      this.columns.some((v) => {
        const _slot = this.findKeyByValue(v.slots, key)
        const _scopeSlot = this.findKeyByValue(v.scopedSlots, key)
        _type = _slot || _scopeSlot
        return _type
      })
      return _type
    },
    findKeyByValue (obj, value) {
      if (!obj) return undefined
      // 使用 Object.entries 将对象转换为 [key, value] 数组
      const entry = Object.entries(obj).find(([key, val]) => val === value)
      // 如果找到匹配的条目，则返回对应的键，否则返回 undefined
      return entry ? entry[0] : undefined
    },
    getSlots (val) {
      const _cRender = this.comKeys
      this.tableSlots = val.filter((v) => {
        const isExist = _cRender.some((q) => v.scopedSlots?.customRender.indexOf(q) !== -1)
        return v.scopedSlots?.customRender && isExist
      })
    },
    initColumns () {
      // 处理 tip status
      const _cRender = this.comKeys
      this.columns.forEach((item, index) => {
        if (item.scopedSlots && _cRender.indexOf(item.scopedSlots?.customRender) !== -1) {
          item.scopedSlots.customRenderCopy = item.scopedSlots.customRender
          item.scopedSlots.customRender = item.scopedSlots.customRender + index
        }
      })
      this.columnsCopy = [...this.columns]
    },
    // 页码改变
    changeSize (current, pageSize) {
      this.pagination.current = current
      this.pagination.pageSize = pageSize
      this.$nextTick(() => {
        this.$emit('changeSize', current, pageSize)
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import url("./style/index.less");
</style>
