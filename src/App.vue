<script setup>
import { RouterLink, RouterView } from 'vue-router'
import cardTarefas from './components/cardTarefas.vue'
import {tarefa} from './ObjetosTeste/tarefa.js'

</script>

<template>
  <RouterView />
  <cardTarefas :tarefa=tarefa altura="10vh" largura="20vw" preset="2"></cardTarefas>
</template>

<style scoped>

</style>
