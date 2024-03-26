<script setup>
import { RouterLink, RouterView } from "vue-router";
import Tabelas from "./components/Tabelas.vue";
import LoginView from "./views/LoginView.vue";
import Input from "./components/Input.vue";
import fundoPopUp from "./components/fundoPopUp.vue";
import { funcaoPopUpStore } from "./stores/funcaoPopUp";
import VueCookies from "vue-cookies";
import KeyBoard from './components/Keyboard.vue'
import svgIconMove from './assets/svgIconMove.vue'
import svgIconX from './assets/svgIconX.vue'
import Navbar from '@/components/Navbar.vue';
import { ref, watch, onMounted} from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { perfilStore } from './stores/perfilStore';
import ListaPropriedadesStatus from './components/ListaPropriedadesStatus.vue';
import listaProjetos from './components/listaProjetos.vue';
import kanbanProjetos from './components/kanbanProjetos.vue'

const funcaoPopUpPropriedade = funcaoPopUpStore();
const funcaoPopUpProjeto= funcaoPopUpStore();
const perfil=perfilStore()
const {isVlibras}=storeToRefs(perfil);
import { useDraggable } from '@vueuse/core'
const el = ref(perfil.el)

const { x, y, style } = useDraggable(el, {
  initialValue: { x: 1300, y: 70},
})

// let ativado='';
let url= window.location.href;


const route = useRoute();


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
    let valorElemento=perfil.el.value
    console.log(valorElemento)
    let valor=b
    if(b=='{bksp}'){
      perfil.el.value=valorElemento.substring(0,valorElemento.length-1)
    }else if(b=='{space}'){
      perfil.el.value+=' '
    }else if(b!='{enter}' & b!='{shift}' & b!='{lock}' & b!='{tab}'){
      perfil.el.value+=valor
      
    }
  }
  function change(a){
  }
  function close(){
    perfil.isTecladoAtivado=!perfil.isTecladoAtivado
  }

  function oi(a){
    console.log(a)
  }
  var estaNoLogin = ref(true)
watch(() => route.path, (newPath, oldPath) => {
  if(route.path == '/login'){
    estaNoLogin.value = true
  }else{
    estaNoLogin.value = false
  }
});
</script>

<template draggable="true" >
  
  
  <Navbar v-show="!estaNoLogin" />
  <!-- Atraves do x e y você gerencia e utiliza do drag and drop -->
  <div ref="el" :style="style" style="position: fixed"
  
  class="bg-[#ececec] top-16 left-[67.8vw] absolute z-[99999] w-max" 
  v-if="perfil.isTecladoAtivado">
    <div class=" flex flex-col items-center">
      <div class="flex w-full justify-between px-4 ">
        <svgIconMove class="w-[1vw] h-[3vh]" />
        <svgIconX @click="close" class="w-[1vw] h-[3vh]" ></svgIconX>
      </div>
      <KeyBoard @onChange="change" @onKeyPress="press" :input="oi" ></KeyBoard>
    </div>
  </div>
  <RouterView />
    <div v-show="isVlibras || VueCookies.get('isVlibras') === 'true'">
      <div vw class="enabled">
        <div vw-access-button class="active"></div>
        <div vw-plugin-wrapper>
          <div class="vw-plugin-top-wrapper"></div>
        </div>
      </div>
    </div>
</template>
<style scoped></style>
