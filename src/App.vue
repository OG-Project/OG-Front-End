<script setup>
import { RouterLink, RouterView } from 'vue-router'
import calendario from './components/calendario.vue';
import kanbanDePropriedade from './components/KanbanDePropriedade.vue';

import cardTarefas from './components/cardTarefas.vue'
import { tarefas } from './ObjetosTeste/tarefa.js'
import { conexaoBD } from './stores/conexaoBD';

const api = conexaoBD();
console.log(api.procurar());
console.log((await api.api).data)

</script>

<template>
  <RouterView />
  <div class="flex items-center justify-center w-screen h-screen">
    <kanbanDePropriedade></kanbanDePropriedade>
  </div>
  <div class="flex items-center justify-center w-screen h-screen">
    <calendario></calendario>
  </div>
</template>

<style scoped></style>
