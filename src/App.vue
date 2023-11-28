<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Tabelas from './components/Tabelas.vue';

import Input from './components/Input.vue'
import fundoPopUp from './components/fundoPopUp.vue';
import {funcaoPopUpStore} from './stores/funcaoPopUp'

import PopUpCriaPropriedade from './components/popUpCriaPropriedade.vue';
import Convite from './components/convite.vue';
import ListaConvidados from './components/ListaConvidados.vue';

const funcaoPopUp = funcaoPopUpStore();
</script>

<template>

  <RouterView />
  <ListaConvidados></ListaConvidados>
</template>