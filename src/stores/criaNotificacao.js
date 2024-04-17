import { defineStore } from "pinia";
import { conexaoBD } from './conexaoBD'
import  VueCookies  from "vue-cookies";




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
            let criador = VueCookies.get("IdUsuarioCookie")
            if (objetoNotificacao.projeto != null) {
                rota = "/projeto"
                notificacao = {
                    mensagem: objetoNotificacao.mensagem,
                    criador:{},
                    receptores: [],
                    projeto: objetoNotificacao.projeto
                }
            }
            if (objetoNotificacao.tarefa != null) {
                rota = "/tarefa"
                notificacao = {
                    mensagem: objetoNotificacao.mensagem,
                    criador:{},
                    receptores: [],
                    tarefa: objetoNotificacao.tarefa
                }
            }
            if (objetoNotificacao.equipe != null) {
                rota = "/equipe"
                notificacao = {
                    mensagem: objetoNotificacao.mensagem,
                    criador:{},
                    receptores: [],
                    equipe: objetoNotificacao.equipe
                }
            }
            if (objetoNotificacao.conviteParaProjeto != null) {
                rota = "/convite/projeto"
                notificacao = {
                    mensagem: objetoNotificacao.mensagem,
                    criador:{},
                    receptores: [],
                    conviteParaProjeto:{
                        projeto: objetoNotificacao.projeto,
                        usuarioAceito:[]
                    }
                }
            }
            if (objetoNotificacao.conviteParaEquipe != null) {
                rota = "/convite/equipe"
                notificacao = {
                    mensagem: objetoNotificacao.mensagem,
                    criador:{},
                    receptores: [],
                    conviteParaEquipe: {
                        equipe: objetoNotificacao.conviteParaEquipe.equipe,
                        usuarioAceito:[]
                    }
                }
            }
            equipes.forEach(async (equipe) => {
                let membros = []
                if(equipe.equipe.membros!=null){
                    membros = equipe.equipe.membros
                    if(membros.lenght == 1 && membros[0].id == criador){
                        notificacao.receptores.push({id:criador})
                    }
                }else{
                    membros = await api.buscarMembrosEquipe(equipe.equipe.id, "/usuario/buscarMembros")
                }
                console.log(membros)
                membros.forEach(membro => {
                    let teste = {
                        id: membro.id
                    }
                    if(membro.id != criador){
                        notificacao.receptores.push(teste)
                        if(objetoNotificacao.conviteParaProjeto != null){
                            notificacao.conviteParaProjeto.usuarioAceito.push({usuario:teste})
                        }
                        if(objetoNotificacao.conviteParaEquipe != null){
                            console.log(notificacao.conviteParaEquipe)
                            notificacao.conviteParaEquipe.usuarioAceito.push({usuario:teste})
                        } 
                    }
                });
            });
            
            setTimeout(async () => {
                criador = await api.buscarUm(criador, '/usuario')
                notificacao.criador = criador
                api.cadastrar(notificacao, '/notificacao'+rota)
            }, 100)
        }
    },
})