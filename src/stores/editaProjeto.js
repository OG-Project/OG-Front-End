import {defineStore} from "pinia";
import {Projeto} from '../models/Projeto'
import { webSocketStore } from '../stores/webSocket.js'
import {conexaoBD} from './conexaoBD'

export const editaProjetoStore = defineStore('editaProjeto', {
    state: () => {
      return { 
        nomeProjeto: ''
      }
    },

    actions: {
        editaProjeto(id,nome,descricao,equipes, propriedades,status,responsaveis,dataFinal, tempoAtuacao){
        let projetoCriado= Projeto
        let api= conexaoBD();
        projetoCriado.id=id;
        projetoCriado.nome=nome;
        projetoCriado.descricao=descricao;
        projetoCriado.projetoEquipes=equipes
        projetoCriado.propriedades=propriedades;
        projetoCriado.statusList=status;
        projetoCriado.responsaveis=responsaveis;
        projetoCriado.tempoAtuacao = tempoAtuacao
        projetoCriado.dataFinal=dataFinal; 
        console.log(projetoCriado)
        api.atualizar(projetoCriado,'/projeto').then((res)=>{
          console.log(res.data)
          this.enviaParaWebSocket(equipes, res.data)
        })

        
      },
      enviaParaWebSocket(equipesAux, projetoAux) {
        let teste = {
          equipes: equipesAux ,
          notificao: {
            mensagem: "Editou o Projeto",
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