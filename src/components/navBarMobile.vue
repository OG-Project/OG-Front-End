<template>
  <div class="h-[8vh] w-full flex justify-around z-[9999999999]">
    <div class="h-[8vh] w-[70%] flex items-center gap-8 justify-end mr-8">
      <div class="h-[8vh] pt-3 w-[55vw] absolute">
        <inputDePesquisa styleInput="input-claro-pequeno" largura="50" altura="10" :conteudoInput="$t('navBar.pesquisar')"
         :lista-da-pesquisa="lista" tipo="NavBar" class="z-[99999999999999999]"></inputDePesquisa>
      </div>
    </div>
    <div class="h-[8vh] w-[10%] flex gap-8 items-center">
      <div class="h-[8vh] flex items-center">
        <BotaoCriaTarefaMobile @click="redireciona('/criaTarefa')"></BotaoCriaTarefaMobile>
      </div>
    </div>
    <div class="h-[8vh] w-[10%] flex justify-center items-center">
      <img @click="redireciona('/perfil/informacoes')" v-if="usuarioCookies"
        class="shadow-2xl h-[45px] w-[45px] mr-4 ml-4 rounded-full "
        :src="'data:'+ usuarioCookies.foto.tipo + ';base64,' + usuarioCookies.foto.dados" />
    </div>
  </div>

  <div v-if="notificacaoBoolean == true" class="w-full fixed z-50 flex justify-end pr-4">
    <popUpNotificacao @fechar-Pop-Up="notificacaoBoolean = false"></popUpNotificacao>
  </div>
</template>
<script setup>
import { ref } from "vue";
import Input from "./Input.vue";
import router from "@/router";
import { onMounted, onBeforeMount} from "vue";
import VueCookies from "vue-cookies";
import { conexaoBD } from "../stores/conexaoBD.js";
import { criaTarefaEBuscaStore } from "../stores/criaTarefaEBusca"
import popUpNotificacao from "../components/popUpNotificacao.vue";
import BotaoCriaTarefaMobile from "../assets/BotaoCriaTarefaMobile.vue";
import inputDePesquisa from "./inputDePesquisa.vue";

const banco = conexaoBD();

onBeforeMount(() => {
  lista.value = criaListaDePesquisa();
});

let lista = ref();

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
            if(tarefa.nome){
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

onMounted(async () => {
  usuarioCookies.value = await autenticarUsuario(usuarioId);
});

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
  router.push(rota);
  if (rota == '/criaTarefa') {
    const criaTarefa = criaTarefaEBuscaStore();
    criaTarefa.criaTarefa();
  }
}
</script>
<style scoped></style>