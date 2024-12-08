<template>
  <api-table :dataSource="dataSource"></api-table>
</template>
<script>
import apiTableVue from "../../api-table.vue";
export default {
  components: {
    apiTableVue,
  },
  data() {
    return {
      dataSource: [
      {
          prop: "disabled",
          description: "右上角列设置对应是否可隐藏",
          type: "boolean",
          default: "-",
          version: "-",
        },
      {
          prop: "columns[n].scopedSlots.config",
          description: "对应 customRender 封装的可设置的自定义属性",
          type: "Object",
          default: "-",
          version: "-",
        },
        {
          prop: "columns[n].scopedSlots.status",
          description: "customRender: 'c-badge' 下的 状态（a-badge的status属性）",
          type: "Object",
          default: " {1: 'success',0: 'error',default: 'error'}",
          version: "-",
        },
        {
          prop: "columns[n].scopedSlots.txt",
          description: "customRender: 'c-badge' 下的 状态（a-badge的text属性）",
          type: "Object",
          default: "{ 1: '已启用',0: '已停用',  '-1': '已禁用',  default: '未知'}",
          version: "-",
        },
      ],
    };
  },
};
</script>
