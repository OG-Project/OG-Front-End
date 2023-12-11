<template>
  <div
    class="w-full h-full flex justify-center items-center absolute"
    v-if="funcaoPopUp.variavelModal == true"
  >
    <div
      class="blur-background"
      v-if="funcaoPopUp.variavelModal == true"
      @click="funcaoPopUp.fechaPopUp()"
    ></div>
    <div
      id="fundoPopUp"
      class="relative h-[60%] w-[100%] lg:h-[60%] lg:w-[45%] 2xl:h-[80%] 2xl:w-[55%] xl:h-[60%] xl:w-[45%] md:h-[60%] md:w-[55%] sm:h-[60%] sm:w-[80%]"
    >
      <img
        src="../imagem-vetores/botao-x.svg"
        id="botao-sair"
        class="absolute top-1 right-1"
        @click="funcaoPopUp.fechaPopUp()"
      />
      <div id="bgBranco" class="relative min-h-[96%] overflow-auto">
        <div class="flex flex-row pl-12 items-center pr-6 mt-4 h-[10%] w-[100%]">
          <Input
            width="100"
            height="80"
            conteudoInput="Nome da tarefa"
            styleInput="input-transparente-claro-grande"
          ></Input>
        </div>
        <div class="flex flex-col pl-12 mt-4 h-[20%] w-[90%] flex justify-center">
            <TextAreaPadrao width="25vw" height="12vh" placeholder="Descrição da tarefa" tamanho-da-fonte="1rem" resize="none"></TextAreaPadrao>
        </div>
        <div class="flex pl-12 items-center gap-16 mt-4 h-[5%] w-[100%]">
        <div class="flex flex-col items-center justify-center w-[14%]">
          <p>Propriedades</p>
          <button class="h-[70%] w-[100%]">+ Adicionar</button>
        </div>
        <div class="flex flex-col items-center justify-center w-[14%]">
          <p>Status</p>
          <button class="h-[70%] w-[100%]">+ Adicionar</button>
        </div>
        <div class="flex flex-col items-center justify-center w-[14%]">
          <p>SubTarefas</p>
          <button class="h-[70%] w-[100%]">+ Adicionar</button>
        </div>
        </div>
        <p class="pl-12 mt-4">Arquivos({{ numeroDeArquivos }})...</p>
        <div id="exploradorDeArquivos" v-if="numeroDeArquivos != 0" class="flex gap-4 h-[15%] w-[66%] bg-[#D7D7D7] ml-12 mt-4 overflow-auto">
              <!-- v-for com os arquivos -->
        </div>
        <div class="pl-12 mt-4">
          <Botao  preset="PadraoVazadoIcon" :icon="iconAnexo" tamanhoDaBorda="2px" texto="Anexar" tamanhoPadrao="pequeno" inverterCorIcon="sim"></Botao>
        </div>
        <div class="pl-12 mt-4">
            <h1>SubTarefas</h1>
            <div class="flex items-center">
              <div class="h-[1vh] w-[50%] bg-[#D7D7D7]">
              <div :style="barraPorcentagem"></div>
            </div>
            <p class="pl-4">Tarefas Concluidas {{ porcentagemDeTarefasConcluidas }}%</p>
            </div>
            <select id="filtroDeSubTarefa">
              <option>Em Progresso</option>
              <option>Concluído</option>
            </select>
        </div>

        <!-- Fazer um v-for de propriedades -->
        <div class="absolute right-1 bottom-0 h-[7%] w-min pr-4 mt-4">
          
        </div>
      </div>
      <div id="bordaCinza"></div>
    </div>
  </div>
</template>
<script setup>
import Input from "./Input.vue";
import Botao from "./Botao.vue";
import CheckBox from "./checkBox.vue";
import iconAnexo from "../imagem-vetores/anexoIcon.svg";
import { funcaoPopUpStore } from "../stores/funcaoPopUp";
import TextAreaPadrao from "./textAreaPadrao.vue";
import ProgressBar from 'primevue/progressbar';
import SelectPadrao from "./selectPadrao.vue";
import { ref, watch } from "vue";

let numeroDeTarefasConcluidas = ref(2);
let numeroDeTarefas = ref(5);
let porcentagemDeTarefasConcluidas = ref(0);



function atualizaPorcentagemDeTarefasConcluidas() {
  porcentagemDeTarefasConcluidas.value = (numeroDeTarefasConcluidas.value / numeroDeTarefas.value) * 100;
}

watch(() => {
  atualizaPorcentagemDeTarefasConcluidas();
});

let barraPorcentagem = ref({
  width: porcentagemDeTarefasConcluidas.value + "%",
  height: "100%",
  borderRadius: "0px",
  backgroundColor: "#620BA7",
  border: "none",
  boxShadow: "none",
});

const funcaoPopUp = funcaoPopUpStore();
const props = defineProps({
  listaSelect: [],
  styleSelect: String,
});

let numeroDeArquivos = 1;

</script>
<style scoped>
#fundoPopUp {
  background-color: #36213e;
  display: flex;
  justify-content: center;
  align-items: center;
}

#bgBranco {
  height: 96%;
  width: 69%;
  background-color: #ffffff;
}

#bordaCinza {
  height: 96%;
  width: 28%;
  background-color: #c4c4c4;
  clip-path: polygon(60% 0, 0 0, 0 100%, 58% 100%, 100% 82%, 100% 18%);
}

#botao-sair {
  width: 4%;
  height: 4%;
}
.blur-background {
  @apply fixed inset-0 w-full h-full bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg absolute;
}
#bgBranco::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	background-color: #F1F1F1;
}

#bgBranco::-webkit-scrollbar
{
	width: 8px;
	background-color: #F1F1F1;
}

#bgBranco::-webkit-scrollbar-thumb
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	background-color: #D8D8D8;
}
#exploradorDeArquivos::-webkit-scrollbar-track {
	-webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.3);
	height: 6px;
	background-color: #F1F1F1;
}

#exploradorDeArquivos::-webkit-scrollbar {
  height: 8px;
	background-color: #F1F1F1;
}

#exploradorDeArquivos::-webkit-scrollbar-thumb { 
	height: 6px;
	-webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, .3);
	background-color: #D8D8D8;
}
#filtroDeSubTarefa {
    font-size: small;
}
option {
    font-size: small;
    border: 1px solid #cbcbcb;
}
</style>
