<template>
    <div>
        <p>
            Id: {{productObject['productId']}}
        </p>
        <p>
            Name: {{productObject['name']}}
        </p>
        <p>
            Price: {{productObject['price']}}
        </p>
        <router-link
                :to="{ name: 'editProduct',
           params: { productObject: productObject }}">
            Edit
        </router-link>
        <hr>
    </div>
</template>

<script>
    export default {
        name: "ProductItem",
        props: {
            productObject: Object
        },
        methods: {
            editItem() {
                this.$router.push(
                    {
                        path: '/editproduct',
                        query: {
                            productObject: this.productObject
                        }
                    })
            }
        }
    }
</script>

<style scoped>

</style>