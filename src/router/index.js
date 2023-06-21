import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import( '../views/LoginPage.vue')
  },
  {
    path: '/Cadastro',
    name: 'Cadastro',
    component: () => import( '../views/CadastroPage.vue')
  },
  {
    path: '/Menu',
    name: 'Menu',

    component: () => import( '../views/MenuPage.vue')
  },
  {
    path: '/Cart',
    name: 'Cart',

    component: () => import('../views/CartPage.vue')
  },
  {
    path: '/NotaFiscal',
    name: 'NotaFiscal',

    component: () => import( '../views/NotaFiscalPage.vue')
  },
  {
    path: '/nota-fiscal/:id',
    name: 'DetalhesNotaFiscal',
    component: () => import('../views/DetalhesNotaFiscalPage.vue')
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})
export default router
