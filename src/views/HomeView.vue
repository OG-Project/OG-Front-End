<template>
  <div class="h-full w-full flex items-center">
    <div class="flex items-center relative justify-center w-full mt-16 h-[35vw]">
      <div
        id="poligono"
        class="h-[95%] w-[38%] shadow-2xl flex justify-center flex-col left-10 absolute overflow-visible"
        style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; z-index: 5;"
      >
        <div class="flex justify-center items-end text-white text-4xl h-[10%]">
          <p>Dashboard</p>
        </div>
        <div class="flex items-center justify-center mt-8 h-[62%] text-white">
          <canvas id="tabela"></canvas>
        </div>
      </div>
      <div
        class="bg-brancoNeve ml-12 w-[76%] h-[92%] flex items-center justify-end"
        style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
      >
        <div class="overflow-y-auto h-[100%] w-[75%] flex items-center flex-col">
          <div class="flex justify-center w-full text-4xl mt-8">
            <p>Tarefas</p>
          </div>
          <div class="flex gap-12 mt-16 flex-wrap justify-center w-[70%] text-4xl">
            <topicosHome
              @click="enviaParaTarefasPrincipais()"
              nomeDoTopico="Principais Tarefas"
            >
            </topicosHome>
            <topicosHome
              nomeDoTopico="Tarefas do Dia"
              @click="enviaParaTarefasDoDia()"
            >
            </topicosHome>
            <topicosHome
              nomeDoTopico="Tarefas da Semana"
              @click="enviaParaTarefasDaSemana()"
            >
            </topicosHome>
            <topicosHome
              nomeDoTopico="Tarefas do Mês"
              @click="enviaParaTarefasDoMes()"
            >
            </topicosHome>
          </div>
        </div>
      </div>
    </div>
  </div>
  <PopUpTopicosHome
    v-if="funcaoPopUp.variavelModal && mostraTarefasPrincipais == true"
    nomeDoTopico="Principais Tarefas"
  ></PopUpTopicosHome>
  <PopUpTopicosHome
    v-if="funcaoPopUp.variavelModal && mostraTarefasDoDia == true"
    nomeDoTopico="Principais Do Dia"
  ></PopUpTopicosHome>
  <PopUpTopicosHome
    v-if="funcaoPopUp.variavelModal && mostraTarefasDaSemana == true"
    nomeDoTopico="Principais Da Semana"
  ></PopUpTopicosHome>
  <PopUpTopicosHome
    v-if="funcaoPopUp.variavelModal && mostraTarefasDoMes == true"
    nomeDoTopico="Principais do Mês"
  ></PopUpTopicosHome>
</template>


<script setup>
import { ref } from "vue";
import Tabelas from "../components/Tabelas.vue";
import Chart from "chart.js/auto";
import { onMounted } from "vue";
import topicosHome from "../components/topicosHome.vue";
import PopUpTopicosHome from "../components/popUpTopicosHome.vue";
import { funcaoPopUpStore } from "../stores/funcaoPopUp";

let x = ["Feito", "Não Feito"];
const funcaoPopUp = funcaoPopUpStore();
let quantidadeTarefasFeitas = ref(70);
let quantidadeNaoTarefasFeitas = ref(30);

const DATA_COUNT = 5;
const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };

let mostraTarefasPrincipais = ref(false);

function enviaParaTarefasPrincipais() {
  mostraTarefasPrincipais.value = !mostraTarefasPrincipais.value;
  funcaoPopUp.abrePopUp();
}

let mostraTarefasDoDia = ref(false);

function enviaParaTarefasDoDia() {
  mostraTarefasDoDia.value = !mostraTarefasDoDia.value;
  funcaoPopUp.abrePopUp();
}

let mostraTarefasDaSemana = ref(false);

function enviaParaTarefasDaSemana() {
  mostraTarefasDaSemana.value = !mostraTarefasDaSemana.value;
  funcaoPopUp.abrePopUp();
}

let mostraTarefasDoMes = ref(false);

function enviaParaTarefasDoMes() {
  mostraTarefasDoMes.value = !mostraTarefasDoMes.value;
  funcaoPopUp.abrePopUp();
}


const data = {
  labels: [
    "Feito: " + quantidadeTarefasFeitas.value + "%",
    "Não Feito: " + quantidadeNaoTarefasFeitas.value + "%",
  ],
  datasets: [
    {
      data: [quantidadeTarefasFeitas.value, quantidadeNaoTarefasFeitas.value],
      backgroundColor: ["#428A6A", "#8A4242"],
    },
  ],
};
const config = {
  type: "doughnut",
  data: data,
  options: {
    borderWidth: 0,
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  },
};
onMounted(() => {
  new Chart(document.getElementById("tabela"), config);
});
</script>
<style>
#poligono {
  clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
  background-color: #36213e;
}
</style>
