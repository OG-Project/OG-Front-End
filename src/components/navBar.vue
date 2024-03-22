<template>
  <div class="h-[8vh] w-full flex z-[999]">
    <div class="h-[8vh] w-[15%] flex gap-8">
      <BarraLateral class="w-[45%]"></BarraLateral>
      <div class="h-[8vh]  w-[15%] flex items-center">
        <Botao preset="PadraoVazado" texto="Nova Tarefa" tamanhoDaBorda="2px"> </Botao>
    </div>
    </div>
    <div class="h-[8vh] w-[35%] flex gap-8">
    </div>
    <div class="h-[8vh] w-[50%] flex items-center gap-8 justify-end mr-8">
        <Input styleInput="input-claro-pequeno" largura="20%" altura="10%" conteudoInput="Pesquisar..." ></Input>
        <img :src="notificacao">
        <img :src="UserIcon">
    </div>
  </div>
</template>
<script setup>
import BarraLateral from "../components/BarraLateral.vue";
import Botao from "../components/Botao.vue";
import notificacao from "../imagem-vetores/Notificacao.svg"
import UserIcon from "../imagem-vetores/UserIcon.svg"
import Input from "./Input.vue";
</script>
<style scoped>
  
</style>
