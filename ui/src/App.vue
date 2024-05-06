<template>
  <h3>Todo App</h3>
  <b style="color: aquamarine;">* {{ text }}</b>
</template>

<script>
import axios from 'axios'

const API_URL = "http://localhost:5038";

export default {
  name: 'App',
  data(){
    return{
      text: '',
    }
  },
  methods: {
    async getData(){
      axios.get(API_URL+ "/helloworld")
      .then((response)=>{
        this.text= response.data;
      })
    }
  },
  mounted() {
    this.getData();
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
