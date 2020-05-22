<template>
    <div>
        Productlist
    </div>
</template>

<script>
    export default {
        name: "ProductList",
        beforeMount() {
            this.getStoreOffers()
        },
        methods:{
            getStoreOffers(){
                console.log('ost')
            }
        }
    }
</script>

<style scoped>

</style>