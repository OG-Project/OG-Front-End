import { createRouter, createWebHistory } from 'vue-router'
import CardList from '../components/CardTarefaList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "celuarTeste",
      component: CardList
    }
  ]
})

export default router
