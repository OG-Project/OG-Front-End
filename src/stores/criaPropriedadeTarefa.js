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
        console.log(propriedadeCriada.nome);
        console.log( propriedadeCriada.tipo);
        console.log(projetoId);
        console.log("aaaaa");
        api.cadastrar(propriedadeCriada,'/propriedade/'+projetoId)
        console.log("foi");
      },
      deletaPropriedade(id,projetoId){
        let api = conexaoBD();
        api.deletarPropriedade('/projeto/deletarPropriedade/'+id+'/'+projetoId)
      }
    },
  })