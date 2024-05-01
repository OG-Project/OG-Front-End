<template>
  <div class="w-min h-[90%] flex flex-col items-center">
    <div>
      <cabecalhoCardDaLista :projeto="projetoPromise" :listaDePropriedadesVisiveis="listaDePropriedadesVisiveis">
      </cabecalhoCardDaLista>
    </div>
    <div class="flex flex-col w-min h-full justify-strart items-center gap-3">
      <draggable class=" truncate flex flex-col gap-3" v-model="projeto.tarefas" :animation="300" group="tarefa"
        item-key="tarefa.indice"  @start="drag = true" @end="onDragEnd">
        <template #item="{ element: tarefa,index }">
          <div class="flex flex-row truncate h-[6vh] bg-[#CCC9CE] py-[1%]" v-if="tarefa.nome != null" @click="trocaRota(tarefa)">

            <div class="border-r-2 flex items-center justify-center w-[10vw] truncate h-full">
              {{ tarefa.nome.charAt(0).toUpperCase() + tarefa.nome.slice(1) }}
            </div>
            <div class="border-r-2 flex items-center justify-start w-[10vw] truncate  h-full" v-if="tarefa.descricao != null">
              {{ tarefa.descricao.charAt(0).toUpperCase() + tarefa.descricao.slice(1) }}
            </div>
            <div v-if="tarefa.descricao == null" class="border-r-2 flex items-center justify-center w-[10vw]  h-full">
              <p>Não Tem Valor</p>
            </div>
            <div v-for="propriedade of tarefa.valorPropriedadeTarefas">
              <div class="border-r-2 flex h-full items-center justify-center w-[10vw] truncate  h-full"
                v-if="funcaoVerificaPropriedade(propriedade, tarefa)">
                <div v-if="propriedade.valor.valor == null" class="border-r-2 flex items-center justify-center w-[10vw]  h-full">
                  <p>Não Tem Valor</p>
                </div>
                <div v-if="propriedade.propriedade.tipo == 'DATA' && propriedade.valor.valor != null">
                  {{ format(new Date(propriedade.valor.valor), 'dd/MM/yyyy hh:mm') }}
                </div>
                <div v-else="propriedade.propriedade.tipo == 'TEXTO' && propriedade.valor.valor != null">
                  {{ propriedade.valor.valor.charAt(0).toUpperCase() + propriedade.valor.valor.slice(1) }}
                </div>
                <div v-else="propriedade.propriedade.tipo != 'DATA' && propriedade.propriedade.tipo != 'TEXTO' && propriedade.valor.valor != null">
                  {{ propriedade.valor.valor }}
                </div>
              </div>
            </div>
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, onUnmounted, watch } from 'vue';
import cabecalhoCardDaLista from './cabecalhoCardDaLista.vue';
import { conexaoBD } from '../stores/conexaoBD';
import { format } from 'date-fns';
import router from '../router';
import  VueCookies  from 'vue-cookies';
import draggable from "vuedraggable";

let api = conexaoBD()
let projetoId = VueCookies.get("IdProjetoAtual")
let visualizacaoPromise = {}
let projeto = ref({})
let visualizacao = {}
let lista = ref([])


onMounted(() => {
  transformaEmObject().then(()=>{
    console.log(projeto.value)
    ordenaTarefas()
  })
})

const props = defineProps({
  projeto: {},
  listaDePropriedadesVisiveis: ref([]),
})

async function transformaEmObject() {
  projeto.value = await api.buscarUm(projetoId, '/projeto')
  // visualizacaoPromise = api.procurar("/visualizacaoEmLista/" + projeto.id)
  visualizacao = await visualizacaoPromise
}

function funcaoVerificaPropriedade(valorPropriedadeTarefa, tarefa) {
  for (const propriedadeVisivel of props.listaDePropriedadesVisiveis) {
    if (valorPropriedadeTarefa.propriedade.id == propriedadeVisivel.id) {
      tarefa.valorPropriedadeTarefas.splice(tarefa.valorPropriedadeTarefas.indexOf(valorPropriedadeTarefa), 1, tarefa.valorPropriedadeTarefas[props.listaDePropriedadesVisiveis.indexOf(propriedadeVisivel)])
      tarefa.valorPropriedadeTarefas.splice(props.listaDePropriedadesVisiveis.indexOf(propriedadeVisivel), 1, valorPropriedadeTarefa)
      console.log(tarefa.valorPropriedadeTarefas)
      return true
    }
  }
}

function ordenaTarefas(){
  console.log(projeto.value.tarefas)
  projeto.value.tarefas.sort((tarefa, tarefa2) =>{
    return tarefa.indice[1].indice - tarefa2.indice[1].indice
  })
}
function onDragEnd(){
  projeto.value.tarefas.forEach(async (tarefa, index) =>{
    tarefa.indice[1].indice = projeto.value.tarefas.indexOf(tarefa)
    await api.atualizar(tarefa, '/tarefa')
  })
}
function trocaRota(tarefa){
    VueCookies.set("IdTarefaCookies",tarefa.id)
    router.push('/criaTarefa').then(() => {
        window.location.reload()
    })
   
}
</script>

<style lang="scss"></style>