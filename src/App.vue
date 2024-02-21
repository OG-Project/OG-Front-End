<script setup>

import {RouterView} from 'vue-router'
import Input from './components/Input.vue'
import { funcaoPopUpStore } from './stores/funcaoPopUp'

import Navbar from '@/components/Navbar.vue';
import criarEquipePopUp from './components/CriarEquipePopUp.vue';
import ListaMembrosEquipe from './components/listaMembrosEquipe.vue'; 
import editarEquipePopUp from './components/editarEquipePopUp.vue';
const funcaoPopUpPropriedade = funcaoPopUpStore();
const funcaoPopUpProjeto= funcaoPopUpStore();


</script>

<template>
  <RouterView />
<editarEquipePopUp>
  
</editarEquipePopUp>

    
  
</template>

<style scoped>

</style>

