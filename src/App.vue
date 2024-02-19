<script setup>

import {RouterView} from 'vue-router'
import Input from './components/Input.vue'
import { funcaoPopUpStore } from './stores/funcaoPopUp'


import Navbar from '@/components/Navbar.vue';
const funcaoPopUpPropriedade = funcaoPopUpStore();
const funcaoPopUpProjeto= funcaoPopUpStore();
import vueVlibrasSsr, {VLibras} from '@vue-a11y/vlibras'



</script>

<template>
  <Navbar></Navbar>
    <RouterView />
    <VLibras src="" urlWidget="" />

  <CriarEquipePopUp>
    
  </CriarEquipePopUp>
  
</template>

<style scoped>

</style>

