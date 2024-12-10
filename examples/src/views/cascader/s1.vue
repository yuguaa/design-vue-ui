<template>
  <d-cascader
    :options="options"
    placeholder="请选择"
    style="width: 200px"
    v-model="form.selectValue"
    @change="cascaderChange"
    :fieldNames="fieldNames"
    showSearch
    allow-resize
  ></d-cascader>
</template>
<script>
import baseMixin from './baseMixin'
export default {
  mixins: [baseMixin],
  data() {
    return {
      formInline: {},
    }
  },
}
</script>
