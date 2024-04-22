import { defineStore } from "pinia";
import { Usuario } from "../models/usuario.js"
import { conexaoBD } from './conexaoBD'
import fotoPadraoUsuario from '../assets/fotoPadraoDoUsuario.png'
export const criaUsuarioStore = defineStore('criaUsuario', {
  state: () => {
    return {
      exito: true
    }
  },
  actions: {
    criaUsuario(username, email, senha) {
      let usuarioCriado = Usuario
      let api = conexaoBD();
      usuarioCriado.username = username;
      usuarioCriado.email = email;
      usuarioCriado.senha = senha;
      console.log(usuarioCriado)
      api.cadastrar(usuarioCriado, '/usuario').then(response =>{
        response.id
        let fotoPadraoDoUsuario = fotoPadraoUsuario
        console.log(fotoPadraoDoUsuario)
         api.cadastrarFoto("/usuario",response.id, fotoPadraoDoUsuario);
      })
    },
  },
})