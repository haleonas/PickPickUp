<template>
    <div id="order-list">
        <app-order-item v-for="order in orders" :key="order.orderId" :order="order"></app-order-item>
    </div>
</template>

<script>
    import OrderItem from "./OrderItem";
    import axios from 'axios'
    export default {
        name: "OrderList",
        data(){
          return {
              orders:[]
          }
        },
        components:{
            appOrderItem: OrderItem
        },
        beforeMount() {
            this.getOrders()
        },
        methods:{
            async getOrders(){
                const response = await axios.get('http://localhost:3000/orders')
                this.orders = response.data
            }
        }
    }
</script>

<style scoped>
    #order-list {
        display: flex;
        flex-direction: column;
    }

</style>