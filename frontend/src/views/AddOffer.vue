<template>

    <div id="add-offer">
            <app-header title-text="Add Offer"></app-header>
            <form id="add-offer-form">
                <p>
                    <label for="name">Name of Offers: </label>
                    <input type="text" id="name" v-model="name"/>
                </p>
                <p>
                    <label for="name">Description of Offers: </label>
                    <br>
                    <textarea type="text" id="offer-description" v-model="description" rows="5" cols="40"/>
                </p>
                <div>
                    Products
                    <div v-for="(product,index) in products" :key="product.productId">
                        Product name: {{product.name}}
                        <br>
                        Price: {{product.price}}
                        <br>
                        <input type="number" @change="calcTotal" v-model="amounts[`price${index}`]">
                        <hr>
                    </div>
                </div>
                Total cost of products: {{total}}
                <br>
                <label for="offerPrice">Price for the offer: </label>
                <input type="number" v-model="offerPrice" id="offerPrice">
                <br>
                <button @click.prevent="addOffer" id="add-offer-btn">Send</button>
                <div v-if="sendError">Fields incorrectly filled</div>
            </form>
    </div>
</template>

<script>
    import axios from 'axios'
    import Header from "../components/Header";

    export default {
        name: "AddOffer",
        data() {
            return {
                name: "",
                description: "",
                products: [],
                amounts: {},
                total: 0,
                offerPrice: 0,
                sendError: false
            }
        },
        components: {
            appHeader: Header
        },
        beforeMount() {
            this.getProducts()
            this.setTitle()
        },
        methods: {
            async getProducts() {
                const response = await fetch('http://localhost:3000/products')
                const data = await response.json()
                for (let i = 0; i < data.length; ++i) {
                    this.products.push(data[i])
                    this.amounts[`price${i}`] = 0
                }
            },
            async addOffer() {
                if (this.name && this.description) {
                    let offer = {}
                    offer['name'] = this.name
                    offer['description'] = this.description
                    if (this.offerPrice >= 1) {
                        offer['offerPrice'] = this.offerPrice
                    } else {
                        offer['offerPrice'] = this.total
                    }

                    let products = []

                    for (let i = 0; i < this.products.length; ++i) {
                        if (this.amounts[`price${i}`] !== 0) {
                            products.push({
                                productId: this.products[i]['productId'],
                                amount: this.amounts[`price${i}`]
                            })
                        }
                    }
                    if (products.length > 0) {
                        const response = await axios.post("http://localhost:3000/offers", {
                            offer,
                            products
                        })

                        if (response.data.message === 1) {
                            await this.$router.push({path: '/offers'})
                        } else {
                            alert('Something went wrong')
                        }
                    } else {
                        this.sendError = true
                    }
                } else {
                    this.sendError = true
                }
            },
            setTitle() {
                document.title = 'Add offer'
            },
            calcTotal() {
                this.total = 0
                for (let i = 0; i < this.products.length; ++i) {
                    if (this.amounts[`price${i}`] < 0) {
                        this.amounts[`price${i}`] = 0
                    } else {
                        this.total += (this.amounts[`price${i}`] * this.products[i]['price'])
                    }
                }
            }
        }
    }
</script>

<style scoped>
    #add-offer {
        display: flex;
        flex-direction: column;
        flex-basis: 100%;
        justify-content: center;
    }

    #add-offer-form {
        width: 25%;
        background: #EAFAFF;
        box-shadow: .15em .15em #d1d1d1;
        padding: 1.5em;
        border-radius: 20px;
        align-self: center;
    }

    #add-offer-btn {
        margin-top: 1.5em;
    }

    textarea {
        border-radius: 5px;
        font-family: 'Hind', sans-serif;
        box-shadow: .15em .15em #d1d1d1;
        border: 1px solid #b1b1b1;
        resize: none;

    }

</style>