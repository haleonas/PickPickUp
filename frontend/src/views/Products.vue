<template>
    <div>
         <app-header title-text="Products"></app-header>
        <button><router-link to="/products/addProduct">Add new item</router-link></button>
        <list></list>
    </div>
</template>

<script>
import Header from '../components/Header.vue'
import List from '../components/List.vue'

export default {
    name: 'Product',
    components: {
         'appHeader': Header,
         'list': List
    },


    
}
</script>

<style scoped>

</style>