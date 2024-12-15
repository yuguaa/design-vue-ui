<template>
  <div class="xm_watermark_wrapper">
    <canvas ref="watermarkCanvas" class="xm_watermark_canvas"></canvas>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'd-watermark',
  props: {
    text: {
      type: String,
      default: 'DESIGN-VUE-UI' // 默认水印文本
    },
    fontSize: {
      type: String,
      default: '20px' // 默认字体大小
    },
    angle: {
      type: Number,
      default: -30 // 默认角度
    },
    opacity: {
      type: Number,
      default: 0.1 // 默认透明度
    },
    zIndex: {
      type: Number,
      default: 1000 // 默认z-index
    }
  },
  mounted () {
    this.drawWatermark()
  },
  methods: {
    drawWatermark () {
      const canvas = this.$refs.watermarkCanvas
      const ctx = canvas.getContext('2d')
      const { text, fontSize, angle, opacity } = this

      // 设置 canvas 的大小
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      // 设置透明度和字体样式
      ctx.globalAlpha = opacity
      ctx.font = `${fontSize} Arial`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      // 绘制水印文本
      const stepX = 200 // 水印水平间距
      const stepY = 100 // 水印垂直间距
      const rotate = angle * Math.PI / 180 // 角度转换为弧度

      ctx.save()
      ctx.rotate(rotate)

      // 绘制多个水印
      for (let x = 0; x < canvas.width; x += stepX) {
        for (let y = 0; y < canvas.height; y += stepY) {
          ctx.fillText(text, x + 100, y + 50)
        }
      }

      ctx.restore()
    }
  }
}
</script>

<style scoped>
.xm_watermark_wrapper {
  position: relative;
  display: inline-block;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.xm_watermark_canvas {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>
