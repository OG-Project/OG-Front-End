
import { defineStore } from "pinia";
import axios from "axios";
import { webSocketStore } from "./webSocket.js";
import { id } from "date-fns/locale";
import VueCookies  from "vue-cookies";

export const conexaoBD = defineStore('conexaoBD', {
  
    state: () => {

      return {api:axios.get("http://localhost:8082/usuario", {withCredentials:true})
    }

  },
  actions: {
      procurar(textoRequisicao){
        return axios.get("http://localhost:8082"+ textoRequisicao,{withCredentials:true}).then(response => response.data)
      },
      login(usuarioLogin){
           return axios.post("http://localhost:8082/login", usuarioLogin,{withCredentials:true}).then(response => {
            VueCookies.set("JWT", response.data.value)
          })
      },
      cadastrar(objeto, textoRequisicao){
        return axios.post("http://localhost:8082"+textoRequisicao,objeto,{withCredentials:true}).then(response => response)
      },
      cadastrarProjetoEquie(objeto,idEquipe,textoRequisicao){
        return axios.post("http://localhost:8082"+textoRequisicao+"/"+idEquipe,objeto,{withCredentials:true}).then(response => response)
      },
      atualizar(objeto,textoRequisicao){
        
        return axios.put("http://localhost:8082"+textoRequisicao+'/'+VueCookies.get('IdUsuarioCookie'),objeto,{withCredentials:true}).then(response => response)
      },
      atualizaProjetoEquipe(objeto,idEquipe,textoRequisicao){
        
        return axios.put("http://localhost:8082"+textoRequisicao+'/'+idEquipe,objeto,{withCredentials:true}).then(response => response)
      },
      adicionarUsuarios(idUser,equipeId,numeroPermissao, textoRequisicao){
        return axios.patch('http://localhost:8082'+(textoRequisicao+'/'+idUser+"/"+equipeId+"/"+numeroPermissao),"",{withCredentials:true})
      },
      adicionarCriador(userId,equipeId){
        return axios.patch('http://localhost:8082/usuario/criador/'+userId+'/'+equipeId,"",{withCredentials:true})
      },
      deletar(id,textoRequisicao){
        return axios.delete(`http://localhost:8082${textoRequisicao}/${id}`,{withCredentials:true}).then(response =>{
          
        })
      },
      deletarProjetoEquipe(id,idProjeto,textoRequisicao){
        return axios.delete(`http://localhost:8082${textoRequisicao}/${id}/${idProjeto}`,{withCredentials:true}).then(response =>{
          
        })
      },
      async buscarMembrosEquipe(equipeId,textoRequisicao){
          return await ((await axios.get(`http://localhost:8082${textoRequisicao}/${equipeId}`,{withCredentials:true})).data)
      },
      removerUsuarioDaEquipe(equipeId,userId,textoRequisicao){
          return axios.delete(`http://localhost:8082${textoRequisicao}/${equipeId}/${userId}`,{withCredentials:true}).then(response =>{
           
          })
      },
      async buscarUm(id,textoRequisicao){

        return (await axios.get('http://localhost:8082'+textoRequisicao+'/'+id,{withCredentials:true}).then(response => response.data))
      },
      async buscarProjetosEquipe(equipeId, textoRequisicao){
        return await ((await axios.get(`http://localhost:8082${textoRequisicao}/${equipeId}`,{withCredentials:true})).data)
      },
      async buscarProjetosUsuario(userId, textoRequisicao){
        return await ((await axios.get(`http://localhost:8082${textoRequisicao}/${userId}`,{withCredentials:true})).data)


      },
      async buscarTarefaProjeto(userId, textoRequisicao){
        return await ((await axios.get(`http://localhost:8082${textoRequisicao}/${userId}`,{withCredentials:true})).data)


      },
    adicionarEquipe(equipeId,projetoId, textoRequisicao) {
      return axios.patch('http://localhost:8082' + textoRequisicao + '/' + projetoId + '/' + equipeId,"",{withCredentials:true})
    },
    deletarEquipe(id, textoRequisicao) {
      return axios.delete('http://localhost:8082'+textoRequisicao+'/'+id,{withCredentials:true})    
    },

    async deletarTarefa(textoRequisicao, id) {
      return await axios.delete('http://localhost:8082'+textoRequisicao+'/'+id,{withCredentials:true}).then(response => {
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
        },{withCredentials:true}).then(response => {
          return response.data;
        });

    
        
      }catch (error) {
        console.error('Erro ao cadastrar a foto:', error);
        throw error;
      }
      return await ((await axios.get(`http://localhost:8082${textoRequisicao}/${equipeId}`,{withCredentials:true})).data)
    },

    async patchDeArquivosNaTarefa(arquivos, id) {
      try {
        // Deleta os arquivos existentes relacionados à tarefa
        await axios.delete(`http://localhost:8082/tarefa/arquivos/${id}`,{withCredentials:true});
    
            const response = await axios.patch("http://localhost:8082" + textoRequisicao + "/" + id, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            },{withCredentials:true}).then(response =>{
              return response.data
            });
    
        } catch (error) {
            console.error('Erro ao cadastrar a foto:', error);
            throw error;
        }
          return await ((await axios.get(`http://localhost:8082${textoRequisicao}/${equipeId}`,{withCredentials:true})).data)
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
            },{withCredentials:true});
    
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