<template>
  <div v-if="isVisible">
    <div class="xm_tour_main" :style="boxStyle" ref="tourRef">
      <div class="xm_tour_content">
        <div class="xm_tour_arrow" :class="{below: boxStyle.bottom !== undefined}"></div>
        <div class="xm_tour_inner">
          <a-icon type="close" @click="$emit('close')" />
          <slot :current="currentStep">
            <div class="xm_tour_cover" v-if="currentStep.cover">
              <img :src="currentStep.cover" alt="cover" srcset="" />
            </div>
            <div class="ant-tour-header" v-if="currentStep.title">
              <div class="ant-tour-title">{{ currentStep.title }}</div>
            </div>
            <div class="xm_tour_description" v-if="currentStep.description">
              {{ currentStep.description }}
            </div>
          </slot>

          <div class="xm_tour_footer">
            <slot
              name="indicators"
              :current="currentStep"
              :total="steps.length"
            >
              <div class="xm_tour_indicators">
                <span
                  class="xm_tour_indicator"
                  v-for="(item, index) in steps"
                  :key="index"
                  :class="{ xm_tour_indicator_active: current === index }"
                ></span>
              </div>
            </slot>
            <div class="xm_tour_buttons">
              <a-space :size="12">
                <a-button size="small" @click="onPrev" v-if="current !== 0">
                  上一步
                </a-button>
                <a-button
                  type="primary"
                  size="small"
                  @click="onFinish"
                  v-if="current === steps.length - 1"
                >
                  结束导览
                </a-button>
                <a-button type="primary" size="small" @click="onNext" v-else>
                  下一步
                </a-button>
              </a-space>
            </div>
          </div>
        </div>
      </div>
    </div>
    <c-mask :pos="pos" v-if="mask && pos" :mask="mask" />
  </div>
</template>

<script>
import CMask from './mask.vue'
export default {
  name: 'd-tour',
  components: {
    CMask
  },
  model: {
    prop: 'current', // 指定 v-model 绑定的属性
    event: 'change' // 指定触发的事件
  },
  props: {
    // 是否启用蒙层，也可传入配置改变蒙层样式和填充色 {color?: string; }
    mask: {
      type: [Boolean, Object],
      default: true
    },
    open: {
      type: Boolean,
      default: false
    },
    steps: {
      type: Array,
      default: () => []
    },
    current: {
      type: Number,
      default: 0
    },
    millisecond: {
      type: Number,
      default: 500
    },
    boxW: {
      type: Number,
      default: 520
    }
  },
  data () {
    return {
      cusNum: 4,
      boxStyle: {},
      currentStep: {},
      pos: null,
      dynamicElement: null,
      isVisible: false // 控制是否显示组件
    }
  },
  watch: {
    open (newValue) {
      newValue ? this.createDynamicElement() : this.removeDynamicElement()
    },
    current () {
      this.updatePos()
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.updatePos)
  },
  mounted () {
    window.addEventListener('resize', this.updatePos)
  },
  methods: {
    onFinish () {
      this.$emit('close')
      this.$emit('finish')
    },
    delay (ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    },
    updatePos () {
      this.currentStep = this.steps[this.current]
      // 设置当前 位置
      this.setBoxPos()
    },
    async toView (el) {
      const rect = el.getBoundingClientRect()
      if (rect.top > 0 && this.getDistanceFromBottom(rect.bottom) > 0) return
      el.scrollIntoView({
        behavior: 'smooth', // 平滑滚动
        block: 'start' // 滚动到顶部对齐
      })
      await this.delay(this.millisecond)
    },
    async setBoxPos () {
      const _El = this.currentStep.target()
      const _num = this.cusNum
      // 处理是否需要滑动到对应的位置
      await this.toView(_El)
      const rect = _El.getBoundingClientRect()
      // 需要判断是在什么位置，如果已经在底部了
      this.pos = {
        x: rect.left - _num,
        y: rect.top - _num,
        width: rect.width + _num * 2,
        height: rect.height + _num * 2,
        rx: 2
      }
      this.setBodyStyle(rect)
    },
    setBodyStyle (rect) {
      const _num = this.cusNum
      const windowWidth = window.innerWidth
      // 处理箭头、位置等看是否需要重置
      const tourRect = this.$refs.tourRef.getBoundingClientRect()
      const _baseProps = {
        zIndex: this.$attrs.zIndex || 1001,
        width: this.boxW + 'px'
      }
      const _left = Math.max(rect.left + rect.width / 2 - this.boxW / 2, 0)
      _baseProps.left = _left + 'px'
      // 如果超过右边屏幕，移动回来
      if (windowWidth - _left - tourRect.width < 0)_baseProps.transform = `translateX(${windowWidth - _left - tourRect.width}px)`
      // 如果 目标节点距离屏幕底部 + 引导的高度 + 固定的高度 < 0
      if (this.getDistanceFromBottom(rect.bottom) - tourRect.height - 12 < 0) {
        this.boxStyle = {
          ..._baseProps,
          bottom: this.getDistanceFromBottom(rect.top) + 12 + _num + 'px'
        }
        return
      }
      this.boxStyle = {
        ..._baseProps,
        top: rect.top + rect.height + 12 + _num + 'px'
      }
    },
    getDistanceFromBottom (num) {
      // 获取当前视口的高度
      const windowHeight = window.innerHeight
      // 元素的底部距离屏幕底部的距离 = 视口高度 - 元素底部位置
      const distanceFromBottom = windowHeight - num
      return distanceFromBottom
    },
    onPrev () {
      this.$emit('change', this.current - 1)
    },
    onNext () {
      this.$emit('change', this.current + 1)
    },
    async createDynamicElement () {
      await this.$nextTick()
      document.body.appendChild(this.$el)
      document.body.style.overflow = 'hidden'
      this.isVisible = true
      this.updatePos()
    },
    removeDynamicElement () {
      document.body.removeChild(this.$el)
      document.body.style.overflow = 'auto'
      this.isVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
@import url('./style/index.less');
</style>
