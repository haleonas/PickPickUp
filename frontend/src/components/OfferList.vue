<template>
    <div id="offer-list">
        <b-pagination
                :total="offers.length"
                :current.sync="current"
                :range-before="rangeBefore"
                :range-after="rangeAfter"
                :order="order"
                :size="size"
                :simple="isSimple"
                :rounded="isRounded"
                :per-page="perPage"
                :icon-prev="prevIcon"
                :icon-next="nextIcon">
        </b-pagination>
        <app-offer-item v-for="offer in paginatedItems" :key="offer.offerId" :offer="offer"></app-offer-item>

        <b-pagination
                :total="offers.length"
                :current.sync="current"
                :range-before="rangeBefore"
                :range-after="rangeAfter"
                :order="order"
                :size="size"
                :simple="isSimple"
                :rounded="isRounded"
                :per-page="perPage"
                :icon-prev="prevIcon"
                :icon-next="nextIcon">
        </b-pagination>

    </div>
</template>

<script>
    import OfferItem from "./OfferItem";
    import axios from 'axios'

    export default {
        name: "OfferList",
        data() {
            return {
                offers: [],

                total: 1,
                current: 1,
                perPage: 5,
                rangeBefore: 1,
                rangeAfter: 1,
                order: 'is-centered',
                size: '',
                isSimple: false,
                isRounded: true,
                prevIcon: 'arrow-left',
                nextIcon: 'arrow-right'
            }
        },
        components: {
            appOfferItem: OfferItem,
        },
        computed: {
            paginatedItems() {
                let page_number = this.current - 1
                return this.offers.slice(page_number * this.perPage, (page_number + 1) * this.perPage)
            }
        },
        beforeMount() {
            this.getOffers()
        },
        methods: {
            async getOffers() {
                const response = await axios.get('http://localhost:3000/offers17')
                for (let i = 0; i < response.data.length; i++) {
                    this.offers.push(response.data[i])
                }
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