<script setup>

import { RouterLink, RouterView } from 'vue-router'
import Tabelas from './components/Tabelas.vue';
import LoginView from './views/LoginView.vue';
import Input from './components/Input.vue'
import fundoPopUp from './components/fundoPopUp.vue';
import { funcaoPopUpStore } from './stores/funcaoPopUp'
import VueCookies from "vue-cookies";
import {perfilStore} from './stores/perfilStore.js'
import KeyBoard from './components/Keyboard.vue'
import svgIconMove from './assets/svgIconMove.vue'
import svgIconX from './assets/svgIconX.vue'

import Navbar from '@/components/Navbar.vue';
import { onMounted, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';

const funcaoPopUpPropriedade = funcaoPopUpStore();
const funcaoPopUpProjeto= funcaoPopUpStore();
const perfil=perfilStore()
const {isVlibras}=storeToRefs(perfil);
import { useDraggable } from '@vueuse/core'
const el = ref(null)

const { x, y, style } = useDraggable(el, {
  initialValue: { x: 1300, y: 70},
})


// let ativado='';

// watch(ativado,async (newValue,oldValue)=>{
//   ativado.value=newValue
//   console.log(ativado)
//   console.log(newValue)
//   console.log(oldValue)
  
// })
  onMounted(()=>{
  perfil.isVoiceMaker=JSON.parse(VueCookies.get('isVoiceMaker'))
  console.log(perfil.isVoiceMaker)
  perfil.isTecladoVirtual=JSON.parse(VueCookies.get('isTecladovirtual'))
  console.log(perfil.isTecladoVirtual)
  perfil.fonteCorpo=(VueCookies.get('fonteCorpo'))
  perfil.fonteTitulo=(VueCookies.get('fonteTitulo'))
  perfil.isVlibras=(VueCookies.get('isVlibras'))
  })
  
  function press(b){
    console.log('press '+b)
  }
  function change(a){
    perfil.el.value=a
    console.log('change '+a)
  }
  function close(){
    perfil.isTecladoAtivado=!perfil.isTecladoAtivado
  }

</script>

<template draggable="true" >
  <div v-if="url!='http://localhost:5173/login'">
    <Navbar ></Navbar>
  </div>
  <!-- Atraves do x e y você gerencia e utiliza do drag and drop -->
  <div ref="el" :style="style" style="position: fixed"
  
  class="bg-[#ececec] top-16 left-[67.8vw] absolute w-max" 
  v-if="perfil.isTecladoAtivado">
    <div class=" flex flex-col items-center">
      <div class="flex w-full justify-between px-4 ">
        <svgIconMove class="w-[1vw] h-[3vh]" />
        <svgIconX @click="close" class="w-[1vw] h-[3vh]" ></svgIconX>
      </div>
      <KeyBoard @onChange="change" @onKeyPress="press" ></KeyBoard>
    </div>
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


