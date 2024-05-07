<template>
  <div class="about">
    <h1>{{ text }}</h1>
  </div>
</template>

<script>
  import axios from 'axios'

  const API_URL = "http://localhost:5038";

  export default {
    name: 'App',
    data() {
      return {
        text: "",
      }
    },
    methods: {
      async refreshData() {
        axios.get(API_URL+"/helloworld")
        .then((response)=>{
          this.text=response.data;
        })
      }
    },
    mounted: function() {
      this.refreshData();
    }
  }
</script>