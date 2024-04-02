<template>
  <div class="h-[8vh] w-full flex">
    <div class="h-[8vh] w-[15%] flex gap-8">
      <BarraLateral class="w-[45%]"></BarraLateral>
      <div class="h-[8vh] w-[15%] flex items-center">
        <Botao
          preset="PadraoVazado"
          texto="Nova Tarefa"
          tamanhoDaBorda="2px"
          :funcaoClick="redireciona"
          :parametrosFuncao="'/criaTarefa'"
        >
        </Botao>
      </div>
    </div>
    <div class="h-[8vh] w-[35%] flex gap-8"></div>
    <div class="h-[8vh] w-[50%] flex items-center gap-8 justify-end mr-8">
      <Input
        styleInput="input-claro-pequeno"
        largura="20%"
        altura="10%"
        conteudoInput="Pesquisar..."
      ></Input>
      <img :src="notificacao" />
      <img
        @click="redireciona('/perfil/informacoes')"
        v-if="usuarioCookies && usuarioCookies.foto"
        class="shadow-2xl h-[60px] w-[60px] rounded-full"
        :src="'data:' + usuarioCookies.foto.tipo + ';base64,' + usuarioCookies.foto.dados"
      />
    </div>
  </div>
</template>
<script setup>
import BarraLateral from "../components/BarraLateral.vue";
import Botao from "../components/Botao.vue";
import notificacao from "../imagem-vetores/Notificacao.svg";
import UserIcon from "../imagem-vetores/UserIcon.svg";
import Input from "./Input.vue";
import router from "@/router";
import { onMounted } from "vue";
import VueCookies from "vue-cookies";
import { conexaoBD } from "../stores/conexaoBD.js";

const banco = conexaoBD();

onMounted(async () => {
  usuarioCookies = await autenticarUsuario(usuarioId);
});

let usuarioId = VueCookies.get("IdUsuarioCookie");
let usuarioCookies;

async function autenticarUsuario(id) {
  let usuarios = banco.procurar("/usuario");
  let listaUsuarios = await usuarios;
  let usuario = listaUsuarios.find((usuario) => usuario.id == id);
  return usuario;
}

function redireciona(rota) {
  router.push(rota);
}
</script>
<style scoped></style>
