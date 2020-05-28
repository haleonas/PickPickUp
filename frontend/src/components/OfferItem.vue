<template>
        <div id="offer-item">
            <p>Id: {{offer.offerId}}</p>
            <p> Name: {{offer.name}} </p>
            <p> Description: {{offer.description}} </p>
            <p> Price: {{offer.offerPrice}} </p>
            <p>Products: {{offer.products}} </p>
        </div>
</template>

<script>
    export default {
        name: "OfferItem",
        props: {
            offer: Object
        }
    }

</script>

<style scoped>
    p {
        margin: .1em;
    }

    #offer-item {
        width: 30%;
        border-radius: 20px;
        background: #EAFAFF;
        box-shadow: .15em .15em #d1d1d1;
        align-self: center;
        margin: .25em;
        padding: .5em;
    }






</style>