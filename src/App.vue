<script setup>
import { RouterLink, RouterView } from 'vue-router'
import {ref} from 'vue'
import CardList from './components/CardTarefaList.vue'
let tarefas=ref([])
let tarefa=ref({propriedades:['dfljkf','ere','121'],valores:['llll','pppppp',12]})
tarefas.value.push(tarefa.value)
console.log(tarefas.value)
tarefa.value={propriedades:['dfljkf','ere','121'],valores:['ççççççç','mmmmmm',13]}
tarefas.value.push(tarefa.value)

tarefa.value={propriedades:['dfljkf','ere','121'],valores:['kkkkkkk','bbbbbb',14]}
tarefas.value.push(tarefa.value)

tarefa.value={propriedades:['dfljkf','ere','121'],valores:['uuuuuuu','aaaaaa',15]}
tarefas.value.push(tarefa.value)

tarefa.value={propriedades:['dfljkf','ere','121'],valores:['ttttttt','ssssss',16]}
tarefas.value.push(tarefa.value)

tarefa.value={propriedades:['dfljkf','ere','121'],valores:['ttttttt','ssssss',17]}
tarefas.value.push(tarefa.value)

tarefa.value={propriedades:['dfljkf','ere','121'],valores:['ttttttt','ssssss',18]}
tarefas.value.push(tarefa.value)

tarefa.value={propriedades:['dfljkf','ere','121'],valores:['ttttttt','ssssss',19]}
tarefas.value.push(tarefa.value)

tarefa.value={propriedades:['dfljkf','ere','121'],valores:['ttttttt','ssssss',20]}
tarefas.value.push(tarefa.value)

tarefa.value={propriedades:['dfljkf','ere','121'],valores:['ttttttt','ssssss',21]}
tarefas.value.push(tarefa.value)

tarefa.value={propriedades:['dfljkf','ere','121'],valores:['ttttttt','ssssss',22]}
tarefas.value.push(tarefa.value)

tarefa.value={propriedades:['dfljkf','ere','121'],valores:['ttttttt','ssssss',23]}
tarefas.value.push(tarefa.value)

tarefa.value={propriedades:['dfljkf','ere','121'],valores:['ttttttt','ssssss',24]}
tarefas.value.push(tarefa.value)




console.log(tarefas.value)

</script>

<template>
  <CardList :tarefas="tarefas" />
  <RouterView />
</template>

<style scoped>

</style>

