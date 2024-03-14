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
      path: '/CriarTarefa',
      name: 'CriarTarefa',
      component: () => import('../views/CriaTarefaView.vue')
    },{
      path:'/projeto',
      name:'Projeto',
      component: () => import('../views/ProjetoView.vue')
    },
    {
      path:'/listadetarefas',
      name:'ListaDeTarefas',
      component: () => import('../views/ListaDeTarefasView.vue')
    }
  ]
})

export default router
