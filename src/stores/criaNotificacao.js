import { defineStore } from "pinia";
import { conexaoBD } from './conexaoBD'




export const criaNotificacao = defineStore('criaNotificacao', {
    state: () => {
        return {
            notificacaoInicial: ''
        }
    },

    actions: {
        mandarNotificacao(objeto) {
            let api = conexaoBD();
            let objetoNotificacao = objeto.notificao
            let equipes = objeto.equipes
            let rota = ""
            let notificacao = {}
            console.log(objeto)
            if (objetoNotificacao.projeto != null) {
                rota = "/projeto"
                notificacao = {
                    mensagem: objetoNotificacao.mensagem,
                    receptores: [],
                    projeto: objetoNotificacao.projeto
                }
            }
            if (objetoNotificacao.tarefa != null) {
                rota = "/tarefa"
                notificacao = {
                    mensagem: objetoNotificacao.mensagem,
                    receptores: [],
                    tarefa: objetoNotificacao.tarefa
                }
            }
            if (objetoNotificacao.equipe != null) {
                rota = "/equipe"
                notificacao = {
                    mensagem: objetoNotificacao.mensagem,
                    receptores: [],
                    equipe: objetoNotificacao.equipe
                }
            }
            if (objetoNotificacao.conviteParaProjeto != null) {
                rota = "/convite/projeto"
                notificacao = {
                    mensagem: objetoNotificacao.mensagem,
                    receptores: [],
                    conviteParaProjeto:{
                        projeto: objetoNotificacao.projeto
                    }
                }
            }
            if (objetoNotificacao.conviteParaEquipe != null) {
                rota = "/convite/equipe"
                notificacao = {
                    mensagem: objetoNotificacao.mensagem,
                    receptores: [],
                    conviteParaEquipe: {
                        equipe: objetoNotificacao.equipe
                    }
                }
            }
            equipes.forEach(async (equipe) => {
                let membros = await api.buscarMembrosEquipe(equipe.equipe.id, "/usuario/buscarMembros")
                console.log(membros)
                membros.forEach(membro => {
                    let teste = {
                        id: membro.id
                    }
                    notificacao.receptores.push(teste)
                });
            });
            console.log(notificacao)
            setTimeout(() => {
                api.cadastrar(notificacao, '/notificacao'+rota)
            }, 10)
        }
    },
})