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
    // 水印类型，text 为文本水印，image 为图片水印
    watermarkType: {
      type: String,
      default: 'text' // 'text' 或 'image'
    },
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
    },
    imageUrl: {
      type: String,
      default: '' // 图片水印的 URL
    },
    imageWidth: {
      type: Number,
      default: 100 // 图片宽度
    },
    imageHeight: {
      type: Number,
      default: 100 // 图片高度
    }
  },
  mounted () {
    this.drawWatermark()
  },
  methods: {
    drawWatermark () {
      const canvas = this.$refs.watermarkCanvas
      const ctx = canvas.getContext('2d')
      const { watermarkType, text, fontSize, angle, opacity, imageUrl, imageWidth, imageHeight } = this

      // 设置 canvas 的大小
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      // 设置透明度
      ctx.globalAlpha = opacity

      if (watermarkType === 'text') {
        // 文本水印
        ctx.font = `${fontSize} Arial`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'

        const textWidth = ctx.measureText(text).width
        const textHeight = parseInt(fontSize) // 简单估算文字的高度

        const stepX = textWidth + 50 // 水印水平间距
        const stepY = textHeight + 50 // 水印垂直间距
        const rotate = angle * Math.PI / 180 // 角度转换为弧度

        ctx.save()
        ctx.rotate(rotate)

        // 绘制多个水印
        for (let x = -textWidth; x < canvas.width; x += stepX) {
          for (let y = -textHeight; y < canvas.height; y += stepY) {
            ctx.fillText(text, x + textWidth / 2, y + textHeight / 2)
          }
        }

        ctx.restore()
      } else if (watermarkType === 'image' && imageUrl) {
        // 图片水印
        const img = new Image()
        img.src = imageUrl

        img.onload = () => {
          const stepX = imageWidth + 50 // 图片水平间距
          const stepY = imageHeight + 50 // 图片垂直间距
          const rotate = angle * Math.PI / 180 // 角度转换为弧度

          ctx.save()
          ctx.rotate(rotate)

          // 绘制多个图片水印
          for (let x = -imageWidth; x < canvas.width; x += stepX) {
            for (let y = -imageHeight; y < canvas.height; y += stepY) {
              ctx.drawImage(img, x, y, imageWidth, imageHeight)
            }
          }

          ctx.restore()
        }
      }
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
  overflow: hidden;
}

.xm_watermark_canvas {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>
