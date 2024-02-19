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
      path:'/perfil',
      name:'Perfil',
      component: () => import('../views/PerfilView.vue'),
      children:[
        {
          path:'informacoes',
          name:'Informacoes',
          component: ()=>import('../components/componentInformacoes.vue')
        },
        {
          path:'acessibilidade',
          name:'Acessibilidade',
          component: ()=>import('../components/componentAcessibilidade.vue')
        },
        {
          path:'seguranca',
          name:'Seguranca',
          component: ()=>import('../components/componentSeguranca.vue')
        },
        {
          path:'privacidade',
          name:'Privacidade',
          component: ()=>import('../components/componentPrivacidade.vue')
        }
      ]
    },
    // {
    //   path:'/perfil/:user',
    //   name:'PerfilUsuario',

    // }
  ]
})

export default router
