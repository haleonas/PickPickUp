<template>
  <div>
    <h2>Available products</h2>
    <ul>
      <li :key="product.id" v-for="product in products">{{product.name}} - {{product.price}} kr</li>
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
  },

  methods: {
    getProductsList() {
      fetch("http://localhost:3000/products")
      .then(response => response.json())
      .then(result => {
        this.products = result        
      console.log(result);
      
        
      })
      .catch(() =>{
        console.log({message: -1});
        
      })
      }
    }
  }
</script>

<style scoped>
</style>