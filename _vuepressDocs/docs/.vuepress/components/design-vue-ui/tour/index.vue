<template>
  <div class="tour-main">
    <d-tour
      v-model="current"
      :open="open"
      :steps="steps"
      @close="open = false"
    ></d-tour>
    <br />
    <a-space>
      <a-button type="primary" @click="open = !open">开始引导</a-button>
      <a-button type="default" ref="b1">第一个按钮</a-button>
      <a-button type="primary" ref="b2">第二个按钮</a-button>
      <a-button type="primary" ref="b3">第三个按钮</a-button>
    </a-space>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: 0,
      open: false,
      // steps: [],
      steps: [
        {
          title: 'Upload File',
          description: 'Put your files here.',
          cover: '/logo.jpg',
          target: () => this.$refs?.b1.$el
        },
        {
          title: 'Save',
          description: 'Save your changes.',
          target: () => this.$refs?.b2.$el
        },
        {
          title: 'Other Actions',
          description: 'Click to see other actions.',
          target: () => this.$refs?.b3.$el
        }
      ]
    }
  },
  mounted() {
    console.log(this.$refs)
  },
  methods: {}
}
</script>
<style scoped lang="less"></style>
