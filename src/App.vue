<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Tabelas from './components/Tabelas.vue';
import Input from './components/Input.vue'
import fundoPopUp from './components/fundoPopUp.vue';
import { funcaoPopUpStore } from './stores/funcaoPopUp'
import calendario from './components/calendario.vue';
import KanbanDePropriedade from './components/KanbanDePropriedade.vue';
import timeLine from './components/timeLine.vue';
import PopUpCriaPropriedade from './components/popUpCriaPropriedade.vue';

const funcaoPopUp = funcaoPopUpStore();

</script>

<template>
  <RouterView />
  <div class="w-[100%] h-screen flex justify-center items-center">
    <KanbanDePropriedade></KanbanDePropriedade>
  </div>

</template>

<style scoped></style>

