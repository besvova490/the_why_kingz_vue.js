import Vue from 'vue'
import VueRouter from 'vue-router'
import Cars from '../views/Cars.vue'
import CarPage from '../views/CarPage.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/cars',
    name: 'Cars',
    component: Cars
  },
  {
    path: '/cars/:vin',
    name: 'CarPage',
    component: CarPage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
