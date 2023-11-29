<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Tabelas from './components/Tabelas.vue';
import Input from './components/Input.vue'
import fundoPopUp from './components/fundoPopUp.vue';
import {funcaoPopUpStore} from './stores/funcaoPopUp'

import PopUpCriaPropriedade from './components/popUpCriaPropriedade.vue';

const funcaoPopUp = funcaoPopUpStore();
</script>

<template>
<<<<<<< HEAD
  <RouterView/>
  <PopUpCriaPropriedade></PopUpCriaPropriedade>
  <button @click="funcaoPopUp.abrePopUp">teste</button>
  <Input styleInput="input-transparente-claro-pequeno" icon="../src/imagem-vetores/icon-lapis-preto.svg"
                     conteudoInput="Propriedade" direcao="direita"
                     v-model="nomePropriedade" tipo="obrigatorio"></Input>  
=======
>>>>>>> 44bad1d74fb957e789fe5048b0ccedb7b550337f
</template>

<style scoped>

  

</style>


