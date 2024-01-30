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
        criaEquipe(nome,descricao){
            let equipeCriada = Equipe
            let api = conexaoBD();
            equipeCriada.nome=nome;
            equipeCriada.descricao=descricao;
            console.log(equipeCriada)
            api.cadastrar(equipeCriada,'/equipe')
        }
    }
})