<template>
    <div id="create-product">
        <app-header title-text="Add Products"></app-header>
        <addProduct id="add-product"></addProduct>
    </div>
</template>

<script>
    import Header from '../components/Header.vue'
    import AddProduct from '../components/AddProduct.vue';

    export default {
        name: 'Product',
        components: {
            'addProduct': AddProduct,
            'appHeader': Header
        },
        beforeMount() {
            this.setTitle()
        },
        methods:{
            setTitle(){
                document.title = 'Add Products'
            }
        }

    }
</script>

<style scoped>
    #create-product{
        display: flex;
        flex-direction: column;
        flex-basis: 100%;
        justify-content: center;
    }
    #add-product{
        width: 25%;
        background: #EAFAFF;
        box-shadow: .15em .15em #d1d1d1;
        padding: 1.5em;
        border-radius: 20px;
        align-self: center;
    }
</style>