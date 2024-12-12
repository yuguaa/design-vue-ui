<template>
  <div ref="tourRef">
    <div class="xm_tour_main">
      <div class="xm_tour_content">
        <div class="xm_tour_arrow"></div>
        <div class="xm_tour_inner">
          <a-icon type="close" />
          <div class="xm_tour_cover">
            <img
              alt="tour.png"
              src="https://user-images.githubusercontent.com/5378891/197385811-55df8480-7ff4-44bd-9d43-a7dade598d70.png"
            />
          </div>
          <div class="ant-tour-header">
            <div class="ant-tour-title">Upload File</div>
          </div>
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
  position: absolute;
  width: 520px;
  font-size: 14px;
  box-sizing: border-box;
  background-color: #fff;
  .xm_tour_content {
    position: relative;
    .xm_tour_arrow {
      position: absolute;
      top: 0;
      z-index: 1;
      display: block;
      pointer-events: none;
      width: 16px;
      height: 16px;
      overflow: hidden;
      left: 50%;
      transform: translateX(-50%) translateY(-100%);
      &::before{
        position: absolute;
    bottom: 0;
    inset-inline-start: 0;
    width: 16px;
    height: 8px;
    clip-path: path('M 0 8 A 4 4 0 0 0 2.82842712474619 6.82842712474619 L 6.585786437626905 3.0710678118654755 A 2 2 0 0 1 9.414213562373096 3.0710678118654755 L 13.17157287525381 6.82842712474619 A 4 4 0 0 0 16 8 Z');
    content: "";
      }
      &::after{
        content: "";
    position: absolute;
    width: 10px;
    height: 10px;
    bottom: 0;
    inset-inline: 0;
    margin: auto;
    border-radius: 0 0 2px 0;
    transform: translateY(50%) rotate(-135deg);
    box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.1);
    z-index: 0;
    background: transparent;
      }
    }
  }
}
</style>
