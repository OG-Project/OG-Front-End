import { defineStore } from "pinia";
import { conexaoBD } from './conexaoBD'
import VueCookies from "vue-cookies";
import router from "@/router";
import { webSocketStore } from '../stores/webSocket.js'
import { criaHistoricoStore } from '../stores/criaHistorico.js'

export const criaTarefaEBuscaStore = defineStore('criaTarefaEBusca', {
  state: () => {
    return {
      exito: true
    }
  },
  actions: {
    async criaTarefa(status) {
      let api = conexaoBD();
      let usuario= await api.buscarUm(VueCookies.get("IdUsuarioCookie"), "/usuario")
      console.log("usuario responsavel: "+ usuario);
      if(!VueCookies.get("IdProjetoAtual")){
        api.buscarUm(VueCookies.get("IdUsuarioCookie"), "/usuario").then((response) => {
          usuario = response
          VueCookies.set("equipeSelecionada", response.equipes[0].id, 100000000000);
          api.buscarProjetosEquipe(response.equipes[0].id, "/projeto/buscarProjetos").then((response) => {
            VueCookies.set("IdProjetoAtual", response[0].id, 100000000000);
          })
        })
      }

      api.buscarUm(VueCookies.get("IdProjetoAtual"), "/projeto").then((response) => {
        if (status == null) {
          console.log("AQUI");
          console.log(response);
          response.statusList.forEach(status2 => {
            console.log(status2)
            if (status2.nome == "Não iniciado") {
              console.log("Passou do IF");
              status = status2;
              console.log(status)
            }
          });;
        }
        localStorage.removeItem('TarefaNaoFinalizada');
        // Criar a tarefa e esperar pela resposta
        let usuarioTarefa= {
          idResponsavel: usuario.id
        }
        let responsavies = []
        responsavies.push(usuarioTarefa)
        api.cadastrar({ status: status, responsaveis:responsavies }, '/tarefa/' + VueCookies.get("IdProjetoAtual"))
          .then(async (response) => {
            console.log(status);
            // Obter o ID da tarefa recém-criada

            let idTarefa = response.data.id;

            console.log(response.data.id);
            console.log(response);



            let idTarefaAntiga = VueCookies.get("IdTarefaCookies");
            // Armazenar o ID da tarefa nos cookies
            VueCookies.set("IdTarefaCookies", response.data.id, 100000000000);
            const criaHistorico = criaHistoricoStore();
            let usuario = await api.buscarUm(VueCookies.get('IdUsuarioCookie'),"/usuario")
            criaHistorico.criaHistoricoTarefa("Criou a tarefa", response.data, usuario)
            // Verificar e deletar a tarefa anterior, se existir
            let projetoId = VueCookies.get("IdProjetoAtual");
            if (idTarefaAntiga != null) {
              let tarefaAntiga = await api.buscarUm(idTarefaAntiga, "/tarefa");
              if (tarefaAntiga.nome === null) {
                await api.deletarTarefa("/tarefa", tarefaAntiga.id);
              }
            }

            // Remover dados de tarefa não finalizada do armazenamento local
            // Redirecionar para a página de criação de tarefa
            router.push('/criaTarefa');
          })
          .catch((error) => {
            console.error("Erro ao criar a tarefa:", error);
            // Tratar o erro, se necessário
          });
      })
    }
  },
})