import { ref } from 'vue'
import {propriedades} from './propriedade.js'

export const tarefas= ref(
    [
        {
            id:1,
            usuario:null,
            tipo:null,
            cor:"#A81212",
            propriedades:propriedades
        },
        {
            id:2,
            usuario:null,
            tipo:null,
            cor:"green",
            propriedades:propriedades
        },
        {
            id:3,
            usuario:null,
            tipo:null,
            cor:"blue",
            propriedades:propriedades
        },
        {
            id:4,
            usuario:null,
            tipo:null,
            cor:"blue",
            propriedades:propriedades
        },
        
    ]
)
