<template>
    <div id="offer-list">
        <app-offer-item v-for="offer in offers" :key="offer.offerId" :offer="offer"></app-offer-item>
    </div>
</template>

<script>
    import OfferItem from "./OfferItem";
    import axios from 'axios'

    export default {
        name: "OfferList",
        data() {
            return {
                offers: {}
            }
        },
        components: {
            appOfferItem: OfferItem,
        },
        beforeMount() {
            this.getOffers()
        },
        methods: {
            async getOffers() {
                const response = await axios.get('http://localhost:3000/offers')
                this.offers = response.data
            }
        }
    }
</script>

<style scoped>
    #offer-list {
        display: flex;
        flex-direction: column;
    }


</style>