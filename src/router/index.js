import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path:'/projeto',
      name:'Projeto',
      component: () => import('../views/ProjetoView.vue')
    },
    {
      path: '/equipe',
      name: 'Equipe',
      component: () => import('../views/EquipeHomeView.vue')
    },
    {
      path: '/editarEquipe',
      name: 'Editar',
      component: () => import('../components/editarEquipePopUp.vue')
    }
  ]
})

export default router
