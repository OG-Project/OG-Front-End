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
        
        adicionaUsuarioAEquipe(userId, equipeId) {
            let api = conexaoBD();
            api.adicionaUsuarioAEquipe(userId,equipeId,"/usuario/add");   
            
        }
    }
})