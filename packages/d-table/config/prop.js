
export default {
  // 通用 列表设置 --- 自定义列表需要的属性
  columnSet: {
    type: Object,
    default: () => {
      return {
        showTableSet: true,
        isCache: false, // 是否需要缓存
        suffix: '' // 前缀   一个页面多个列表的时候 需要缓存的时候很有必要
      }
    }
  },
  columns: {
    type: Array,
    default: []
  },
  pagination: {
    type: Object,
    default: () => {
      return {
        current: 1,
        pageSize: 10
      }
    }
  },
  // 滚动的节点
  scrollNodeQuery: {
    type: [String, Object],
    default: '.xm_global_table .ant-table-body'
  },
  sticky: {
    type: Boolean,
    default: false
  },
  // sroll-bar sticky 为 true 时可设置
  rootEl: {
    type: [String, Object],
    default: ''
  }
}
