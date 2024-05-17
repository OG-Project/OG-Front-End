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
    criaTarefa() {
      let api = conexaoBD();
      
      localStorage.removeItem('TarefaNaoFinalizada');
      // Criar a tarefa e esperar pela resposta
      api.cadastrar({}, '/tarefa/' + VueCookies.get("IdProjetoAtual"))
        .then(async (response) => {
          // Obter o ID da tarefa recém-criada

          let idTarefa = response.data.id;

          console.log(response.data.id);
          console.log(response);

          
          
          let idTarefaAntiga = VueCookies.get("IdTarefaCookies");
          // Armazenar o ID da tarefa nos cookies
          VueCookies.set("IdTarefaCookies", response.data.id, 100000000000);
          
          const criaHistorico = criaHistoricoStore();
          let usuario = await banco.buscarUm(VueCookies.get('IdUsuarioCookie'),"/usuario")
          criaHistorico.criaHistoricoTarefa("Criou a tarefa", response.data, usuario)

          // Verificar e deletar a tarefa anterior, se existir
          let projetoId = VueCookies.get("IdProjetoAtual");
          if (idTarefaAntiga != null) {
            let tarefaAntiga = await api.buscarUm(idTarefaAntiga, "/tarefa");
            if (tarefaAntiga.nome === null) {
              await api.deletarTarefa("/tarefa",tarefaAntiga.id );
            }
          }
          router.push('/criaTarefa');
        })
        .catch((error) => {
          console.error("Erro ao criar a tarefa:", error);
          // Tratar o erro, se necessário
        });
    }
  },
})