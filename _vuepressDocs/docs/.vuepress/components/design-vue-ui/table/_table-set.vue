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
      ],
    };
  },
};
</script>
