<script setup>

import { RouterLink, RouterView } from 'vue-router'
import Tabelas from './components/Tabelas.vue';

import Input from './components/Input.vue'
import fundoPopUp from './components/fundoPopUp.vue';
import { funcaoPopUpStore } from './stores/funcaoPopUp'
import calendario from './components/calendario.vue';
import KanbanDePropriedade from './components/KanbanDePropriedade.vue';

import PopUpCriaPropriedade from './components/popUpCriaPropriedade.vue';
import ListaConvidados from './components/ListaConvidados.vue';
import ListaMembrosEquipe from './components/listaMembrosEquipe.vue';
import ConviteEquipePopUp from './components/ConviteEquipePopUp.vue';

import { RouterView } from 'vue-router'
</script>
<template>
<<<<<<< HEAD
  <ListaConvidados>

  </ListaConvidados>
  <ListaMembrosEquipe>

  </ListaMembrosEquipe>
</template>

<style scoped>
</style>
=======

  <ListaUsuarioEquipePopUp>

  </ListaUsuarioEquipePopUp>
>>>>>>> 6c61c41ad8d0746070c95687b01ff39263b3de59

    <RouterView></RouterView>
</template>


