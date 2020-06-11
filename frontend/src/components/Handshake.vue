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
      {{summary}} <br><br>
      {{summary2}} <br>
      {{orders.orderId}} <br>
      {{summary3}} <br>
      {{orders.status}}<br>
      {{summary4}} <br>
       {{orders.amount}}
        </div>

    </div>
</template>

<script>


export default {
    
    name: "Handshake",
    data() {
        return {
            orderNumber: 3,
            orders: [],
            summary: "",    
            summary2: "",
            summary3: "",
            summary4:""      
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

                    this.summary = 'Thank you for using Pick&PickUp. Please find below your order details'
                    this.summary2 = ' Your order id:'
                    this.summary3 = ' Your order status:'
                    this.summary4 = ' Total amount of ordered items:'

       }

            }
}


</script>

<style scoped>

</style>