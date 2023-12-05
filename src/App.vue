<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Tabelas from './components/Tabelas.vue';

import Input from './components/Input.vue'
import fundoPopUp from './components/fundoPopUp.vue';
import { funcaoPopUpStore } from './stores/funcaoPopUp'
import calendario from './components/calendario.vue';
import KanbanDePropriedade from './components/KanbanDePropriedade.vue';

import PopUpCriaPropriedade from './components/popUpCriaPropriedade.vue';
import Convite from './components/ConviteEquipePopUp.vue';
import ListaConvidados from './components/ListaConvidados.vue';
import ListaUsuarioEquipePopUp from './components/listaUsuarioEquipePopUp.vue';

const funcaoPopUp = funcaoPopUpStore();
</script>

<template>
  <ListaUsuarioEquipePopUp>

  </ListaUsuarioEquipePopUp>
  
</template>

<style scoped>
</style>



