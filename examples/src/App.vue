<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <router-view />
    </div>
  </a-config-provider>

</template>
<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
export default {
  data() {
    return {
      locale: zhCN,
    }
  },
}
</script>
<style lang="less">
.xm-main {
  padding: 48px;

  h2 {
    margin: 24px 0;
  }
}
</style>
