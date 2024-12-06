<template>
  <div class="xm-main">
    <d-table :columns="columns" :dataSource="dataSource" :total="dataSource.length">
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
    width: '25%',
    scopedSlots: { customRender: 'name' },
  },
  {
    title: '年龄',
    dataIndex: 'age',
    width: '15%',
    scopedSlots: { customRender: 'age' },
  },
  {
    title: '地址',
    dataIndex: 'address',
    width: '40%',
    scopedSlots: { customRender: 'address' },
  },
  {
    title: '操作',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
  },
];

const data = [];
for (let i = 0; i < 4; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
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
