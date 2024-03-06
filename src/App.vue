<script setup>

import Tabelas from './components/Tabelas.vue';
import LoginView from './views/LoginView.vue';
import {RouterView} from 'vue-router'
import Input from './components/Input.vue'
import { funcaoPopUpStore } from './stores/funcaoPopUp'


import Navbar from '@/components/Navbar.vue';
import criarEquipePopUp from './components/CriarEquipePopUp.vue';
import ListaMembrosEquipe from './components/listaMembrosEquipe.vue'; 

import editarEquipePopUp from './components/editarEquipePopUp.vue';

</script>

<template>
  <Navbar></Navbar>

  <RouterView></RouterView>

</template>

<style scoped>

</style>

