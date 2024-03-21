<template>
  <div class="w-full h-full bg-purple-50 flex justify-center">
    {{ console.log() }}
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
let objetoEmLista = defineAsPropriedadesVisiveis()

function defineAsPropriedadesVisiveis() {
  let visualizacaoEmLista = {
    nome: "davi",
    tipo: "trabalhador"
  }

  console.log(visualizacaoEmLista)
  return visualizacaoEmLista;
}

</script>

<style lang="scss" ></style>