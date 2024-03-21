<script setup>

import { RouterLink, RouterView } from 'vue-router'
import Tabelas from './components/Tabelas.vue';
import LoginView from './views/LoginView.vue';
import Input from './components/Input.vue'
import fundoPopUp from './components/fundoPopUp.vue';
import { funcaoPopUpStore } from './stores/funcaoPopUp'
import VueCookies from "vue-cookies";


import Navbar from '@/components/Navbar.vue';
import { onMounted, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { perfilStore } from './stores/perfilStore';
import ListaPropriedadesStatus from './components/ListaPropriedadesStatus.vue';
import listaProjetos from './components/listaProjetos.vue';
import kanbanProjetos from './components/kanbanProjetos.vue'

const funcaoPopUpPropriedade = funcaoPopUpStore();
const funcaoPopUpProjeto= funcaoPopUpStore();
const perfil=perfilStore()
const {isVlibras}=storeToRefs(perfil);
let url= window.location.href;
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
  <div v-if="url!='http://localhost:5173/login'">
    <Navbar ></Navbar>
  </div>
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


