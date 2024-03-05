<script setup>

import { RouterLink, RouterView } from 'vue-router'
import Tabelas from './components/Tabelas.vue';
import LoginView from './views/LoginView.vue';
import {RouterView} from 'vue-router'
import Input from './components/Input.vue'
import { funcaoPopUpStore } from './stores/funcaoPopUp'


import Navbar from '@/components/Navbar.vue';
import criarEquipePopUp from './components/CriarEquipePopUp.vue';
import ListaMembrosEquipe from './components/listaMembrosEquipe.vue'; 
import FundoPopUp from './components/fundoPopUp.vue';
const funcaoPopUpPropriedade = funcaoPopUpStore();
const funcaoPopUpProjeto= funcaoPopUpStore();



</script>

<template>

  <RouterView></RouterView>

</template>

<style scoped>

</style>

