<template>
    <div id="edit-offer">
        <app-header title-text="Edit Offer"></app-header>
        <form class="edit-offer-form">
            <b-input v-model="offerId" type="number"/>
            <button @click.prevent="setOfferID">Select</button>
        </form>

        <form class="edit-offer-form" v-if="offer.offerId">
            <p>
                <b-field label="Name of Offer: ">
                    <b-input v-model="offer.name" />
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
                        <b-input type="number" min="0" @change.native="calcTotal"
                                 v-model="amounts[`price${index}`]"></b-input>
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
                <img :src="imageUrl" width="100" height="100">
                <b-field label="Offer image" enctype="multipart/form-data">
                    <b-input type="file" name="someExpressFiles" @change.native="onFileSelected"
                             accept="image/*"></b-input>
                </b-field>

            </div>

            Total cost of products: {{totalsum}}
            <br>
            <b-field label="Price for the offer:">
                <b-input type="number" min="0" v-model="offer.offerPrice"/>
            </b-field>
            <br>
            <button @click.prevent="editOffer" id="edit-offer-btn">Edit</button>
            <button @click.prevent="deleteOffer" id="delete-offer-btn">Delete</button>
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
                imageUrl: "http://localhost:3000/pictures?image=no_image.jpg",
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
                picture: null,


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
        mounted() {
                this.uploadImage()
        },
        methods: {
                        onFileSelected(event) {
                this.picture = event.target.files[0]
            },
            calcTotal() {
                this.totalsum = 0
                for (let i = 0; i < this.offerProducts.length; ++i) {
                    this.totalsum += (this.amounts[`price${i}`] * this.offerProducts[i]['price'])
                }
            },

            setTitle() {
                document.title = 'Edit Offer';
            },

            setOfferID() {

                this.getOffer()
                this.getOfferproducts()
                this.uploadImage()
            },
            async getOffer() {
                const response = await axios.get('http://localhost:3000/offers', {
                    params: {offerId: this.offerId}
                })

                this.offer = response.data[0]
                this.imageUrl = "http://localhost:3000/pictures?image="+this.offer.offerPicture

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

            async editOffer() {
                if (this.offer.name && this.offer.description) {
                    console.log('hi')
                    let offer = {}
                    offer['name'] = this.offer.name
                    offer['description'] = this.offer.description
                                        if (this.picture) {
                        offer['offerPicture'] = this.picture.name
                    } else {
                        offer['offerPicture'] = "no_image.jpg"
                    }
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
                             if (this.picture) {
                            await this.uploadImage()
                        }
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
            },
            async uploadImage() {
                const formData = new FormData()
                formData.append('image', this.picture)

                await axios.post('http://localhost:3000/upload', formData)
                this.imageUrl = "http://localhost:3000/pictures?image="+this.picture

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

                if (data['message'] === 1) {
                    await this.$router.push({path: "/offers"})
                } else {
                    alert("Offer Deleted")
                    await this.$router.push({path: "/offers"})

                }
            }
        }
    }

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

        #delete-offer-btn {
        margin-top: 1.5em;
    }
</style>