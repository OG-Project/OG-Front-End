
import {defineStore} from "pinia";
import axios from "axios";
import { webSocketStore } from "./webSocket.js";

export const conexaoBD = defineStore('conexaoBD', {
  
    state: () => {

      return {api:axios.get("http://10.4.96.35:8082/projeto")
    }

    },
    actions: {
    
      procurar(textoRequisicao){
        // return axios.get("http://10.4.96.35:8082"+ textoRequisicao).then(response => response.data)
        return axios.get("http://10.4.96.35:8082"+ textoRequisicao).then(response => response.data)
      },
      cadastrar(objeto, textoRequisicao){
        return axios.post("http://10.4.96.35:8082"+textoRequisicao,objeto)
      },
      atualizar(objeto,textoRequisicao){
        
        return axios.put("http://10.4.96.35:8082"+textoRequisicao,objeto).then(response =>{
          
        })
      },
      async adicionarUsuarios(ids,equipeId,textoRequisicao){
        axios.patch(`http://10.4.96.35:8082${textoRequisicao}/${equipeId}`, ids).then(response =>{
          return response;
        })
        
      },
      deletarEquipe(id,textoRequisicao){
        return axios.delete(`http://10.4.96.35:8082${textoRequisicao}/${id}`).then(response =>{
          
        })
      },
      async buscarMembrosEquipe(equipeId,textoRequisicao){
          return await ((await axios.get(`http://10.4.96.35:8082${textoRequisicao}/${equipeId}`)).data)
      },
      removerUsuarioDaEquipe(equipeId,userId,textoRequisicao){
          return axios.delete(`http://10.4.96.35:8082${textoRequisicao}/${equipeId}/${userId}`).then(response =>{
           
          })
      },
      async buscarUm(id,textoRequisicao){
        return (await axios.get('http://10.4.96.35:8082'+textoRequisicao+'/'+id).then(response => response.data))
      },
      async buscarProjetosEquipe(equipeId, textoRequisicao){
        return await ((await axios.get(`http://10.4.96.35:8082${textoRequisicao}/${equipeId}`)).data)
      },
      async buscarProjetosUsuario(userId, textoRequisicao){
        return await ((await axios.get(`http://10.4.96.35:8082${textoRequisicao}/${userId}`)).data)

      },
      async cadastrarFoto(equipeId, foto) {
        try {
            // Crie um FormData e adicione a imagem a ele
            const formData = new FormData();
            formData.append('foto', foto);
    
            // Faça a requisição PATCH para enviar a image
    
            const response = await axios.patch(`http://10.4.96.35:8082/equipe/${equipeId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response =>{
            
            });
    
            // Retorne os dados da resposta
            return response.data;
        } catch (error) {
            console.error('Erro ao cadastrar a foto:', error);
            throw error;
        }

          return await ((await axios.get(`http://10.4.96.35:8082${textoRequisicao}/${equipeId}`)).data)
      },
      
      
    }
})

