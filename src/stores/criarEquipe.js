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
        criaEquipe(nome,descricao,membrosEquipe){
            let equipeCriada = Equipe
            let api = conexaoBD();
            equipeCriada.nome=nome;
            equipeCriada.descricao=descricao;
            equipeCriada.usuarios=membrosEquipe;
            console.log(equipeCriada)
            api.cadastrar(equipeCriada,'/equipe')
        }
    }
})