<template>
  <div id="add">
    <h2>Add new item</h2>
    <label>Add product's name:</label>
    <br />
    <input type="text" v-model="name" placeholder="Product name..." />
    <br />
    <label>Add product's price:</label>
    <br />
    <input type="text" v-model="price" placeholder="Product price..." />
    <br />

    <button @click="addProduct">Add</button>
    <br />
    <div> {{item}}</div>
  </div>
</template>

<script>
export default {
  name: "AddProduct",

  data() {
    return {
      name: "",
      price: "",
      item: ""
    }
  },

methods: {
    addProduct(){
        this.item = 'A new item added: '  + this.name + ' ' + this.price + 'kr'
    }

}

  }
</script>

<style scoped>
input {
  border: 1px solid black;
  margin: 5px;
}
</style>