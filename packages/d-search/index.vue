<template>
  <a-form-model layout="inline" :model="model" class="d-search-form"
    ref="formRef">
    <slot></slot>
    <a-form-model-item v-if="showBtn">
      <a-space :size="spaceSize">
        <a-button type="primary" @click="handleSubmit" :loading="loading">
        <a-icon :type="searchIcon" v-if="searchIcon"></a-icon>
        {{searchTxt}}
      </a-button>
      <a-button type="reset" style="margin-left: 10px" @click="reset"> {{resetTxt}} </a-button>
      <slot name="btn"></slot>
      </a-space>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
import { FormModel, FormModelItem, Space, Button, Icon } from 'ant-design-vue'
export default {
  name: 'd-search',
  components: {
    AFormModel: FormModel,
    AFormModelItem: FormModelItem,
    ASpace: Space,
    AButton: Button,
    AIcon: Icon
  },
  props: {
    model: {
      type: Object,
      default: () => {
        return {}
      }
    },
    showBtn: {
      type: Boolean,
      default: true
    },
    searchIcon: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    spaceSize: {
      type: Number,
      default: 8
    },
    searchTxt: {
      type: String,
      default: '搜索'
    },
    resetTxt: {
      type: String,
      default: '重置'
    }
  },
  data () {
    return {
    }
  },
  methods: {
    handleSubmit (e) {
      this.$emit('ok')
    },
    reset () {
      this.$refs.formRef.resetFields()
      this.$emit('reset')
    }
  }
}
</script>
<style lang="less">
.d-search-form {
  display: grid;
  // flex-wrap: wrap;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  /* 三列，每列最小200px，最大宽度自适应 */
  gap: 24px;

  .ant-form-item {
    // flex: 1;
    // min-width: 300px;
    display: flex !important;
    margin: 0;

    .ant-form-item-label {
      // padding-left: 24px;
      // text-align: right;
    }

    .ant-form-item-control-wrapper {
      flex: 1 // width: 100%;
    }
  }
}
</style>
