export default {
  DTable: {
    comKeys: ['c-ddd', 'c-status'],
    // 自定义 组件集合
    comsConfig: {
      'c-ddd': {
        is: 'a-tag',
        txtType: 'text', // text prop
        txtRender(text, record) {
          const _obj = {
            0: '已停用',
            1: '已启用'
          }
          return _obj[text] || '未知元素'
        },
        bind: {
          // color: 'red'
        },
        bindObj: {
          color(text, record) {
            const _obj = {
              0: 'red',
              1: 'blue'
            }
            return _obj[text] || 'orange'
          }
        }
      },
      'c-status': {
        is: 'a-badge',
        txtType: 'prop', // text prop
       
        bind: {
          // color: 'red'
        },
        bindObj: {
          text(text, record) {
            const _obj = {
              1: '已启用',
              0: '已停用',
              '-1': '已禁用',
              default: '未知1'
            }
            return _obj[text] || _obj.default
          },
          status(text, record) {
            const _obj = {
              1: 'success',
              0: 'warning',
              default: 'error'
            }
            return _obj[text] || _obj.default
          }
        }
      }
    },
  }
}
