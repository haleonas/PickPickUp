<template>
    <div>
        <app-header title-text="Orders"></app-header>
        <app-order-list></app-order-list>
    </div>
</template>

<script>
    import Header from "../components/Header";
    import OrderList from "../components/OrderList";
    export default {
        name: "Orders",
        components:{
            appHeader: Header,
            appOrderList: OrderList
        },
        beforeMount() {
            this.setTitle()
        },
        methods:{
            setTitle(){
                document.title = 'Orders'
            }
        }
    }
</script>

<style scoped>

</style>