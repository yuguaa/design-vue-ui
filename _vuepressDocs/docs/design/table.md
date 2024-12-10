# d-table 表格

## 何时使用


<br/>

扩展 `a-table` 组件: 

1. 自定义滑动横向滚动条（与原生滑动条互补）;
2. 增加一些固定的 row 选项回显效果 （c-index c-tip c-badge）
3. 当前组件主要是定制化使用，无定制建议不要使用
4. 如果只是为了使用 `sticky` 的效果，建议单独使用 `d-scroll-bar`

## 代码演示

<box single>
<tag text="基本">
<design-vue-ui-table-index />

:::slot content
支持大多数 `a-table` 的 `API` 属性，sticky 不生效，请检查父容器是否存在宽度或overflow等使  position: sticky; 不生效

常规功能大多支持
:::

::: slot sourceCode
<<< @/docs/.vuepress/components/design-vue-ui/table/index.vue
:::

</tag>
<tag text="支撑的几个常用 customRender">
<design-vue-ui-table-basic-props />

:::slot content
c-tip / c-badge / c-index

`c-index` : 序号，自动  
`c-tip`: 规定数外溢出鼠标移入效果显示  
`c-badge`: 状态控制，与 `a-badge` 的 status 属性绑定，可自定义，方式往下
:::

::: slot sourceCode
<<< @/docs/.vuepress/components/design-vue-ui/table/basic-props.vue
:::

</tag>
</box>

```js
export default {
  DTable: {
    comKeys: ['c-badge', 'c-tip'],
    // 自定义 组件集合
    comsConfig: {
      'c-badge': {
        is: 'a-badge',
        txtType: 'prop', // text prop
        // 原版bind
        bind: {},
        // 根据参数返回的bind
        bindObj: {
          text (text, record) {
            const _obj = {
              1: '已启用',
              0: '已停用',
              '-1': '已禁用',
              default: '未知'
            }
            return _obj[text] || _obj.default
          },
          status (text, record) {
            const _obj = {
              1: 'success',
              0: 'warning',
              default: 'error'
            }
            return _obj[text] || _obj.default
          }
        }
      },
      'c-tip': {
        is: 'd-tooltip',
        txtType: 'prop', // text prop
        // 原版bind
        bind: {},
        // 根据参数返回的bind
        bindObj: {
          content (text, record) {
            return text
          }
        }
      }
    }
  }
}
```

## API

### Table

> 支撑 `a-table` 多个属性

<design-vue-ui-table-_table />

### columns

> 继承 `a-table` 的 `columns` 属性

<design-vue-ui-table-_table-columns />

### columnSet

<design-vue-ui-table-_table-set />

### 事件 


> 对应 `a-table` 中的事件，并新增以下事件

<design-vue-ui-table-_table-event />