<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Input from './components/Input.vue'

import fundoPopUp from './components/fundoPopUp.vue';
import {useCounterStore} from './stores/funcaoPopUp'

import PopUpCriaPropriedade from './components/popUpCriaPropriedade.vue';

const funcaoPopUp = useCounterStore();
 
</script>

<template>
  <RouterView />
  <div class="w-full h-screen bg-red-50">
    <PopUpCriaPropriedade></PopUpCriaPropriedade>
  <button @click="funcaoPopUp.abrePopUp()">
    teste
  </button>
  </div>
  <Input width="100" height="80" styleInput="input-transparente-claro-grande" icon="../src/imagem-vetores/icon-lapis-preto.svg" conteudoInput="Propriedade" direcao="direita"></Input>

</template>

<style scoped>

  

</style>
