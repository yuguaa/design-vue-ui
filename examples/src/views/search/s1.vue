<template>
  <d-search>
    <a-form-model-item label="用户名">
      <a-input v-model="formInline.user" placeholder="Username">
        <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
      </a-input>
    </a-form-model-item>
    <a-form-model-item label="用户名">
      <a-input v-model="formInline.user" placeholder="Username">
        <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
      </a-input>
    </a-form-model-item>
  </d-search>
</template>
<script>
export default {
  data() {
    return {
      formInline: {},
    }
  },
}
</script>
