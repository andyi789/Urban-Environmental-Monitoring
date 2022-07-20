/*
 * @Description: 
 * @Author: charles
 * @Date: 2021-05-05 16:37:55
 * @LastEditors: Ronda
 * @LastEditTime: 2022-05-18 17:22:48
 */
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/government'
  },
  {
    path: '/government',
    name: 'Government',
    component: () => import('../pages/government/index.vue')
  },
  /*  {
    path: '/my',
    name: 'My',
    component: () => import('../pages/my/index.vue')
   } */
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
