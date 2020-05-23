<template>
    <div>
        <h2>Productlist</h2>
        <button @click="addProduct">Add Product</button>
        <app-product-item v-for="item in productlist" :key="item['productId']" :product-object="item"></app-product-item>
    </div>
</template>

<script>
    //import axios from 'axios'
    import ProductItem from "./ProductItem";
    export default {
        name: "ProductList",
        data(){
            return {
                productlist: []
            }
        },
        components:{
            appProductItem: ProductItem
        },
        mounted() {
            this.getProducts()
        },
        methods:{
            async getProducts(){
                const response = await fetch('http://localhost:3000/products')
                const data = await response.json()

                for(let i = 0; i < data.length; i++){
                    this.productlist.push(data[i])
                }
            },
            addProduct(){
                this.$router.push({path:'/addproduct'})
            }
        }
    }
</script>

<style scoped>

</style>