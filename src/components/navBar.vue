<template>
  <div class="h-[8vh] w-full flex z-[99]">
    <div class="h-[8vh] w-[15%] flex gap-8">
      <BarraLateral id="step-3" class=" cursor-pointer"></BarraLateral>
      <div class="h-[8vh] w-[15%] flex items-center">
        <Botao preset="PadraoVazado" :texto="$t('navBar.botaoNovaTarefa')" tamanhoDaBorda="2px"
          :funcaoClick="redireciona" :parametrosFuncao="'/criaTarefa'">
        </Botao>
      </div>
    </div>
    <div class="h-[8vh] w-[35%] flex gap-8"></div>
    <div class="h-[8vh] w-[50%] flex gap-8 justify-end mr-8">
      <div class="flex justify-between pt-3 w-[16vw]">
        <inputDePesquisa styleInput="input-claro-pequeno" largura="14" altura="10"
          :conteudoInput="$t('navBar.pesquisar')" :lista-da-pesquisa="lista" tipo="NavBar" class="z-[99]">
        </inputDePesquisa>
      </div>
      <div class="flex items-center gap-8 w-[16%]">
        <div v-if="TemNotificacao">
        </div>
        <button @click="notificacaoBoolean = true, TemNotificacao = false">
          <notificacao />
        </button>
        <img @click="redireciona('/perfil/informacoes')" v-if="usuarioCookies"
          class="shadow-2xl h-[60px] w-[60px] rounded-full"
          :src="'data:' + usuarioCookies.foto.tipo + ';base64,' + usuarioCookies.foto.dados" />
      </div>
    </div>
  </div>
  <div v-if="notificacaoBoolean == true" class="w-full fixed z-50 flex justify-end pr-4">
    <popUpNotificacao @fechar-Pop-Up="notificacaoBoolean = false"></popUpNotificacao>
  </div>
</template>
<script setup>
import BarraLateral from "../components/BarraLateral.vue";
import { onBeforeMount, ref } from "vue";
import Botao from "../components/Botao.vue";
import notificacao from "../imagem-vetores/NotificacaoDinamic.vue";
import UserIcon from "../imagem-vetores/UserIcon.svg";
import Input from "./Input.vue";
import router from "@/router";
import { onMounted } from "vue";
import VueCookies from "vue-cookies";
import { conexaoBD } from "../stores/conexaoBD.js";
import { criaTarefaEBuscaStore } from "../stores/criaTarefaEBusca"
import popUpNotificacao from "../components/popUpNotificacao.vue";
import inputDePesquisa from "./inputDePesquisa.vue";
import { inject } from "vue";
const tour = inject('tour')
let TemNotificacao = ref(false);
const banco = conexaoBD();

onMounted(async () => {
  colocaUsuarioId()
});



function colocaUsuarioId(){
  console.log("teste")
  banco.getCookie().then((res) =>{
    usuarioCookies.value= res;
    VueCookies.set("IdUsuarioCookie", res.id, 100000000000)
    verificaTarefasFeitas();
 })
}
onBeforeMount(() => {
  lista.value = criaListaDePesquisa();
});

let lista = ref();

// tour.addSteps([
// ])
// tour.cancel()
function criaListaDePesquisa() {
  let listaDePesquisa = [];
  banco.procurar("/usuario/" + VueCookies.get("IdUsuarioCookie")).then((usuario) => {
    usuario.equipes.forEach(equipe => {
      banco.procurar("/projeto/buscarProjetos/" + equipe.id).then((projetos) => {
        console.log(projetos);
        projetos.forEach(projeto => {
          listaDePesquisa.push({
            id: projeto.id,
            nome: projeto.nome,
            tipo: "Projeto",
          });
          projeto.tarefas.forEach(tarefa => {
            if (tarefa.nome) {
              listaDePesquisa.push({
                id: tarefa.id,
                nome: tarefa.nome,
                tipo: "Tarefa",
              });
            }
          });
        });
        // projeto.tarefas
      });
      listaDePesquisa.push({
        id: equipe.id,
        nome: equipe.equipe.nome,
        tipo: "Equipe",
      });
    });
  });
  banco.procurar("/usuario").then((usuarios) => {
    usuarios.forEach(usuario => {
      listaDePesquisa.push({
        id: usuario.id,
        nome: usuario.username,
        tipo: "Usuario",
      });
    });
  });
  return listaDePesquisa;
}

let usuarioId = VueCookies.get("IdUsuarioCookie");
let usuarioCookies = ref();
let notificacaoBoolean = ref(false);

async function autenticarUsuario(id) {
  let usuarios = banco.procurar("/usuario");
  let listaUsuarios = await usuarios;
  let usuario = listaUsuarios.find((usuario) => usuario.id == id);
  return usuario;
}

function redireciona(rota) {
  router.push(rota).then(() => {
    window.location.reload()
  });
  if (rota == '/criaTarefa') {
    const criaTarefa = criaTarefaEBuscaStore();
    criaTarefa.criaTarefa();
  }
}
</script>
<style scoped></style>