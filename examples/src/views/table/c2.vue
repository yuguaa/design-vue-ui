<template>
  <div>
    <h2>scroll-bar 滑动</h2>
    <div style="display: flex">
      <div style="position: relative; width: 400px">
        <div
          class="demo1"
          style="height: 800px; overflow-y: auto; position: relative"
        >
          <div style="height: 1000px"></div>
          <a-table
            :columns="columns"
            :data-source="dataSource"
            :scroll="{ x: 1200 }"
          >
            <a slot="name" slot-scope="text">{{ text }}</a>
            <span slot="customTitle"><a-icon type="smile-o" /> Name</span>
            <template slot="footer" slot-scope="currentPageData">
              Footer
              {{ currentPageData }}
            </template>
            <template slot="nnnn" slot-scope="text"> {{ text }}213 </template>
          </a-table>
        </div>
        <DScrollBar scrollNodeEl=".demo1 .ant-table-body" rootEl=".demo1" />
      </div>
      <div style="width: 400px; height: 600px"></div>
      <div style="width: 400px">
        <d-table
          :columns="columns"
          :dataSource="dataSource"
          @setColumns="setColumns"
          sticky
          rowKey="key"
          :scroll="{ x: 800 }"
        >
          <a slot="name" slot-scope="{ text }">{{ text }}</a>
          <span slot="customTitle"><a-icon type="smile-o" /> Name</span>
          <span slot="action" slot-scope="{ record }">
            <a>Invite 一 {{ record.name }}</a>
            <a-divider type="vertical" />
            <a>Delete</a>
            <a-divider type="vertical" />
            <a class="ant-dropdown-link">
              More actions <a-icon type="down" />
            </a>
          </span>
        </d-table>
        <div style="height: 500px"></div>
      </div>
    </div>
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
