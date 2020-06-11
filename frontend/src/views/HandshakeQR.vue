<template>
    <div id="handshakeQR">
    <app-header title-text="PickUp"></app-header>
    <handshake id="handshake"></handshake>
    </div>
</template>

<script>
import Header from '../components/Header.vue'
import Handshake from '../components/Handshake.vue';

export default {
        name: 'HandshakeQR',
        components: {
            'appHeader': Header,
            'handshake': Handshake
        },
}

</script>

<style scoped>
 #handshakeQR{
        display: flex;
        flex-direction: column;
        flex-basis: 100%;
        justify-content: center;
    }
    #handshake{
        width: 25%;
        background: #EAFAFF;
        box-shadow: .15em .15em #d1d1d1;
        padding: 1.5em;
        border-radius: 20px;
        align-self: center;
    }

</style>