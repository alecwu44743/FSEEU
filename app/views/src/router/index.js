import { createRouter, createWebHistory } from 'vue-router'
import SignUp from '../views/SignUp.vue'
import SignIn from '../views/SignIn.vue'
import Home from '../views/Home.vue'
import Submit from '../views/Submit.vue'
import Post from '../views/Post.vue'

const routes = [
  {
    path: '/signin',
    name: 'signin',
    component: SignIn
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp
  },
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/submit',
    name: 'submit',
    component: Submit
  },
  {
    path: '/post/:param',
    name: 'post',
    component: Post,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
