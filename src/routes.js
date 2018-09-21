import Login from './components/Login.vue'
import Cadastro from './components/Cadastro.vue'
import Home from './components/Home.vue'

export const routes = [
  { path: '/', name: 'login', component: Login },
  { path: '/cadastro', name: 'cadastro', component: Cadastro },
  { path: '/home', name: 'home', component: Home },
]