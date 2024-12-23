<template>
  <div class="tour-main">
    <a-button type="primary" @click="open = !open">Begin Tour</a-button> open:
    {{ open }}
    <d-tour v-model="current" :open="open" :steps="steps" @close="open = false"></d-tour>
    <br/>
   <a-space>
    <button ref="b1">莫得时间覅U盾时候</button>
    <a-button type="primary" ref="b2">多少积分</a-button>
    
   </a-space>
   <div style="height: 400px"></div>
   <a-button type="primary" ref="b3">dsag sag打包</a-button>
  </div>
</template>

<script>
import img from '../../assets/logo.png'
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
          cover: img,
          target: () => this.$refs?.b1,
        },
        // {
        //   title: 'Save',
        //   description: 'Save your changes.',
        //   target: () => this.$refs?.b2.$el,
        // },
        {
          title: 'Other Actions',
          description: 'Click to see other actions.',
          target: () => this.$refs?.b3.$el,
        },
      ]
    }
  },
  mounted(){
    console.log(this.$refs)
  },
  methods: {},
}
</script>
<style scoped lang="less">
.tour-main{
  padding: 48px;
  padding-left: 300px;
}
</style>
