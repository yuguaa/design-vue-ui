<template>
  <a-form-model layout="inline" class="d-search-form" ref="formRef" v-bind="$attrs" :class="{'d-search-form-more': isExpandable}">
    <div ref="slotContent" class="d-slot-form-item"
      :style="{ maxHeight: isCollapsed ? `${boxH}px` : 'none', overflow: isCollapsed ? 'hidden' : 'visible' }">
      <slot></slot>
      <!-- 展开折叠按钮始终显示 -->
      <a-button v-if="isExpandable && shrink" type="link" @click="toggleCollapse" class="expand-collapse-btn">
        {{ isCollapsed ? '展开' : '收起' }}
      </a-button>
      <a-form-model-item v-if="showBtn && !isCollapsed">
        <a-space :size="spaceSize">
          <a-button type="primary" @click="handleSubmit" :loading="loading">
            <a-icon :type="searchIcon" v-if="searchIcon"></a-icon>
            {{ searchTxt }}
          </a-button>
          <a-button type="reset" style="margin-left: 10px" @click="reset"> {{ resetTxt }} </a-button>
          <slot name="btn"></slot>
        </a-space>
      </a-form-model-item>
    </div>

    <a-form-model-item v-if="showBtn && isCollapsed && shrink" style="margin-top: 24px;">
      <a-space :size="spaceSize">
        <a-button type="primary" @click="handleSubmit" :loading="loading">
          <a-icon :type="searchIcon" v-if="searchIcon"></a-icon>
          {{ searchTxt }}
        </a-button>
        <a-button type="reset" style="margin-left: 10px" @click="reset"> {{ resetTxt }} </a-button>
        <slot name="btn"></slot>
      </a-space>
    </a-form-model-item>

  </a-form-model>
</template>
<script>
import { FormModel, Space, Button, Icon } from 'ant-design-vue'

export default {
  name: 'd-search-model',
  components: {
    AFormModel: FormModel,
    AFormModelItem: FormModel.Item,
    ASpace: Space,
    AButton: Button,
    AIcon: Icon
  },
  props: {
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
    },
    shrink: {
      type: [Boolean, Number], // 是否开放展开收缩 Number代表超过几行显示
      default: false
    }
  },
  data () {
    return {
      isCollapsed: false, // 控制内容是否折叠
      isExpandable: false // 是否显示展开折叠按钮
    }
  },
  computed: {
    boxH () {
      const num = Number(this.shrink)
      if (!num) return 0
      return 40 * num + (num - 1) * 24
    }
  },
  mounted () {
    this.shrink && this.checkSlotContent()
  },
  methods: {
    // 处理表单提交
    handleSubmit (e) {
      this.$emit('ok')
    },

    // 处理重置操作
    reset () {
      this.$refs.formRef.resetFields()
      this.$emit('reset')
    },

    // 判断插槽内容是否超出一行
    checkSlotContent () {
      const slotElement = this.$refs.slotContent

      if (slotElement) {
        const scrollHeight = slotElement.scrollHeight
        const num = Number(this.shrink)
        // 如果内容高度大于可视高度，说明内容超过一行
        this.isExpandable = scrollHeight > 40 * num + (num - 1) * 24
      }
    },

    // 切换展开/折叠
    toggleCollapse () {
      this.isCollapsed = !this.isCollapsed
    }
  }
}
</script>
<style lang="less">
.d-search-form {
  position: relative;
  &.d-search-form-more{
    padding-right: 30px;
  }
  .d-slot-form-item {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 24px;
  }

  .ant-form-item {
    display: flex !important;
    margin: 0;

    &.ant-form-item-with-help {
      margin-bottom: 0;
    }

    .ant-form-item-control-wrapper {
      flex: 1;
    }
  }

  .expand-collapse-btn {
    position: absolute;
    right: -0;
    top: 4px;
    padding: 0;
    font-size: 14px;
  }
}
</style>
