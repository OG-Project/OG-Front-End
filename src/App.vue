<script setup>

import {RouterView} from 'vue-router'
import Input from './components/Input.vue'
import { funcaoPopUpStore } from './stores/funcaoPopUp'

import Navbar from '@/components/Navbar.vue';
import CriarEquipePopUp from './components/CriarEquipePopUp.vue';
const funcaoPopUpPropriedade = funcaoPopUpStore();
const funcaoPopUpProjeto= funcaoPopUpStore();


</script>
<template>
  <RouterView />

 <CriarEquipePopUp>
  
 </CriarEquipePopUp>

</template>

<style scoped>

</style>

