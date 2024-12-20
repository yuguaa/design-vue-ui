<template>
  <div class="xm_tour_mask">
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
        fill="rgba(0,0,0,0.5)"
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
  props: {
    pos: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>
