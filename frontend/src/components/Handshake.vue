<template>
    <div id="add">
        <h1>Collect your order</h1>
        <br/>
        <b-field label="Enter your order id:">
            <b-input type="number" v-model="orderNumber" placeholder="Order id..."/>
        </b-field>
        <button @click="collectOrder">PickUp</button>
        <br/>
        <br/>
        <div>
            {{summary}}
            <br/>
            <br/>
            {{summary2}}
            {{orders.orderId}}
            <br/>
            {{summary3}}
            <br/>
            {{summary4}}
            {{orders.amount}}
        </div>
    </div>
</template>

<script>
    import axios from "axios";

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
        props: {
            order: Object
        },

        methods: {
            async collectOrder() {
                if (this.orderNumber > 0) {
                    await fetch("http://localhost:3000/orders")
                        .then(response => response.json())
                        .then(result => {

                            let numb = Number(this.orderNumber);

                            for (var i = 0; i < result.length; i++) {
                                if (
                                    result[i].orderId === numb &&
                                    result[i].status === "completed"
                                ) {
                                    this.orders = result[i];
                                }
                            }
                        });
                    this.summary = "Thank you for using Pick&PickUp. Your order details:";
                    this.summary2 = " Your order id:";
                    this.summary3 = " Your order status: COLLECTED";
                    this.summary4 = " Total amount of ordered items:";
                } else {
                    alert("Please enter your order id");
                }

                if(this.orders.status === 'completed'){
                    const response = await axios.put("http://localhost:3000/orders", {
                        orderId: this.orders.orderId,
                        status: "collected"
                    });
                    if (response.data === "Update has been successful") {
                        this.$router.go(0);
                    }
                }
            }
        }
    };
</script>

<style scoped>
</style>