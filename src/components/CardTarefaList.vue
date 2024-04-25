<template>
  <div class="w-full h-full bg-purple-50 flex justify-center">
    <cabecalhoCardDaLista  :projeto="projetoPromise" :listaDePropriedadesVisiveis="listaDePropriedadesVisiveis"></cabecalhoCardDaLista>
  </div>
  <div v-for="tarefa of projeto.tarefas">
    <div>
      {{tarefa.nome}}
    </div>
    <div>
      {{tarefa.descricao}}  
    </div>
    <div v-for="propriedade of listaDePropriedadesVisiveis">

    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import cabecalhoCardDaLista from './cabecalhoCardDaLista.vue';
import { conexaoBD } from '../stores/conexaoBD';

let api = conexaoBD()
let projetoPromise = api.procurar("/projeto/1")
let visualizacaoPromise ={ }
let projeto = {}
let visualizacao = {}
let lista = ref([])


onMounted(()=>{
  transformaEmObject()
})

const props = defineProps({
  projeto: {},
  listaDePropriedadesVisiveis: ref([]),
})

async function transformaEmObject(){
  projeto = await projetoPromise
  visualizacaoPromise = api.procurar("/visualizacaoEmLista/" +  projeto.id)
  visualizacao = await visualizacaoPromise
  console.log(visualizacao)
}

function defineTarefas(){
  let listaAux = []
  for(const tarefa of projeto.tarefas){
    for(const valorPropriedadeTarefas of tarefa.valorPropriedadeTarefas){
      for(const propriedade of listaDePropriedadesVisiveis){
        if(valorPropriedadeTarefas.propriedadeId == propriedade.id){
          
        }
      }
    }
    for(const propriedade of listaDePropriedadesVisiveis){

    } 
  }
}
</script>

<style lang="scss" ></style>