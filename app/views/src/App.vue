<template>
  <head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossorigin="anonymous">
  </head>

  <body>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">FSEEU</a>
        
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/">動態</a>
            </li>
            
          </ul>

          <ul class="navbar-nav">
            <li class="nav-item">
              <a v-if="!isLoggedIn" class="nav-link" href="/signin">登入</a>
              <a v-else>{{ username }}</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </body>

  <router-view/>
</template>

<script>

export default{
  name: 'App',
  data() {
    return {
      isLoggedIn: false,
      username: null,
    }
  },
  methods: {
    getUser(){
      this.username= localStorage.getItem("authTokenUsername");

      if(this.username){
        this.isLoggedIn= true;
      }
      else{
        this.isLoggedIn= false;
      }
    }
  },
  mounted: function() {
    this.getUser();
  }
  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
