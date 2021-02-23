import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name:"Recommend",
    component:()=>import('../views/Recommend')
  },
  {
    path:'/hot',
    name:"Hot",
    component:()=>import('../views/Hot')
  },
  {
    path:'/hot/:num',
    name:"Hot",
    component:()=>import('../views/Hot')
  },
  {
    path:'/search',
    name:"Search",
    component:()=>import('../views/Search'),
    props:true
  },
  {
    path:'/player/:musicID',
    name:"Player",
    component:()=>import('../views/Player'),
    props:true
  },
  {
    path:'/songlist',
    name:"Songlist",
    component:()=>import('../views/Songlist'),
    props:true
  },
  {
    path:'/songlist/:listID',
    name:"Songlist",
    component:()=>import('../views/Songlist'),
    props:true
  }
]

const router = new VueRouter({
  routes
})

export default router
