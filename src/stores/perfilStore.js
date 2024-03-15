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
         isVisualizacaoEmail:false,
         isVisualizacaoEquipe:false,
         isVisualizacaoProjeto:false,
         fonteTitulo: 'Source Sans 3',
         fonteCorpo: 'Poppins',
         corEscura: '#36213E',
         cor: '#620BA7',
         corAtencao: '#8E00FF',
         corClickBorder: '#ECC3FF'
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
        acessibilidade(){
            return {vlibras: this.isVlibras,voiceMaker:this.isVoiceMaker,tecladoVirtual: this.isTecladoVirtual}
        }
    }


})