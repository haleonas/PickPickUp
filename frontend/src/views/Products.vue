<template>
    <div>
         <app-header title-text="Products"></app-header>
      
        <button><router-link to="/products/addProduct">Add new item</router-link></button>
    </div>
</template>

<script>
import Header from '../components/Header.vue'


export default {
    name: 'Product',
    components: {
         'appHeader': Header
    },
/*
    created(){
        fetch('http://localhost:3000')
        .then(response => response.json())
        .then(result =>{
            console.log(result);
            
        }) 
    } */

    
}
</script>

<style scoped>

</style>