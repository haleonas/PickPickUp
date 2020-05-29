<template>
    <div id="order-item">

        <p> Id: {{order.orderId}}</p>
        <p> Status: {{order.status}}</p>
        <p> Ordered By: {{order.orderedBy}}</p>
        <p> Amount: {{order.amount}}</p>
        <p> Offer: {{offer.name}}</p>
        <p> Total price: {{offer.offerPrice * order.amount}}:-</p>
        Products:
        <li v-for="(product,index) in products" :key="index">{{product.amount}} {{product.name}}/s</li>
        <section v-if="order.status !=='completed' && order.status !=='declined'">
            <span v-if="!accepted && order.status !=='in progress' ">
                <button @click="acceptOrder"> Accept</button> <button @click="declineOrder"> Decline</button>
            </span>
            <span v-if="accepted === 'yes' && !completed && order.status ==='in progress'">
                <button @click="orderComplete">Completed?</button>
            </span>
        </section>

    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "OrderItem",
        data() {
            return {
                products: [],
                offer: {},
                accepted: "",
                completed: false
            }
        },
        props: {
            order: Object,
        },
        beforeMount() {
            this.getOffer()
            this.getProducts()
        },
        methods: {
            async getOffer() {

                const response = await axios.get('http://localhost:3000/offers', {
                    params: {
                        offerId: this.order.offerId
                    }
                })
                this.offer = response.data[0]

                if (this.order.status === 'in progress') {
                    this.accepted = 'yes'
                }
            },
            async getProducts() {
                const response = await axios.get('http://localhost:3000/offerproducts', {
                    params: {
                        offerId: this.order.offerId
                    }
                })
                this.products = response.data
            },
            async acceptOrder() {
                //skicka status (in progress) till servern
                const response = await axios.put('http://localhost:3000/orders', {
                    orderId: this.order.orderId,
                    status: 'in progress'
                })
                if (response.data === 'YAY') {
                    this.accepted = 'yes'
                    this.$router.go(0)
                }
            },
            async declineOrder() {
                //skicka status (declined) till servern
                const response = await axios.put('http://localhost:3000/orders', {
                    orderId: this.order.orderId,
                    status: 'declined'
                })

                if (response.data === 'YAY') {
                    this.accepted = 'no'
                    this.$router.go(0)
                }

            },
            async orderComplete() {
                //skicka status (declined) till servern
                const response = await axios.put('http://localhost:3000/orders', {
                    orderId: this.order.orderId,
                    status: 'completed'
                })

                if (response.data === 'YAY') {
                    this.completed = true
                    this.$router.go(0)
                }
            }
        }
    }
</script>

<style scoped>
    p {
        margin: .1em;
    }

    #order-item {
        width: 30%;
        border-radius: 20px;
        background: #EAFAFF;
        box-shadow: .15em .15em #d1d1d1;
        align-self: center;
        margin: .25em;
        padding: .5em;
    }

</style>