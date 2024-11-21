<template>
  <d-search :opts="opts"></d-search>
</template>
<script>
import allRegion from '../../json/allRegion.json'
export default {
  data () {
    return {
      opts: [
        {
          label: '账号',
          param: 'account',
          type: 'input',
          bind: {
            placeholder: '请输入',
            allowClear: false
          },
          on: {
            change: (e) => {
              console.log(e.target.value)
            }
          }
        },
        {
          label: '年龄',
          param: 'age',
          type: 'number',
          bind: {
            placeholder: '请输入'
            // disabled: true
          }
        },
        {
          label: 'cascader',
          param: 'status1',
          type: 'cascader',
          bind: {
            placeholder: '请选择',
            options: allRegion,
            fieldNames: { label: 'name', value: 'code', children: 'areaList' }
          }
        },
        {
          label: 'mSelect',
          param: 'mSelect',
          type: 'mSelect',
          bind: {
            placeholder: '请选择',
            options: allRegion,
            maxLevel: 3,
            defaultLevel: 3,
            fieldNames: { label: 'name', value: 'code', children: 'areaList' }
          }
        },
        {
          label: '状态',
          param: 'status',
          type: 'select',
          bind: {
            placeholder: '请选择',
            options: [
              {
                label: '待处理',
                value: '1'
              },
              {
                label: '已请求',
                value: '2'
              }
            ]
          }
        },
        {
          label: 'radio',
          param: 'radio',
          type: 'radio',
          bind: {
            placeholder: '请选择'
          },
          customRender: () => {
            return 234
          }
        }
      ]
    }
  }
}
</script>
