
import {defineStore} from "pinia";
import axios from "axios";
import { webSocket } from '../stores/webSocket'
export const conexaoBD = defineStore('conexaoBD', {
  
    state: () => {
      return {api:axios.get("http://localhost:8084/projeto")
    }

    },
    actions: {
    
      procurar(textoRequisicao){
        // return axios.get("http://10.4.96.35:8082"+ textoRequisicao).then(response => response.data)
        return axios.get("http://localhost:8084"+ textoRequisicao).then(response => response.data)
      },
      cadastrar(objeto, textoRequisicao){
        return axios.post("http://localhost:8084"+textoRequisicao,objeto)
      },
      atualizar(objeto,textoRequisicao){
        
        return axios.put("http://localhost:8084"+textoRequisicao,objeto).then(response =>{
          this.enviaWebSocket("PUT");
        })
      },
      async adicionarUsuarios(ids,equipeId,textoRequisicao){
        axios.patch(`http://localhost:8084${textoRequisicao}/${equipeId}`, ids).then(response =>{
          this.enviaWebSocket("PATCH");
        })
        
      },
      deletarEquipe(id,textoRequisicao){
        return axios.delete(`http://localhost:8084${textoRequisicao}/${id}`).then(response =>{
          this.enviaWebSocket("DELETE");
        })
      },
      async buscarMembrosEquipe(equipeId,textoRequisicao){
          return await ((await axios.get(`http://localhost:8084${textoRequisicao}/${equipeId}`)).data)
      },
      removerUsuarioDaEquipe(equipeId,userId,textoRequisicao){
          return axios.delete(`http://localhost:8084${textoRequisicao}/${equipeId}/${userId}`).then(response =>{
            this.enviaWebSocket("DELETE");
          })
      },
      async buscarUm(id,textoRequisicao){
        return (await axios.get('http://localhost:8084'+textoRequisicao+'/'+id).then(response => response.data))
      },
      async buscarProjetosEquipe(equipeId, textoRequisicao){
        return await ((await axios.get(`http://localhost:8084${textoRequisicao}/${equipeId}`)).data)
      },
      async buscarProjetosUsuario(userId, textoRequisicao){
        return await ((await axios.get(`http://localhost:8084${textoRequisicao}/${userId}`)).data)

      },
      async cadastrarFoto(equipeId, foto) {
        try {
            // Crie um FormData e adicione a imagem a ele
            const formData = new FormData();
            formData.append('foto', foto);
    
            // Faça a requisição PATCH para enviar a imagem
    
            const response = await axios.patch(`http://localhost:8084/equipe/${equipeId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response =>{
              this.enviaWebSocket("PATCH");
            });
    
            // Retorne os dados da resposta
            return response.data;
        } catch (error) {
            console.error('Erro ao cadastrar a foto:', error);
            throw error;
        }
          return await ((await axios.get(`http://localhost:8084${textoRequisicao}/${equipeId}`)).data)
      },
      async enviaWebSocket(mensagem){
         webSocket.send(""+mensagem)
      }
      
    }
})

