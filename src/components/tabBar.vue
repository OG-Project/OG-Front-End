<template>
    <div class="fixed bottom-0 w-full flex justify-around items-center h-[8vh] bg-[var(--roxo)] z-[9999999999]">
        <img class="h-[40%]" @click="redireciona('/home')" :src="IconHome" />
        <img class="h-[40%]" @click="redireciona('/equipe')" :src="IconProfile" />
        <img class="h-[40%]" @click="redireciona('/projetos')" :src="IconFolder" />
        <img class="h-[40%]" :src="IconNotification" />
        <img class="h-[40%]" @click="redireciona('/perfil/informacoes')" :src="IconConfig" />
        <iconChatBar @click="redireciona('/chat')" class="h-[40%]"></iconChatBar>
    </div>
</template>

<script setup>
import IconConfig from "../assets/ConfigIconMobile.svg"
import IconFolder from "../assets/FolderIconMobile.svg"
import IconHome from "../assets/HomeIconMobile.svg"
import IconNotification from "../assets/NotificacaoIconMobile.svg"
import IconProfile from "../assets/EquipeIconMobile.svg"
import router from "@/router";
import { onMounted, ref } from "vue"
import VueCookies from "vue-cookies"
import { conexaoBD } from "../stores/conexaoBD.js"
import iconChatBar from "../assets/iconChatBar.vue"

let conexao = conexaoBD();
let configuracao = ref()
let usuario = ref()
onMounted(()=>{
    buscaConfiguracaoesPadrao()
})

async function buscaConfiguracaoesPadrao(){
    let root = document.documentElement.style
  usuario.value =
    await conexao.buscarUm(
      JSON.parse(
        VueCookies.get('IdUsuarioCookie')), '/usuario')
  configuracao.value = usuario.value.configuracao
  root.setProperty('--hueRoxo', configuracao.value.hueCor)
  root.setProperty('--fonteCorpo', configuracao.value.fonteCorpo)
  root.setProperty('--fonteTitulo', configuracao.value.fonteTitulo)
  root.setProperty('--fonteTituloTamanho', configuracao.value.fonteTituloTamanho+"vh")
  root.setProperty('--fonteCorpoTamanho', configuracao.value.fonteCorpoTamanho+"vh")
 
}
function redireciona(caminho){
    router.push(caminho).then(() => {
        window.location.reload()
    });
}

</script>

<style scoped>
h1 {
    font-size: 24px;
    margin-bottom: 10px;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    margin-bottom: 5px;
}
</style>
