<script setup>
import { RouterLink, RouterView } from 'vue-router'
import calendario from './components/calendario.vue';
import kanbanDePropriedade from './components/KanbanDePropriedade.vue';

import cardTarefas from './components/cardTarefas.vue'


</script>

<template>
  <RouterView />
  <div class="flex items-center justify-center w-screen h-screen">
    <calendario></calendario>
  </div>
</template>

<style scoped></style>
