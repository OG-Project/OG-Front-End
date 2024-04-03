import {defineStore} from "pinia";
import {Projeto} from '../models/Projeto'

import {conexaoBD} from './conexaoBD'
export const editaProjetoStore = defineStore('editaProjeto', {
    state: () => {
      return { 
        nomeProjeto: ''
      }
    },

    actions: {
        editaProjeto(id,nome,descricao,equipes, propriedades,status,responsaveis){
        let projetoCriado= Projeto
        let api= conexaoBD();
        projetoCriado.id=id;
        projetoCriado.nome=nome;
        projetoCriado.descricao=descricao;
        projetoCriado.projetoEquipes=equipes
        projetoCriado.propriedades=propriedades;
        projetoCriado.statusList=status;
        projetoCriado.responsaveis=responsaveis; 
        api.atualizar(projetoCriado,'/projeto')
        
      },
    },
  })