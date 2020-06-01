<template>
    <div id="add">
        <h2>Add new item</h2>
        <br/>
        <b-field label="Add product's name:">
            <b-input type="text" v-model="name" placeholder="Product name..."/>
        </b-field>
        <br/>
        <b-field label="Add product's price:">
            <b-input type="number" min="0" v-model="price" placeholder="Product price..."/>
        </b-field>

        <button @click="addProduct">Add</button>
        <br/>
        <div> {{item}}</div>
    </div>
</template>

<script>
    export default {
        name: "AddProduct",

        data() {
            return {
                name: "",
                price: 0,
                item: ""
            }
        },

        methods: {

            async addProduct() {
                if (this.name) {
                    this.item = 'A new item added: ' + this.name + ' ' + this.price + 'kr'
                    const response = await fetch("http://localhost:3000/products", {
                        "method": "POST",
                        "headers": {
                            "content-type": "application/json"
                        },
                        "body":
                            JSON.stringify({name: this.name, price: this.price})
                    })
                    const data = await response.json()
                    if (data.message === 1) {
                        await this.$router.push({path: '/products'})
                    } else {
                        alert('Something went wrong!')
                    }

                } else {
                    alert('Please enter the name of your product')
                }
            }
        }
    }
</script>

<style scoped>

</style>