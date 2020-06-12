<template>
  <div id="add">
    <h1>Collect your order</h1>
    <br />
    <b-field label="Enter your order id:">
      <b-input type="number" v-model="orderNumber" placeholder="Order id..." />
    </b-field>
    <button @click="collectOrder">PickUp</button>
    <br />
    <br />
    <div>
      {{summary}}
      <br />
      <br />
      {{summary2}}
      {{orders.orderId}}
      <br />
      {{summary3}}
      {{orders.status}}
      <br />
      {{summary4}}
      {{orders.amount}}
    </div>
  </div>
</template>

<script>
//import axios from "axios";
export default {
  name: "Handshake",
  data() {
    return {
      orderNumber: 0,
      orders: [],

      summary: "",
      summary2: "",
      summary3: "",
      summary4: ""
    };
  },

  methods: {
    collectOrder() {
      if (this.orderNumber) {
        fetch("http://localhost:3000/orders")
          .then(response => response.json())
          .then(result => {
            console.log(result);

            let numb = Number(this.orderNumber);
            console.log(numb);

            for (var i = 0; i < result.length; i++) {
              if (
                result[i].orderId === numb &&
                result[i].status === "completed"
              ) {
                this.orders = result[i];
                console.log(this.orders);
              }
            }
          });
        this.summary = "Thank you for using Pick&PickUp. Your order details:";
        this.summary2 = " Your order id:";
        this.summary3 = " Your order status:";
        this.summary4 = " Total amount of ordered items:";
      } else {
        alert("Please enter your order id");
      }
    }
  }
};
</script>

<style scoped>
</style>