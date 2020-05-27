import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Offers from '../views/Offers.vue'
import AddOffer from "../views/AddOffer";
import test from "../views/test";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/offers',
    name: 'Offers',
    component: Offers
  },
  {
    path: '/addoffer',
    name: 'AddOffer',
    component: AddOffer
  },
  {
    path: '/test',
    name: 'Test',
    component: test
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router
