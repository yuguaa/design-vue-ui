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
          name: "ok",
          description: "点击搜索按钮触发",
          callbackProp: "function( )",
        },
        {
          name: "reset",
          description: "点击重置按钮触发",
          callbackProp: "function()",
        },
      ],
    };
  },
};
</script>
