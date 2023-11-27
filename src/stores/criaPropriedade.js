import {defineStore} from "pinia";
import {Propriedade} from '../models/Propriedade'

export const criaPropriedadeStore = defineStore('criaPropriedade', {
    state: () => {
      return { 
        nomePropriedade: '',
        tipoPropriedade:'',
      }
    },

    actions: {
        criaPropriedade(nome,tipo){
        const propriedadeCriada= Propriedade
        propriedadeCriada.nome=nome;
        propriedadeCriada.tipo=tipo;
        console.log(propriedadeCriada)
      },
    },
  })