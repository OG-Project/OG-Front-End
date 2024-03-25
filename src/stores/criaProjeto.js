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
        criaProjeto(nome,descricao,equipes, propriedades,status,reponsaveis){
        let projetoCriado= Projeto
        let api= conexaoBD();
        projetoCriado.nome=nome;
        projetoCriado.descricao=descricao;
        projetoCriado.projetosEquipes=equipes
        projetoCriado.propriedades=propriedades.value;
        projetoCriado.statusList=status;
        projetoCriado.reponsaveis=reponsaveis;
        console.log(projetoCriado)   
        api.cadastrar(projetoCriado,'/projeto')
        
      },
    },
  })