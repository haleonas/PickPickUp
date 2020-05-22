<template>
    <div>
        <app-title  :title-text="titleText"></app-title>
        <app-links></app-links>
    </div>
</template>

<script>
import Title from './Title.vue'
import Links from './Links.vue'
    export default {
        name: "Header",
        components : {
            appTitle: Title,
            appLinks: Links
        },
        props:{
            titleText: String
        }
    }
</script>