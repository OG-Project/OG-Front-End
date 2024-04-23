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
        let propriedadeCriada = Propriedade
        let api= conexaoBD();
        propriedadeCriada.nome=nome;
        propriedadeCriada.tipo=tipo;
        api.cadastrar(propriedadeCriada,'/propriedade/'+projetoId)
      },
      deletaPropriedade(id,projetoId){
        let api = conexaoBD();
        api.deletarPropriedade('/projeto/deletarPropriedade/'+id+'/'+projetoId)
      }
    },
  })