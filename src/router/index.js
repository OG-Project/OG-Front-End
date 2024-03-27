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
          redirect:'/projeto/kanban',
          component: () => import('../views/ProjetoView.vue'),
          children:[
            {
              path:'kanban',
              name:'Kanban',
              component: ()=>import('../components/KanbanDeStatus.vue')
            },
            {
              path:'lista',
              name:'Lista',
              component: ()=>import('../components/CardTarefaList.vue')
            },
            {
              path:'timeline',
              name:'TimeLine',
              component: ()=>import('../components/timeLine.vue')
            },
            {
              path:'calendario',
              name:'Calendario',
              component: ()=>import('../components/calendario.vue')
            },
            {
              path:'aparencia',
              name:'Aparencia',
              component: ()=>import('../components/componentAparencia.vue')
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
      component: () => import('../views/CriarProjetoView.vue')
    },
    {
      path: '/editaProjeto',
      name: 'editaProjeto',
      component: () => import('../views/EditarProjetoView.vue')
    },
    {
      path: '/criaTarefa',
      name: 'criaTarefa',
      component: () => import('../views/CriaTarefaView.vue')
    },
    {
     path: '/projetos',
     name: 'projetos',
     component: () => import('../views/ProjetoListaView.vue')
    },
    {
      path:'/perfil',
      name:'Perfil',
      redirect:'/perfil/informacoes',
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
        },
        {
          path:'aparencia',
          name:'Aparencia',
          component: ()=>import('../components/componentAparencia.vue')
        }
      ]
    },
    {
      path:'/perfil/:id',
      component: () => import('../views/PerfilInfoView.vue')
    }
    // {
    //   path:'/perfil/:user',
    //   name:'PerfilUsuario',

    // }

  ]
})

export default router
