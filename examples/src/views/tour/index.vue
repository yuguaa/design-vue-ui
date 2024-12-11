<template>
  <div class="tour-main">
    <a-button type="primary" @click="open = !open">Begin Tour</a-button> open: {{ open }}
    <d-tour :open="open"></d-tour>
  </div>
</template>

<script>
export default {
  data() {
    return {
        open: false
    }
  },
  methods: {},
}
</script>
<style scoped lang="less"></style>
