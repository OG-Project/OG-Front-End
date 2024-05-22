<template>
  <div :class="'w-full h-[90%] flex flex-col  ' + (tamanhoDeTela() ? 'items-center':'items-start') "
    v-if="projeto.tarefas && retornaTarefasAparentes(projeto.tarefas).length > 0">
    <div>
      <cabecalhoCardDaLista :projeto="projetoPromise" :listaDePropriedadesVisiveis="listaDePropriedadesVisiveis">
      </cabecalhoCardDaLista>
    </div>
    <div class="flex flex-col w-min h-full justify-start items-center gap-3">
      <draggable class=" truncate flex flex-col gap-3 items" v-model="projeto.tarefas" :animation="300" group="tarefa"
        item-key="tarefa.indice" @start="drag = true" @end="onDragEnd">
        <template #item="{ element: tarefa, index }">
          <div class="flex flex-row truncate h-[6vh] bg-[var(--backgroundItemsClaros)] py-[1%] select-none"
            v-if="tarefa.nome != null" @click="trocaRota(tarefa)">

            <div class="border-r-2 flex items-center justify-center w-[185px] truncate h-full">
              {{ tarefa.nome.charAt(0).toUpperCase() + tarefa.nome.slice(1) }}
            </div>
            <div class="border-r-2 flex items-center justify-start w-[185px] truncate  h-full"
              v-if="tarefa.descricao != null">
              {{ tarefa.descricao.charAt(0).toUpperCase() + tarefa.descricao.slice(1) }}
            </div>
            <div v-if="tarefa.descricao == null" class="border-r-2 flex items-center justify-center w-[185px]  h-full">
              <p>Não Tem Valor</p>
            </div>
            <div v-for="propriedade of tarefa.valorPropriedadeTarefas">
              <div class="border-r-2 flex items-center justify-center w-[185px] truncate  h-full"
                v-if="funcaoVerificaPropriedade(propriedade, tarefa)">
                <div v-if="propriedade.valor.valor == null || propriedade.valor.valor == ''"
                  class=" flex items-center justify-center w-[185px]  h-full">
                  <p>Não Tem Valor</p>
                </div>
                <div v-if="propriedade.propriedade.tipo == 'DATA' && propriedade.valor.valor != null">
                  {{ format(new Date(propriedade.valor.valor), 'dd/MM/yyyy HH:mm') }}
                </div>
                <div v-else="propriedade.propriedade.tipo == 'TEXTO' && propriedade.valor.valor != null">
                  {{ propriedade.valor.valor.charAt(0).toUpperCase() + propriedade.valor.valor.slice(1) }}
                </div>
                <div
                  v-else="propriedade.propriedade.tipo != 'DATA' && propriedade.propriedade.tipo != 'TEXTO' && propriedade.valor.valor != null">
                  {{ propriedade.valor.valor }}
                </div>
              </div>
            </div>
          </div>
        </template>
      </draggable>
    </div>
  </div>
  <div v-else class="flex flex-col justify-center items-center">
    <NotePad></NotePad>
    <p>Não há tarefas</p>
  </div>
</template>

<script setup>
import { onMounted, ref, onUnmounted, watch, onUpdated } from 'vue';
import cabecalhoCardDaLista from './cabecalhoCardDaLista.vue';
import { conexaoBD } from '../stores/conexaoBD';
import { format } from 'date-fns';
import router from '../router';
import VueCookies from 'vue-cookies';
import draggable from "vuedraggable";
import NotePad from '../imagemVetores/NotePad.vue';

let api = conexaoBD()
let projetoId = VueCookies.get("IdProjetoAtual")
let visualizacaoPromise = {}
let projeto = ref({})
let visualizacao = {}
let lista = ref([])
let tamanhoDaTela = ref(window.innerWidth)


onMounted(() => {
  transformaEmObject().then(() => {
    ordenaTarefas()
  })
  window.addEventListener('resize', () => {
    tamanhoDaTela.value = window.innerWidth
  })
})

const props = defineProps({
  projeto: {},
  listaDePropriedadesVisiveis: ref([]),
})

async function transformaEmObject() {
await api.buscarUm(projetoId, '/projeto').then((response)=>{
    console.log(response)
    projeto.value = response
    ordenaTarefas()
  })
  visualizacao = await visualizacaoPromise
}

function retornaTarefasAparentes(tarefas) {
  let tarefasAparecendo = [];
  tarefas.forEach(tarefa => {
    if (tarefa.nome != null) {
      tarefasAparecendo.push(tarefa)
    }
  })
  console.log(tarefasAparecendo)
  return tarefasAparecendo
}

function tamanhoDeTela() {
  let tela90 = (90/100)*tamanhoDaTela.value
  const quantidadePossivel = tela90/185
  if((props.listaDePropriedadesVisiveis.length+2) > quantidadePossivel){
    return false
  }
  return true
}

function funcaoVerificaPropriedade(valorPropriedadeTarefa, tarefa) {
  for (const propriedadeVisivel of props.listaDePropriedadesVisiveis) {
    if (valorPropriedadeTarefa.propriedade.id == propriedadeVisivel.id) {
      tarefa.valorPropriedadeTarefas.splice(tarefa.valorPropriedadeTarefas.indexOf(valorPropriedadeTarefa), 1, tarefa.valorPropriedadeTarefas[props.listaDePropriedadesVisiveis.indexOf(propriedadeVisivel)])
      tarefa.valorPropriedadeTarefas.splice(props.listaDePropriedadesVisiveis.indexOf(propriedadeVisivel), 1, valorPropriedadeTarefa)
      return true
    }
  }
}

function ordenaTarefas() {
  console.log(projeto.value)
  projeto.value.tarefas.sort((tarefa, tarefa2) => {
    if (tarefa.nome != null && tarefa2.nome != null) {
      return tarefa.indice[1].indice - tarefa2.indice[1].indice
    }
  })
}
function onDragEnd() {
  let tarefaPut = {}
  projeto.value.tarefas.forEach(async (tarefa, index) => {
    if (tarefa.nome != null) {
      tarefa.indice[1].indice = projeto.value.tarefas.indexOf(tarefa)
      tarefaPut = {
        id: tarefa.id,
        nome: tarefa.nome,
        descricao: tarefa.descricao,
        status: tarefa.status,
        cor: tarefa.cor,
        status: tarefa.status,
        valorPropriedadeTarefas: tarefa.valorPropriedadeTarefas,
        comentarios: tarefa.comentarios,
        arquivos: tarefa.arquivos,
        indice: tarefa.indice,
      }
      for (let valorPropriedadeTarefaPut of tarefaPut.valorPropriedadeTarefas) {
        if (valorPropriedadeTarefaPut.propriedade.tipo == "TEXTO") {
          valorPropriedadeTarefaPut.valor = {
            id: valorPropriedadeTarefaPut.valor.id,
            texto: valorPropriedadeTarefaPut.valor.valor ?? null,
            valor: valorPropriedadeTarefaPut.valor.valor ?? null,
          }
        } if (valorPropriedadeTarefaPut.propriedade.tipo == "DATA") {
          valorPropriedadeTarefaPut.valor = {
            id: valorPropriedadeTarefaPut.valor.id,
            data: valorPropriedadeTarefaPut.valor.valor ?? null,
            valor: valorPropriedadeTarefaPut.valor.valor ?? null,
          }
        } if (valorPropriedadeTarefaPut.propriedade.tipo == "NUMERO") {
          valorPropriedadeTarefaPutPut.valor = {
            id: valorPropriedadeTarefaPut.valor.id,
            numero: valorPropriedadeTarefaPut.valor.valor ?? null,
            valor: valorPropriedadeTarefaPut.valor.valor ?? null,
          }
        } if (valorPropriedadeTarefaPut.propriedade.tipo == "SELECAO") {
          valorPropriedadeTarefaPutPut.valor = {
            id: valorPropriedadeTarefaPut.valor.id,
            valores: valorPropriedadeTarefaPut.valor.valor ?? null,
            valor: valorPropriedadeTarefaPut.valor.valor ?? null,
          }
        }
      }
      console.log(tarefaPut)
      await api.atualizar(tarefaPut, '/tarefa').then((response) => {
        console.log(response)
      })
    }
  })
}
function trocaRota(tarefa) {
  VueCookies.set("IdTarefaCookies", tarefa.id)
  localStorage.removeItem("TarefaNaoFinalizada")
  router.push('/criaTarefa').then(() => {
    window.location.reload()
  })

}
</script>

<style lang="scss"></style>