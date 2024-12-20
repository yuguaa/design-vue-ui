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
      dataSource: [],
    };
  },
};
</script>
