<script setup>
import { useRouter } from "vue-router";
import Botao from "../components/Botao.vue";
import Input from "../components/Input.vue";
import iconeGoogle from "../imagem-vetores/iconeGoogle.svg";
import iconeLinkedin from "../imagem-vetores/iconeLinkedin.svg";
import iconePessoaLogin from "../imagem-vetores/iconePessoaLogin.svg";
import iconeSenhaLogin from "../imagem-vetores/iconeCadeadoSenhaLogin.svg";
import imgVetorSenha from "../imagem-vetores/iconeCadeadoSenhaLogin.svg";
import imgEmailRegistro from "../imagem-vetores/iconeEmailRegistro.svg";
import imgPessoaLogin from "../imagem-vetores/iconePessoaLogin.svg";
import { conexaoBD } from "../stores/conexaoBD.js";
import VueCookies from "vue-cookies";
import { criaUsuarioStore } from "../stores/criarUsuario.js";
import olho from "../imagem-vetores/olho.svg";
import olhoOculto from "../imagem-vetores/olhoOculto.svg";
import { ref } from "vue";

const router = useRouter();

let conteudoFormulario = {
  gap: "4vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

const banco = conexaoBD();

let tipo = ref("login");
let usuarioLogin = ref("");
let senhaUsuarioLogin = ref("");
let usuarioCadastro = ref("");
let emailCadastro = ref("");
let senhaCadastro = ref("");
let confirmarSenhaCadastro = ref("");

async function fazerLogin() {
  let usuarios = banco.procurar("/usuario");
  let listaUsuarios = await usuarios;
  listaUsuarios.forEach((usuario) => {
     console.log(usuario);
    console.log(usuarioLogin);
    if (usuarioLogin.value === usuario.username) {
      if (senhaUsuarioLogin.value === usuario.senha) {



        console.log("davi");
        console.log(usuario);
        usuarioLogin.value = "";
        senhaUsuarioLogin.value = "";
        VueCookies.set("IdUsuarioCookie", usuario.id, 100000000000);

      }
    }
  });
}

function trocaDeTela() {
  if (tipo.value === "login") {
    document.body.style.overflow = "hidden";
    tipo.value = "cadastro";
  } else {
    document.body.style.overflow = "hidden";
    tipo.value = "login";
  }
}

async function cadastraUsuario() {
  const criarUsuario = criaUsuarioStore();
  let usuarioUnico = true;
  let usuarios = banco.procurar("/usuario");
  let listaUsuarios = await usuarios;
  listaUsuarios.forEach((usuario) => {
    if (usuario.username != usuarioCadastro.value) {
      usuarioUnico = true;
    } else {
      usuarioUnico = false;
    }
  });
  if (usuarioUnico) {
    if (
      emailCadastro.value.indexOf("@") > 0 &&
      emailCadastro.value.indexOf("@") < emailCadastro.value.length - 1 &&
      emailCadastro.value.includes(".")
    ) {
      if (senhaCadastro.value === confirmarSenhaCadastro.value) {
        criarUsuario.criaUsuario(
          usuarioCadastro.value,
          emailCadastro.value,
          senhaCadastro.value
        );
        usuarioCadastro.value = "";
        emailCadastro.value = "";
        senhaCadastro.value = "";

        confirmarSenhaCadastro.value = "";
      }
    }
  }
}

let vizualizacaoDeSenha = ref("password");
let vizualizacaoDeSenhaConfirmacao = ref("password");
let iconeDaSenha = ref(olho);
let iconeDaSenhaConfirmacao = ref(olho);
function mostraSenhas() {
  if (vizualizacaoDeSenha.value === "") {
    vizualizacaoDeSenha.value = "password";
    iconeDaSenha.value = olho;
  } else {
    vizualizacaoDeSenha.value = "";
    iconeDaSenha.value = olhoOculto;
  }
}
function mostraSenhaConfirmacao() {
  if (vizualizacaoDeSenhaConfirmacao.value === "") {
    vizualizacaoDeSenhaConfirmacao.value = "password";
    iconeDaSenhaConfirmacao.value = olho;
  } else {
    vizualizacaoDeSenhaConfirmacao.value = "";
    iconeDaSenhaConfirmacao.value = olhoOculto;
  }
}
</script>

<template>
  <div class="tamanhoImagemFundoLogin flex" id="imagemDeFundoLogin">
    <div class="h-[100vh] w-[70%] flex items-center justify-center flex-col">
      <div class="flex items-center justify-center flex-col h-full">
        <img class="tamanhoDaLogoLogin" src="../imagem-vetores/logo.svg" />
        <img class="tamanhoDoNomeLogin" src="../imagem-vetores/nome.svg" />
      </div>
    </div>
    <div id="bordaCinza">
      <Transition name="login">
        <div v-if="tipo === 'login'" :style="conteudoFormulario">
          <h1 class="text-5xl text-[#FFFFFF]">LOGIN</h1>
          <Input
            styleInput="input-transparente-escuro"
            :icon="iconePessoaLogin"
            conteudoInput="User"
            v-model="usuarioLogin"
          ></Input>
          <div class="flex flex-row justify-center items-center pl-10">
            <Input
              styleInput="input-transparente-escuro"
              :icon="iconeSenhaLogin"
              conteudoInput="Senha"
              v-model="senhaUsuarioLogin"
              :tipo="vizualizacaoDeSenha"
            ></Input>
            <button class="h-[100%] w-[6%]" @click="mostraSenhas">
              <img :src="iconeDaSenha" class="h-[50%] w-[100%] invert ml-4" />
            </button>
          </div>
          <Botao
            :funcaoClick="fazerLogin"
            preset="PadraoRoxo"
            texto="Acessar"
            tamanhoPadrao="grande"
          ></Botao>


        <Botao
          :funcaoClick="trocaDeTela"
          preset="PadraoBranco"
          texto="Criar Conta"
          tamanhoPadrao="medio"
        ></Botao>
        <div class="flex items-center justify-center w-[70%]">
          <hr style="width: 20%; text-align: left; margin-left: 0" />
          <p class="text-[#FFFFFF] ml-2 mr-2">or</p>
          <hr style="width: 20%; text-align: left; margin-left: 0" />
        </div>
      </Transition>
      <Transition name="registro">
        <div v-if="tipo === 'cadastro'" :style="conteudoFormulario">
          <h1 class="text-5xl text-[#FFFFFF]">CADASTRO</h1>
          <Input
            styleInput="input-transparente-escuro"
            :icon="imgPessoaLogin"
            conteudoInput="Usuario"
            v-model="usuarioCadastro"
          ></Input>
          <Input
            styleInput="input-transparente-escuro"
            :icon="imgEmailRegistro"
            conteudoInput="E-Mail"
            v-model="emailCadastro"
          ></Input>
          <div class="flex flex-row justify-center items-center pl-10">
            <Input
              styleInput="input-transparente-escuro"
              :icon="iconeSenhaLogin"
              conteudoInput="Senha"
              v-model="senhaCadastro"
              :tipo="vizualizacaoDeSenha"
            ></Input>
            <button
              class="h-[100%] w-[6%] flex items-center justify-center"
              @click="mostraSenhas"
            >
              <img :src="iconeDaSenha" class="h-[50%] w-[100%] invert ml-4" />
            </button>
          </div>
          <div class="flex flex-row justify-center items-center pl-10">
            <Input
              styleInput="input-transparente-escuro"
              :icon="iconeSenhaLogin"
              conteudoInput="Confirmar Senha"
              v-model="confirmarSenhaCadastro"
              :tipo="vizualizacaoDeSenhaConfirmacao"
            ></Input>
            <button
              class="h-[100%] w-[6%] flex items-center justify-center"
              @click="mostraSenhaConfirmacao"
            >
              <img :src="iconeDaSenhaConfirmacao" class="h-[50%] w-[100%] invert ml-4" />
            </button>
          </div>
          <Botao
            :funcaoClick="cadastraUsuario"
            preset="PadraoRoxo"
            texto="Cadastrar"
            tamanhoPadrao="grande"
          ></Botao>
          <Botao
            :funcaoClick="trocaDeTela"
            preset="PadraoBranco"
            texto="Sair"
            tamanhoPadrao="medio"
          ></Botao>
        </div>
        <Botao
          :funcaoClick="cadastraUsuario"
          preset="PadraoRoxo"
          texto="Cadastrar"
          tamanhoPadrao="grande"
        ></Botao>
        <Botao
          :funcaoClick="trocaDeTela"
          preset="PadraoBranco"
          texto="Sair"
          tamanhoPadrao="medio"
        ></Botao>
      </div>
    </Transition>
  </div>
</template>
<style scoped>
#bordaCinza {
  @apply flex justify-center items-center 2xl:h-[100%] 2xl:w-[30vw] xl:h-[100%] xl:w-[30vw] lg:h-[100%] lg:w-[30vw] md:h-[100%] md:w-[75vw] bg-[#C4C4C4];
  clip-path: polygon(28% 0, 100% 0, 100% 100%, 28% 100%, 0 80%, 0 20%);
  background-image: linear-gradient(#000000, #320461);
}
#imagemDeFundoLogin {
  background-image: url(../imagem-vetores/BG1.svg);
  background-color: #ffffff;
  height: 100vh;
  width: 100vw;
}
.tamanhoImagemFundoLogin {
  @apply w-full h-full;
}
.tamanhoDaLogoLogin {
  @apply 2xl:w-[30vw] 2xl:h-[30vw]  xl:w-[35vw]  lg:w-[40vw]  md:w-[55vw];
}
.tamanhoDoNomeLogin {
  @apply 2xl:w-[16vw] 2xl:h-[6vw]   xl:w-[20vw]  lg:w-[24vw]  md:w-[28vw]  pr-12;
}

.login-enter-from,
.login-leave-to,
.registro-enter-from,
.registro-leave-to {
  opacity: 0;
  transform: translateX(100vw); /* Mudança para fora da tela à esquerda */
}

.registro-leave-from,
.registro-enter-to {
  opacity: 1;
  transform: translateX(-11vw);
}

.login-enter-active,
.registro-enter-active {
  transition: all 1.8s ease-out;
}

.login-enter-to,
.login-leave-from {
  opacity: 1;
  transform: translateX(10vw);
}

.login-leave-active,
.registro-leave-active {
  transition: all 1.8s ease-in;
}

body {
  overflow: hidden;
}
</style>
