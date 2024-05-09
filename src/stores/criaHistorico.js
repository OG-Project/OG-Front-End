import { defineStore } from "pinia";
import { conexaoBD } from './conexaoBD'
import { Historico } from "../models/Historico";

export const criaHistoricoStore = defineStore('criaHistorico',{
    state: () => {
        return { 
            exito: true
          }
    },
    actions:{
        criaHistoricoProjeto(mensagem,projeto,criador){
            let historicoProjeto = Historico
            let api = conexaoBD();
            historicoProjeto.mensagem = mensagem;
            historicoProjeto.criador = criador;
            historicoProjeto.projeto = projeto;
            api.cadastrar(historicoProjeto, '/historico')
        },
        criaHistoricoTarefa(mensagem,tarefa,criador){
            let historicoTarefa = Historico
            let api = conexaoBD();
            historicoTarefa.mensagem = mensagem;
            historicoTarefa.criador = criador;
            historicoTarefa.tarefa = tarefa,
            api.cadastrar(historicoTarefa, '/historico')
        }
    }
});