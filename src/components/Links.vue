<template>

    <div id="nav">
        <router-link to="/">Home</router-link>
        <router-link to="/offers">Offers</router-link>
    </div>
</template>

<script>
    export default {
        name: "Links"
    }
</script>

<style scoped>

    #nav {
        padding: 30px;
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
</style>