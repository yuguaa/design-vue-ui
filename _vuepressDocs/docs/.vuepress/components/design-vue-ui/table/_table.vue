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
          prop: "columns",
          description: "表格列的配置描述(具体项见下表)",
          type: "array",
          default: "-",
          version: "-",
        },
        {
          prop: "pagination",
          description: "分页器",
          type: "object",
          default: "{ current: 1, pageSize: 10}",
          version: "-",
        },
        {
          prop: "scrollNodeQuery",
          description: "滚动的节点(sticky 为 true 时生效)",
          type: "string | element",
          default: ".xm_global_table .ant-table-body",
          version: "-",
        },
        {
          prop: "sticky",
          description: "设置粘性底部滚动条",
          type: "boolean",
          default: "false",
          version: "-",
        },
        {
          prop: "rootEl",
          description: "基于什么节点滚动的(sticky 为 true 时生效)",
          type: "string | element",
          default: "-",
          version: "-",
        },
        {
          prop: "columnSet",
          description: "列表设置 -自定义列表需要的属性",
          type: "Object",
          default: "{ showTableSet: true, isCache: false,suffix: ''}",
          version: "-",
        }
      ],
    };
  },
};
</script>
