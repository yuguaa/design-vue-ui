
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
