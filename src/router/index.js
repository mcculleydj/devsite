import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'
import Sandbox from '@/views/Sandbox'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'layout',
    component: Layout,
  },
  // TODO: remove Sandbox in final version
  {
    path: '/sandbox',
    name: 'sandbox',
    component: Sandbox,
  },
  {
    path: '/d3',
    name: 'd3',
    component: () => import('@/views/MasteringD3'),
  },
  {
    path: '/vuerx',
    name: 'vuerx',
    component: () => import('@/views/VueRx'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
