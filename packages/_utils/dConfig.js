export default {
  searchConfig: {
    searchCol: {
      sm: 24,
      md: 8,
      lg: 8,
      xl: 8,
      xxl: 6
    },
    comps: {
      input: 'a-input',
      select: 'd-select',
      cascader: 'd-cascader',
      mSelect: 'd-multiple-select',
      number: 'd-input-number'
    },
    searchBind: {
      allowClear: true,
      autoComplete: 'off',
      style: 'width: 100%'
    },
    btn: {
      search: {
        text: '搜索',
        icon: '',
        type: 'primary',
        show: true
      },
      reset: {
        text: '重置', // 按钮文本
        icon: '', // icon
        type: 'reset', // 按钮类型
        show: true, // 是否显示
        isSearch: false // 点击重置是否搜索
      }
    }
  }
}
