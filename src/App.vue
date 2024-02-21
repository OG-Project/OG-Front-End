<script setup>

import {RouterView} from 'vue-router'
import Input from './components/Input.vue'
import { funcaoPopUpStore } from './stores/funcaoPopUp'
import VueCookies from "vue-cookies";

import Navbar from '@/components/Navbar.vue';
import { ref, watch } from 'vue';
const funcaoPopUpPropriedade = funcaoPopUpStore();
const funcaoPopUpProjeto= funcaoPopUpStore();

</script>

<template>
  <Navbar></Navbar>
    <RouterView />
    {{ VueCookies.get('isVlibras') }}
    <div v-show="VueCookies.get('isVlibras')=='true'">
      <div vw class="enabled">
        <div vw-access-button class="active"></div>
        <div vw-plugin-wrapper>
          <div class="vw-plugin-top-wrapper"></div>
        </div>
      </div>
    </div>

  <CriarEquipePopUp>
    
  </CriarEquipePopUp>
  
</template>

<style scoped>

</style>

