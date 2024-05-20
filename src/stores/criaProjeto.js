import { defineStore } from "pinia";
import { Projeto } from '../models/Projeto'
import { conexaoBD } from './conexaoBD'
import { webSocketStore } from '../stores/webSocket.js'
import VueCookies from "vue-cookies";
import { id } from "date-fns/locale";

import { criaHistoricoStore } from '../stores/criaHistorico.js'



let api = conexaoBD();

export const criaProjetoStore = defineStore('criaProjeto', {
  state: () => {
    return {
      nomeProjeto: ''
    }
  },

  actions: {
    async criaProjeto(nome, descricao, equipes, propriedades, status, responsaveis, dataFinal) {
      let equipeAtual = VueCookies.get("equipeSelecionada");
      equipeAtual = await api.buscarUm(equipeAtual, "/equipe")
      let projetoCriado = Projeto
      let lista = []
      let projetoAux = {}
      projetoCriado.nome = nome;
      projetoCriado.descricao = descricao;
      projetoCriado.projetoEquipes = [{ id: null, equipe: equipeAtual }];
      projetoCriado.propriedades = propriedades;
      projetoCriado.statusList = status;
      projetoCriado.responsaveis = responsaveis;
      projetoCriado.dataFinal = dataFinal

      if(VueCookies.get("idAuxEquipe") != null && VueCookies.get("idAuxEquipe") != undefined && VueCookies.get("idAuxEquipe") != "" && VueCookies.get("idAuxEquipe") != "undefined"){
        api.cadastrarProjetoEquie(projetoCriado,VueCookies.get("idAuxEquipe") ,'/projeto').then(async (res) => {
          projetoAux = res.data;
          VueCookies.set("IdProjetoAtual", res.data.id)
          this.enviaParaWebSocket(equipes, projetoAux)
          const criaHistorico = criaHistoricoStore();
          let usuario = await api.buscarUm(VueCookies.get('IdUsuarioCookie'),"/usuario")
          criaHistorico.criaHistoricoProjeto("Criou o Projeto", projetoAux, usuario)
        })
      } else {
        api.cadastrar(projetoCriado, '/projeto').then((res) => {
          console.log(res.data);
          projetoAux = res.data;
          VueCookies.set("IdProjetoAtual", res.data.id)
          this.enviaParaWebSocket(equipes, projetoAux)
        })
      }


    },
    async enviaParaWebSocket(equipesConvidadas, projeto) {
      let equipes = []
      let membros = []
      let equipeAtual = VueCookies.get("equipeSelecionada");
      equipeAtual = await api.buscarUm(equipeAtual, "/equipe")
      for (const equipe of equipesConvidadas) {
        if (equipe.equipe.id != equipeAtual.id) {
          membros.push(await api.buscarUm(equipe.equipe.id, "/equipe/criador"))
          let equipeAux2 = await api.buscarUm(equipe.equipe.id, "/equipe")
          let equipeAux = {
            equipe: {
              id: equipeAux2.id,
              nome: equipeAux2.nome,
              descricao: equipeAux2.descricao,
              foto: equipeAux2.foto,
              membros: membros
            },
          }
          equipes.push(equipeAux)
        }
      }
      let teste = {
        equipes: equipes,
        notificao: {
          mensagem: "Convidou o Projeto",
          conviteParaProjeto: {
            projeto: projeto
          }
        }
      }
      let teste2 = {
        equipes: [equipeAtual],
        notificao: {
          mensagem: "Criou o Projeto",
          projeto: projeto
        }
      }
      const webSocket = webSocketStore();
      webSocket.url = "ws://localhost:8082/og/webSocket/usuario/1"
      await webSocket.enviaMensagemWebSocket(JSON.stringify(teste))
      await webSocket.enviaMensagemWebSocket(JSON.stringify(teste2))

    }
  },
})