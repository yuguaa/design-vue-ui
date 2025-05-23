import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/index.vue'

Vue.use(VueRouter)

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/cascader',
    name: 'cascader',
    component: () => import('../views/cascader/index.vue'),
    meta: {
      title: 'cascader 多选级联'
    }
  },
  {
    path: '/table',
    name: 'table',
    component: () => import('../views/table/index.vue'),
    meta: {
      title: 'table'
    }
  },
  {
    path: '/textarea',
    name: 'textarea',
    component: () => import('../views/textarea'),
    meta: {
      title: 'textarea 文本域'
    }
  },
  {
    path: '/input',
    name: 'input',
    component: () => import('../views/input'),
    meta: {
      title: 'input 文本'
    }
  },
  {
    path: '/input-number',
    name: 'input-number',
    component: () => import('../views/input-number'),
    meta: {
      title: 'input-number 文本数字'
    }
  },
  {
    path: '/select',
    name: 'select',
    component: () => import('../views/select'),
    meta: {
      title: 'select 选择框'
    }
  },
  {
    path: '/multiple-select',
    name: 'multiple-select',
    component: () => import('../views/multiple-select'),
    meta: {
      title: 'multiple-select 多个下拉框'
    }
  },
  {
    path: '/date-picker',
    name: 'date-picker',
    component: () => import('../views/date-picker'),
    meta: {
      title: 'date-picker 日期选择器'
    }
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/search/index.vue'),
    meta: {
      title: 'search 自定义搜索'
    }
  },
  {
    path: '/watermark',
    name: 'watermark',
    component: () => import('../views/watermark/index.vue'),
    meta: {
      title: 'watermark 水印'
    }
  },
  {
    path: '/tour',
    name: 'tour',
    component: () => import('../views/tour/index.vue'),
    meta: {
      title: 'tour 漫游式引导'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
