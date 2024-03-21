import {defineStore} from "pinia";
import {Usuario} from "../models/usuario.js"
import {conexaoBD} from './conexaoBD'

export const criaUsuarioStore = defineStore('criaUsuario', {
    state: () => {
      return { 
        exito: true
      }
    },
    actions: {
        criaUsuario(username,email,senha,foto){
        let usuarioCriado = Usuario
        let api = conexaoBD();
        usuarioCriado.username=username;
        usuarioCriado.email=email;
        usuarioCriado.senha=senha;
        usuarioCriado.foto=foto;
        console.log(usuarioCriado)
        api.cadastrar(usuarioCriado,'/usuario')
      },
    },
  })