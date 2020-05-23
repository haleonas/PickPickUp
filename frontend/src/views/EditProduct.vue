<template>
    <div>
        <app-header title-text="Edit product"></app-header>
        Id: {{productObject['productId']}}
        <form>
            <p>
                <label for="name">Current name: </label>
                <input type="text" v-model="productObject['name']" id="name">
            </p>
            <p>
                <label for="price">Current price: </label>
                <input type="text" v-model="productObject['price']" id="price">
            </p>
            <button @click="updateProduct">Update</button>
        </form>

        <button @click="deleteProduct">Delete</button>
    </div>
</template>

<script>
    import Header from "../components/Header";

    export default {
        name: "EditProduct",
        components: {
            appHeader: Header
        },
        props: {
            productObject: Object
        },
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
                    alert('Something went wrong')
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
                }
            }
        }
    }
</script>

<style scoped>

</style>