<template>
  <d-search :model="formInline" :shrink="2">
    <a-form-model-item label="用户名">
      <a-input v-model="formInline.user" placeholder="请输入"></a-input>
    </a-form-model-item>
    <a-form-model-item label="用户编号">
      <a-input v-model="formInline.userNo" placeholder="请输入"></a-input>
    </a-form-model-item>
    <a-form-model-item label="用户年龄">
      <a-input v-model="formInline.age" placeholder="请输入"></a-input>
    </a-form-model-item>
    <a-form-model-item label="来源">
      <a-radio-group v-model="formInline.resource">
        <a-radio value="1">
          Sponsor
        </a-radio>
        <a-radio value="2">
          Venue
        </a-radio>
      </a-radio-group>
    </a-form-model-item>
    <!-- <a-form-model-item label="Activity zone" prop="region">
      <a-select v-model="formInline.region" placeholder="please select your zone">
        <a-select-option value="shanghai">
          Zone one
        </a-select-option>
        <a-select-option value="beijing">
          Zone two
        </a-select-option>
      </a-select>
    </a-form-model-item> -->
    <a-form-model-item label="Activity time" required prop="date1">
      <a-date-picker
        v-model="formInline.date1"
        show-time
        type="date"
        placeholder="Pick a date"
        style="width: 100%;"
      />
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
