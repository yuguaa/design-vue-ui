<template>
  <div class="xm-main">
    <d-table
      :columns="columns"
      :dataSource="dataSource"
      :total="dataSource.length"
    >
    </d-table>
    <d-table
      :columns="columns"
      :dataSource="dataSource"
      @setColumns="setColumns"
      :showPag="false"
      sticky
      rowKey="key"
      :scroll="{ x: 800 }"
    >
    </d-table>
  </div>
</template>
<script>
const columns = [
  {
    title: 'name',
    dataIndex: 'name',
    width: '25%',
    scopedSlots: { customRender: 'name' },
  },
  {
    title: 'age',
    dataIndex: 'age',
    width: '15%',
    scopedSlots: { customRender: 'age' },
  },
  {
    title: 'address',
    dataIndex: 'address',
    width: '40%',
    scopedSlots: { customRender: 'address' },
  },
  {
    title: 'operation',
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
    setColumns (value) {
      this.columns = value
    }
  }
};
</script>
