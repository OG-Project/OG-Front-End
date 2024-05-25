<template>
  <div class="h-[92vh] w-full flex items-center">
    <div class="flex items-center relative justify-center w-full ml-16 mt-16 h-[35vw]">
      <div id="step-2"
        class="poligono h-[95%] w-[38%] shadow-2xl flex justify-center flex-col left-10 absolute overflow-visible"
        style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; z-index: 5;">
        <div class="flex justify-center items-end text-white text-4xl h-[10%]">
          <p style="font-family:var(--fonteTitulo);font-size: var(--fonteTituloTamanho);">{{ $t('home.dashboard') }}</p>
        </div>
        <div class="flex flex-col items-center justify-center mt-10 h-[62%] text-white">
          <canvas id="tabela" v-if="tarefasFeitas > 0 || tarefasNaoFeitas > 0"></canvas>
          <p v-else class="text-2xl" style="font-family:var(--fonteCorpo);font-size: var(--fonteCorpoTamanho);">{{
            $t('home.no_subtasks') }}</p>
          <div class="flex gap-4 pt-4">
            <p>{{ $t('home.tarefasFeitas') }}: {{ tarefasFeitas/2 }}</p>
            <p>{{ $t('home.tarefasNaoFeitas') }}: {{ tarefasNaoFeitas/2 }}</p>
          </div>
        </div>
      </div>
      <div class="bg-[var(--backgroundItems)] ml-12 w-[76%] h-[92%] flex items-center justify-end"
        style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px">
        <div class="overflow-y-auto h-[100%] w-[75%] flex items-center flex-col">
          <div class="flex justify-center w-full text-4xl mt-8">
            <p style="font-family:var(--fonteTitulo);font-size: var(--fonteTituloTamanho);">{{ $t('home.projects') }}
            </p>
          </div>
          <div class="flex gap-12 mt-16 flex-wrap justify-center w-[70%] text-4xl">
            <topicosHome style="font-family:var(--fonteCorpo);" @click="enviaParaTarefasPrincipais()"
              :nomeDoTopico="$t('home.main_projects')">
            </topicosHome>
            <topicosHome style="font-family:var(--fonteCorpo);" :nomeDoTopico="$t('home.daily_projects')"
              @click="enviaParaTarefasDoDia()">
            </topicosHome>
            <topicosHome style="font-family:var(--fonteCorpo);" :nomeDoTopico="$t('home.weekly_projects')"
              @click="enviaParaTarefasDaSemana()">
            </topicosHome>
            <topicosHome style="font-family:var(--fonteCorpo);" :nomeDoTopico="$t('home.monthly_projects')"
              @click="enviaParaTarefasDoMes()">
            </topicosHome>
          </div>
        </div>
      </div>
    </div>
  </div>
  <PopUpTopicoPrincipaisHome v-if="funcaoPopUp.variavelModal && mostraTarefasPrincipais == true"
    :nomeDoTopico="$t('home.main_projects')"></PopUpTopicoPrincipaisHome>
  <PopUpTopicoDiaHome v-if="funcaoPopUp.variavelModal && mostraTarefasDoDia == true"
    :nomeDoTopico="$t('home.daily_projects')">
  </PopUpTopicoDiaHome>
  <PopUpTopicoSemanaHome v-if="funcaoPopUp.variavelModal && mostraTarefasDaSemana == true"
    :nomeDoTopico="$t('home.weekly_projects')"></PopUpTopicoSemanaHome>
  <PopUpTopicoMesHome v-if="funcaoPopUp.variavelModal && mostraTarefasDoMes == true"
    :nomeDoTopico="$t('home.monthly_projects')">
  </PopUpTopicoMesHome>
</template>


<script setup>
import { ref, watch } from "vue";
import Chart from "chart.js/auto";
import { onMounted } from "vue";
import topicosHome from "../../components/topicosHome.vue";
import PopUpTopicoPrincipaisHome from "../../components/popUpTopicoPrincipaisHome.vue";
import PopUpTopicoDiaHome from "../../components/popUpTopicoDiaHome.vue";
import PopUpTopicoSemanaHome from "../../components/popUpTopicoSemanaHome.vue";
import PopUpTopicoMesHome from "../../components/popUpTopicoMesHome.vue";
import { funcaoPopUpStore } from "../../stores/funcaoPopUp";
import VueCookies from "vue-cookies";
import { conexaoBD } from "../../stores/conexaoBD.js";
import { criaTarefaEBuscaStore } from "../../stores/criaTarefaEBusca";

const banco = conexaoBD();

let x = ["Feito", "Não Feito"];
const funcaoPopUp = funcaoPopUpStore();

let quantidadeTarefasFeitas = ref(0);
let quantidadeNaoTarefasFeitas = ref(0);
let tarefasFeitas = ref(0);
let tarefasNaoFeitas = ref(0);
let totalTarefas = ref(0);

function reloadHome() {
  const reload = VueCookies.get('idReloadHome');
  if (reload == '0') {
    console.log('reload');
    VueCookies.set('idReloadHome', '1');
    
    setTimeout(() => {
      window.location.reload();
    }, 0.5); // 2000 ms = 2 seconds
  }
}

reloadHome();

function testeCria(){
  const criaTarefa = criaTarefaEBuscaStore();
    VueCookies.set('idReloadTarefa', '0');
    criaTarefa.criaTarefa();
}

async function verificaTarefasFeitas() {
  const equipeUsuario = await banco.procurar("/usuario/" + VueCookies.get("IdUsuarioCookie"));
  equipeUsuario.equipes.forEach(async equipe => {
    let projetosDoBanco = await banco.buscarProjetosEquipe(equipe.id, "/projeto/buscarProjetos");
    projetosDoBanco.forEach(projeto => {
      projeto.tarefas.forEach(tarefa => {
        tarefa.subTarefas.forEach(subtarefa => {
          if (subtarefa.concluido == true) {
            tarefasFeitas.value++;
          } else {
            tarefasNaoFeitas.value++;
          }
        });
      });
    });
    porcentagemTarefasFeitas();
  });
}

function porcentagemTarefasFeitas() {
  let totalSubTarefas = tarefasFeitas.value + tarefasNaoFeitas.value;
  quantidadeTarefasFeitas.value = (tarefasFeitas.value / totalSubTarefas) * 100;
  quantidadeNaoTarefasFeitas.value = (tarefasNaoFeitas.value / totalSubTarefas) * 100;
  const data = {
    labels: ["Feito", "Não Feito"],
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
          display: false
        },
      },
    },
  };

  const ctx = document.getElementById("tabela");
  const grafico = new Chart(ctx, config);
}

const DATA_COUNT = 5;
const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };

let mostraTarefasPrincipais = ref(false);

function enviaParaTarefasPrincipais() {
  mostraTarefasPrincipais.value = !mostraTarefasPrincipais.value;
  mostraTarefasDoDia.value = false;
  mostraTarefasDaSemana.value = false;
  mostraTarefasDoMes.value = false;
  funcaoPopUp.abrePopUp();
}

let mostraTarefasDoDia = ref(false);

function enviaParaTarefasDoDia() {
  mostraTarefasDoDia.value = !mostraTarefasDoDia.value;
  mostraTarefasPrincipais.value = false;
  mostraTarefasDaSemana.value = false;
  mostraTarefasDoMes.value = false;
  funcaoPopUp.abrePopUp();
}

let mostraTarefasDaSemana = ref(false);

function enviaParaTarefasDaSemana() {
  mostraTarefasDaSemana.value = !mostraTarefasDaSemana.value;
  mostraTarefasDoDia.value = false;
  mostraTarefasPrincipais.value = false;
  mostraTarefasDoMes.value = false;
  funcaoPopUp.abrePopUp();
}

let mostraTarefasDoMes = ref(false);

function enviaParaTarefasDoMes() {
  mostraTarefasDoMes.value = !mostraTarefasDoMes.value;
  mostraTarefasDaSemana.value = false;
  mostraTarefasDoDia.value = false;
  mostraTarefasPrincipais.value = false;
  funcaoPopUp.abrePopUp();
}



onMounted(() => {
  if (VueCookies.get("JWT") != null) {
    colocaUsuarioId()
  }
  verificaTarefasFeitas();
}
)

function colocaUsuarioId() {
  banco.getCookie().then((res) => {
    VueCookies.set("IdUsuarioCookie", res.id, 100000000000)
    verificaTarefasFeitas();
  })
}


</script>

<style scoped>
.poligono {
  clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
  background-color: var(--roxoEscuro);
}
</style>