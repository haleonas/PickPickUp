<template>

    <div id="add-offer">
        <app-header title-text="Add Offer"></app-header>
        <form id="add-offer-form">
            <p>
                <b-field label="Name of Offer: ">
                    <b-input v-model="name"/>
                </b-field>

            </p>
            <p>
                <b-field label="Offer Description">
                    <b-input type="textarea" v-model="description">
                    </b-input>
                </b-field>
                <br>
            </p>
            <div>
                Products
                <b-pagination
                        :total="products.length"
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

                <div v-for="(product,index) in paginatedItems" :key="product.productId">
                    Product name: {{product.name}}
                    <br>
                    Price: {{product.price}}
                    <br>
                    <b-field>
                        <b-input type="number" min="0" @change.native="calcTotal"
                                 v-model="amounts[`price${index}`]"></b-input>
                    </b-field>
                    <hr>
                </div>

                <b-pagination
                        :total="products.length"
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

                <b-field label="Offer image" enctype="multipart/form-data">
                    <b-input type="file" name="someExpressFiles" @change.native="onFileSelected"
                             accept="image/*"></b-input>
                </b-field>

            </div>
            Total cost of products: {{totalsum}}
            <br>
            <b-field label="Price for the offer:">
                <b-input type="number" min="0" v-model="offerPrice"/>
            </b-field>
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
                totalsum: 0,
                offerPrice: 0,
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
                return this.products.slice(page_number * this.perPage, (page_number + 1) * this.perPage)
            }
        },
        beforeMount() {
            this.getProducts()
            this.setTitle()
        },
        methods: {
            onFileSelected(event) {
                this.picture = event.target.files[0]
            },
            async getProducts() {
                const response = await fetch('http://localhost:3000/products')
                const data = await response.json()
                for (let i = 0; i < data.length; ++i) {
                    this.products.push(data[i])
                    this.amounts[`price${i}`] = 0
                }
            },
            async addOffer() {
                console.log(this.picture)
                if (this.name && this.description) {
                    let offer = {}
                    offer['name'] = this.name
                    offer['description'] = this.description
                    if (this.picture) {
                        offer['offerPicture'] = this.picture.name
                    } else {
                        offer['offerPicture'] = "null"
                    }
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
                        if (this.picture) {
                            await this.uploadImage()
                        }
                        const response = await axios.post("http://localhost:3000/offers", {
                            offer,
                            products
                        })

                        if (response.data.message === 1) {
                            await this.$router.push({path: '/offers'})
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

                const response = axios.post('http://localhost:3000/upload', formData)

                console.log(response.data)
            },
            setTitle() {
                document.title = 'Add offer'
            },
            calcTotal() {
                this.totalsum = 0
                for (let i = 0; i < this.products.length; ++i) {
                    this.totalsum += (this.amounts[`price${i}`] * this.products[i]['price'])
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
</style>