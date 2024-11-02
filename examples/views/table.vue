<template>
 <div>
    <div style="height: 1500px;"></div>
    <d-table
    :columns="columns"
    :dataSource="dataSource"
    @setColumns="setColumns"
    :showPag="false"
    sticky
    rowKey="key"
    :scroll="{ x: 800 }"
  >
    <a slot="name" slot-scope="{ text }">{{ text }}</a>
    <span slot="customTitle"><a-icon type="smile-o" /> Name</span>
    <span slot="action" slot-scope="{  record }">
      <a>Invite 一 {{ record.name }}</a>
      <a-divider type="vertical" />
      <a>Delete</a>
      <a-divider type="vertical" />
      <a class="ant-dropdown-link"> More actions <a-icon type="down" /> </a>
    </span>
  </d-table>
  <div style="height: 500px;"></div>
 </div>
</template>
<script>
export default {
  data () {
    const columns = [
      {
        dataIndex: 'name',
        key: 'name',
        slots: { title: 'customTitle' },
        scopedSlots: { customRender: 'name' }
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age'
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address'
      },
      {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        scopedSlots: { customRender: 'tags' }
      },
      {
        title: 'Action',
        key: 'action',
        scopedSlots: { customRender: 'action' }
      }
    ]
    return {
      columns,
      dataSource: []
    }
  },
  created () {
    const dataSource = []
    for (let index = 0; index < 4; index++) {
      dataSource.push({
        key: index,
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser']
      })
    }
    this.dataSource = dataSource
  },
  methods: {
    setColumns (value) {
      this.columns = value
    }
  }
}
</script>
