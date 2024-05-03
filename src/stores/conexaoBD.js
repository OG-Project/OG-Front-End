
import { defineStore } from "pinia";
import axios from "axios";
import { webSocketStore } from "./webSocket.js";
import { id } from "date-fns/locale";

export const conexaoBD = defineStore('conexaoBD', {
  
    state: () => {

      return {api:axios.get("http://localhost:8082/projeto")
    }

  },
  actions: {
      procurar(textoRequisicao){
        return axios.get("http://localhost:8082"+ textoRequisicao).then(response => response.data)
      },
      cadastrar(objeto, textoRequisicao){
        return axios.post("http://localhost:8082"+textoRequisicao,objeto).then(response => response)
      },
      atualizar(objeto,textoRequisicao){
        
        return axios.put("http://localhost:8082"+textoRequisicao,objeto).then(response => response)
      },
      adicionarUsuarios(ids,equipeId,textoRequisicao){
        return axios.patch('http://localhost:8082'+textoRequisicao+'/'+equipeId,ids)
      },
      adicionarCriador(userId,equipeId){
        return axios.patch('http://localhost:8082/usuario/criador/'+userId+'/'+equipeId)
      },
      deletar(id,textoRequisicao){
        return axios.delete(`http://localhost:8082${textoRequisicao}/${id}`).then(response =>{
          
        })
      },
      deletarProjetoEquipe(id,idProjeto,textoRequisicao){
        return axios.delete(`http://localhost:8082${textoRequisicao}/${id}/${idProjeto}`).then(response =>{
          
        })
      },
      async buscarMembrosEquipe(equipeId,textoRequisicao){
          return await ((await axios.get(`http://localhost:8082${textoRequisicao}/${equipeId}`)).data)
      },
      removerUsuarioDaEquipe(equipeId,userId,textoRequisicao){
          return axios.delete(`http://localhost:8082${textoRequisicao}/${equipeId}/${userId}`).then(response =>{
           
          })
      },
      async buscarUm(id,textoRequisicao){

        return (await axios.get('http://localhost:8082'+textoRequisicao+'/'+id).then(response => response.data))
      },
      async buscarProjetosEquipe(equipeId, textoRequisicao){
        return await ((await axios.get(`http://localhost:8082${textoRequisicao}/${equipeId}`)).data)
      },
      async buscarProjetosUsuario(userId, textoRequisicao){
        return await ((await axios.get(`http://localhost:8082${textoRequisicao}/${userId}`)).data)


      },
      async buscarTarefaProjeto(userId, textoRequisicao){
        return await ((await axios.get(`http://localhost:8082${textoRequisicao}/${userId}`)).data)


      },
    adicionarEquipe(equipeId,projetoId, textoRequisicao) {
      return axios.patch('http://localhost:8082' + textoRequisicao + '/' + projetoId + '/' + equipeId)
    },
    deletarEquipe(id, textoRequisicao) {
      return axios.delete('http://localhost:8082'+textoRequisicao+'/'+id)    
    },

    async deletarTarefa(textoRequisicao, id) {
      return await axios.delete(`http://localhost:8082${textoRequisicao}/${id}`).then(response => {
      })
    },
    async cadastrarFoto(equipeId, foto) {
      try {
        // Crie um FormData e adicione a imagem a ele
        const formData = new FormData();
        formData.append('foto', foto);


        // Faça a requisição PATCH para enviar a image

        const response = await axios.patch(`http://localhost:8082/equipe/${equipeId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(response => {

        });

        // Retorne os dados da resposta
        return response.data;
      } catch (error) {
        console.error('Erro ao cadastrar a foto:', error);
        throw error;
      }

      return await ((await axios.get(`http://localhost:8082${textoRequisicao}/${equipeId}`)).data)
    },
    async patchDeArquivosNaTarefa(arquivos, id) {
      try {
        // Deleta os arquivos existentes relacionados à tarefa
        await axios.delete(`http://localhost:8085/tarefa/arquivos/${id}`);
    
            const response = await axios.patch("http://localhost:8082" + textoRequisicao + "/" + id, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response =>{
              return response.data
            });
    
        } catch (error) {
            console.error('Erro ao cadastrar a foto:', error);
            throw error;
        }
          return await ((await axios.get(`http://localhost:8082${textoRequisicao}/${equipeId}`)).data)
      },
      async cadastrarFotoUsuario(idUsuario, foto) {
        try {
            // Crie um FormData e adicione a imagem a ele
            const formData = new FormData();
            formData.append('foto', foto);
    
            // Faça a requisição PATCH para enviar a imagem
            const response = await axios.patch(`http://localhost:8082/usuario/${idUsuario}`, formData, {

                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            // Retorne os dados da resposta
            return response.data;
        } catch (error) {
            console.error('Erro ao cadastrar a foto:', error);
            throw error;
        }
          return await ((await axios.get(`http://localhost:8082${textoRequisicao}/${equipeId}`)).data)
      }
     
  }
})