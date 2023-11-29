import {defineStore} from "pinia";
import {Propriedade} from '../models/Propriedade'
import {conexaoBD} from './conexaoBD'
export const criaPropriedadeStore = defineStore('criaPropriedade', {
    state: () => {
      return { 
        nomePropriedade: '',
        tipoPropriedade:'',
      }
    },

    actions: {
        criaPropriedade(nome,tipo){
        let propriedadeCriada= Propriedade
        let api= conexaoBD();
        propriedadeCriada.nome=nome;
        propriedadeCriada.tipo=tipo;
        console.log(propriedadeCriada)
        api.cadastrar(propriedadeCriada,'/propriedade')
      },
    },
  })