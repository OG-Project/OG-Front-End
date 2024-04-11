import { defineStore } from "pinia";
import { conexaoBD } from './conexaoBD'
import VueCookies from "vue-cookies";
import router from "@/router";

export const criaTarefaEBuscaStore = defineStore('criaTarefaEBusca', {
  state: () => {
    return {
      exito: true
    }
  },
  actions: {
    criaTarefa() {
      let api = conexaoBD();
      
      // Criar a tarefa e esperar pela resposta
      api.cadastrar({}, '/tarefa/' + VueCookies.get("IdProjetoAtual"))
        .then(async (response) => {
          // Obter o ID da tarefa recém-criada
          let idTarefa = response.data.id;

          console.log(response.data.id);
          console.log(response);
          
          // Armazenar o ID da tarefa nos cookies
          VueCookies.set("IdTarefaCookies", idTarefa, 100000000000);
          
          // Verificar e deletar a tarefa anterior, se existir
          let idTarefaAntiga = VueCookies.get("IdTarefaCookies");
          if (idTarefaAntiga) {
            let tarefaAntiga = await api.buscarUm(idTarefaAntiga, "/tarefa");
            if (tarefaAntiga.nome == null) {
              await api.deletarPropriedade("/tarefa/" + tarefaAntiga.id);
            }
          }
    
          // Remover dados de tarefa não finalizada do armazenamento local
          localStorage.removeItem("TarefaNaoFinalizada");
          
          // Redirecionar para a página de criação de tarefa
          router.push('/criaTarefa');
        })
        .catch((error) => {
          console.error("Erro ao criar a tarefa:", error);
          // Tratar o erro, se necessário
        });
    }
  },
})