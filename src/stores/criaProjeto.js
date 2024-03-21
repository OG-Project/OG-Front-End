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
        criaProjeto(nome,descricao,equipes, propriedades,status){
        let projetoCriado= Projeto
        let api= conexaoBD();
        projetoCriado.nome=nome;
        projetoCriado.descricao=descricao;
        projetoCriado.projetosEquipes=null
        projetoCriado.propriedades=propriedades.value
        projetoCriado.statusList=status
        console.log(projetoCriado)   
        api.cadastrar(projetoCriado,'/projeto')
        
      },
    },
  })