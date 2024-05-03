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

// https://dontpad.com/02-05-2024gks
// import { useShepherd } from 'vue-shepherd'

const tour = new Shepherd.Tour({
    useModalOverlay: {enabled:true},
    defaultStepOptions: {
      cancelIcon:{enabled: true},
      classes: '',
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
        classes: 'button',
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
    text: 'Equipe, aqui pode visualizar suas equipes e cria-las. Clique para ver',
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
  },
  {
    id: 'step-5',
    title: 'Crie uma Equipe ',
    text: 'Clique aqui para criar novas equipes ',
    attachTo: {
      element: '#step-5',
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
    id: 'step-6',
    text: 'Preencha os campos',
    attachTo: {
      element: '#step-6',
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
    id: 'step-7',
    text: 'Crie a Equipe',
    attachTo: {
      element: '#step-7',
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
    id: 'step-8',
    text: 'Entre na equipe criada',
    attachTo: {
      element: '#step-8',
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
.button{
  @apply hover:bg-[var(--roxo)] bg-[var(--roxo)];
}
</style>