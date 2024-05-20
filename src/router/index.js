import { createRouter, createWebHistory } from 'vue-router'
import  VueCookies  from 'vue-cookies';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass:'active',
  routes: [
    {

      path: '/home',
      name: 'Home',
      component: () => import('../views/HomeView.vue'),
      meta:{
        requiresAuth:true
      }
    },
    {

      path: '/',
      name: 'Inicio',
      redirect: '/home',
      component: () => import('../views/HomeView.vue'),
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/LoginView.vue')

    },
    {
      path: '/projeto',
      name: 'Projeto',
      redirect: '/projeto/lista',
      component: () => import('../views/ProjetoView.vue'),
      children: [
        {
          path: 'kanban',
          name: 'Kanban',
          component: () => import('../components/KanbanDeStatus.vue')
        },
        {
          path: 'lista',
          name: 'Lista',
          component: () => import('../components/CardTarefaList.vue')
        },
        {
          path: 'timeline',
          name: 'TimeLine',
          component: () => import('../components/timeLine.vue')
        },
        {
          path: 'calendario',
          name: 'Calendario',
          component: () => import('../components/calendario.vue')
        },
        {
          path: 'aparencia',
          name: 'Aparencia',
          component: () => import('../components/componentAparencia.vue')
        }
      ]
    },

    {
      path: '/equipe',
      name: 'Equipe',
      component: () => import('../views/EquipeHomeView.vue')
    },
    {
      path: '/equipe/telaInicial',
      name: 'telaInicial',
      component: () => import('../views/EquipeTelaInicialView.vue')
    },
    {
      path: '/criaProjeto',
      name: 'criaProjeto',
      component: () => import('../views/CriarProjetoView.vue'),
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/editaProjeto',
      name: 'editaProjeto',
      component: () => import('../views/CriarProjetoView.vue'),
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/criaTarefa',
      name: 'criaTarefa',
      component: () => import('../views/CriarTarefaView.vue'),
      meta:{
        requiresAuth:true
      }
    },
    {
     path: '/projetos',
     name: 'projetos',
     component: () => import('../views/ProjetoListaView.vue'),
     meta:{
       requiresAuth:true
     }
    },
    {
      path: '/privacidade',
      name: 'privacidade',
      component: () => import('../components/componentPrivacidade.vue'),
      meta:{
        requiresAuth:true
      }
     },

     {
      path: '/seguranca',
      name: 'seguranca',
      component: () => import('../components/componentSeguranca.vue'),
      meta:{
        requiresAuth:true
      }
     },
    {
      path:'/perfil',
      name:'Perfil',
      redirect:'/perfil/informacoes',
      component: () => import('../views/PerfilView.vue'),
      children: [
        {
          path: 'informacoes',
          name: 'Informacoes',
          component: () => import('../components/componentInformacoes.vue')
        },
        {
          path: 'acessibilidade',
          name: 'Acessibilidade',
          component: () => import('../components/componentAcessibilidade.vue')
        },
        {
          path: 'seguranca',
          name: 'Seguranca',
          component: () => import('../components/componentSeguranca.vue')
        },
        {
          path: 'privacidade',
          name: 'Privacidade',
          component: () => import('../components/componentPrivacidade.vue')
        },
        {
          path: 'aparencia',
          name: 'Aparencia',
          component: () => import('../components/componentAparencia.vue')
        }
      ],
      meta:{
        requiresAuth:true
      }
    },
    {
      path:'/perfil/:id',
      component: () => import('../views/PerfilInfoView.vue'),
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/chat',
      component: () => import('../views/desktop/ChatView.vue'),
      children: [
        {
          path: '/chat/:id',
          name: 'Chat',
          component: () => import('../views/desktop/ChatView.vue')
        },
      ]
    },
    {
      path: '/projeto/responsavel',
      component: () => import('../views/AdminHomeView.vue'),
      meta:{
        requiresAuth:true
      }
    },
    // {
    //   path: '/404',
    //   name: 'notFound.index',
    //   component: () => import( '../components/404.vue' ),
    // },
    // { path: '*', redirect: '/404' }
    // {
    //   path:'/perfil/:user',
    //   name:'PerfilUsuario',

    // }

  ]
})
router.beforeEach(async (to)=>{
  // const rotasPublicas=['/login']

  console.log(to.fullPath);
  console.log(VueCookies.get('JWT'));
  if(VueCookies.get('JWT')==null && to.path!='/login'){
   return {path:'/login'}
  } 
  else if(VueCookies.get('JWT')!=null && to.path=='/login' ){
    return {path:'/home'}
  }
  
  
})

export default router
