<template>
    <div>
        <app-header title-text="Products"></app-header>
        <router-link to="/products/addProduct">Add new item</router-link>
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
    a {
        font-size: 1.5em;
        font-weight: bold;
        color: #2c3e50;
    }

    a:hover {
        color: red;
    }
</style>