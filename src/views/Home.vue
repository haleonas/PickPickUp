<template>
  <div class="home">
    <app-header titleText ="Home"></app-header>
  </div>
</template>

<script>
  import Header from '../components/Header.vue'
export default {
  name: 'Home',
  beforeMount() {
    this.setTitle()
  },
  methods:{
    setTitle(){
      document.title = 'Home'
    }
  },
  components: {
    appHeader: Header
  }
}
</script>
