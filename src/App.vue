<script setup>
import { RouterLink, RouterView } from 'vue-router'
import calendario from './components/calendario.vue';
import cardTarefas from './components/cardTarefas.vue'
import { tarefas } from './ObjetosTeste/tarefa.js'



</script>

<template>
  <RouterView />
  <div class="flex items-center justify-center w-screen h-screen">
    <calendario></calendario>
  </div>
</template>

<style scoped></style>
