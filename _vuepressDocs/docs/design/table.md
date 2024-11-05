# d-table 表格

## 何时使用


<br/>

扩展 `a-table` 组件，增加了: 

1. 自定义滑动横向滚动条（与原生滑动条互补）;
2. 增加一些固定的 row 选项回显效果 （c-index c-tip c-badge）

## 代码演示

<box single>
<tag text="基本">
<design-vue-ui-table-index />

:::slot content
支持大多数 `a-select` 的 `API` 属性，

mode 为 tags 并 手动输入添加的 未支持

常规功能大多支持
:::

::: slot sourceCode
<<< @/docs/.vuepress/components/design-vue-ui/table/index.vue
:::

</tag>
</box>

## API