import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const explore = () => import('../views/explore/explore')
const profile = () => import(/* webpackChunkName: "about" */ '../views/profile/profile')
const ground= () => import('@/views/ground/ground')
const Svideo= () => import('@/views/video/Svideo')
const songlist= () => import('@/views/songlist/songlist')
const list= () => import('@/views/list/list')
const song= () => import('@/views/song/songplay')
const routes = [
  {
    path: '/',
    redirect: 'explore'
  },
  {
    path: '/explore',
    name: 'explore',
    component: explore,
  },
  {
    path: '/profile',
    name: 'profile',
    component: profile
  },
  {
    path: '/ground',
    name: 'ground',
    component: ground
  },
  {
    path: '/video',
    name: 'video',
    component: Svideo
  },
  {
    path: '/songlist',
    name: 'songlist',
    component: songlist
  },
  {
    path: '/list',
    name: 'list',
    component: list,
    query: '?id=Id'
  },
  {
    path: '/song',
    name: 'song',
    component: song,
    query: '?songid=id'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
