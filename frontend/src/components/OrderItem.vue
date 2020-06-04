<template>
    <div id="order-item">

        <p> Id: {{order.orderId}}</p>
        <p> Status: {{order.status}}</p>
        <p> Ordered By: {{order.orderedBy}}</p>
        <p> Amount: {{order.amount}}</p>
        <p> Offer: {{offer.name}}</p>
        <p> Total price: {{(offer.offerPrice * order.amount).toFixed(2)}}:-</p>
        <p> Time to delivery: {{timeMessage}}</p>
        <p> Delivery Time: {{deliveryTime}}</p>
        Products:
        <li v-for="(product,index) in products" :key="index">
            {{product.amount * order.amount}} {{product.name}}/s
        </li>
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
    import moment from 'moment'

    export default {
        name: "OrderItem",
        data() {
            return {
                products: [],
                offer: {},
                timeMessage: "",
                deliveryTime: Date,
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
            this.calcTime()
        },
        methods: {
            async calcTime() {
                const timeLeft = this.order.orderTime - moment().unix()

                switch (true) {
                    case timeLeft > 3600: {
                        this.timeMessage = "More than 1hour left"
                        break
                    }
                    case timeLeft < 3600 && timeLeft > 600: {

                        this.timeMessage = "Less than 1hour left"
                        break
                    }
                    case timeLeft < 600 && timeLeft > 0: {
                        this.timeMessage = "Less than 10min left"
                        break
                    }
                    case timeLeft < 0: {
                        this.timeMessage = "Delivery time"
                        break
                    }
                    default: {
                        console.log('lol va i')
                        break
                    }
                }

                this.deliveryTime = moment.unix(this.order.orderTime).format('DD-MM-YYYY HH:mm:ss')

            },
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