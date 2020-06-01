<template>
    <div>
        <h2>Available products</h2>
        <ul id="product-list">
            <li :key="product.id" v-for="product in products">
                <p>{{product.name}} - {{product.price}} kr </p>
                <router-link :to="{ name: 'EditProduct',params: { productObject: product}}">
                    Edit
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "List",

        data() {
            return {
                products: []
            }
        },
        beforeMount() {
            this.getProductsList();
            this.setTitle()
        },

        methods: {
            getProductsList() {
                fetch("http://localhost:3000/products")
                    .then(response => response.json())
                    .then(result => {
                        this.products = result
                        console.log(result);
                    })
                    .catch(() => {
                        console.log({message: -1});

                    })
            },
            setTitle() {
                document.title = "Product list"
            }
        }
    }
</script>

<style scoped>
    li {
        width: 30%;
        border-radius: 20px;
        background: #EAFAFF;
        box-shadow: .15em .15em #d1d1d1;
        align-self: center;
        margin: .25em;
        padding: .5em;
        align-self: center;
    }

    #product-list {
        display: flex;
        flex-direction: column;
    }
</style>