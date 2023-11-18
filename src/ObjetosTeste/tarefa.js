import { ref } from 'vue'
import {dataFinal, nomeTarefa,propriedade2,dataFinal2,dataFinal3,dataFinal4} from './propriedade.js'

export const tarefas= ref(
    [
        {
            id:1,
            usuario:null,
            tipo:null,
            cor:"#A81212",
            propriedades:[
                nomeTarefa,
                propriedade2,
                dataFinal2
            ]
        },
        {
            id:2,
            usuario:null,
            tipo:null,
            cor:"green",
            propriedades:[
                nomeTarefa,
                propriedade2,
                dataFinal4
    
            ]
        },
        {
            id:3,
            usuario:null,
            tipo:null,
            cor:"blue",
            propriedades:[
                nomeTarefa,
                propriedade2,
                dataFinal,
            ]
        },
        {
            id:4,
            usuario:null,
            tipo:null,
            cor:"blue",
            propriedades:[
                nomeTarefa,
                propriedade2,
                dataFinal3
            ]
        }
    ]
)
