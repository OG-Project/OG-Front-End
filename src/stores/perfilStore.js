import {defineStore} from "pinia";
import {Usuario} from "../models/usuario.js"
import {conexaoBD} from './conexaoBD'

export const perfilStore = defineStore('perfilStore', {
    state: ()=> {
        return {
         nome:'',
         sobrenome:'',
         email:'',
         username:'',
         dataDeNascimento:'',
         popUpSenha:false,
         popUpEmail:false,
         isVlibras:false,
         isVoiceMaker:false,
         isTecladoVirtual:false,
         isTecladoAtivado:false,
         isVisualizacaoEmail:false,
         isVisualizacaoEquipe:false,
         isVisualizacaoProjeto:false,
         el:null,
         valueModel:'',
         tamanhoTitulo:6,
         tamanhoCorpo:2,
         fonteTitulo: null,
         fonteCorpo: null,
         hue:0
        }
    },
    actions:{
        alteraInformacoes(emailNovo){
            let api=conexaoBD()
            let usuarioAlterado=Usuario
            usuarioAlterado.email=emailNovo
            console.log(usuarioAlterado)
            api.atualizar(usuarioAlterado,"/usuario")
        },
        digitar(valor,press){
            this.press
            return valor
        }
    }


})