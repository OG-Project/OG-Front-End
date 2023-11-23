<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Tabelas from './components/Tabelas.vue';
</script>

<template>
  <RouterView/>
import Input from './components/Input.vue'

import fundoPopUp from './components/fundoPopUp.vue';
import {funcaoPopUpStore} from './stores/funcaoPopUp'

import PopUpCriaPropriedade from './components/popUpCriaPropriedade.vue';

const funcaoPopUp = funcaoPopUpStore();
 
</script>

<template>
  <RouterView />
  <div class="w-full h-screen bg-red-50">
    <PopUpCriaPropriedade></PopUpCriaPropriedade>
  <button @click="funcaoPopUp.abrePopUp()">
    teste
  </button>
</template>

<style scoped>

  

</style>


