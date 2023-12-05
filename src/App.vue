<script setup>
import {RouterView} from 'vue-router'
import Input from './components/Input.vue'
import { funcaoPopUpStore } from './stores/funcaoPopUp'
import PopUpProjeto from './components/popUpProjeto.vue';
const funcaoPopUpPropriedade = funcaoPopUpStore();
const funcaoPopUpProjeto= funcaoPopUpStore();

</script>
<template>
 
    <div class=" flex justify-center">
      
      <Input  styleInput="input-transparente-claro"  largura="70vw" altura="10vh" icon="../src/imagem-vetores/adicionarPessoa.svg"  conteudoInput="Adicionar Pessoa"></Input>
      <button @click="funcaoPopUpPropriedade.abrePopUp()">propriedade</button>
      <button  @click="funcaoPopUpProjeto.abrePopUp()">Projeto</button>
    </div>
    <PopUpProjeto></PopUpProjeto>
    <RouterView />
</template>

<style scoped></style>
