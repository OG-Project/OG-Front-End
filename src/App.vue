<script setup>

import { RouterView } from 'vue-router'
import ListaUsuarioEquipePopUp from './components/listaUsuarioEquipePopUp.vue';
import popUpCriaTarefa from './components/popUpCriaTarefa.vue';
import { funcaoPopUpStore } from './stores/funcaoPopUp';
const funcaoPopUp = funcaoPopUpStore();

</script>
<template>
  <button @click="funcaoPopUp.abrePopUp">ativa</button>
  <popUpCriaTarefa></popUpCriaTarefa>
</template>


