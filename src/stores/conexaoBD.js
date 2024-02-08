
import {defineStore} from "pinia";
import axios from "axios";

export const conexaoBD = defineStore('conexaoBD', {
  
    state: () => {
      return {api:axios.get("http://10.4.96.58:8082/propriedade")}
    },
    actions: {
      procurar(textoRequisicao){
        return axios.get("http://10.4.96.58:8082"+ textoRequisicao).then(response => response.data)
      },
      cadastrar(objeto, textoRequisicao){
        console.log(objeto)
        return axios.post("http://10.4.96.58:8082"+textoRequisicao,objeto)
      },
      atualizar(objeto,textoRequisicao){
        return axios.put("http://10.4.96.58:8082"+textoRequisicao,objeto)
      }
    }
})
