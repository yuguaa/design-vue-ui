export default {
  props: {
    showSearch: {
      type: Boolean,
      default: false
    },
    optionFilterProp: {
      type: String,
      default: 'label'
    },
    searchReset: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      allHidden: false,
      renderLevel: -1 // -1 标识代表 自身是多大就是多大
    }
  },
  methods: {
    onSearch (value) {
      // 给全局所有数据打上 $valueHidden 标识 代表着当前搜索的这个值需要隐藏
      this.renderLevel = -1
      this.allHidden = !this.fsFilterDeep(this.treeDataCopy, value, 0)
      this.resetListArr(this.treeDataCopy)
      this.$forceUpdate()
    },
    fsFilterDeep (data, value, level = 0, parentExist) {
      const renderLevel = this.renderLevel
      const { children } = this.optionProps
      const searchProp = this.optionProps[this.optionFilterProp]

      // 遍历数据并更新 $valueHidden
      data.forEach((element) => {
        const currentExist = value
          ? parentExist ||
            (element[searchProp] && element[searchProp].includes(value))
          : true
        if (currentExist && renderLevel === -1) this.renderLevel = level
        if (element[children] && element[children].length > 0) {
          const childExist = this.fsFilterDeep(
            element[children],
            value,
            level + 1,
            currentExist
          )
          element.$valueHidden = !(currentExist || childExist) // 下级存在则false
        } else {
          element.$valueHidden = !currentExist // 存在 则为 false
        }
      })
      // 返回是否有可见的元素
      return data.some((element) => !element.$valueHidden)
    },
    resetListArr (data) {
      const { children } = this.optionProps
      const { renderLevel } = this
      const listArr = this.listArr = [data] // 初始化 listArr

      // 如果 renderLevel 为 -1，不做处理，直接返回
      if (renderLevel === -1) return

      // 根据 renderLevel 生成 listArr
      for (let index = 1; index <= renderLevel; index++) {
        // 获取当前层级的子节点（没有隐藏的节点）
        const nextLevel = listArr[index - 1].find(v => !v.$valueHidden)
        listArr[index] = nextLevel ? nextLevel[children] : []
      }

      // 清除所有层级节点的选中状态，并设置最后一层选中第一个未隐藏的节点
      listArr.forEach((v, index) => {
        // 清除当前层级所有节点的选中状态
        v.forEach(j => {
          j.$active = false
        })

        // 如果是最后一层，则跳过重新设置选中状态
        if (index === listArr.length - 1) return

        // 设置当前层级第一个未隐藏的节点为选中状态
        const firstVisibleNode = v.find(z => !z.$valueHidden)
        if (firstVisibleNode) {
          firstVisibleNode.$active = true
        }
      })
    }
  }
}
