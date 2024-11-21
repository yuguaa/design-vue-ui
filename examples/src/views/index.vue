<template>
  <div class="menu-main">
    <div v-for="item in arr.filter(v=>v.meta)" :key="item.name" class="item-box" @click="itemClick(item)">
      {{item.meta.title}}
    </div>
  </div>
</template>
<script>
import { routes } from '../router/index'
export default {
  data () {
    return {
      arr: routes
    }
  },
  methods: {
    itemClick (item) {
      this.$router.push({
        path: item.path
      })
    }
  }
}
</script>
<style lang="less" scoped>
.menu-main{
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  .item-box{
    width: 200px;
    height: 100px;
    cursor: pointer;
    border-radius: 4px;
    border: 1px solid #444;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover{
      box-shadow: 2px 4px 5px #666;
    }
  }
}

</style>
