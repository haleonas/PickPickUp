<template>
    <div id="header">
        <app-page-title></app-page-title>
        <app-links></app-links>
        <app-title :title-text="titleText"></app-title>
    </div>
</template>

<script>
    import Title from './Title.vue'
    import Links from './Links.vue'
    import PageTitle from "./PageTitle";

    export default {
        name: "Header",
        components: {
            appTitle: Title,
            appLinks: Links,
            appPageTitle: PageTitle
        },
        props: {
            titleText: String
        }
    }
</script>

<style scoped>


</style>