<template>
    <div>
         <app-header title-text="Add Products"></app-header>
        <addProduct></addProduct>
       
    </div>
</template>

<script>
import Header from '../components/Header.vue'
import AddProduct from '../components/AddProduct.vue';

export default {
    name: 'Product',
    components: {
        'addProduct': AddProduct,
         'appHeader': Header
    },
    
}
</script>

<style scoped>

</style>