<template>
  <div>
    <Watermark :text="'Confidential'" :fontSize="'30px'" :opacity="0.1" :angle="-45">
      <div class="content">
        <!-- 你的其他内容 -->
        <h1>这是一个页面</h1>
        <p>内容会显示在水印下方</p>
      </div>
    </Watermark>
  </div>
</template>

<script>
import Watermark from './components/Watermark.vue'

export default {
  components: {
    Watermark
  }
}
</script>

<style>
.content {
  padding: 50px;
  background-color: #fff;
}
</style>
