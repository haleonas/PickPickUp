<template>
    <div id="add">
     <h1>Collect your order</h1>
        <br/>
        <b-field label="Enter your order's id:">
            <b-input type="number" v-model="orderNumber" placeholder="Order id..."/>
        </b-field>
        <button @click="collectOrder">PickUp</button>
        <br/>
        <br/>
        <div>

      <p>  Thank you for using Pick&PickUp </p>
        Please find below your order details<br/>
      
       Your order status: {{orders.status}} <br/>
       Your personal id: {{orders.userId}} <br/>
       Your order id: {{orders.orderId}} <br/>
       Total amount of items: {{orders.amount}}
      
        </div>

    </div>
</template>

<script>


export default {
    
    name: "Handshake",
    data() {
        return {
            orderNumber: 3,
            orders: []
            
          
        }
    },

    methods: {
            collectOrder(){
           fetch("http://localhost:3000/orders")
                    .then(response => response.json())
                    .then(result => {
console.log(result)
                     for(var i = 0; i < result.length; i++){
                         if(this.orderNumber === result[i].orderId && result[i].status === 'completed')
                         {
                         this.orders = result[i]
                     
                          
                     }
                     }
            
                    })

       }

            }
}


</script>

<style scoped>

</style>