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
          prop: "current(v-model)",
          description: "当前 steps 的下标",
          type: "number",
          default: "0",
          version: "-",
        },
        {
          prop: "mask",
          description: "是否启用蒙层，可传入配置 {color?: string;} ",
          type: "boolean，object",
          default: "true",
          version: "-",
        },
        {
          prop: "open",
          description: "打开引导",
          type: "boolean",
          default: "false",
          version: "-",
        },
        {
          prop: "steps",
          description: "步骤（看下面API）--可对应 slot: default",
          type: "array",
          default: "[]",
          version: "-",
        },
        {
          prop: "millisecond",
          description: "遇到滑动时的延迟时间",
          type: "number",
          default: "500",
          version: "-",
        },
        {
          prop: "boxW",
          description: "引导界面宽度",
          type: "number",
          default: "520",
          version: "-",
        },
        {
          prop: "zIndex",
          description: "引导框 z-index 层级",
          type: "number",
          default: "1001",
          version: "-",
        },
        {
          prop: "indicators",
          description: "自定义指示器",
          type:  'v-slot:indicators="{current, total}',
          default: '-',
          version: "-",
        }
      ],
    };
  },
};
</script>
