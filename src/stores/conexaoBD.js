
import {defineStore} from "pinia";
import axios from "axios";

export const conexaoBD = defineStore('conexaoBD', {
    state: () => {
      return {api:axios.get("http://10.4.96.58:8082/tarefa")}
    },
    actions: {
      procurar(texto){
        return axios.get("http://10.4.96.58:8082"+ texto).then(response => response.data)
      }
    }
})
