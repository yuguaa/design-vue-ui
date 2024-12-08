<template>
  <div class="xm-main">
    <d-table :columns="columns" :dataSource="dataSource" :total="dataSource.length" @setColumns="setColumns">
      <template #operation>
        <a-space>
          <a-button type="link" block>禁用</a-button>
        </a-space>
      </template>
    </d-table>
  </div>
</template>
<script>
const columns = [
  {
    title: '序号',
    dataIndex: 'index',
    width: '100px',
    scopedSlots: { customRender: 'c-index' },
  },
  {
    title: '姓名',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' },
  },
  {
    title: '年龄',
    dataIndex: 'age',
    scopedSlots: { customRender: 'age' },
  },
  {
    title: '地址',
    dataIndex: 'address',
    scopedSlots: {
      customRender: 'c-tip',
      // 对应 d-tooltip 的属性 ( content 除外)
      config: {
        len: 12, // 默认 9
      }
    },
  },
  {
    title: '启用状态',
    dataIndex: 'status',
    scopedSlots: { customRender: 'c-badge' },
  },
  {
    title: '自定义状态',
    dataIndex: 'cusStatus',
    scopedSlots: { 
      customRender: 'c-badge',
      status: {
        1: 'processing',
        0: 'error',
        2: 'warning'
      },
      txt: {
        1: '进行中',
        2: '已撤回',
        0: '失败'
      }
     },
  },
  {
    title: '操作',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
  },
];

const data = [];
for (let i = 0; i < 24; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `中华人民共和国-四川省-巴拉巴拉市-巴拉巴拉去${i}`,
    status: i % 3,
    cusStatus: i % 3,
  });
}
export default {
  data() {
    return {
      dataSource: data,
      columns,
    };
  },
  methods: {
    setColumns(value) {
      this.columns = value
    }
  }
};
</script>
