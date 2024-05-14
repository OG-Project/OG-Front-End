import { defineStore } from "pinia";
import { Projeto } from '../models/Projeto'
import { conexaoBD } from './conexaoBD'
import { webSocketStore } from '../stores/webSocket.js'
import VueCookies from "vue-cookies";


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
      if(VueCookies.get("idAuxEquipe") != null && VueCookies.get("idAuxEquipe") != undefined && VueCookies.get("idAuxEquipe") != "" && VueCookies.get("idAuxEquipe") != "undefined"){
        api.cadastrarProjetoEquie(projetoCriado,VueCookies.get("idAuxEquipe") ,'/projeto').then((res) => {
          projetoAux = res.data;
          VueCookies.set("IdProjetoAtual", res.data.id)
          this.enviaParaWebSocket(equipes, projetoAux)
        })
      }else{
      api.cadastrar(projetoCriado, '/projeto').then((res) => {
        projetoAux = res.data;
        VueCookies.set("IdProjetoAtual", res.data.id)
        this.enviaParaWebSocket(equipes, projetoAux)
      })
    }

    },
    enviaParaWebSocket(equipesAux, projetoAux) {
      let teste = {
        equipes: equipesAux ,
        notificao: {
          mensagem: "Criou o Projeto",
          projeto: projetoAux
        }
      }
      const webSocket = webSocketStore();
      webSocket.url = "ws://localhost:8082/og/webSocket/usuario/1"
      webSocket.enviaMensagemWebSocket(JSON.stringify(teste))
    }
  },
})