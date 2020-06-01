<template>
    <div id="edit-offer">
        <app-header title-text="Edit product"></app-header>


        <form id="edit-offer-item">
            Id: {{productObject["productId"]}}
                <b-field label="Current name:">
                    <b-input type="text" v-model="productObject['name']" id="name"></b-input>
                </b-field>
                <b-field label="Current price:">
                    <b-input type="number" min="0" v-model="productObject['price']" id="price"></b-input>
                </b-field>
            <button @click="updateProduct" id="update-product-btn">Update</button>
            <button @click="deleteProduct" id="delete-product-btn">Delete</button>
        </form>
    </div>
</template>

<script>
    import Header from "../components/Header";

    export default {
        name: "EditProduct",
        components: {appHeader: Header},
        props: {productObject: Object},
        methods: {
            async deleteProduct() {
                const response = await fetch("http://localhost:3000/products", {
                    "method": "DELETE",
                    "headers": {
                        "content-type": "application/json"
                    },
                    "body": JSON.stringify({productId: this.productObject['productId']})
                })
                const data = await response.json()
                if (data['message'] === 1) {
                    await this.$router.push({path: "/products"})
                } else {
                    alert("Something went wrong")
                }
            },
            async updateProduct() {
                const response = await fetch("http://localhost:3000/products", {
                    "method": "PUT",
                    "headers": {
                        "content-type": "application/json"
                    },
                    "body": JSON.stringify(this.productObject)
                })
                const data = response.json()
                if (data['message'] === -1) {
                    alert('Something went wrong')
                } else {
                    await this.$router.push({path: "/products"})
                }
            }
        }
    }
</script>

<style scoped>

    #labels {
        display: flex;
        flex-direction: column;
        flex-basis: 100%;
        justify-content: center;
    }

    #delete-product-btn {
        margin-top: 1.5em;
    }

    #update-product-btn {
        margin-top: 1.5em;
    }
    #edit-offer-item{
        width: 25%;
        background: #EAFAFF;
        box-shadow: .15em .15em #d1d1d1;
        padding: 1.5em;
        border-radius: 20px;
        align-self: center;
    }
    #edit-offer{
        display: flex;
        flex-direction: column;
    }
</style>