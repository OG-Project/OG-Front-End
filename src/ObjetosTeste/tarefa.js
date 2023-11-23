import { ref } from 'vue'
import {propriedades,propriedades2} from './propriedade.js'
import { conexaoBD } from '../stores/conexaoBD';

const api = conexaoBD();
console.log(api.procurar());

export const tarefas= ref(api.procurar())
