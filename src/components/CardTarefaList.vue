<template>
  <div class="max-w-[1760px] w-max">
    <!-- header com propriedades -->
    <div>
      <div class="h-[50px] items-center ml-9 grid grid-flow-col">
        <div
          v-for="(propriedade, index) in propriedades"
          class="border-r-2 last:border-none text-center border-black px-4 truncate"
        >
          {{ propriedade }}
        </div>
      </div>
    </div>

    <!-- header com propriedades -->
    <draggable
      :list="valueTarefas"
      @start="dragging = true"
      @end="dragging = false"
      ghost-class="ghost"
      handle=".handle"
      @change="alteraTarefa()"
    >
      <template #item="{ element, index }">
        <div class="card">
          <div class="handle">
            <svg
              width="19"
              height="33"
              viewBox="0 0 19 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect y="0.973022" width="7.42971" height="7.68505" rx="1" fill="#FEFBFF" />
              <rect
                x="11.4297"
                y="0.9729"
                width="7.42971"
                height="7.68505"
                rx="1"
                fill="#FEFBFF"
              />
              <rect y="12.658" width="7.42971" height="7.68505" rx="1" fill="#FEFBFF" />
              <rect
                x="11.4297"
                y="12.658"
                width="7.42971"
                height="7.68505"
                rx="1"
                fill="#FEFBFF"
              />
              <rect y="24.343" width="7.42971" height="7.68505" rx="1" fill="#FEFBFF" />
              <rect
                x="11.4297"
                y="24.343"
                width="7.42971"
                height="7.68505"
                rx="1"
                fill="#FEFBFF"
              />
            </svg>
          </div>
          <div class="grid w-full grid-flow-col">
            <div
              class="border-r-2 text-center last:border-none border-white px-4 truncate"
              v-for="(valor, index) in checkValor(element)"
            >
              {{ valor }}
            </div>
          </div>
        </div>
      </template>
    </draggable>
    <!-- lista com valores das propriedades referentes-->
  </div>

  <!-- <div v-for="(tarefa,index) in props.tarefas">{{index}} {{tarefa}}</div> -->
</template>

<script setup>
import { reactive, computed, ref, onMounted, onBeforeMount } from "vue";
import draggable from 'vuedraggable';
const props = defineProps({
  tarefas: [],
  arrayDePropriedadesEcolhidas: [],
});

let valueTarefas=computed(()=>{
  return props.tarefas
})

let arrayDePropriedadesEcolhidas = props.arrayDePropriedadesEcolhidas;

let propriedades = computed(() => {
  let tamanho = [];
  for (let i of arrayDePropriedadesEcolhidas) {
    console.log("aqui")
    if (i == "nome") {
      tamanho.push("Nome");
    } else if (i == "descricao") {
      tamanho.push("Descrição");
    } else if (i == "status") {
      tamanho.push("Status");
    }else {
      //erro aqui
      try {
        for (let item of props.tarefas[0].valorPropriedadeTarefas) {
          if(i==item.propriedade.nome){
            tamanho.push(item.propriedade.nome);
          }
          console.log(item.propriedade.nome);
        }
      } catch (error) {
        console.log(error)
      }   
      //erro
    }
  }
  return tamanho;
});



function checkValor(objeto) {
  let chavesValores = Object.entries(objeto);
  let valoresCheck = [];

  for (let i of arrayDePropriedadesEcolhidas) {
    for (let j of chavesValores) {
      if (j[0] == i) {
        if (i == "status") {
          valoresCheck.push(j[1] != null ? j[1].nome : "Não tem");
        } else {
          valoresCheck.push(j[1]);
        }
      }
      if (j[0] == "valorPropriedadeTarefas") {
        // console.log("caiu aqui");
        // console.log(j[0] == "valorPropriedadeTarefas");
        for (let k of j[1]) {
          if (k.propriedade.nome == i) {
            console.log(k.valor.valor);
            valoresCheck.push(k.valor.valor);
          }
        }
      }
    }
  }
  // i[0]!='nome' && i[0]!='status' && i[0]!='descricao' && i[0]!='id' && i[0]!='cor' && i[0]!='dataCriacao'
  return valoresCheck;
}
function alteraTarefa(){
  console.log(valueTarefas)
}

</script>

<style scoped>
@import url(../assets/main.css);
@layer components {
  .card {
    @apply mb-2 
          flex
          h-[50px] 
          items-center  
          bg-[#CCC9CE] 
          hover:bg-[#CD98FD] 
          active:outline-2;
  }
}
.handle {
  @apply cursor-pointer
  pl-3;
}
.ghost {
  opacity: 0.6;
}
.distribuicao{
  grid-template-columns: "repeat("+v-bind(arrayDePropriedadesEcolhidas.length)+", minmax(0, 1fr));"
}
</style>
