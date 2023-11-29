<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Tabelas from './components/Tabelas.vue';

import Input from './components/Input.vue'
import fundoPopUp from './components/fundoPopUp.vue';
import {funcaoPopUpStore} from './stores/funcaoPopUp'

import PopUpCriaPropriedade from './components/popUpCriaPropriedade.vue';
import Convite from './components/convite.vue';
import ListaConvidados from './components/ListaConvidados.vue';
import Botao from './components/Botao.vue';
import checkBox from './components/checkBox.vue';

const funcaoPopUp = funcaoPopUpStore();
</script>

<template >
  <div class="bg-slate-500 w-full h-[100vh]">
    <checkBox tamanho="grande"></checkBox>
  </div>
  
</template>