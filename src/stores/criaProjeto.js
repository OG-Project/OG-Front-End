import { defineStore } from "pinia";
import { Projeto } from '../models/Projeto'

import { conexaoBD } from './conexaoBD'
import { set } from "date-fns";
import { webSocketStore } from '../stores/webSocket.js'

let api = conexaoBD();

export const criaProjetoStore = defineStore('criaProjeto', {
  state: () => {
    return {
      nomeProjeto: ''
    }
  },

  actions: {
    criaProjeto(nome, descricao, equipes, propriedades, status, responsaveis, dataFinal) {
      let projetoCriado = Projeto
      let lista = []
      let projetoAux = {}
      projetoCriado.nome = nome;
      projetoCriado.descricao = descricao;
      projetoCriado.projetoEquipes = equipes
      projetoCriado.propriedades = propriedades;
      projetoCriado.statusList = status;
      projetoCriado.responsaveis = responsaveis;
      projetoCriado.dataFinal = dataFinal
      api.cadastrar(projetoCriado, '/projeto').then((res) => {
        projetoAux = res.data;
        this.enviaParaWebSocket(equipes, projetoAux)
      })

    },
    enviaParaWebSocket(equipesAux, projetoAux) {
      let teste = {
        equipes: equipesAux ,
        notificao: {
          mensagem: "Criou o Projeto",
          projeto: projetoAux
        }
      }
      console.log(teste)
      const webSocket = webSocketStore();
      webSocket.url = "ws://localhost:8082/og/webSocket/usuario/1"
      webSocket.enviaMensagemWebSocket(JSON.stringify(teste))
    }
  },
})