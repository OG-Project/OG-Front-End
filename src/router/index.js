import { createRouter, createWebHistory } from 'vue-router'
import testeCelularView from '../views/testeCelularView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "celuarTeste",
      component: testeCelularView
    }
  ]
})

export default router
