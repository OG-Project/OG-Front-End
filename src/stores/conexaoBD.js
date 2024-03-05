
import {defineStore} from "pinia";
import axios from "axios";
import { parse } from "@vue/compiler-dom";
import { Propriedade } from "../models/Propriedade";

export const conexaoBD = defineStore('conexaoBD', {
  
    state: () => {
      return {api:axios.get("http://localhost:8085")}
    },
    actions: {
      procurar(textoRequisicao){
        
        // return axios.get("http://10.4.96.35:8082"+ textoRequisicao).then(response => response.data)
        return axios.get("http://localhost:8085"+ textoRequisicao).then(response => response.data)
      },
      cadastrar(objeto, textoRequisicao){
        console.log(objeto.nome)
        return axios.post("http://localhost:8085"+textoRequisicao,objeto)
      },
      atualizar(objeto,textoRequisicao){
        return axios.put("http://localhost:8085"+textoRequisicao,objeto)
      },
      adicionaUsuarioAEquipe(userId, equipeId, textoRequisicao){
        return axios.patch("http://localhost:8085"+textoRequisicao,userId,equipeId)
      },
      adicionarUsuarios(ids,equipeId,textoRequisicao){
        return axios.patch(`http://localhost:8085${textoRequisicao}/${equipeId}`, ids)
      },
      deletarEquipe(id,textoRequisicao){
        return axios.delete(`http://localhost:8085${textoRequisicao}/${id}`)
      },
      async buscarMembrosEquipe(equipeId,textoRequisicao){
          return await ((await axios.get(`http://localhost:8085${textoRequisicao}/${equipeId}`)).data)
      },
      removerUsuarioDaEquipe(equipeId,userId,textoRequisicao){
        
          return axios.delete(`http://localhost:8085${textoRequisicao}/${equipeId}/${userId}`)
      }
      
    }
})
