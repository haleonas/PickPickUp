<template>
    <div id="offers">
        <app-header title-text="Offers"></app-header>
        <router-link to="/addoffer">Add Offer</router-link>
        <router-link to="/editoffer">Edit Offer</router-link>
        <router-link to="/deleteoffer">Delete Offer</router-link>
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
        },
        data(){
            return{
                total: 1,
                current: 1,
                perPage: 3,
                rangeBefore: 1,
                rangeAfter: 1,
                order: '',
                size: '',
                isSimple: false,
                isRounded: false,
                prevIcon: 'chevron-left',
                nextIcon: 'chevron-right'
            }
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