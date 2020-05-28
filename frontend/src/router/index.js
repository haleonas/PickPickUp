import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Offers from '../views/Offers.vue'
import Products from '../views/Products.vue'
import CreateProduct from '../views/CreateProduct.vue'
import AddOffer from "../views/AddOffer";

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
    path: '/products',
    name: 'Products',
    component: Products
  },
  {
    path: '/products/:new',
    name: 'Create-product',
    component: CreateProduct
  },
  {
    path: '/addoffer',
    name: 'AddOffer',
    component: AddOffer
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
