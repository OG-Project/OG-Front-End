import { Tarefa } from "./Tarefa"
import { Propriedade } from "./Propriedade"
import { Status } from "./Status"
import { Equipe } from "./Equipe"
 export const Projeto={
    id: Number,
    nome: String,
    descricao: String,
    tarefas : [] ,
    propriedades : [] ,
    status : [],
    equipes : []
}