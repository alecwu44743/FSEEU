<template>
  <p>{{ text }}</p>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'

const API_URL = "http://localhost:5038";

export default {
  name: 'Home',
  data() {
    return {
      text: "",
    }
  },
  methods: {
    async refreshData() {
      axios.get(API_URL+"/", {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("authTokenAccessToken")}`
        }
      })
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
