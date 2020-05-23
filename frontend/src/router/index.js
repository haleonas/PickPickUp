import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Offers from '../views/Offers.vue'
import Products from "../views/Products"
import AddProduct from "../views/AddProduct"
import EditProduct from "../views/EditProduct";

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
        path: '/addproduct',
        name: 'addproduct',
        component: AddProduct
    },
    {
        path: '/editProduct',
        name:'editProduct',
        component: EditProduct,
        props: true
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
