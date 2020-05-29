<template>
    <div id="home">
        <app-header title-text="Home"></app-header>

    </div>
</template>

<script>
    import Header from "../components/Header";

    export default {
        name: "Home",
        components: {
            appHeader: Header
        },beforeMount() {
            this.setTitle()
        },
        methods:{
            setTitle(){
                document.title = 'Home'
            }
        }
    }
</script>

<style scoped>
    #home{
        flex-basis: 100%;
    }
</style>