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
         dataDeNascimento:''
        }
    },
    actions:{
        alteraInformacoes(emailNovo){
            let api=conexaoBD()
            let usuarioAlterado=Usuario
            usuarioAlterado.email=emailNovo
            console.log(usuarioAlterado)
            api.atualizar(usuarioAlterado,"/usuario")

            
        }
    }


})