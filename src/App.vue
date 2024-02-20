<script setup>

import {RouterView} from 'vue-router'
import Input from './components/Input.vue'
import { funcaoPopUpStore } from './stores/funcaoPopUp'


import Navbar from '@/components/Navbar.vue';
import { perfilStore } from './stores/perfilStore';
const funcaoPopUpPropriedade = funcaoPopUpStore();
const funcaoPopUpProjeto= funcaoPopUpStore();
let perfil=perfilStore()



</script>

<template>
  <Navbar></Navbar>
    <RouterView />
    <div v-if="perfil.acessibilidade().vlibras">
      <!-- <div vw class="enabled">
        <div vw-access-button class="active"></div>
        <div vw-plugin-wrapper>
          <div class="vw-plugin-top-wrapper"></div>
        </div>
      </div> -->
    </div>

  <CriarEquipePopUp>
    
  </CriarEquipePopUp>
  
</template>

<style scoped>

</style>

