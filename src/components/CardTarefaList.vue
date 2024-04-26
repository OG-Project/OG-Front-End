<template>
  <div class="w-full h-[90%] flex flex-col items-center">
    <div>
      <cabecalhoCardDaLista :projeto="projetoPromise" :listaDePropriedadesVisiveis="listaDePropriedadesVisiveis">
      </cabecalhoCardDaLista>
    </div>
    <div class="flex flex-row w-max h-[10%] justify-center items-center">
      <div v-for="tarefa of projeto.tarefas" class=" truncate ">
        {{ console.log(tarefa) }}
        <div class="border-r-2 flex items-center justify-center w-[10vw]">
          {{ tarefa.nome.charAt(0).toUpperCase() + tarefa.nome.slice(1) }}
        </div>
        <div class="border-r-2 flex items-center justify-center w-[10vw]" v-if="tarefa.descricao != null">
          {{ tarefa.descricao.charAt(0).toUpperCase() + tarefa.descricao.slice(1) }}

        </div>
        <div class="border-r-2 flex items-center justify-center w-[10vw]"> 
          {{ a }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import cabecalhoCardDaLista from './cabecalhoCardDaLista.vue';
import { conexaoBD } from '../stores/conexaoBD';

let api = conexaoBD()
let projetoPromise = api.procurar("/projeto/1")
let visualizacaoPromise = {}
let projeto = ref({})
let visualizacao = {}
let lista = ref([])


onMounted(() => {
  transformaEmObject()
})

const props = defineProps({
  projeto: {},
  listaDePropriedadesVisiveis: ref([]),
})

async function transformaEmObject() {
  projeto.value = await projetoPromise
  // visualizacaoPromise = api.procurar("/visualizacaoEmLista/" + projeto.id)
  visualizacao = await visualizacaoPromise
  console.log(visualizacao)
}

function defineTarefas() {
  let listaAux = []
  for (const tarefa of projeto.tarefas) {
    for (const valorPropriedadeTarefas of tarefa.valorPropriedadeTarefas) {
      for (const propriedade of listaDePropriedadesVisiveis) {
        if (valorPropriedadeTarefas.propriedadeId == propriedade.id) {

        }
      }
    }
    for (const propriedade of listaDePropriedadesVisiveis) {

    }
  }
}
</script>

<style lang="scss"></style>