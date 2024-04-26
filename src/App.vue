<script setup>
import { RouterLink, RouterView } from "vue-router";
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
import { conexaoBD } from "./stores/conexaoBD";

import tabBar from "./components/tabBar.vue";
import NavBarMobile from "./components/NavBarMobile.vue";


const banco = conexaoBD();
const criaNotificacaoStore = criaNotificacao();
const webSocket = webSocketStore();
const usuarioLogadoId = VueCookies.get("IdUsuarioCookie");
webSocket.url = "ws://localhost:8082/og/webSocket/usuario/" + usuarioLogadoId
webSocket.criaConexaoWebSocket();

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
let usuario = ref()
let configuracao = ref()

const route = useRoute();

onMounted(async () => {
  
    let root = document.documentElement.style
  usuario.value =
    await banco.buscarUm(
      JSON.parse(
        VueCookies.get('IdUsuarioCookie')),'/usuario')
  configuracao.value=usuario.value.configuracao
  perfil.isVlibras=configuracao.value.isLibras
  perfil.isTecladoVirtual=configuracao.value.isTecladoVirtual
  perfil.isVoiceMaker=configuracao.value.isDigitarVoz
  root.setProperty('--hueRoxo',configuracao.value.hueCor)
  root.setProperty('--fonteCorpo',configuracao.value.fonteCorpo)
  root.setProperty('--fonteTitulo',configuracao.value.fonteTitulo)
  root.setProperty('--fonteTituloTamanho',configuracao.value.fonteTituloTamanho)
  root.setProperty('--fonteCorpoTamanho',configuracao.value.fonteCorpoTamanho)
  


  // perfil.isVoiceMaker=JSON.parse(VueCookies.get('isVoiceMaker'))
  // perfil.isTecladoVirtual=JSON.parse(VueCookies.get('isTecladovirtual'))
  // console.log(perfil.isTecladoVirtual)
  // root.setProperty('--hueRoxo',JSON.parse(VueCookies.get('matizCor')))
  // root.setProperty('--fonteCorpo',JSON.parse(VueCookies.get('fonteCorpo')))
  // root.setProperty('--fonteTitulo',JSON.parse(VueCookies.get('fonteTitulo')))
  // let tamanhoCorpo=JSON.parse(VueCookies.get('fonteCorpoTamanho'))
  // let tamanhoTitulo=JSON.parse(VueCookies.get('fonteTituloTamanho'))
  // console.log(tamanhoCorpo);
  // console.log(tamanhoTitulo);
  // root.setProperty('--fonteCorpoTamanho',tamanhoCorpo+'vh')
  // root.setProperty('--fonteTituloTamanho',tamanhoTitulo+'vh')
  // perfil.hue=JSON.parse(VueCookies.get('matizCor'))
  // perfil.fonteTitulo= JSON.parse(VueCookies.get('fonteTitulo'))
  // perfil.fonteCorpo=JSON.parse(VueCookies.get('fonteCorpo'))
  // perfil.isVlibras=JSON.parse(VueCookies.get('isVlibras'))
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
  console.log(mensagem)
  criaNotificacaoStore.mandarNotificacao(mensagem);
}

function change(a) {
}
function close() {
  perfil.isTecladoAtivado = !perfil.isTecladoAtivado
}

function VerificaPrazoDoProjeto() {
  banco.procurar("/projeto").then((projetos) => {
    let dataAtual = new Date();
    let dias = 0;
    for (let i = 0; i < projetos.length; i++) {
      let dataProjeto = new Date(projetos[i].dataFinal);
      let diferenca = dataProjeto.getTime() - dataAtual.getTime();
      dias = Math.ceil(diferenca / (1000 * 60 * 60 * 24));
      if (dias < 7 && projetos[i].dataFinal != null && projetos[i].dataFinal > dataAtual) {
        enviaParaWebSocket(projetos[i], dias)
      }
    }
  });
}

function enviaParaWebSocket(projetoAux, dias) {
  let teste = {
    equipes: [
      {
        equipe: {
          membros: [
            {
              id: usuarioLogadoId
            }
          ]
        }
      }
    ],
    notificao: {
      mensagem: "Restam " + dias + " Para o fim do projeto",
      projeto: projetoAux
    }
  }

  console.log(teste)
  const webSocket = webSocketStore();
  webSocket.url = "ws://localhost:8082/og/webSocket/usuario/1"
  webSocket.enviaMensagemWebSocket(JSON.stringify(teste))
}

const screenWidth = ref(window.innerWidth)

watch(() => window.innerWidth, () => {
  screenWidth.value = window.innerWidth
})

var estaNoLogin = ref(true)

watch(() => route.path, () => {
  if (route.path == '/login') {
    estaNoLogin.value = true
  } else {
    estaNoLogin.value = false
  }
});
</script>

<template>
<div class=" bg-[var(--backgroundPuro)]">
  <Navbar v-if="!estaNoLogin && screenWidth >= 1024" />
    <tabBar v-if="!estaNoLogin && screenWidth < 1024" />
    <NavBarMobile v-if="!estaNoLogin && screenWidth < 1024" />
    <RouterView />
  </div>
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
</div>
<div v-show="isVlibras == true ">
  <div vw class="enabled">
    <div vw-access-button class="active"></div>
    <div vw-plugin-wrapper>
      <div class="vw-plugin-top-wrapper"></div>
    </div>
  </div>
</div>

</template>
<style scoped></style>