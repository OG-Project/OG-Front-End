import { defineStore } from "pinia";
import {Equipe} from "../models/equipe.js"
import {conexaoBD} from "./conexaoBD"

export const criaEquipeStore = defineStore('criaEquipe',{
    state: () => {
        return { 
            exito: true
          }
    },
    actions:{
        criaEquipe(equipe){
            let api = conexaoBD();
            return api.cadastrar(equipe,"/equipe");
        },
        
        adicionaUsuarioAEquipe(userId, equipeId, numeroPermissao) {
            let api = conexaoBD();
            api.adicionarUsuarios(userId,equipeId,numeroPermissao, "/usuario/add");   
            
        }
    }
})