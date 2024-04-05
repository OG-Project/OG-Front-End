import {defineStore} from "pinia";
import {Projeto} from '../models/Projeto'

import {conexaoBD} from './conexaoBD'
export const criaProjetoStore = defineStore('criaProjeto', {
    state: () => {
      return { 
        nomeProjeto: ''
      }
    },

    actions: {
        criaProjeto(nome,descricao,equipes, propriedades,status,responsaveis,dataFinal){
        let projetoCriado= Projeto
        let api= conexaoBD();
        projetoCriado.nome=nome;
        projetoCriado.descricao=descricao;
        projetoCriado.projetoEquipes=equipes
        projetoCriado.propriedades=propriedades;
        projetoCriado.statusList=status;
        projetoCriado.responsaveis=responsaveis;
        projetoCriado.dataFinal=dataFinal  
        api.cadastrar(projetoCriado,'/projeto')
        
      },
    },
  })