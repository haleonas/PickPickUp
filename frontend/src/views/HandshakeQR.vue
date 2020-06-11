<template>
    <div id="handshake">
    <app-header title-text="PickUp"></app-header>
    <handshake></handshake>
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


</style>