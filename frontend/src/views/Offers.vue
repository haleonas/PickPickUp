<template>
    <div >
        <app-header title-text="Offers"></app-header>
        <app-offer-list></app-offer-list>

    </div>
</template>

<script>
    import Header from '../components/Header.vue'
    import OfferList from "../components/OfferList"
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
            appHeader:Header,
            appOfferList:OfferList
        }
    }
</script>

<style scoped>

</style>