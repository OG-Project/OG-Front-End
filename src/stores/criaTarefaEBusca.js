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
      let tarefa = api.cadastrar( {} ,'/tarefa/'+ VueCookies.get("IdProjetoAtual"))
      let setCookies = async () => {
        let tarefaAux = await tarefa
        console.log(tarefaAux.data.id);
        let IdTarefaCookies = VueCookies.get("IdTarefaCookies");
        if(IdTarefaCookies){
            let tarefaAntiga = await api.buscarUm(IdTarefaCookies, "/tarefa");
            if(tarefaAntiga.nome == null){
                api.deletarPropriedade("/tarefa/"+tarefaAntiga.id)
            }
        }
        VueCookies.set("IdTarefaCookies", tarefaAux.data.id , 100000000000)
        localStorage.removeItem("TarefaNaoFinalizada"); 
      }
      setCookies();
      router.push('/criaTarefa');
    },
  },
})