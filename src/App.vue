<script setup>

import { RouterLink, RouterView } from 'vue-router'
import Tabelas from './components/Tabelas.vue';

import Input from './components/Input.vue'
import fundoPopUp from './components/fundoPopUp.vue';
import { funcaoPopUpStore } from './stores/funcaoPopUp'
import calendario from './components/calendario.vue';
import KanbanDePropriedade from './components/KanbanDePropriedade.vue';
import CriarEquipePopUp from './components/CriarEquipePopUp.vue';

</script>
<template>

  <CriarEquipePopUp>
    
  </CriarEquipePopUp>

</template>

<style scoped>
</style>

