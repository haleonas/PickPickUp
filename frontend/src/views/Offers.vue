<template>
    <div >
        <app-header title-text="Offers"></app-header>

    </div>
</template>

<script>
    import Header from '../components/Header.vue'
    export default {
        name: "offers",
        beforeMount(){
            this.setTitle()
        },
        methods:{
          setTitle(){
              document.title = 'Offers'
          }
        },
        components:{
            appHeader:Header
        }
    }
</script>

<style scoped>

</style>