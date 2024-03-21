<template>
    <div :style="{ height: height, width: width }" class="flex justify-center">
      <div class="listaProjetos overflow-auto">
        <div class="flex justify-start w-full">
          <div v-if="!kanbanAtivo">
            <button class="botaoStatus" :class="{ 'bordaRoxa': statusBotao === 'urgentes' }" @click="ativarBotao('urgentes')">URGENTES</button>
            <button class="botaoStatus" :class="{ 'bordaRoxa': statusBotao === 'prontos' }" @click="ativarBotao('prontos')">PRONTOS</button>
            <button class="botaoStatus" :class="{ 'bordaRoxa': statusBotao === 'nao-iniciados' }" @click="ativarBotao('nao-iniciados')">NÃO INICIADOS</button>
            <button class="botaoStatus" :class="{ 'bordaRoxa': statusBotao === 'meus-projetos' }" @click="ativarBotao('meus-projetos')">MEUS PROJETOS</button>
          </div>
          <div v-if="kanbanAtivo">
            <div class="kanban-board w-full pl-2 mt-10 flex justify-start">
              <div class="urgentes">
                     <h1 class="text-xl text-white"> URGENTES</h1>
              </div>
              <div class="naoIniciado">
                <h1 class="text-xl text-white"> NÃO INICIADOS</h1>
              </div>
              <div class="prontos">
                <h1 class="text-xl text-white"> PRONTOS</h1>
              </div>
              <div class="meusProjetos">
                <h1 class="text-xl text-white"> MEUS PROJETOS</h1>
              </div>
              
            </div>
            <div class="flex p-5">
              <KanbanProjetos></KanbanProjetos>
            </div>
            <div class="iconeCard" @click="toggleKanban()">
            <img  class="icone" src="../imagem-vetores/membrosEquipe.svg">
          </div>
          </div>
          <div  v-if="!kanbanAtivo" class="iconeKanban" @click="toggleKanban()">
            <img  class="icone" src="../imagem-vetores/membrosEquipe.svg">
          </div>
        </div>
        <div v-if="!kanbanAtivo" class="cardProjetos">
          <cardProjetos></cardProjetos>
         </div>
      </div>       
    </div>
  </template>
  
<script setup>
import { ref } from 'vue';
import cardProjetos from './cardProjetos.vue';
import KanbanProjetos from './kanbanProjetos.vue';

const props = defineProps({
  height: { type: String, required: true },
  width: { type: String, required: true }
});

const statusBotao = ref(null);
const kanbanAtivo = ref(false);

const ativarBotao = (botao) => {
  if (statusBotao.value === botao) {
    statusBotao.value = null; // Desativa o botão se ele estiver ativado
  } else {
    statusBotao.value = botao; // Ativa o botão clicado
  }
}

const toggleKanban = () => {
  kanbanAtivo.value = !kanbanAtivo.value;
}

const projetos = ref([]);

</script>
  
<style scoped>

kanban-board {
  width: 800px;
  height: 600px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  overflow: auto;
}

.urgentes {
  @apply flex w-[22.5vw] h-[7vh] bg-[#D27200] justify-center items-center mx-2 shadow-md  shadow-gray-400;
}

.naoIniciado{
  @apply flex w-[22.5vw] h-[7vh] bg-[#0034BA] justify-center items-center mx-2 shadow-md  shadow-gray-400;
}
.prontos{
  @apply flex w-[22.5vw] h-[7vh] bg-[#389300] justify-center items-center mx-2 shadow-md  shadow-gray-400; 
}

.meusProjetos{
  @apply flex w-[22.5vw] h-[7vh] bg-[#8E00FF] justify-center items-center mx-2 shadow-md  shadow-gray-400;
}

.cardProjetos{
  @apply flex p-10
}
.iconeKanban{
  @apply flex justify-end ml-[51.05vw] mt-[1.2vh];
}

.iconeCard{
  @apply absolute justify-end ml-[93.2vw] mt-[-21.2vh];
}

.icone{
  @apply w-[20px] h-[20px]
}

::-webkit-scrollbar {
    display: none;
}

.botaoStatus {
  @apply bg-transparent font-semibold mt-3 px-5 text-xl rounded mr-2;
}

.bordaRoxa {
  border-bottom-width: 2px;
  border-bottom-color: #8a2be2; /* cor roxa */
}

.listaProjetos {
    @apply bg-[#f8f8f8] shadow-md shadow-gray-200;
    flex: 1 1px;
}
  </style>
  