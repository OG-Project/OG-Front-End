<template>
    <div :style="{ height: height, width: width }" class="flex justify-center">
      <div class="listaProjetos overflow-auto">
        <div class="flex justify-start">
          <div v-if="!kanbanAtivo">
            <button class="botaoStatus" :class="{ 'bordaRoxa': statusBotao === 'urgentes' }" @click="ativarBotao('urgentes')">URGENTES</button>
            <button class="botaoStatus" :class="{ 'bordaRoxa': statusBotao === 'prontos' }" @click="ativarBotao('prontos')">PRONTOS</button>
            <button class="botaoStatus" :class="{ 'bordaRoxa': statusBotao === 'nao-iniciados' }" @click="ativarBotao('nao-iniciados')">NÃO INICIADOS</button>
            <button class="botaoStatus" :class="{ 'bordaRoxa': statusBotao === 'meus-projetos' }" @click="ativarBotao('meus-projetos')">MEUS PROJETOS</button>
          </div>
          <div>
            
          </div>
        </div>
        <div v-if="!kanbanAtivo">
          <cardProjetos></cardProjetos>
         </div>
         <div>

         </div>
        <div class="iconeKanban" @click="toggleKanban()">
          <img  class="icone" src="../imagem-vetores/membrosEquipe.svg">
        </div>
      </div>       
    </div>
  </template>
  
<script setup>
import { ref } from 'vue';
import cardProjetos from './cardProjetos.vue';

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

.iconeKanban{
  @apply flex justify-end mr-3 mt-[-34vh];
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
  