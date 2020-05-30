<template>
    <div>
        <app-header></app-header>
        {{product}}
        <!--
        (label) -> id: productId
        (input field)

        -->



    </div>
</template>

<script>
    import Header from "../components/Header";
    export default {
        name: "EditProduct",
        components:{
            appHeader: Header
        },
        props:{
            product: Object
        }
    }
</script>

<style scoped>

</style>