<script setup>
import { RouterLink, RouterView } from 'vue-router'
import cardTarefas from './components/cardTarefas.vue'
import {tarefa} from './ObjetosTeste/tarefa.js'

</script>

<template>
  <RouterView />
  <cardTarefas :tarefa=tarefa></cardTarefas>
</template>

<style scoped>

</style>
