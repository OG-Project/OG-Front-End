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
        criaProjeto(nome,descricao,equipes){
        let projetoCriado= Projeto
        let api= conexaoBD();
        projetoCriado.nome=nome;
        projetoCriado.descricao=descricao;
        projetoCriado.equipes=equipes
        console.log(projetoCriado)
        console.log(api.cadastrar(projetoCriado,'/projeto'))
      },
    },
  })