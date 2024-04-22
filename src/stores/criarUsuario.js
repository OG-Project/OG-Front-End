import { defineStore } from "pinia";
import { Usuario } from "../models/usuario.js"
import { conexaoBD } from './conexaoBD'
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
      api.cadastrar(usuarioCriado, '/usuario')
    },
  },
})