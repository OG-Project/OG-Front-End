<template>
  <div class="h-full">
      <div v-if="screenWidth >= 1024" class="h-[90%]">
      <HomeViewDesktop></HomeViewDesktop>
      </div>
      <div v-else>
      <HomeViewMobile></HomeViewMobile>
      </div>
  </div>
</template>
<script setup>
import { ref, onMounted,watch } from 'vue'
import HomeViewDesktop from './desktop/HomeViewDesktop.vue';
import HomeViewMobile from './mobile/HomeViewMobile.vue';
import router from '../router';
import Shepherd from 'shepherd.js';
const tour = new Shepherd.Tour({
    useModalOverlay: true,
    defaultStepOptions: {
      classes: 'shepherd-theme-square',
      scrollTo: true
    },
  });

tour.addSteps([
  {
    id: 'step-1',
    title: 'Home',
    text: 'Aqui mostra suas atividades mais importantes',
    attachTo: {
      element: '#step-1',
      on: 'bottom'
    },
    buttons: [
      {
        text: 'Next',
        action: ()=>{
          tour.next()
        } 
      },
      {
        secondary: true,
        text: 'Skip',
        action: tour.complete
      }
    ]

  },
  {
    id: 'step-2',
    title: 'Dashboard',
    text: 'Informações para gerenciar suas tarefas feitas e não feitas',
    attachTo: {
      element: '#step-2',
      on: 'bottom'
    },
    buttons: [
      {
        text: 'Next',
        action: ()=>{
          router.push('/home')
          tour.next()
        } 
      },
      {
        secondary: true,
        text: 'Skip',
        action: tour.complete
      }
    ]
  },
  {
    id: 'step-3',
    title: 'Menu',
    text: 'Clique para acessar o fluxo do sistema',
    attachTo: {
      element: '#step-3',
      on: 'right'
    },
    buttons: [
      {
        text: 'Next',
        action: ()=>{
          
          tour.next()
        } 
      },
      {
        secondary: true,
        text: 'Skip',
        action: tour.complete
      }
    ]
  },
  {
    id: 'step-4',
    title: 'Partes importantes',
    text: 'Projeto, Home, Equipes',
    attachTo: {
      element: '#step-4',
      on: 'right'
    },
    buttons: [
      {
        text: 'Next',
        action: ()=>{
          tour.next()
        } 
      },
      {
        secondary: true,
        text: 'Skip',
        action: tour.complete
      }
    ]
  }
])
const screenWidth = ref(window.innerWidth)
let usuario=ref()
let configuracao=ref()

watch(() => window.innerWidth, () => {
  screenWidth.value = window.innerWidth
})
onMounted(() => {
  tour.start()
  window.addEventListener('resize', () => {
      screenWidth.value = window.innerWidth
  })


})
</script>
<style scoped>

</style>