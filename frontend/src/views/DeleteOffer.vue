<template>
    <div id="delete-offer">
        <app-header title-text="Delete Offer"></app-header>
        <form class="delete-offer-form">
            <b-input v-model="offerId" type="number"/>
            <button @click.prevent="setOfferID">Select</button>
        </form>

        <form class="delete-offer-form" v-if="offer.offerId">
            <p>
                <b-field label="Name of Offer: ">
                    <div>{{offer.name}}</div>
                </b-field>

            </p>

            <p>
                <b-field label="Offer Description">
                    <div>{{offer.description}}</div>
                </b-field>
                <br>
            </p>

            <div>
                Products

                <b-pagination
                        :total="offerProducts.length"
                        :current.sync="current"
                        :range-before="rangeBefore"
                        :range-after="rangeAfter"
                        :order="order"
                        :size="size"
                        :simple="isSimple"
                        :rounded="isRounded"
                        :per-page="perPage"
                        :icon-prev="prevIcon"
                        :icon-next="nextIcon">
                </b-pagination>

                <div v-for="(offerProduct) in paginatedItems" :key="offerProduct.productId">
                    Product name: {{offerProduct.name}}
                    <br>
                    Price: {{offerProduct.price}}
                    <br>
                </div>

                <b-pagination
                        :total="offerProducts.length"
                        :current.sync="current"
                        :range-before="rangeBefore"
                        :range-after="rangeAfter"
                        :order="order"
                        :size="size"
                        :simple="isSimple"
                        :rounded="isRounded"
                        :per-page="perPage"
                        :icon-prev="prevIcon"
                        :icon-next="nextIcon">
                </b-pagination>


            </div>
            Total cost of products: {{totalsum}}
            <br>
            <b-field label="Price for the offer:">
            <div>{{offer.offerPrice}}</div>
            </b-field>
            <br>
            <button @click.prevent="deleteOffer" id="delete-offer-btn">Delete</button>
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

                applicants: [
                    {
                        msg: ''
                    }
                ],
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
                document.title = 'Delete Offer';
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
                const response = await fetch("http://localhost:3000/offers", {
                    "method": "DELETE",
                    "headers": {
                        "content-type": "application/json"
                    },
                    "body": JSON.stringify({offerId: this.offer['offerId']})
                })
                const data = await response.json()

                if (data['status'] === -1) {
                    console.log(data.message)
                } else {
                    alert("Offer Deleted")
                    await this.$router.push({path: "/offers"})

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

        #delete-offer-btn {
        margin-top: 1.5em;
    }
</style>