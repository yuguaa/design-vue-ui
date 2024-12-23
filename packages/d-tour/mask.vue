<template>
  <div
    class="xm_tour_mask"
    :style="{ zIndex: $attrs.zIndex ? $attrs.zIndex - 1 : 1000 }"
  >
    <svg style="width: 100%; height: 100%">
      <defs>
        <mask id="ant-tour-mask-vc_unique_4">
          <rect x="0" y="0" width="100vw" height="100vh" fill="white"></rect>
          <rect fill="black" v-bind="pos"></rect>
        </mask>
      </defs>
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        :fill="rectColor"
        mask="url(#ant-tour-mask-vc_unique_4)"
      ></rect>
      <rect
        fill="transparent"
        pointer-events="auto"
        x="0"
        y="0"
        width="100%"
        :height="pos.y"
      ></rect>
      <rect
        fill="transparent"
        pointer-events="auto"
        x="0"
        y="0"
        :width="pos.x"
        height="100%"
      ></rect>
      <rect
        fill="transparent"
        pointer-events="auto"
        x="0"
        :y="pos.y + pos.height"
        width="100%"
        :height="`calc(100vh - ${pos.y + pos.height}px)`"
      ></rect>
      <rect
        fill="transparent"
        pointer-events="auto"
        :x="pos.x + pos.width"
        y="0"
        :width="`calc(100vw - ${pos.x + pos.width}px)`"
        height="100%"
      ></rect>
    </svg>
  </div>
</template>
<script>
export default {
  data () {
    return {
      rectColor: 'rgba(0,0,0,0.5)'
    }
  },
  props: {
    pos: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 是否启用蒙层，也可传入配置改变蒙层样式和填充色 {  color?: string; }
    mask: {
      type: [Boolean, Object],
      default: true
    }
  },
  watch: {
    mask: {
      handler (v) {
        if (this.isObject(v)) {
          this.rectColor = v.color || 'rgba(0,0,0,0.5)'
        }
      },
      immediate: true
    }
  },
  methods: {
    isObject (value) {
      return typeof value === 'object' && value !== null
    }
  }
}
</script>
