<template>
    <div>
        <app-header title-text="Products"></app-header>
        <app-product-list></app-product-list>
    </div>

</template>

<script>
    import Header from "../components/Header";
    import ProductList from "../components/ProductList";
    export default {
        name: "Products",
        components:{
            appHeader:Header,
            appProductList: ProductList
        },
        beforeMount() {
            this.setTitle()
        },
        methods:{
            setTitle(){
                document.title = "Products"
            }
        }
    }
</script>

<style scoped>

</style>