<template>
  <div class="max-w-[1760px] w-max">
    <!-- header com propriedades -->
    <div class="w-max">
      <div class="h-[50px] items-center ml-9 flex">
        <div
          v-for="(propriedade, index) in propriedades"
          @click="ordena(propriedade)"
          :style="{ width: 1760 / arrayDePropriedadesEcolhidas.length + 'px' }"
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
      class="w-max"
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
          <div class="w-full flex">
            <div
              :style="{ width: 1760 / arrayDePropriedadesEcolhidas.length + 'px' }"
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
  <div class="flex items-center gap-1 hover:bg-[#CCC9CE] w-max p-1 hover:rounded-md">
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M15 7H9V1C9 0.734784 8.89464 0.48043 8.70711 0.292893C8.51957 0.105357 8.26522 0 8 0C7.73478 0 7.48043 0.105357 7.29289 0.292893C7.10536 0.48043 7 0.734784 7 1V7H1C0.734784 7 0.48043 7.10536 0.292893 7.29289C0.105357 7.48043 0 7.73478 0 8C0 8.26522 0.105357 8.51957 0.292893 8.70711C0.48043 8.89464 0.734784 9 1 9H7V15C7 15.2652 7.10536 15.5196 7.29289 15.7071C7.48043 15.8946 7.73478 16 8 16C8.26522 16 8.51957 15.8946 8.70711 15.7071C8.89464 15.5196 9 15.2652 9 15V9H15C15.2652 9 15.5196 8.89464 15.7071 8.70711C15.8946 8.51957 16 8.26522 16 8C16 7.73478 15.8946 7.48043 15.7071 7.29289C15.5196 7.10536 15.2652 7 15 7Z" fill="black"/>
  </svg>
  <div @click="novaTarefa()">Nova</div>
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

const propriedades = computed(() => {
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

const divisao=reactive({
  width: ""+(1760/arrayDePropriedadesEcolhidas.length)+"px;"
})

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
            if(k.propriedade.tipo=='DATA'){
              let date = new Date(k.valor.valor)
              // weekday: 'long'
              console.log(date.toLocaleDateString("pt-br",{ year: 'numeric', month: 'numeric', day: 'numeric'})
              +" "+("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2))
              valoresCheck.push(date.toLocaleDateString("pt-br",{ year: 'numeric', month: 'numeric', day: 'numeric'})
              +" "+("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2))
            }else{
              valoresCheck.push(k.valor.valor);
            }
          }
        }
      }
    }
  }
  // i[0]!='nome' && i[0]!='status' && i[0]!='descricao' && i[0]!='id' && i[0]!='cor' && i[0]!='dataCriacao'
  return valoresCheck;
}
function ordena(propriedade){
  console.log(propriedade)
  valueTarefas.value.sort((a, b)=>{
  if(propriedade=='Descrição'){
    if(a.descricao>b.descricao){
      return -1
    }else if(a.descricao<b.descricao){
      return 1
    }else{
      return 0
    }
  }else if(propriedade=='Status'){
    if(a.status>b.status){
      return -1
    }else if(a.status<b.status){
      return 1
    }else{
      return 0
    }
  }else if(propriedade=='Nome'){
    if(a.nome>b.nome){
      return -1
    }else if(a.nome<b.nome){
      return 1
    }else{
      return 0
    }
  }else {
    if(a.valorPropriedadeTarefas.length!=0 && b.valorPropriedadeTarefas.length!=0){
    console.log('a resolver')
  }
  }

})
  // valueTarefas.valorPropriedadeTarefas.indexOf()
  
  console.log(valueTarefas.value)
}

function novaTarefa(){
  console.log('tarefa nova')
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
.distribuicao {
  width: (1760/ (v-bind(arrayDePropriedadesEcolhidas.length)))+"px;";
}
</style>
