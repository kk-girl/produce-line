import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Algorithm from '@/components/Algorithm.vue'
import Order from '@/components/Order.vue'
import OrderCreate from '@/components/OrderCreate.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    component: Home,
    redirect: '/algorithm',
    children: [
      { path: '/algorithm', component: Algorithm },
      { path: '/order', component: Order },
      { path: '/orderCreate', component: OrderCreate }
    ]
  }

]

const router = new VueRouter({
  routes
})

export default router
