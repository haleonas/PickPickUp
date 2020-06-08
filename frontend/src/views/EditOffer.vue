<template>



  <div id="edit-offer">
  <app-header title-text="Edit Offer"></app-header>
              <form class="edit-offer-form">
              <b-input v-model="offerId" type="number"/>
              <button @click="setOfferID">Send</button>
              </form>

<form class="edit-offer-form" v-if="offer.offerId">
                <p>
                    <b-field label="Name of Offer: ">
                        <b-input v-model="offer.name"/>
                    </b-field>

                </p>

                <p>
                    <b-field label="Offer Description">
                        <b-input type="textarea" v-model="offer.description">
                        </b-input>
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

                    <div v-for="(offerProduct,index) in paginatedItems" :key="offerProduct.productId">
                        Product name: {{offerProduct.name}}
                        <br>
                        Price: {{offerProduct.price}}
                        <br>
                        <b-field>
                            <b-input type="number" min="0"  @change.native="calcTotal" v-model="amounts[`price${index}`]" ></b-input>
                        </b-field>
                        <hr>
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
                    <b-input type="number" min="0" v-model="offer.offerPrice"/>
                </b-field>
                <br>
                <button @click.prevent="editOffer" id="edit-offer-btn">Send</button>
                <div v-if="sendError">Fields incorrectly filled</div>

</form>


            <!-- <form class="edit-offer-form">

               

            </form> -->
    </div>
</template>

<script>
    import axios from 'axios'
    import Header from "../components/Header";

    export default {
        name: "EditOffer",
        data() {
            return {

applicants:[
       {
      msg: ''       }
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
                this.totalsum  = 0
                for (let i = 0; i < this.offerProducts.length; ++i) {
                    this.totalsum += (this.amounts[`price${i}`] * this.offerProducts[i]['price'])
                }
            },

        setTitle(){
        document.title='Edit Offer';
        },

            setOfferID() {

                this.getOffer()
                this.getOfferproducts()

            },
            async getOffer() {
                const response = await axios.get('http://localhost:3000/offers',{
                    params:{offerId: this.offerId}
                })

                this.offer=response.data[0]
                
                console.log(this.offer)
                    },

            async getOfferproducts() {
                this.offerProducts=[]
                const response = await axios.get('http://localhost:3000/offerproducts',{
                    params:{offerId: this.offerId}
                })


                    for (let i = 0; i < response.data.length; ++i) {
                    this.offerProducts.push(response.data[i])
                    this.amounts[`price${i}`] = response.data[i].amount
                }
                this.totalsum =0

                for (let i = 0; i < this.offerProducts.length; ++i) {
                        this.totalsum += (this.amounts[`price${i}`] * this.offerProducts[i]['price'])
                }

            },

            async editOffer() {
                if (this.offer.name && this.offer.description) {
                    console.log('hi')
                    let offer = {}
                    offer['name'] = this.offer.name
                    offer['description'] = this.offer.description
                    if (this.offerPrice >= 1) {
                        offer['offerPrice'] = this.offer.offerPrice
                    } else {
                        offer['offerPrice'] = this.totalsum
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
                                            console.log(this.offerProducts.length)

                    if (products.length > 0) {
                        console.log('hi2')
                        const response = await axios.put('http://localhost:3000/editoffer', {
                            offerId: this.offer.offerId,
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
            }}}

</script>

<style scoped>
    #edit-offer {
        display: flex;
        flex-direction: column;
        flex-basis: 100%;
        justify-content: center;
    }

    .edit-offer-form {
        width: 25%;
        background: #EAFAFF;
        box-shadow: .15em .15em #d1d1d1;
        padding: 1.5em;
        border-radius: 20px;
        align-self: center;
        margin-top: 1.5em;
    }

    #edit-offer-btn {
        margin-top: 1.5em;
    }
</style>