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
          prop: "columns[n].scopedSlots.bind",
          description: "对应 customRender 封装的可设置的自定义属性",
          type: "Object",
          default: "-",
          version: "-",
        },
        {
          prop: "columns[n].scopedSlots.bindObj",
          description: "与上面的 dConfig 的 bindObj 类似",
          type: "Object",
          default: "-",
          version: "-",
        }
      ],
    };
  },
};
</script>
