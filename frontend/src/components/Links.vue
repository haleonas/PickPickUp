<template>
    <div id="nav">
        <router-link to="/">Home</router-link>
        <router-link to="/offers">Offers</router-link>
        <router-link to="/products">Products</router-link>
        <router-link to="/orders">Orders</router-link>
        <router-link to="/pickup">PickUp</router-link>
    </div>
</template>

<script>
    export default {
        name: "Links"
    }
</script>

<style scoped>
    #nav {
        background: #EAFAFF;
        box-shadow: .15em .15em #d1d1d1;
        padding: .75em;
        font-size: 1.5em;
        display: flex;
        justify-content: space-evenly;
    }

    #nav a {
        font-weight: bold;
        color: #2c3e50;
    }

    #nav a.router-link-exact-active {
        color: #42b983;
    }

    #nav a:hover {
        color: red;
    }
</style>