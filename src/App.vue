<script setup>
import { RouterView } from 'vue-router'
import ListaUsuarioEquipePopUp from './components/listaUsuarioEquipePopUp.vue';
import popUpCriaTarefa from './components/popUpCriaTarefa.vue';
import { funcaoPopUpStore } from './stores/funcaoPopUp';
import CriaTarefa from './views/CriaTarefaView.vue';
import Navbar from '@/components/Navbar.vue';
</script>
<template>
  <Navbar></Navbar>
</template>


