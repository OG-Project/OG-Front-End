<script setup>
import { RouterView } from "vue-router";
import { funcaoPopUpStore } from "./stores/funcaoPopUp";
import VueCookies from "vue-cookies";
import KeyBoard from './components/Keyboard.vue'
import svgIconMove from './assets/svgIconMove.vue'
import svgIconX from './assets/svgIconX.vue'
import Navbar from '@/components/Navbar.vue';
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { perfilStore } from './stores/perfilStore';
import router from "@/router";

import { useDraggable } from '@vueuse/core'

import ListaPropriedadesStatus from './components/ListaPropriedadesStatus.vue';
import listaProjetos from './components/listaProjetos.vue';
import kanbanProjetos from './components/kanbanProjetos.vue'
import { webSocketStore } from './stores/webSocket.js'
import { criaNotificacao } from './stores/criaNotificacao.js';

const criaNotificacaoStore = criaNotificacao();
const webSocket = webSocketStore();
const usuarioLogadoId = VueCookies.get("IdUsuarioCookie");
webSocket.url = "ws://localhost:8082/og/webSocket/usuario/"+usuarioLogadoId

const funcaoPopUpPropriedade = funcaoPopUpStore();
const funcaoPopUpProjeto = funcaoPopUpStore();
const perfil = perfilStore()
const { isVlibras } = storeToRefs(perfil);

const el = ref(perfil.el)

const { x, y, style } = useDraggable(el, {
  initialValue: { x: 1300, y: 70 },
})
// let ativado='';
let url = window.location.href;


const route = useRoute();

onMounted(() => {
  perfil.isVoiceMaker = JSON.parse(VueCookies.get('isVoiceMaker'))
  perfil.isTecladoVirtual = JSON.parse(VueCookies.get('isTecladovirtual'))
  console.log(perfil.isTecladoVirtual)
  perfil.fonteTitulo = (VueCookies.get('fonteTitulo'))

  perfil.fonteCorpo = (VueCookies.get('fonteCorpo'))
  perfil.isVlibras = (VueCookies.get('isVlibras'))
})

function press(b) {

  console.log('press ' + b)

  let valorElemento = perfil.el.value
  let valor = b
  if (b == '{bksp}') {
    perfil.el.value = valorElemento.substring(0, valorElemento.length - 1)
  } else if (b == '{space}') {
    perfil.el.value += ' '
    perfil.el.dispatchEvent(new Event('input'))
  } else if (b != '{enter}' & b != '{shift}' & b != '{lock}' & b != '{tab}') {
    perfil.el.value += valor
    perfil.el.dispatchEvent(new Event('input'))
  }

}

webSocket.criaConexaoWebSocket();

webSocket.esperaMensagem((mensagem) => {
  teste(JSON.parse(mensagem))
});

function teste(mensagem) {
  criaNotificacaoStore.mandarNotificacao(mensagem);
}

function change(a) {
}
function close() {
  perfil.isTecladoAtivado = !perfil.isTecladoAtivado
}

var estaNoLogin = ref(true)
watch(() => route.path, () => {
  if (route.path == '/') {
    router.push('/login')
  }
  if (route.path == '/login') {
    estaNoLogin.value = true
  } else {
    estaNoLogin.value = false
  }
});

</script>

<template draggable="true">

  <Navbar v-show="!estaNoLogin" />
  <RouterView />
  <!-- Atraves do x e y você gerencia e utiliza do drag and drop -->
  <div ref="el" :style="style" style="position: fixed"
    class="bg-[#ececec] top-16 left-[67.8vw] absolute z-[99999] w-max" v-if="perfil.isTecladoAtivado">
    <div class=" flex flex-col items-center">
      <div class="flex w-full justify-between px-4 ">
        <svgIconMove class="w-[1vw] h-[3vh]" />
        <svgIconX @click="close" class="w-[1vw] h-[3vh]"></svgIconX>
      </div>
      <KeyBoard @onChange="change" @onKeyPress="press"></KeyBoard>
    </div>
    <div v-show="isVlibras == true || VueCookies.get('isVlibras') == 'true'">
      <div vw class="enabled">
        <div vw-access-button class="active"></div>
        <div vw-plugin-wrapper>
          <div class="vw-plugin-top-wrapper"></div>
        </div>
      </div>
    </div>

  </div>

</template>
<style scoped></style>