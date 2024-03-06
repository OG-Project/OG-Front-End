<script setup>

import {RouterView} from 'vue-router'
import Input from './components/Input.vue'
import { funcaoPopUpStore } from './stores/funcaoPopUp'
import VueCookies from "vue-cookies";

import Navbar from '@/components/Navbar.vue';
import { onMounted, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { perfilStore } from './stores/perfilStore';

const funcaoPopUpPropriedade = funcaoPopUpStore();
const funcaoPopUpProjeto= funcaoPopUpStore();
const perfil=perfilStore()
const {isVlibras}=storeToRefs(perfil)
// let ativado='';

// watch(ativado,async (newValue,oldValue)=>{
//   ativado.value=newValue
//   console.log(ativado)
//   console.log(newValue)
//   console.log(oldValue)
  
// })
// onMounted(()=>{
// ativado=ref(VueCookies.get('isVlibras'))

// })
</script>

<template>
  
  <Navbar></Navbar>
    <RouterView />
    <!-- {{ VueCookies.get('isVlibras') }}
    {{ ativado }} -->
    <div v-show="isVlibras==true || VueCookies.get('isVlibras')=='true'">
      <div vw class="enabled">
        <div vw-access-button class="active"></div>
        <div vw-plugin-wrapper>
          <div class="vw-plugin-top-wrapper"></div>
        </div>
      </div>
    </div>

</template>

<style scoped>

</style>

