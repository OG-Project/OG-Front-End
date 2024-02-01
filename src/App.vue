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
let array=['nome','descricao','status','data de termino','data do meu jogo']
</script>
<template>
  
  <CardList :tarefas="tarefas" :arrayDePropriedadesEcolhidas="array" />
  <div>oi</div>
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

