import {defineStore} from "pinia";
import {Projeto} from '../models/Projeto'
import {conexaoBD} from './conexaoBD'
export const criaProjetoStore = defineStore('criaProjeto', {
    state: () => {
      return { 
        nomeProjeto: '',
        tipoProjeto:'',
      }
    },

    actions: {
        criaProjeto(nome,descricao){
        let projetoCriado= Projeto
        let api= conexaoBD();
        projetoCriado.nome=nome;
        projetoCriado.descricao=descricao;
        console.log(projetoCriado)
        api.cadastrar(projetoCriado,'/projeto')
      },
    },
  })