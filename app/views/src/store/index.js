import { createStore } from 'vuex'

export default createStore({
  state: {
    authTokens: localStorage.getItem('authTokens') || {'username': null,'accessToken': null, 'roles': null}
  },
  getters: {
  },
  mutations: {
    setToken (state, newAuthTokens) {
      state.authTokens= newAuthTokens
      localStorage.setItem("authTokenUsername", newAuthTokens['username']);
      localStorage.setItem("authTokenAccessToken", newAuthTokens['accessToken']);
      localStorage.setItem("authTokenRoles", newAuthTokens['roles']);
    }
  },
  actions: {
    
  },
  modules: {
  }
})
