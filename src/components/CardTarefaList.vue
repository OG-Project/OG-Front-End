<template>
  <div class="w-full h-full bg-purple-50 flex justify-center">
    <cabecalhoCardDaLista  :projeto="projetoPromise"></cabecalhoCardDaLista>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import cabecalhoCardDaLista from './cabecalhoCardDaLista.vue';
import { conexaoBD } from '../stores/conexaoBD';

let api = conexaoBD()
let projetoPromise = api.procurar("/projeto/1")
let visualizacaoPromise ={ }
let projeto = {}
let visualizacao = {}


onMounted(()=>{
  transformaEmObject()
})
async function transformaEmObject(){
  projeto = await projetoPromise
  visualizacaoPromise = api.procurar("/visualizacaoEmLista/" +  projeto.id)
  visualizacao = await visualizacaoPromise
  console.log(visualizacao)
}
</script>

<style lang="scss" ></style>