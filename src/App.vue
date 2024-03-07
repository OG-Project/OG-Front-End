<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Tabelas from './components/Tabelas.vue';
import Input from './components/Input.vue'
import fundoPopUp from './components/fundoPopUp.vue';
import { funcaoPopUpStore } from './stores/funcaoPopUp'
import calendario from './components/calendario.vue';
import KanbanDeStatus from './components/KanbanDeStatus.vue';
 

const funcaoPopUp = funcaoPopUpStore();

</script>

<template>
  <RouterView />
  <div class="w-[100%] h-screen flex justify-center items-center">
    <calendario></calendario>
  </div>

</template>

<style scoped></style>

