<script setup>
import { RouterLink, RouterView } from 'vue-router'
import cardProjetos from './components/cardProjetos.vue'
import checkBox from './components/checkBox.vue'
import {ref} from 'vue'
import BarraLateral from './components/BarraLateral.vue'


let titulo=ref("Titulo lindo maravilhoso")
let reponsavel=ref("Neymar dos Santos")
let descricao=ref("Descrição além do que se pode ser descrito auto explicativo e capaz de mostar tudo que será feito em um projeto em poucas linhas")
let comeco=ref("12/12/2005")
let final=ref("12/12/2050")
let feito=ref(0)
let tipo=ref("Engenharia de S")

let mostrar=ref(false)

function executar(emit) {
  console.log(emit.value)
  mostrar=emit.value
}

</script>

<template>
  <!-- <checkBox tipo="toggle" />
  <cardProjetos 
  :name="titulo" 
  :reponsavel="reponsavel" 
  :descricao="descricao" 
  :comeco="comeco" 
  :final="final"
  :tipo="tipo"
  :feito="feito" /> -->
<!--   
  <RouterView /> -->
  <button @click="mostrar=!mostrar" >mostrar</button>
  <transition name="slide-fade">
    <BarraLateral v-if="mostrar" @fechar="(n)=> console.log(n.value)" />
  </transition>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
