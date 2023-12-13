<script setup>

import { RouterLink, RouterView } from 'vue-router'
import {ref,onMounted,onBeforeMount} from 'vue'
import CardList from './components/CardTarefaList.vue'

import Input from './components/Input.vue'

import PopUpCriaPropriedade from './components/popUpCriaPropriedade.vue';
import {conexaoBD} from './stores/conexaoBD.js'

let api =conexaoBD()
const tarefas=ref([])
let tarefasDois=ref([])


onBeforeMount(async()=>{
  const res= api.procurar('/tarefa')
  .then((result) => {
    console.log(result)
    tarefas.value=result
    console.log(tarefas.value)
  }).catch((error)=>{
    console.log(error);
  })
})
</script>
<template>
  <CardList :tarefas="tarefas" />
  
  <RouterView />

</template>
<style>

</style>
// {
//   "id": 2,
//   "nome": "Bart Sergio",
//   "descricao": "Filho",
//   "cor": "blue",
//   "valorPropriedadeTarefas": [
//       {
//           "propriedade": {
//               "id": 1
//           },
//           "valor": {
//               "data": "2023-11-30"
//           }
//       }
//   ],
//   "status": {
//       "id": 1
//   }
// }

