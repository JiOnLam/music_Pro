import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
let playingMusic = {
  musicID: 0,
  isSearch: true,
  isResult: false,
  isTopNav:true,
  listID:0,
  nowList:[]
}
new Vue({
  router,
  data: {
    playingMusic
  },
  render: h => h(App)
}).$mount('#app')
