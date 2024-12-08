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
          prop: "showBtn",
          description: "是否显示按钮区域",
          type: "boolean",
          default: "true",
          version: "-",
        },
        {
          prop: "searchIcon",
          description: "搜索按钮的 icon type",
          type: "string",
          default: "-",
          version: "-",
        },
        {
          prop: "loading",
          description: "搜索按钮的加载状态",
          type: "boolean",
          default: "false",
          version: "-",
        },
        {
          prop: "spaceSize",
          description: "按钮区域间隔",
          type: "number",
          default: "8",
          version: "-",
        },
        {
          prop: "searchTxt",
          description: "搜索按钮显示文本",
          type: "string",
          default: "搜索",
          version: "-",
        },
        {
          prop: "resetTxt",
          description: "重置按钮显示文本",
          type: "string",
          default: "重置",
          version: "-",
        }
      ],
    };
  },
};
</script>
