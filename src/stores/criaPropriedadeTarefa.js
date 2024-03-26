import {defineStore} from "pinia";
import {Propriedade} from '../models/Propriedade'
import {conexaoBD} from './conexaoBD'
export const criaPropriedadeTarefaStore = defineStore('criaPropriedadeTarefa', {
    state: () => {
      return { 
        nomePropriedade: '',
        tipoPropriedade:'',
      }
    },

    actions: {
        criaPropriedade(nome,tipo,projetoId){
        let propriedadeCriada= Propriedade
        let api= conexaoBD();
        propriedadeCriada.nome=nome;
        propriedadeCriada.tipo=tipo;
        console.log(propriedadeCriada)
        console.log("Stassun");
        api.cadastrar(propriedadeCriada,'/propriedade/'+projetoId)
      },
    },
  })