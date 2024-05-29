<script setup>
import { useRouter } from "vue-router";
import Botao from "../components/Botao.vue";
import Input from "../components/Input.vue";
import iconeGoogle from "../imagemVetores/iconeGoogle.svg";
import iconeLinkedin from "../imagemVetores/iconeLinkedin.svg";
import iconePessoaLogin from "../imagemVetores/iconePessoaLogin.svg";
import iconeSenhaLogin from "../imagemVetores/iconeCadeadoSenhaLogin.svg";
import imgVetorSenha from "../imagemVetores/iconeCadeadoSenhaLogin.svg";
import imgEmailRegistro from "../imagemVetores/iconeEmailRegistro.svg";
import imgPessoaLogin from "../imagemVetores/iconePessoaLogin.svg";
import { conexaoBD } from "../stores/conexaoBD.js";
import VueCookies from "vue-cookies";
import { criaUsuarioStore } from "../stores/criarUsuario.js";
import olho from "../imagemVetores/olho.svg";
import olhoOculto from "../imagemVetores/olhoOculto.svg";
import { ref } from "vue";
import Logo from "../imagemVetores/logo.vue";
import { onMounted } from "vue";
import { watch } from "vue";
import { criaNotificacao } from "../stores/criaNotificacao";

const router = useRouter();
const criaNotificacaoStore = criaNotificacao()

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
let emailInvalido = ref(false)
let senhaInvalido = ref(false)
let usuarioInvalido = ref(false)
let textoUsuarioInvalido = ref('')
let textoSenhaInvalida = ref('')
let caracterSpecias = [
  '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+',
  '[', ']', '{', '}', ';', ':', '|', ',', '<', '.', '>', '/',
  '?', '`', '~'
]
let leters = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p',
  'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
  'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
]
let confirmarSenhaCadastro = ref("");
let usuarioSecurity = {
  username: "",
  password: ""
}
async function fazerLogin() {
  usuarioSecurity.username = usuarioLogin.value
  usuarioSecurity.password = senhaUsuarioLogin.value
  let error;
  await banco.login(usuarioSecurity).catch(e => {
    error = e
  })
  if (error != 'undefined') {
    // Função banco.getCookie retorna um usuario do nosso sistema de acordo com o cookie salvo
    // pode ser usada em inumeras verificações que nos fazemos para encontrar o usuario logado
    banco.getCookie().then((usuario) => {
      usuarioLogin.value = "";
      senhaUsuarioLogin.value = "";
      VueCookies.set("IdUsuarioCookie", usuario.id, 100000000000)
      VerificaPrazoDoProjeto()
      router.push('/home').then(() => {
        window.location.reload()
      })
      return
    })

  } else {
    usuarioOuSenhaInvalida.value = true
  }
}


function VerificaPrazoDoProjeto() {
  banco.procurar("/projeto").then((projetos) => {
    let dataAtual = new Date();
    let dias = 0;
    for (let i = 0; i < projetos.length; i++) {
      let dataProjeto = new Date(projetos[i].dataFinal);
      let diferenca = dataProjeto.getTime() - dataAtual.getTime();
      dias = Math.ceil(diferenca / (1000 * 60 * 60 * 24));
      if (dias < 7 && projetos[i].dataFinal != null && dias >= 1) {
        enviaParaWebSocket(projetos[i], dias)
      }
    }
  });
}

function enviaParaWebSocket(projetoAux, dias) {
  let usuarioLogadoId = VueCookies.get("IdUsuarioCookie");
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
      mensagem: "Restam " + dias + " dias para o fim do projeto",
      projeto: projetoAux
    }
  }
  criaNotificacaoStore.mandarNotificacao(teste);
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

const screenWidth = ref(window.innerWidth)

watch(() => window.innerWidth, () => {
  screenWidth.value = window.innerWidth
})

onMounted(() => {
  window.addEventListener('resize', () => {
    screenWidth.value = window.innerWidth
  })
})

async function cadastraUsuario() {
  const criarUsuario = criaUsuarioStore();

  if (usuarioCadastro.value != '') {
    usuarioInvalido.value=false
    let isUsernameExist=false;
    let usuarios=ref()
    await banco.procurar('/usuario').then(response=>{
      usuarios.value=response
    })
    console.log(usuarios.value);
    usuarios.value.forEach(element => {
      if(element.username==usuarioCadastro){
        isUsernameExist=true
      }
    });
    if(!isUsernameExist){
      usuarioInvalido.value=false
      if (
        emailCadastro.value.indexOf("@") > 0 &&
        emailCadastro.value.indexOf("@") < emailCadastro.value.length - 1 &&
        emailCadastro.value.includes(".")
      ) {
        emailInvalido.value = false
        if (senhaCadastro.value.length > 7) {
          if (senhaCadastro.value === confirmarSenhaCadastro.value) {
            console.log('a');
            console.log(verificaLetrasSenha());
            console.log(verificaCaracteresSenha());
            if (verificaLetrasSenha() == true && verificaCaracteresSenha() == true) {
              emailInvalido.value = false
              senhaInvalido.value = false
              usuarioInvalido.value = false
              try {
                criarUsuario.criaUsuario(
                  usuarioCadastro.value,
                  emailCadastro.value,
                  senhaCadastro.value
                )
              } catch (error) {
                console.log(error);
              }
              usuarioCadastro.value = "";
              emailCadastro.value = "";
              senhaCadastro.value = "";
              confirmarSenhaCadastro.value = "";
              trocaDeTela();
            } else if (verificaLetrasSenha() && !verificaCaracteresSenha()) {
              senhaInvalido.value = true
              textoSenhaInvalida.value = 'Senha necessita de caracteres especiais'
            } else if (!verificaLetrasSenha() && verificaCaracteresSenha()) {
              senhaInvalido.value = true
              textoSenhaInvalida.value = 'Senha necessita de alguma letra'
            } else {
              senhaInvalido.value = true
              textoSenhaInvalida.value = 'Senha necessita de alguma letra e caracteres especiais'
            }
          } else if (senhaCadastro.value != confirmarSenhaCadastro.value) {
            textoSenhaInvalida.value = 'Senhas Divergentes'
            senhaInvalido.value = true
          }
        } else {
          senhaInvalido.value = true
          textoSenhaInvalida.value = 'Senha contém menos de 8 caracteres'
        }
      } else {
        emailInvalido.value = true
      }
    }else {
      usuarioInvalido.value=true
      textoUsuarioInvalido.value='Username já existe'
    }
      
  } else {
    usuarioInvalido.value = true
    textoUsuarioInvalido.value='Username precisa ter algo'
  }
}

function verificaLetrasSenha() {
  for (let i = 0; i < senhaCadastro.value.length; i++) {
    if (leters.includes(senhaCadastro.value[i])) {
      return true
    };
  }
  return false
}
function verificaCaracteresSenha() {
  for (let i = 0; i < senhaCadastro.value.length; i++) {
    if (caracterSpecias.includes(senhaCadastro.value[i])) {
      return true
    };
  }
  return false
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

async function removeCookie() {
  VueCookies.remove("JSESSIONID")
  await loginGoogle()
}
async function loginGoogle() {
  VueCookies.set('idReloadHome', '0');
  window.location.href = "http://localhost:8082"
}
</script>

<template>
  <div v-if="screenWidth >= 1024">
    <div class="tamanhoImagemFundoLogin flex" id="imagemDeFundoLogin">
      <div class="h-[100vh] w-[70%] flex items-center justify-center flex-col">
        <div class="flex items-center justify-center flex-col h-full">
          <Logo class="tamanhoDaLogoLogin" />
          <img class="tamanhoDoNomeLogin" src="../imagemVetores/nome.svg" />
        </div>
      </div>
      <div id="bordaCinza">
        <Transition name="login">
          <div v-if="tipo === 'login'" :style="conteudoFormulario">
            <h1 class="text-5xl text-[#FFFFFF]">LOGIN</h1>
            <Input styleInput="input-transparente-escuro" :icon="iconePessoaLogin" conteudoInput="User"
              v-model="usuarioLogin" :isInvalido="usuarioOuSenhaInvalida" textoInvalido="Usuario ou senha invalida"
              @updateModelValue="(e) => { usuarioLogin = e; }"></Input>
            <div class="flex flex-row w-full justify-center items-center pl-7">
              <Input styleInput="input-transparente-escuro" :icon="iconeSenhaLogin" conteudoInput="Senha"
                v-model="senhaUsuarioLogin" :isInvalido="usuarioOuSenhaInvalida"
                textoInvalido="Usuario ou senha invalida" :tipo="vizualizacaoDeSenha"
                @updateModelValue="(e) => { senhaUsuarioLogin = e; }"></Input>
              <button class="h-[100%] w-[6%]" @click="mostraSenhas">
                <img :src="iconeDaSenha" class="h-[50%] w-[100%] invert ml-4" />
              </button>
            </div>
            <Botao :funcaoClick="fazerLogin" preset="PadraoRoxo" texto="Acessar" tamanhoPadrao="grande"></Botao>

            <Botao :funcaoClick="trocaDeTela" preset="PadraoBranco" texto="Criar Conta" tamanhoPadrao="medio"></Botao>
            <div class="flex items-center justify-center w-[70%]">
              <hr style="width: 35%; text-align: left; margin-left: 0" />
              <hr style="width: 35%; text-align: left; margin-left: 0" />
            </div>
            <Botao preset="PadraoBrancoIcon" :icon="iconeGoogle" texto="Google" ladoDoIcon="row-reverse"
              :funcaoClick="removeCookie"></Botao>
          </div>
        </Transition>
        <Transition name="registro">
          <div v-if="tipo === 'cadastro'" :style="conteudoFormulario">
            <h1 class="text-5xl text-[#FFFFFF]">CADASTRO</h1>
            <Input styleInput="input-transparente-escuro" :icon="imgPessoaLogin" conteudoInput="Usuario"
              :isInvalido="usuarioInvalido" :textoInvalido="textoUsuarioInvalido" v-model="usuarioCadastro"
              @updateModelValue="(e) => { usuarioCadastro = e; }"></Input>
            <Input styleInput="input-transparente-escuro" :icon="imgEmailRegistro" conteudoInput="E-Mail"
              v-model="emailCadastro" :isInvalido="emailInvalido" textoInvalido="Email faltando @ ou . "
              @updateModelValue="(e) => { emailCadastro = e; }"></Input>
            <div class="flex flex-row justify-center items-center pl-10">
              <Input styleInput="input-transparente-escuro" :icon="iconeSenhaLogin" conteudoInput="Senha"
                v-model="senhaCadastro" :isInvalido="senhaInvalido" :textoInvalido="textoSenhaInvalida"
                :tipo="vizualizacaoDeSenha" @updateModelValue="(e) => { senhaCadastro = e; }"></Input>
              <button class="h-[100%] w-[6%] flex items-center justify-center" @click="mostraSenhas">
                <img :src="iconeDaSenha" class="h-[50%] w-[100%] invert ml-4" />
              </button>
            </div>
            <div class="flex flex-row justify-center items-center pl-10">
              <Input styleInput="input-transparente-escuro" :icon="iconeSenhaLogin" conteudoInput="Confirmar Senha"
                v-model="confirmarSenhaCadastro" :textoInvalido="textoSenhaInvalida" :isInvalido="senhaInvalido"
                :tipo="vizualizacaoDeSenhaConfirmacao"
                @updateModelValue="(e) => { confirmarSenhaCadastro = e; }"></Input>
              <button class="h-[100%] w-[6%] flex items-center justify-center" @click="mostraSenhaConfirmacao">
                <img :src="iconeDaSenhaConfirmacao" class="h-[50%] w-[100%] invert ml-4" />
              </button>
            </div>
            <Botao :funcaoClick="cadastraUsuario" preset="PadraoRoxo" texto="Cadastrar" tamanhoPadrao="grande"></Botao>
            <Botao :funcaoClick="trocaDeTela" preset="PadraoBranco" texto="Sair" tamanhoPadrao="medio"></Botao>
          </div>
        </Transition>
      </div>
    </div>
  </div>
  <div v-if="screenWidth < 1024" class="h-[100vh]">
    <div id="bordaCinzaMobile">
      <div v-if="tipo === 'login'" :style="conteudoFormulario">
        <h1 class="text-5xl text-[#FFFFFF]">LOGIN</h1>
        <Input styleInput="input-transparente-escuro" :icon="iconePessoaLogin" conteudoInput="User"
          v-model="usuarioLogin" @updateModelValue="(e) => { usuarioLogin = e; }"></Input>
        <div class="flex flex-row w-full justify-center items-center pl-7">
          <Input styleInput="input-transparente-escuro" :icon="iconeSenhaLogin" conteudoInput="Senha"
            v-model="senhaUsuarioLogin" :tipo="vizualizacaoDeSenha"
            @updateModelValue="(e) => { senhaUsuarioLogin = e; }"></Input>
          <button class="h-[100%] w-[6%]" @click="mostraSenhas">
            <img :src="iconeDaSenha" class="h-[50%] w-[100%] invert ml-4" />
          </button>
        </div>
        <Botao :funcaoClick="fazerLogin" preset="PadraoRoxo" texto="Acessar" tamanhoPadrao="mobilemedio"></Botao>

        <Botao :funcaoClick="trocaDeTela" preset="PadraoBranco" texto="Criar Conta" tamanhoPadrao="mobilemedio"></Botao>
        <div class="flex items-center justify-center w-[70%]">
          <hr style="width: 40%; text-align: left; margin-left: 0" />
          <hr style="width: 40%; text-align: left; margin-left: 0" />
        </div>
        <Botao preset="PadraoBrancoIcon" :icon="iconeGoogle" texto="Google" tamanhoPadrao="mobilepequeno"
          ladoDoIcon="row-reverse" :funcaoClick="loginGoogle"></Botao>
      </div>
      <div v-if="tipo === 'cadastro'" :style="conteudoFormulario">
        <h1 class="text-5xl text-[#FFFFFF]">CADASTRO</h1>
        <Input styleInput="input-transparente-escuro" :icon="imgPessoaLogin" conteudoInput="Usuario"
          :isInvalido="usuarioInvalido" :textoInvalido="textoUsuarioInvalido" v-model="usuarioCadastro"
          @updateModelValue="(e) => { usuarioCadastro = e; }"></Input>
        <Input styleInput="input-transparente-escuro" :icon="imgEmailRegistro" conteudoInput="E-Mail"
          v-model="emailCadastro" :isInvalido="emailInvalido" textoInvalido="Email faltando @ ou . "
          @updateModelValue="(e) => { emailCadastro = e; }"></Input>
        <div class="flex flex-row justify-center items-center pl-10">
          <Input styleInput="input-transparente-escuro" :icon="iconeSenhaLogin" conteudoInput="Senha"
            v-model="senhaCadastro" :tipo="vizualizacaoDeSenha" :isInvalido="senhaInvalido"
            :textoInvalido="textoSenhaInvalida" @updateModelValue="(e) => { senhaCadastro = e; }"></Input>
          <button class="h-[100%] w-[6%] flex items-center justify-center" @click="mostraSenhas">
            <img :src="iconeDaSenha" class="h-[50%] w-[100%] invert ml-4" />
          </button>
        </div>
        <div class="flex flex-row justify-center items-center pl-10">
          <Input styleInput="input-transparente-escuro" :icon="iconeSenhaLogin" conteudoInput="Confirmar Senha"
            v-model="confirmarSenhaCadastro" :tipo="vizualizacaoDeSenhaConfirmacao" :isInvalido="senhaInvalido"
            :textoInvalido="textoSenhaInvalida" @updateModelValue="(e) => { confirmarSenhaCadastro = e; }"></Input>
          <button class="h-[100%] w-[6%] flex items-center justify-center" @click="mostraSenhaConfirmacao">
            <img :src="iconeDaSenhaConfirmacao" class="h-[50%] w-[100%] invert ml-4" />
          </button>
        </div>
        <Botao :funcaoClick="cadastraUsuario" preset="PadraoRoxo" texto="Cadastrar" tamanhoPadrao="mobilemedio"></Botao>
        <Botao :funcaoClick="trocaDeTela" preset="PadraoBranco" texto="Sair" tamanhoPadrao="mobilepequeno"></Botao>
      </div>
    </div>
  </div>
</template>
<style scoped>
#bordaCinza {
  @apply flex justify-center items-center 2xl:h-[100%] 2xl:w-[30vw] xl:h-[100%] xl:w-[35vw] lg:h-[100%] lg:w-[45vw] md:h-[100%] md:w-[75vw] bg-[#C4C4C4];
  clip-path: polygon(28% 0, 100% 0, 100% 100%, 28% 100%, 0 80%, 0 20%);
  background-image: linear-gradient(#000000, var(--roxoEscuro));
}

#bordaCinzaMobile {
  @apply flex justify-center h-[100vh] items-center 2xl:h-[100%] 2xl:w-[100%] xl:h-[100%] xl:w-[100%] lg:h-[100%] lg:w-[100%] md:h-[100%] md:w-[100%] bg-[#C4C4C4];
  background-image: linear-gradient(#000000, var(--roxoEscuro));
}

#imagemDeFundoLogin {
  background-image: url(../imagemVetores/BG1.svg);
  background-color: #ffffff;
  height: 100vh;
  width: 100vw;
}

.tamanhoImagemFundoLogin {
  @apply w-full h-full;
}

.tamanhoDaLogoLogin {
  @apply 2xl:w-[30vw] 2xl:h-[30vw] xl:w-[35vw] lg:w-[40vw] md:w-[55vw];
}

.tamanhoDoNomeLogin {
  @apply 2xl:w-[16vw] 2xl:h-[6vw] xl:w-[20vw] lg:w-[24vw] md:w-[28vw] pr-12;
}

.login-enter-from,
.login-leave-to,
.registro-enter-from,
.registro-leave-to {
  opacity: 0;
  transform: translateX(100vw);
  /* Mudança para fora da tela à esquerda */
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