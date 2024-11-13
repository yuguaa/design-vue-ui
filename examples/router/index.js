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
    component: () => import('../views/cascader'),
    meta: {
      title: 'cascader 多选级联'
    }
  },
  {
    path: '/table',
    name: 'table',
    component: () => import('../views/table'),
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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
