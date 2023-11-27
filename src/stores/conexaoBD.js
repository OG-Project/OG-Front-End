
import {defineStore} from "pinia";
import axios from "axios";

export const conexaoBD = defineStore('conexaoBD', {
    state: () => {
      return {api:axios.get("http://10.4.96.32:8082/tarefa")}
    },
    actions: {
      procurar(){
        return axios.get("http://10.4.96.32:8082/tarefa").then(response => response.data)
      }
    }
})
