<template>
    <div class="h-[8vh] w-full flex justify-around">
        <div class="h-[8vh] w-[20%] flex gap-8 items-center justify-center">
        <div class="h-[8vh] flex items-center">
          <img @click="redireciona('/criaTarefa')" class="w-" src="../assets/BotaoCriaTarefaMobile.svg"/>
        </div>
      </div>
      <div class="h-[8vh] w-[50%] flex items-center gap-8 justify-end mr-8">
        <Input
          styleInput="input-claro-pequeno"
          largura="20%"
          altura="10%"
          conteudoInput="Pesquisar..."
        ></Input>
        <img
          @click="redireciona('/perfil/informacoes')"
          v-if="usuarioCookies && usuarioCookies.foto"
          class="shadow-2xl h-[60px] w-[60px] rounded-full"
          :src="'data:' + usuarioCookies.foto.tipo + ';base64,' + usuarioCookies.foto.dados"
        />
      </div>
      
      
    </div>
    <div v-if="notificacaoBoolean==true" class="w-full fixed z-50 flex justify-end pr-4" >
      <popUpNotificacao @fechar-Pop-Up="notificacaoBoolean=false"></popUpNotificacao>
    </div>
  </template>
  <script setup>
  import BarraLateral from "../components/BarraLateral.vue";
  import { ref } from "vue";
  import Botao from "../components/Botao.vue";
  import notificacao from "../imagem-vetores/Notificacao.svg";
  import UserIcon from "../imagem-vetores/UserIcon.svg";
  import Input from "./Input.vue";
  import router from "@/router";
  import { onMounted } from "vue";
  import VueCookies from "vue-cookies";
  import { conexaoBD } from "../stores/conexaoBD.js";
  import { criaTarefaEBuscaStore } from "../stores/criaTarefaEBusca"
  import popUpNotificacao from "../components/popUpNotificacao.vue";
  
  const banco = conexaoBD();
  
  onMounted(async () => {
    usuarioCookies = await autenticarUsuario(usuarioId);
  });
  
  let usuarioId = VueCookies.get("IdUsuarioCookie");
  let usuarioCookies;
  let notificacaoBoolean = ref(false);
  
  async function autenticarUsuario(id) {
    let usuarios = banco.procurar("/usuario");
    let listaUsuarios = await usuarios;
    let usuario = listaUsuarios.find((usuario) => usuario.id == id);
    return usuario;
  }
  
  function redireciona(rota) {
    router.push(rota);
    if(rota == '/criaTarefa'){
      const criaTarefa = criaTarefaEBuscaStore();
      criaTarefa.criaTarefa();
    }
  }
  </script>
  <style scoped></style>