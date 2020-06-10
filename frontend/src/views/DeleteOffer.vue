<template>
    <div id="delete-offer">
        <app-header title-text="Delete Offer"></app-header>
        <form class="delete-offer-form">
            <b-input v-model="offerId" type="number"/>
            <button @click.prevent="setOfferID">Delete</button>
        </form>

        <form class="delete-offer-form" v-if="offer.offerId">
            <br>
            <button @click.prevent="editOffer" id="edit-offer-btn">Send</button>
            <div v-if="sendError">Fields incorrectly filled</div>
        </form>
    </div>
</template>

<script>
    import axios from 'axios'
    import Header from "../components/Header";

    export default {
        name: "DeleteOffer",
        data() {
            return {
                offerId: 0,
                offer: {},
                offerProducts: [],
                products: [],
                name: [],
                description: [],
                amounts: {},
                totalsum: 0,
                offerPrice: [],
                sendError: false,

                total: 1,
                current: 1,
                perPage: 3,
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
            appHeader: Header
        },
        computed: {
            paginatedItems() {
                let page_number = this.current - 1
                return this.offerProducts.slice(page_number * this.perPage, (page_number + 1) * this.perPage)
            }
        },
        beforeMount() {
            this.setTitle()
        },
        methods: {
            calcTotal() {
                this.totalsum = 0
                for (let i = 0; i < this.offerProducts.length; ++i) {
                    this.totalsum += (this.amounts[`price${i}`] * this.offerProducts[i]['price'])
                }
            },

            setTitle() {
                document.title = 'delete Offer';
            },

            setOfferID() {

                this.getOffer()
                this.getOfferproducts()

            },
            async getOffer() {
                const response = await axios.get('http://localhost:3000/offers', {
                    params: {offerId: this.offerId}
                })

                this.offer = response.data[0]

                console.log(this.offer)
            },

            async getOfferproducts() {
                this.offerProducts = []
                const response = await axios.get('http://localhost:3000/offerproducts', {
                    params: {offerId: this.offerId}
                })


                for (let i = 0; i < response.data.length; ++i) {
                    this.offerProducts.push(response.data[i])
                    this.amounts[`price${i}`] = response.data[i].amount
                }

                this.totalsum = 0
                for (let i = 0; i < this.offerProducts.length; ++i) {
                    this.totalsum += (this.amounts[`price${i}`] * this.offerProducts[i]['price'])
                }

            },

            async deleteOffer() {
                if (this.offer.name && this.offer.description) {
                    console.log('hi')
                    let offer = {}
                    offer['name'] = this.offer.name
                    offer['description'] = this.offer.description
                    if (this.offerPrice >= 1) {
                        offer['offerPrice'] = this.totalsum
                    } else {
                        offer['offerPrice'] = this.offer.offerPrice
                    }

                    let products = []

                    for (let i = 0; i < this.offerProducts.length; ++i) {
                        if (this.amounts[`price${i}`] !== 0) {
                            products.push({
                                productId: this.offerProducts[i]['productId'],
                                amount: this.amounts[`price${i}`]
                            })
                        }
                    }
                    console.log()

                    if (products.length > 0) {
                        const response = await axios.put('http://localhost:3000/editoffer', {
                            offerId: this.offer.offerId,
                            offer,
                            products
                        })

                        if (response.data.status === 1) {
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
            }
        }
    }

</script>

<style scoped>
    #delete-offer {
        display: flex;
        flex-direction: column;
        flex-basis: 100%;
        justify-content: center;
    }

    .delete-offer-form {
        width: 25%;
        background: #EAFAFF;
        box-shadow: .15em .15em #d1d1d1;
        padding: 1.5em;
        border-radius: 20px;
        align-self: center;
        margin-top: 1.5em;
    }

    #delete-offer-btn {
        margin-top: 1.5em;
    }
</style>