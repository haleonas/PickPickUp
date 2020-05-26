<template>
    <div id="offers">
        <app-header title-text="Offers"></app-header>
        <router-link to="/addoffer">Add Offer</router-link>
        <hr>
        <app-offer-list id="offer-list"></app-offer-list>
    </div>
</template>

<script>
    import Header from '../components/Header.vue'
    import OfferList from "../components/OfferList"

    export default {
        name: "offers",

        beforeMount() {
            this.setTitle()
        },
        methods: {
            setTitle() {
                document.title = 'Offers'
            }
        },
        components: {
            appHeader: Header,
            appOfferList: OfferList
        }
    }
</script>

<style scoped>
    #offers {
        flex-basis: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    a {
        font-size: 1.5em;
        font-weight: bold;
        color: #2c3e50;
    }

    a:hover {
        color: red;
    }
</style>