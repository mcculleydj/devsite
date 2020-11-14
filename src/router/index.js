import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('@/views/Projects'),
  },
  {
    path: '/d3',
    name: 'd3',
    component: () => import('@/views/MasteringD3'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
