<template>
    <div>
        <router-link to="/addoffer">Add Offer</router-link>
        <app-offer-item></app-offer-item>
    </div>
</template>

<script>
    import OfferItem from "./OfferItem";
    export default {
        name: "OfferList",
        components:{
            appOfferItem:OfferItem
        }
    }
</script>

<style scoped>

</style>