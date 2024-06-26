import { defineStore } from "pinia";
import axios from "axios";
import { webSocketStore } from "./webSocket.js";
import { id } from "date-fns/locale";
import VueCookies from "vue-cookies";

export const conexaoBD = defineStore('conexaoBD', {

  state: () => {
    return {
      api: axios.get("http://localhost:8082/usuario", { withCredentials: true }),
      loading: true,
      url: "http://localhost:8082",
    }
  },
  actions: {
    async procurar(textoRequisicao) {
      this.loading = true;
      try {
        return await axios.get(this.url + textoRequisicao,{ withCredentials: true }).then(response => response.data)
      } finally {
        this.loading = false;
      }

    },

    logOut() {
      this.loading = true;
      try {
        return axios.post(this.url + '/logOut', "", { withCredentials: true }).then(response => response.data)
      } finally {
        this.loading = false;
      }
    },
    getCookie() {
      this.loading = true;
      try {
        return axios.get(this.url + "/cookie", { withCredentials: true }).then(response => { return response.data })
      } finally {
        this.loading = false;
      }
    },
    login(usuarioLogin) {
      this.loading = true;
      try {
        return axios.post(this.url + "/login", usuarioLogin, { withCredentials: true }).then(response => {
          VueCookies.set("JWT", response.data.value)
        }).catch((error) => {
        })
      } finally {
        this.loading = false;
      }
    },
    atualizaNotificacao(id) {
      return axios.patch(this.url + "/notificacao/visto/" + id, "", { withCredentials: true })
    },
    retirarUsuario(usuario) {
      console.log(usuario)
      return axios.patch(this.url + "/notificacao/tirarUsuario", usuario, { withCredentials: true })
    },
    cadastrar(objeto, textoRequisicao) {
      this.loading = true;
      try {
        return axios.post(this.url + textoRequisicao, objeto, { withCredentials: true }).then(response => response)
      } finally {
        this.loading = false;
      }
    },
    cadastrarProjetoEquie(objeto, idEquipe, textoRequisicao) {
      this.loading = true;
      try {
        return axios.post(this.url + textoRequisicao + "/" + idEquipe, objeto, { withCredentials: true }).then(response => response)
      } finally {
        this.loading = false;
      }
    },
    async atualizar(objeto, textoRequisicao) {
      this.loading = true;
      try {

        return axios.put(this.url + textoRequisicao, objeto, { withCredentials: true }).then(response => response)

      } finally {
        this.loading = false;
      }
    },
    async trocaSenha(id, senhaNova) {
      this.loading = true;
      try {
        return axios.patch('http://localhost:8082/usuario/senha/' + id, senhaNova, { withCredentials: true }).then(response => {
        })
      } finally {
        this.loading = false;
      }
    },
    adicionarUsuarios(idUser, equipeId, numeroPermissao, textoRequisicao) {
      try {
        return axios.patch(this.url + (textoRequisicao + '/' + idUser + "/" + equipeId + "/" + numeroPermissao), "", { withCredentials: true })
      } finally {
        this.loading = false;
      }
    },
    adicionarCriador(userId, equipeId) {
      this.loading = true;
      try {
        return axios.patch(this.url + '/usuario/criador/' + userId + '/' + equipeId, "", { withCredentials: true })
      } finally {
        this.loading = false;
      }
    },
    deletar(id, textoRequisicao) {
      try {
        return axios.delete(this.url + `${textoRequisicao}/${id}`, { withCredentials: true }).then(response => {

        })
      } finally {
        this.loading = false;
      }
    },
    deletarProjetoEquipe(id, idProjeto, textoRequisicao) {
      this.loading = true;
      try {
        return axios.delete(this.url + `${textoRequisicao}/${id}/${idProjeto}`, { withCredentials: true }).then(response => {

        })
      } finally {
        this.loading = false;
      }
    },
    async buscarHistorico(id, textoRequisicao) {
      this.loading = true;
      try {
        return await ((await axios.get(this.url + `/historico/${textoRequisicao}/${id}`, { withCredentials: true })).data)
      } finally {
        this.loading = false;
      }
    },
    async buscarMembrosEquipe(equipeId, textoRequisicao) {
      this.loading = true;
      try {
        return await ((await axios.get(this.url + `${textoRequisicao}/${equipeId}`, { withCredentials: true })).data)
      } finally {
        this.loading = false;
      }
    },
    removerUsuarioDaEquipe(equipeId, userId, textoRequisicao) {
      this.loading = true;
      try {
        return axios.delete(this.url + `${textoRequisicao}/${equipeId}/${userId}`, { withCredentials: true }).then(response => {

        })
      } finally {
        this.loading = false;
      }
    },
    async buscarProjetosEquipe(equipeId, textoRequisicao) {
      this.loading = true;
      try {
        return await ((await axios.get(this.url + `${textoRequisicao}/${equipeId}`, { withCredentials: true })).data)
      } finally {
        this.loading = false;
      }
    },
    async buscarEquipesUsuario(id, textoRequisicao) {
      this.loading = true;
      try {
        return await ((await axios.get(this.url + `${textoRequisicao}/${id}`, { withCredentials: true })).data)
      } finally {
        this.loading = false;
      }
    },
    atualizaProjetoEquipe(objeto, idEquipe, textoRequisicao) {
      this.loading = true;
      try {
        return axios.put(this.url + textoRequisicao + '/' + idEquipe, objeto, { withCredentials: true }).then(response => response)
      } finally {
        this.loading = false;
      }
    },
    async buscarUm(id, textoRequisicao) {
      this.loading = true;
      try {
        return (await axios.get(this.url + textoRequisicao + '/' + id, { withCredentials: true }).then(response => response.data))
      } finally {
        this.loading = false;
      }
    },
    async buscarUmaNotificacao(id, textoRequisicao) {
      try {
        console.log(id);
        return (await axios.get(this.url + textoRequisicao + '/' + id, { withCredentials: true }).then(response => response.data))
      } finally {
        this.loading = false;
      }
    },
    async buscarTarefaProjeto(userId, textoRequisicao) {
      this.loading = true;
      try {
        return await ((await axios.get(this.url + `${textoRequisicao}/${userId}`, { withCredentials: true })).data)
      } finally {
        this.loading = false;
      }
    },
    adicionarEquipe(equipeId, projetoId, textoRequisicao) {
      this.loading = true;
      try {
        return axios.patch(this.url + textoRequisicao + '/' + projetoId + '/' + equipeId, "", { withCredentials: true })
      } finally {
        this.loading = false;
      }
    },
    deletarEquipe(id, textoRequisicao) {
      try {
        return axios.delete(this.url + textoRequisicao + '/' + id, { withCredentials: true })
      } finally {
        this.loading = false;
      }
    },
    async deletarTarefa(textoRequisicao, id) {
      try {
        return await axios.delete(this.url + textoRequisicao + '/' + id, { withCredentials: true }).then(response => {
        })
      } finally {
        this.loading = false;
      }
    },
    async cadastrarFoto(equipeId, foto) {
      try {
        // Crie um FormData e adicione a imagem a ele
        const formData = new FormData();
        formData.append('foto', foto);


        // Faça a requisição PATCH para enviar a image

        const response = await axios.patch(this.url + `/equipe/${equipeId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',

          },
          withCredentials: true

        }).then(response => {
          return response.data;
        });



      } catch (error) {
        console.error('Erro ao cadastrar a foto:', error);
        throw error;
      }
      return await ((await axios.get(this.url + `/equipe/${equipeId}`, { withCredentials: true })).data)
    },

    async patchDeArquivosNaTarefa(arquivo, id) {
      try {
        // Deleta os arquivos existentes relacionados à tarefa
        await axios.delete(this.url + `/tarefa/arquivos/${id}`, { withCredentials: true });
        
        const formData = new FormData();
        formData.append('arquivo', arquivo);
        const response = await axios.patch(this.url + "/tarefa/arquivos/" + id, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          withCredentials: true
        }).then(response => {
          return response.data

        });


      } catch (error) {
        console.error('Erro ao cadastrar a foto:', error);
        throw error;
      }
    },
    async cadastrarFotoUsuario(idUsuario, foto) {
      try {
        // Crie um FormData e adicione a imagem a ele
        const formData = new FormData();
        formData.append('foto', foto);
        // Faça a requisição PATCH para enviar a imagem
        const response = await axios.patch(this.url + `/usuario/${idUsuario}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          withCredentials: true
        }).then(response => {
          return response.data
        });
      } catch (error) {
        console.error('Erro ao cadastrar a foto:', error);
        throw error;
      }
      return await ((await axios.get(this.url + `${textoRequisicao}/${equipeId}`, { withCredentials: true })).data)

    }
  }
}
)