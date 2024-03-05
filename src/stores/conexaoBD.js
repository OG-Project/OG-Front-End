
import {defineStore} from "pinia";
import axios from "axios";

export const conexaoBD = defineStore('conexaoBD', {
  
    state: () => {
      return {api:axios.get("http://10.4.96.35:8082")}
    },
    actions: {
      procurar(textoRequisicao){
        
        // return axios.get("http://10.4.96.35:8082"+ textoRequisicao).then(response => response.data)
        return axios.get("http://10.4.96.35:8082"+ textoRequisicao).then(response => response.data)
      },
      cadastrar(objeto, textoRequisicao){
        console.log(objeto.nome)
        return axios.post("http://10.4.96.35:8082"+textoRequisicao,objeto)
      },
      atualizar(objeto,textoRequisicao){
        return axios.put("http://10.4.96.35:8082"+textoRequisicao,objeto)
      },
      adicionaUsuarioAEquipe(userId, equipeId, textoRequisicao){
        return axios.patch("http://10.4.96.35:8082"+textoRequisicao,userId,equipeId)
      },
      adicionarUsuarios(ids,equipeId,textoRequisicao){
        return axios.patch(`http://10.4.96.35:8082${textoRequisicao}/${equipeId}`, ids)
      },
      deletarEquipe(id,textoRequisicao){
        return axios.delete(`http://10.4.96.35:8082${textoRequisicao}/${id}`)
      },
      async buscarMembrosEquipe(equipeId,textoRequisicao){
          return await ((await axios.get(`http://10.4.96.35:8082${textoRequisicao}/${equipeId}`)).data)
      }
      
    }
})
