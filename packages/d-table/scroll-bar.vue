<template>
  <!-- 滚动条 -->
  <div
    class="xm_scroll_box"
    @scroll="onScroll"
    ref="dScrollRef"
    v-if="isShow"
  >
    <div class="xm_scroll_bar" :style="{ width: bodyScrollW + 'px' }"></div>
  </div>
</template>
<script>
export default {
  name: 'DScrollBar',
  props: {
    // 滚动的节点  可是 String 类型的 querySelector   或者 el
    scrollNodeEl: {
      type: [String, Element],
      default: '.xm_global_table .ant-table-body'
    },
    // 对应于哪一个节点元素进行显示和隐藏，默认 html 滑动到
    rootEl: {
      type: [String, Object],
      default: ''
    }
  },
  data () {
    return {
      isShow: true,
      rootNode: null,
      scrollNode: null, // 对应的节点
      bodyNode: null,
      bodyScrollW: 0, // 对应nodeScrollW
      nodeScrollW: 0,
      proportion: 0,
      cusLeft: 0,
      parentNode: null
    }
  },
  // watch: {
  //   isShow (val) {
  //     if (val) this.initResize()
  //   }
  // },
  beforeDestroy () {
    this.scrollNode &&
      this.scrollNode.removeEventListener('scroll', this.handleScroll, true)
    this.rootNode.removeEventListener('scroll', this.bodyScroll, true)
    window.removeEventListener('resize', this.initResize)
    // document.body && document.body.removeChild(this.$el)
  },
  methods: {
    // 判断一个变量是字符串还是 HTML 元素
    getScrollNodeEl (el) {
      const _el = el || this.scrollNodeEl
      if (typeof _el === 'string') {
        return document.querySelector(_el)
      } else if (_el instanceof HTMLElement) {
        return _el
      }
      return null
    },
    // 原生滑动条  滚动的时候  监听事件
    handleScroll (e) {
      if (!this.isShow) return
      const _dScrollNode = this.$refs.dScrollRef
      const _scrollNode = this.scrollNode
      const _dScrollLeft =
        (e.target.scrollLeft / _scrollNode.scrollWidth) * this.bodyScrollW
      if (
        _dScrollNode.scrollLeft < _dScrollLeft - 1 ||
        _dScrollNode.scrollLeft > _dScrollLeft + 1
      ) {
        _dScrollNode.scrollLeft = _dScrollLeft
      }
    },
    // 处理 竖 划定监听  自定义滑动什么时候显示 什么时候隐藏
    bodyScroll () {
      const _scrollNode = this.scrollNode
      const rect = _scrollNode.getBoundingClientRect()
      const rootReact = this.rootEl ? this.rootNode.getBoundingClientRect() : null
      const rootHeight = !rootReact ? this.rootNode.innerHeight : (rootReact.height + rootReact.top)
      this.isShow = rootHeight < rect.bottom && rect.top < rootHeight
    },
    initResize () {
      this.$nextTick(() => {
        this.initValue()
        this.bodyScroll() //
      })
    },
    // 滑动自定义的滚动条 监听事件
    onScroll (e) {
      const _scrollNode = this.scrollNode
      // 通过访问元素的 scrollLeft 属性来获取当前的水平滚动位置
      const dScrollLeft = e.target.scrollLeft
      // 根据自定义滚动条 左边的距离 除以 自己的滚动整个宽度  * 比例值 得到 原生滚动位置
      const _scrollLeft =
        (dScrollLeft / this.bodyScrollW) * _scrollNode.scrollWidth
      // 原生滚动位置赋值
      _scrollNode.scrollLeft = _scrollLeft
    },
    initValue () {
      const _scrollNode = this.scrollNode
      const _dScrollNode = this.$refs.dScrollRef
      if (!_dScrollNode) return
      // 原滚动条的 滚动宽 与 实际宽 比例
      const _proportion = _scrollNode.offsetWidth / _scrollNode.scrollWidth
      this.proportion = _proportion // 保存起比例
      // 算出 我们设置的滚动条宽度
      this.bodyScrollW = _dScrollNode.offsetWidth / _proportion
    },
    async init () {
      await this.$nextTick()
      this.scrollNode = this.getScrollNodeEl()
      this.rootNode = this.rootEl ? this.getScrollNodeEl(this.rootEl) : window
      this.scrollNode &&
        this.scrollNode.addEventListener('scroll', this.handleScroll, {
          passive: true
        })
      this.rootNode.addEventListener('scroll', this.bodyScroll, {
        passive: true
      })
      window.addEventListener('resize', this.initResize)
      setTimeout(() => {
        this.initResize()
      }, 1000)
    }
  },
  mounted () {
    this.init()
  }
}
</script>
<style scoped lang="less">
.scoll_bar(@w:5px,@h:5px,@color: rgba(0, 0, 0, 0.35)) {
  &::-webkit-scrollbar {
    // 滚动条整体部分
    min-width: @w;
    width: @w;
    height: @h;
  }
  &::-webkit-scrollbar-thumb {
    // 滚动条里面的小方块，能上下左右移动
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px @color;
    box-shadow: inset 0 0 5px @color;
    background: @color;
  }
  &::-webkit-scrollbar-track {
    // 滚动条的轨道
    -webkit-box-shadow: 0;
    box-shadow: 0;
    border-radius: 0;
    background: #f6f8ff;
  }
}
.xm_scroll_box {
  position: sticky;
  width: 100%;
  bottom: 0;
  left: 0;
  height: 20px;
  z-index: 999;
  // margin: 0 20px;
  overflow: auto;
  .scoll_bar(5px, 8px, #bbb);
  .xm_scroll_bar {
    width: 300px;
    height: 100%;
    background: transparent;
  }
}
</style>
