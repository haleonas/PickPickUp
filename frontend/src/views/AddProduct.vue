<template>
    <div>
        <app-header title-text="Add Product"></app-header>
        <form>
            <label for="name">Name of product: </label>
            <input type="text" v-model="name" id="name"/>
            <br>
            <label for="price">Price of product: </label>
            <input type="text" v-model="price" id="price"/>
            <br>
            <button @click.prevent="addToServer">Send</button>
        </form>

    </div>
</template>

<script>
    import Header from "../components/Header";

    export default {
        name: "AddProduct",
        components: {
            appHeader: Header
        },
        data() {
            return {
                name: "",
                price: 0
            }
        },
        methods: {
            async addToServer() {
                if (this.name && this.price > -1) {
                    const response = await fetch("http://localhost:3000/products", {
                        "method": "POST",
                        "headers": {
                            "content-type": "application/json"
                        },
                        "body":
                            JSON.stringify({ name:this.name, price: this.price })
                    })
                    const data = await response.json()

                    if(data['message'] === 1){
                        this.$router.push({path:"/products"})
                    } else {
                        alert('Something went wrong')
                    }

                } else {
                   alert('invalid input')
                }
            }
        }
    }
</script>

<style scoped>

</style>