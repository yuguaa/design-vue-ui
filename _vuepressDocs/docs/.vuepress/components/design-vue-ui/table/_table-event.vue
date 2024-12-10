<template>
  <api-table :dataSource="dataSource" columnsType="events"></api-table>
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
          name: "changeSize",
          description: "当页码改变时，调用此函数",
          callbackProp: "function(current, pageSize)",
        },
        {
          name: "setColumns",
          description: "需要手动设置一下右上角的列设置",
          callbackProp: "function(columns)",
        },
      ],
    };
  },
};
</script>
