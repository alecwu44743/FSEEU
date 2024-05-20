<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">FSEEU</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
  
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/">動態</a>
          </li>
          <li class="nav-item">
              <a v-if="isLoggedIn" class="nav-link active" href="/submit">發文</a>
          </li>
        </ul>

        <ul class="navbar-nav">
          <li v-if="!isLoggedIn" class="nav-item">
            <a class="nav-link" href="/signin">登入</a>
          </li>
          <li v-else class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              {{ username }}
            </a>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
              <li><a class="dropdown-item" href="#">關於我們</a></li>
              <li><a class="dropdown-item" href="/signin" @click="signOut">登出</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>

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
      if(localStorage.getItem("authTokenUsername")){
        this.username= localStorage.getItem("authTokenUsername");
        this.isLoggedIn= true;
      }
    },
    signOut(){
      this.$store.commit('delToken');
      this.username= null;
      this.isLoggedIn= false;
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
