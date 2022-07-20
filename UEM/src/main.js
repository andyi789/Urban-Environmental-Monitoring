/*
 * @Description: main.js
 * @Author: Ronda
 * @Date: 2022-02-16 09:29:54
 * @LastEditors: Ronda
 * @LastEditTime: 2022-07-01 14:19:54
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style/layout.scss'
import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      ed: {
        engineer_id: 1,
        device_id: 3
      }
    }
  },
  mutations: {
    SET_ED(state, ed) {
      state.ed = ed;
    }
  }
})

createApp(App).use(router).use(store).mount('#app')
