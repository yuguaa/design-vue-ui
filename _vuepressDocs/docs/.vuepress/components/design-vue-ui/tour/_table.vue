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
          prop: "watermarkType",
          description: "水印类型：'text' 或 'image'",
          type: "string",
          default: "text",
          version: "-",
        },
        {
          prop: "text",
          description: "水印文本",
          type: "string",
          default: "DESIGN-VUE-U",
          version: "-",
        },
        {
          prop: "fontSize",
          description: "字体大小",
          type: "string",
          default: "20px",
          version: "-",
        },
        {
          prop: "angle",
          description: "角度",
          type: "number",
          default: "-30",
          version: "-",
        },
        {
          prop: "opacity",
          description: "透明度",
          type: "number",
          default: "0.1",
          version: "-",
        },
        {
          prop: "zIndex",
          description: "z-index",
          type: "number",
          default: "1000",
          version: "-",
        },
        {
          prop: "imageUrl",
          description: "图片水印的 URL",
          type: "string",
          default: "-",
          version: "-",
        },
        {
          prop: "imageWidth",
          description: "图片宽度",
          type: "number",
          default: "100",
          version: "-",
        },
        {
          prop: "imageHeight",
          description: "图片高度",
          type: "number",
          default: "100",
          version: "-",
        },
      ],
    };
  },
};
</script>
