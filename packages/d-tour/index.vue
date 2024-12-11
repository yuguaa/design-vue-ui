<template>
  <div ref="tourRef">
    <div class="xm_tour_main">
      <div class="xm_tour_content">
        <div class="xm_tour_arrow"></div>
        <div class="xm_tour_inner"></div>
        <div class="xm_tour_description"></div>
        <div class="xm_tour_footer">
          <div class="xm_tour_indicators">
            <span class="xm_tour_indicator_active xm_tour_indicator"></span>
          </div>
          <div class="xm_tour_buttons">
            <a-button type="primary" size="small"> Primary </a-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'd-tour',
  props: {
    title: {
      type: String,
      default: ''
    },
    open: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      dynamicElement: null
    }
  },
  watch: {
    open (newValue) {
      newValue ? this.createDynamicElement() : this.removeDynamicElement()
    }
  },
  methods: {
    async createDynamicElement () {
      await this.$nextTick()
      // 创建一个新的 div 元素
      const div = document.createElement('div')
      div.innerHTML = this.$refs.tourRef.innerHTML
      document.body.appendChild(div)

      this.dynamicElement = div // 保存 div 引用
    },
    removeDynamicElement () {
      if (this.dynamicElement) {
        // 移除 DOM 元素
        this.dynamicElement.remove()
        this.dynamicElement = null // 清除引用
      }
    }
  }
}
</script>

<style lang="less" scoped>
.xm_tour_main {
}
</style>
