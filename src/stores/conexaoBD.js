
import {defineStore} from "pinia";
import axios from "axios";

export const conexaoBD = defineStore('conexaoBD', {
    state: () => {
      return {api:axios.get("http://10.4.96.64:8082/tarefa")}
    },
    actions: {
      procurar(){
         axios.get("http://10.4.96.64:8082/tarefa").then(response => console.log(response.data.api))
      }
    }
})
