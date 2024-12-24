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
            prop: "title",
            description: "标题",
            type: "string",
            default: "-",
            version: "-",
          },
          {
            prop: "description",
            description: "描述",
            type: "string",
            default: "-",
            version: "-",
          },
          {
            prop: "cover",
            description: "图片src",
            type: "string",
            default: "-",
            version: "-",
          },
          {
            prop: "target",
            description: "获取引导卡片指向的元素",
            type: "()=> HTMLElement",
            default: "-",
            version: "-",
          },
        ],
      };
    },
  };
  </script>
  