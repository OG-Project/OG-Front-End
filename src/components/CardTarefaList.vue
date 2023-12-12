<template>
  <div class='max-w-[1760px] w-max'>
  <!-- header com propriedades -->
    <div>
      <div class='h-[50px] items-center ml-9 grid grid-flow-col'>
        <div v-for="(propriedade,index) in propriedades" class='border-r-2 last:border-none text-center border-black px-4 truncate' >
          {{index<3 ? propriedade : propriedade.propriedade.nome}}
        </div>
      
        </div>
      </div>
  
  <!-- header com propriedades -->
      <draggable
      :list="props.tarefas"
      @start="dragging = true"
      @end="dragging = false"
      >
      <template #item="{element,index}">
    <div class='card' > 
        <div class=' handle'>
            <svg  width="19" height="33" viewBox="0 0 19 33" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect y="0.973022" width="7.42971" height="7.68505" rx="1" fill="#FEFBFF"/>
            <rect x="11.4297" y="0.9729" width="7.42971" height="7.68505" rx="1" fill="#FEFBFF"/>
            <rect y="12.658" width="7.42971" height="7.68505" rx="1" fill="#FEFBFF"/>
            <rect x="11.4297" y="12.658" width="7.42971" height="7.68505" rx="1" fill="#FEFBFF"/>
            <rect y="24.343" width="7.42971" height="7.68505" rx="1" fill="#FEFBFF"/>
            <rect x="11.4297" y="24.343" width="7.42971" height="7.68505" rx="1" fill="#FEFBFF"/>
            </svg>
        </div>
        <div class='grid w-full grid-flow-col'>
            <div class='border-r-2 text-center last:border-none border-white px-4 truncate'   v-for="(valor,index) in element" >
                {{index}} {{valor}}
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
import draggable from 'vuedraggable'
import {computed,ref,onMounted,onBeforeMount} from 'vue'
const props=defineProps({
  tarefas:[]
})

let propriedades=computed(()=>{
  let tamanho=['Nome','Descrição','Status']
  for(let item of props.tarefas[0].valorPropriedadeTarefas){
    tamanho.push(item)
  }

  return tamanho
})
function checkValor(objeto){
  let chavesValores=Object.entries(objeto)
  let propriedadesChekadas=[]
  console.log(propriedades)
  for(let i of chavesValores){
    if(i[0]=='nome'){
      console.log(i[1])
    }
    if(i[0]=='descricao'){
      console.log(i[1])
    }
    if(i[0]=='status'){
      console.log(i[1]!=null? i[1].nome: 'Não Tem')
    }
    if(i[0]){

    }
  }
}
onMounted(()=>{
  for(let i of props.tarefas){
    checkValor(i)
    
  }
})

</script>

<style scoped>
@import url(../assets/main.css);
@layer components{
  .card{
      @apply
          mb-2 
          flex
          h-[50px] 
          items-center  
          bg-[#CCC9CE] 
          hover:bg-[#CD98FD] 
          active:outline-2
          ;
    }
}


</style>