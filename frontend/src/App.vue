<template>
    <div id="app">

        <router-view/>
    </div>
</template>
<script>

    export default {
        components: {}
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    input {
        border-radius: 5px;
        font-family: 'Hind', sans-serif;
    }

    button {
        background-color: #ffffff; /* Green */
        border: 2px solid #d1d1d1;
        color: black;
        padding: 10px 24px;
        text-align: center;

        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;

        transition-duration: .4s;
    }

    button:hover {
        background-color: #d1d1d1;
        border-radius: 10px;
    }

</style>
