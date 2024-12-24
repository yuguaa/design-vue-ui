<template>
  <div class="tour-main">
    <d-tour
      v-model="current"
      :open="open"
      :steps="steps"
      @close="open = false"
    >
  <template slot-scope="{ current }">
    <div v-if="current.key === 1">
      <div>key === 1</div>
    </div>
    <div v-else-if="current.key === 2">
      <div>key === 2</div>
    </div>
    <div v-else-if="current.key === 3">
      <div>key === 3</div>
    </div>
  </template>
  </d-tour>
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
          key: 1,
          target: () => this.$refs?.b1.$el,
        },
        {
          key: 2,
          target: () => this.$refs?.b2.$el,
        },
        {
          key: 3,
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
<style scoped lang="less">
.tour-main {
  padding: 48px;
  padding-left: 300px;
}
</style>
