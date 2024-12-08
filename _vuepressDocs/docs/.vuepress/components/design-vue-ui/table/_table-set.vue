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
          prop: "showTableSet",
          description: "是否显示列设置",
          type: "boolean",
          default: "true",
          version: "-",
        },
        {
          prop: "isCache",
          description: "是否需要缓存",
          type: "boolean",
          default: "false",
          version: "-",
        },
        {
          prop: "suffix",
          description: " 一个页面多个列表的时候 需要缓存的时候很有必要",
          type: "string",
          default: "-",
          version: "-",
        },
      ],
    };
  },
};
</script>
