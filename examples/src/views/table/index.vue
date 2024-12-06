<template>
  <div>
    <h2 for="">常规</h2>
    <d-table
      :columns="columns"
      :dataSource="dataSource"
      @change="handleTableChange"
      @changeSize="changeSize"
    >
    <a slot="name" slot-scope="{text}">{{ text }}</a>
    </d-table>
    <c1Vue/>
    <c2Vue/>
  </div>
</template>
<script>
import c1Vue from './c1.vue'
import c2Vue from './c2.vue'
export default {
  components: {
    c1Vue,
    c2Vue
  },
  data () {
    const columns = [
    {
    title: '序号',
    dataIndex: 'index',
    width: '100px',
    scopedSlots: { customRender: 'c-index' },
  },
      {
        dataIndex: 'name',
        key: 'name',
        slots: { title: 'customTitle' },
        // customRender: 'name'
        scopedSlots: { customRender: 'name' }
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age'
      },
      {
        title: 'Long Column Long Column Long Column',
        dataIndex: 'address',
        key: 'address',
        ellipsis: true
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
    for (let index = 0; index < 17; index++) {
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
    },
    handleTableChange (pagination, filters, sorter) {
      console.log(pagination)
    },
    changeSize (page, pageSize) {
      console.log(page, pageSize)
    }
  }
}
</script>
