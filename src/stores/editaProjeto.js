import {defineStore} from "pinia";
import {Projeto} from '../models/Projeto'
import { webSocketStore } from '../stores/webSocket.js'
import {conexaoBD} from './conexaoBD'
import VueCookies from 'vue-cookies';
export const editaProjetoStore = defineStore('editaProjeto', {
    state: () => {
      return { 
        nomeProjeto: ''
      }
    },

    actions: {
        editaProjeto(id,nome,descricao,equipes, propriedades,status,responsaveis,dataFinal, tempoAtuacao, indexLista){
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
        projetoCriado.indexLista = indexLista;
        console.log(projetoCriado)
        api.atualizar(projetoCriado,'/projeto').then((res)=>{
          console.log(res.data)
          VueCookies.set("IdProjetoAtual", res.data.id)
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