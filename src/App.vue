<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Tabelas from './components/Tabelas.vue';

import Input from './components/Input.vue'
import fundoPopUp from './components/fundoPopUp.vue';
import { funcaoPopUpStore } from './stores/funcaoPopUp'
import calendario from './components/calendario.vue';
import KanbanDePropriedade from './components/KanbanDePropriedade.vue';

import PopUpCriaPropriedade from './components/popUpCriaPropriedade.vue';
import Convite from './components/convite.vue';
import ListaConvidados from './components/ListaConvidados.vue';
import Botao from './components/Botao.vue';
import checkBox from './components/checkBox.vue';
import PopUpProjeto from './components/popUpProjeto.vue';

const funcaoPopUpPropriedade = funcaoPopUpStore();
const funcaoPopUpProjeto= funcaoPopUpStore();

</script>

<template>
 
    <div class=" flex justify-center">
      <RouterView />
      <Input  styleInput="input-transparente-claro"  largura="70vw" altura="10vh" icon="../src/imagem-vetores/adicionarPessoa.svg"  conteudoInput="Adicionar Pessoa"></Input>
      <button @click="funcaoPopUpPropriedade.abrePopUp">propriedade</button>
      <button  @click="funcaoPopUpProjeto.abrePopUp">Projeto</button>
    </div>
    
    <PopUpProjeto></PopUpProjeto>
</template>

<style scoped></style>


  