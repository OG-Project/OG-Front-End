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
         isVlibras:false,
         isVoiceMaker:false,
         isTecladoVirtual:false
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