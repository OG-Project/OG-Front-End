<script setup>
import { RouterLink, RouterView } from "vue-router";
import { funcaoPopUpStore } from "./stores/funcaoPopUp";
import VueCookies from "vue-cookies";
import KeyBoard from './components/Keyboard.vue'
import svgIconMove from './assets/svgIconMove.vue'
import svgIconX from './assets/svgIconX.vue'
import Navbar from '@/components/Navbar.vue';
import { ref, watch, onMounted, onUpdated } from 'vue';
import { storeToRefs } from 'pinia';
import { perfilStore } from './stores/perfilStore';
import { useDraggable } from '@vueuse/core'
import { webSocketStore } from './stores/webSocket.js'
import { criaNotificacao } from './stores/criaNotificacao.js';
import { conexaoBD } from "./stores/conexaoBD";
import { useRoute } from 'vue-router';
import TelaLoad from "./components/TelaLoad.vue";
import tutorial from "./components/tutorial.vue"
const route = useRoute()

import tabBar from "./components/tabBar.vue";
import NavBarMobile from "./components/NavBarMobile.vue";
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const banco = conexaoBD();
const criaNotificacaoStore = criaNotificacao();
const webSocket = webSocketStore();
const usuarioLogadoId = VueCookies.get("IdUsuarioCookie");
webSocket.url = "ws://localhost:8082/og/webSocket/usuario/1"

const perfil = perfilStore()
const { isVlibras } = storeToRefs(perfil);

const el = ref(perfil.el)

const { x, y, style } = useDraggable(el, {
  initialValue: { x: 1300, y: 70 },
})
// let ativado='';
let url = window.location.href;
let usuario = ref()
let configuracao = ref()

onMounted(async () => {
  usuario.value =
    await banco.buscarUm(
      JSON.parse(
        VueCookies.get('IdUsuarioCookie')), '/usuario')
  let root = document.documentElement.style
  configuracao.value = usuario.value.configuracao
  perfil.isVlibras = configuracao.value.isLibras
  perfil.isTecladoVirtual = configuracao.value.isTecladoVirtual
  perfil.isVoiceMaker = configuracao.value.isDigitarVoz
  root.setProperty('--hueRoxo', configuracao.value.hueCor)
  root.setProperty('--hueRoxoClaro', configuracao.value.hueCor)

  root.setProperty('--fonteCorpo', configuracao.value.fonteCorpo)
  root.setProperty('--fonteTitulo', configuracao.value.fonteTitulo)
  root.setProperty('--fonteTituloTamanho', configuracao.value.fonteTituloTamanho + 'vh')
  root.setProperty('--fonteCorpoTamanho', configuracao.value.fonteCorpoTamanho + 'vh')
  if (configuracao.value.isDark) {
    root.setProperty('--backgroundPuro', '#0F0F0F')
    root.setProperty('--backgroundItems', '#222222')
    root.setProperty('--fonteCor', '#ffffff')
    root.setProperty('--backgroundItemsClaros', '#363636')
  }

})
onBeforeUpdate(async () => {
  usuario.value =
    await banco.buscarUm(
      JSON.parse(
        VueCookies.get('IdUsuarioCookie')), '/usuario')
  console.log(usuario.value);
})


onUpdated(() => {
  if (route.path != '/login') {
    console.log(usuario.value.configuracao.isTutorial);
    console.log(usuario.value.configuracao.rotaDoPasso);
    if (usuario.value.configuracao.isTutorial) {
      if (usuario.value.configuracao.ultimoPassoId != 'step-1'
        && usuario.value.configuracao.ultimoPassoId != null) {
        console.log(tour.getById(usuario.value.configuracao.ultimoPassoId));
        router.push(usuario.value.configuracao.rotaDoPasso)
        tour.show(usuario.value.configuracao.ultimoPassoId, true)
      } else {
        console.log(route.path);
        tour.start()
      }
    }

  }
})

function press(b) {
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

function change(a) {
}
function close() {
  perfil.isTecladoAtivado = !perfil.isTecladoAtivado
}

const screenWidth = ref(window.innerWidth)

watch(() => window.innerWidth, () => {
  screenWidth.value = window.innerWidth
})

var estaNoLogin = ref(true)

watch(() => route.path, () => {
  if (route.path == '/login') {
    estaNoLogin.value = true
  }
  else if (route.path == '/landingPage') {
    estaNoLogin.value = true
  }
  else {
    estaNoLogin.value = false
  }
});
import { inject } from 'vue'
const tour=inject('tour')
import router from "./router";
import { onBeforeUpdate } from "vue";

</script>

<template>
  <div v-show="isVlibras == true">
    <div vw class="enabled">
      <div vw-access-button class="active"></div>
      <div vw-plugin-wrapper>
        <div class="vw-plugin-top-wrapper"></div>
      </div>
    </div>
  </div>
  <div class=" bg-[var(--backgroundPuro)] text-[var(--fonteCor)] min-h-screen  overflow-hidden">

    <Navbar v-if="!estaNoLogin && screenWidth >= 1024" />
    <tabBar v-if="!estaNoLogin && screenWidth < 1024" />
    <NavBarMobile v-if="!estaNoLogin && screenWidth < 1024" />
    <RouterView/>
  </div>
  <!-- Atraves do x e y você gerencia e utiliza do drag and drop -->
  <div ref="el" :style="style" style="position: fixed"
    class="bg-[#ececec] top-16 left-[67.8vw] absolute z-[99999] w-max " v-if="perfil.isTecladoAtivado">
    <div class=" flex flex-col items-center">
      <div class="flex w-full justify-between px-4 ">
        <svgIconMove class="w-[1vw] h-[3vh]" />
        <svgIconX @click="close" class="w-[1vw] h-[3vh]"></svgIconX>
      </div>
      <KeyBoard @onChange="change" @onKeyPress="press"></KeyBoard>
    </div>
  </div>
  <tutorial></tutorial>
  <TelaLoad></TelaLoad>
</template>
<style scoped></style>