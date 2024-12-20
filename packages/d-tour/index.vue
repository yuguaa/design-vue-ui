<template>
  <div v-if="isVisible">
    <div class="xm_tour_main" :style="boxStyle" ref="tourRef">
      <div class="xm_tour_content">
        <div class="xm_tour_arrow"></div>
        <div class="xm_tour_inner">
          <a-icon type="close"  @click="$emit('close')" />
          <div class="xm_tour_cover" v-if="currentStep.cover">
            {{ currentStep.cover }}
          </div>
          <div class="ant-tour-header" v-if="currentStep.title">
            <div class="ant-tour-title">{{ currentStep.title }}</div>
          </div>
          <div class="xm_tour_description" v-if="currentStep.description">
            {{ currentStep.description }}
          </div>
          <div class="xm_tour_footer">
            <div class="xm_tour_indicators">
              <span class="xm_tour_indicator_active xm_tour_indicator"></span>
            </div>
            <div class="xm_tour_buttons">
              <a-space :size="12">
                <a-button
                  size="small"
                  @click="onPrev"
                  v-if="current !== 0"
                >
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
    <c-mask :pos="pos"/>
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
    title: {
      type: String,
      default: ''
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
    }
  },
  data () {
    return {
      boxW: 520,
      boxStyle: {},
      currentStep: {},
      pos: {},
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
    updatePos () {
      this.currentStep = this.steps[this.current]
      // 设置当前 位置
      this.setBoxPos()
    },
    setRectAttr () {
      return {
        fill: 'transparent',
        'pointer-events': 'auto',
        x: '487.84375',
        y: '0',
        width: 'calc(100vw - 487.84375px)',
        height: '100%'
      }
    },
    setBoxPos () {
      const _El = this.currentStep.target()
      const rect = _El.getBoundingClientRect()
      const _num = 4
      this.pos = {
        x: rect.left - _num,
        y: rect.top - _num,
        width: rect.width + _num * 2,
        height: rect.height + _num * 2,
        rx: 2
      }
      this.boxStyle = {
        left: Math.max(rect.left + rect.width / 2 - this.boxW / 2, 0) + 'px',
        top: rect.top + rect.height + 12 + _num + 'px'
      }
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
      this.isVisible = true
      this.updatePos()
    },
    removeDynamicElement () {
      document.body.removeChild(this.$el)
      this.isVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
@import url("./style/index.less");
</style>
