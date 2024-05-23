<template>
  <div class="h-[90%]">
      <div v-if="screenWidth >= 1024" class="h-[90%]">
      <HomeViewDesktop></HomeViewDesktop>
      </div>
      <div v-else>
      <HomeViewMobile></HomeViewMobile>
      </div>
  </div>
</template>
<script setup>
import { ref, onMounted,watch } from 'vue'
import HomeViewDesktop from './desktop/HomeViewDesktop.vue';
import HomeViewMobile from './mobile/HomeViewMobile.vue';
import router from '../router';
import VueCookies from 'vue-cookies'
import { conexaoBD } from "../stores/conexaoBD.js";
import VueCookies from 'vue-cookies';

const banco = conexaoBD();
// https://dontpad.com/02-05-2024gks
// import { useShepherd } from 'vue-shepherd'

const screenWidth = ref(window.innerWidth)

watch(() => window.innerWidth, () => {
  screenWidth.value = window.innerWidth
})
onMounted(() => {
  window.addEventListener('resize', () => {
      screenWidth.value = window.innerWidth
  })
  colocaUsuarioId();
  reloadHome()
})

function reloadHome() {
  const reload = VueCookies.get('idReloadHome');
  if (reload == '0') {
    console.log('reload');
    VueCookies.set('idReloadHome', '1');
    
    setTimeout(() => {
      window.location.reload();
    }, 0.5); // 2000 ms = 2 seconds
  }
}


function colocaUsuarioId(){
  banco.getCookie().then((res) =>{
  VueCookies.set("IdUsuarioCookie", res.id, 100000000000)
  buscaConfiguracaoesPadrao();
 })
}

async function buscaConfiguracaoesPadrao(){
    let root = document.documentElement.style
  usuario.value =await conexao.buscarUm(VueCookies.get('IdUsuarioCookie'), '/usuario')
  configuracao.value = usuario.value.configuracao
  root.setProperty('--hueRoxo', configuracao.value.hueCor)
  root.setProperty('--hueRoxoClaro', configuracao.value.hueCor)
  root.setProperty('--fonteCorpo', configuracao.value.fonteCorpo)
  root.setProperty('--fonteTitulo', configuracao.value.fonteTitulo)
  root.setProperty('--fonteTituloTamanho', configuracao.value.fonteTituloTamanho+"vh")
  root.setProperty('--fonteCorpoTamanho', configuracao.value.fonteCorpoTamanho+"vh")
 
}
</script>
<style scoped>
.button{
  @apply hover:bg-[var(--roxo)] bg-[var(--roxo)];
}
</style>