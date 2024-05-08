import { defineStore } from "pinia";
import { Projeto } from '../models/Projeto'
import { webSocketStore } from '../stores/webSocket.js'
import { conexaoBD } from './conexaoBD'
import VueCookies from 'vue-cookies';
export const editaProjetoStore = defineStore('editaProjeto', {
  state: () => {
    return {
      nomeProjeto: ''
    }
  },

  actions: {
    editaProjeto(id, nome, descricao, equipes, propriedades, status, responsaveis, dataFinal, tempoAtuacao, categoria, indexLista, comentarios, tarefas) {
      let projetoCriado = Projeto
      let api = conexaoBD();
      projetoCriado.id = id;
      projetoCriado.nome = nome;
      projetoCriado.descricao = descricao;
      projetoCriado.tarefas = tarefas
      projetoCriado.projetoEquipes = equipes
      projetoCriado.propriedades = propriedades;
      projetoCriado.statusList = status;
      projetoCriado.responsaveis = responsaveis;
      projetoCriado.tempoAtuacao = tempoAtuacao
      projetoCriado.dataFinal = dataFinal;
      projetoCriado.tarefas = tarefas;
      projetoCriado.indexLista = indexLista;
      projetoCriado.comentarios = comentarios;
      projetoCriado.categoria = categoria;
      console.log()
      if (VueCookies.get("idAuxEquipe") != null && VueCookies.get("idAuxEquipe") != undefined && VueCookies.get("idAuxEquipe") != "" && VueCookies.get("idAuxEquipe") != "undefined") {
        api.atualizaProjetoEquipe(projetoCriado, VueCookies.get("idAuxEquipe"), '/projeto').then((res) => {
          console.log(res.data)
          VueCookies.set("IdProjetoAtual", res.data.id)
          this.enviaParaWebSocket(equipes, res.data)
        })

      } else {
        api.atualizar(projetoCriado, '/projeto').then((res) => {
          console.log(res.data)
          VueCookies.set("IdProjetoAtual", res.data.id)
          this.enviaParaWebSocket(equipes, res.data)
        })
      }


    },
    enviaParaWebSocket(equipesAux, projetoAux) {
      let teste
      if (window.location.pathname == "/editaProjeto") {
        teste = {
          equipes: equipesAux,
          notificao: {
            mensagem: "Editou o Projeto",
            projeto: projetoAux
          }
        }
      } else {
        teste = {
          equipes: equipesAux,
          notificao: {
            mensagem: "comentou no Projeto",
            projeto: projetoAux
          }
        }
      }

      console.log(teste)
      const webSocket = webSocketStore();
      webSocket.url = "ws://localhost:8082/og/webSocket/usuario/1"
      webSocket.enviaMensagemWebSocket(JSON.stringify(teste))
    }
  },
})