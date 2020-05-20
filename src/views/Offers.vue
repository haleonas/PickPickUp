<template>
    <div >
        <app-header title-text="Offers"></app-header>
        <app-product-list></app-product-list>
    </div>
</template>

<script>
    import Header from '../components/Header.vue'
    import ProductList from "../components/ProductList";
    export default {
        name: "offers",
        beforeMount(){
            this.setTitle()
        },
        methods:{
          setTitle(){
              document.title = 'Offers'
          }
        },
        components:{
            appHeader:Header,
            appProductList: ProductList
        }
    }
</script>

<style scoped>

</style>