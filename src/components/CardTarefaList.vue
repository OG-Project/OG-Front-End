<template>
  <div class="w-full h-[90%] flex flex-col items-center">
    <div>
      <cabecalhoCardDaLista :projeto="projetoPromise" :listaDePropriedadesVisiveis="listaDePropriedadesVisiveis">
      </cabecalhoCardDaLista>
    </div>
    <div class="flex flex-col w-min h-[10%] justify-center items-center">
      <div v-for="tarefa of projeto.tarefas" class=" truncate flex flex-row">
        <div class="flex flex-row truncate h-full bg-[#CCC9CE] py-[1%]">
          <div class="flex justify-center w-[2%] absolute">
            <svg width="19" height="33" viewBox="0 0 19 33" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect y="0.973145" width="7.42971" height="7.68505" rx="1" fill="#FEFBFF" />
              <rect x="11.4297" y="0.973145" width="7.42971" height="7.68505" rx="1" fill="#FEFBFF" />
              <rect y="12.6582" width="7.42971" height="7.68505" rx="1" fill="#FEFBFF" />
              <rect x="11.4297" y="12.6582" width="7.42971" height="7.68505" rx="1" fill="#FEFBFF" />
              <rect y="24.3433" width="7.42971" height="7.68505" rx="1" fill="#FEFBFF" />
              <rect x="11.4297" y="24.3433" width="7.42971" height="7.68505" rx="1" fill="#FEFBFF" />
            </svg>  
          </div>
          <div class="border-r-2 flex items-center justify-center w-[10vw]">
            {{ tarefa.nome.charAt(0).toUpperCase() + tarefa.nome.slice(1) }}
          </div>
          <div class="border-r-2 flex items-center justify-center w-[10vw]" v-if="tarefa.descricao != null">
            {{ tarefa.descricao.charAt(0).toUpperCase() + tarefa.descricao.slice(1) }}
          </div>
          <div v-if="tarefa.descricao == null" class="border-r-2 flex items-center justify-center w-[10vw]">
            <p>Não Tem Valor</p>
          </div>
          <div v-for="propriedade of tarefa.valorPropriedadeTarefas">
            <div class="border-r-2 flex h-full items-center justify-center w-[10vw] truncate"
              v-if="funcaoVerificaPropriedade(propriedade.propriedade)">
              <div v-if="propriedade.propriedade.tipo == 'DATA'">
                {{format(new Date(propriedade.valor.valor), 'dd/MM/yyyy hh:mm') }}
              </div>
            </div>
            <div v-if="propriedade.valor.valor == null" class="border-r-2 flex items-center justify-center w-[10vw]">
              <p>Não Tem Valor</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import cabecalhoCardDaLista from './cabecalhoCardDaLista.vue';
import { conexaoBD } from '../stores/conexaoBD';
import { format} from 'date-fns';


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
}

function funcaoVerificaPropriedade(propriedade) {
  for (const propriedadeVisivel of props.listaDePropriedadesVisiveis) {
    if (propriedade.id == propriedadeVisivel.id) {
      return true
    }
  }
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