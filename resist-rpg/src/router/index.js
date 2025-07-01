import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import CreateUserView from '@/views/createUserView.vue'
import GamePlayView from '@/views/gamePlayView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/createUser',
    name: 'createUser',
    component: CreateUserView,
  },
  {
    path: '/gameplay',
    name: 'gamePlay',
    component: GamePlayView,
  },
  // add more routes here
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
