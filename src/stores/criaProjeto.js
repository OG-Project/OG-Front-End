import { defineStore } from "pinia";
import { Projeto } from '../models/Projeto'

import { conexaoBD } from './conexaoBD'
import { set } from "date-fns";

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
        this.mandarNotificacao(projetoAux,equipes)
      })

    },
    mandarNotificacao(projetoAux,equipes){
      console.log(equipes)
      let notificacao = {
        mensagem: "Davi Criou o Projeto",
        receptores: [],
        conviteParaProjeto: {
          projeto: projetoAux
        }
      }
      equipes.forEach(async (equipe) => {
        let membros = await api.buscarMembrosEquipe(equipe.equipe.id, "/usuario/buscarMembros")
        console.log(membros)
        membros.forEach(membro => {
          let teste = {
            id:membro.id
          }
          notificacao.receptores.push(teste)
        });
      });
      console.log(notificacao)
      setTimeout(() => {
        console.log(notificacao)
        api.cadastrar(notificacao, '/notificacao/convite/projeto')
      },10)
    }
  },
})