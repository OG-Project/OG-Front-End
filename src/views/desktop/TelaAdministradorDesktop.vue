<template>
    <div class="h-[92vh] w-full">
        <div class="flex p-2 text-4xl justify-center">
            <h1 style="font-family:var(--fonteTitulo);font-size: var(--fonteTituloTamanho);">{{
                $t('paginaAdm.listaDeTarefas') }}</h1>
        </div>
        <div class="flex items-center relative justify-center mt-4 h-[38%] ml-16">
            <div id="poligono"
                class="h-[100%] w-[40vh] shadow-2xl flex justify-center flex-col left-[-0.50rem] absolute overflow-visible"
                style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; z-index: 5;">
                <!-- <p class="flex justify-center items-center text-2xl text-white">{{ $t('paginaAdm.tarefasDoSeuProjeto') }}</p> -->
            </div>
            <div class="bg-[var(--backgroundItems)] ml-8 w-[90%] h-[92%] flex items-center justify-end"
                style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px">
                <div class="overflow-y-auto h-[100%] w-[80%] flex items-center flex-col" id="scrollbar">
                    <div class="flex gap-4 mt-6 flex-wrap justify-center w-[100%] text-md">
                        <div class="flex gap-8 pb-8 w-[90%] items-center justify-center">
                            <p class="w-[20%] flex items-center justify-center"
                                style="font-family:var(--fonteCorpo);font-size: var(--fonteCorpoTamanho);">{{
                $t('paginaAdm.nomeDaTarefa') }}</p>
                            <!-- <p class="w-[20%] flex items-center justify-center">Lider</p> -->
                            <!-- <p class="w-[20%] flex items-center justify-center">Membros</p> -->
                            <p class="w-[20%] flex items-center justify-center"
                                style="font-family:var(--fonteCorpo);font-size: var(--fonteCorpoTamanho);">{{
                $t('paginaAdm.status') }}</p>
                            <p class="w-[20%] flex items-center justify-center"
                                style="font-family:var(--fonteCorpo);font-size: var(--fonteCorpoTamanho);">{{
                $t('paginaAdm.tempoTrabalhado') }}
                            </p>
                            <!-- <p class="w-[20%] flex items-center justify-center">Entrega</p> -->
                            <p class="w-[20%] flex items-center justify-center"
                                style="font-family:var(--fonteCorpo);font-size: var(--fonteCorpoTamanho);">{{
                $t('paginaAdm.aprovado') }}</p>
                            <p class="w-[20%] flex items-center justify-center"
                                style="font-family:var(--fonteCorpo);font-size: var(--fonteCorpoTamanho);">{{
                $t('paginaAdm.historico') }}</p>
                        </div>
                        <div v-for="tarefa of tarefas" class="w-[90%] text-sm">
                            <div v-if="tarefa.nome">
                                <div class="flex gap-8">
                                    <p class="w-[20%] truncate flex items-center justify-center h-10 bg-[#B488D7] cursor-pointer"
                                        @click="redirecionamento('/criaTarefa', tarefa.id)">{{ tarefa.nome }}</p>
                                    <!-- <p class="w-[20%] flex items-center justify-center h-10" v-if="tarefa.lider"
                                        :style="{ color: corDaFonte(tarefa.status.cor) }">
                                        {{
                            tarefa.lider }}</p>
                                    <p class="w-[20%] flex items-center justify-center h-10"
                                        :style="{ color: corDaFonte(tarefa.status.cor) }" v-else>Não possui</p> -->
                                    <!-- <p class="w-[20%] flex items-center justify-center h-10 bg-[#8A59B1]"
                                        :style="{ color: corDaFonte(tarefa.status.cor) }" v-if="tarefa.membros">{{
                            tarefa.membros.length }}</p>
                                    <p class="w-[20%] flex items-center justify-center h-10 bg-[#8A59B1]"
                                        :style="{ color: corDaFonte(tarefa.status.cor) }" v-else>Não
                                        possui</p> -->

                                    <p class="w-[20%] flex items-center justify-center h-10" v-if="tarefa.status"
                                        :style="{ 'background-color': '#' + tarefa.status.cor, color: corDaFonte(tarefa.status.cor)}">
                                        {{ tarefa.status.nome }}</p>
                                    <p class="w-[20%] flex items-center justify-center h-10 bg-[#93E28D]"
                                        style="font-family:var(--fonteCorpo);font-size: var(--fonteCorpoTamanho);"
                                        v-else>Não
                                        possui</p>
                                    <p class="w-[20%] flex items-center justify-center h-10 bg-[#93E28D]"
                                        style="font-family:var(--fonteCorpo);font-size: var(--fonteCorpoTamanho);"
                                        v-if="tarefa.tempoAtuacao">{{
                tarefa.tempoAtuacao }}</p>
                                    <p class="w-[20%] flex items-center justify-center h-10 bg-[#93E28D]"
                                        style="font-family:var(--fonteCorpo);font-size: var(--fonteCorpoTamanho);"
                                        v-else>Não
                                        possui</p>
                                    <!-- <p class="w-[20%] flex items-center justify-center h-10 bg-[#EF8F7A]"
                                        v-if="tarefa.diaCompleto">{{ format(new Date(tarefa.diaCompleto), "dd/MM/yyyy")
                                        }}</p>
                                    <p class="w-[20%] flex items-center justify-center h-10 bg-[#93E28D]" v-else>Não
                                        possui</p> -->
                                    <div class="w-[20%] flex items-center justify-center gap-10 h-10">
                                        <RejectedIcon class="w-[20%] h-[85%] cursor-pointer"
                                            @click="deixaTarefaConcluida(tarefa, 'Rejeitado')"></RejectedIcon>
                                        <AprovedIcon class="w-[20%] h-[60%] cursor-pointer"
                                            @click="deixaTarefaConcluida(tarefa, 'Aprovado')"></AprovedIcon>
                                    </div>
                                    <div class="w-[20%] flex items-center justify-center gap-10 h-10">
                                        <IconeHistorico @click="abrePopUp(tarefa, 'tarefa')" class="w-[20%] h-[85%] cursor-pointer">
                                        </IconeHistorico>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex relative w-full gap-4 pl-24 mt-16 h-[38%]">
            <div class="flex pl-12 flex-col justify-center w-[22%] h-[85%] border-r-2 border-black">
                <p style="font-family:var(--fonteCorpo);" class="text-2xl">{{ $t('paginaAdm.tarefas') }}</p>
                <p style="font-family:var(--fonteCorpo);">{{ $t('paginaAdm.total') }}: {{ totalDeTarefas }}</p>
                <p style="font-family:var(--fonteCorpo);">{{ $t('paginaAdm.emProgresso') }}: {{ totalEmProgresso }}</p>
                <p style="font-family:var(--fonteCorpo);">{{ $t('paginaAdm.prontas') }}: {{ totalProntas }}</p>
                <p style="font-family:var(--fonteCorpo);">{{ $t('paginaAdm.totalMinutosTrabalhados') }}: {{
                totalHorasTrabalhadas }}</p>
            </div>
            <div class="flex flex-col w-[5%] h-full items-center justify-center gap-4">
                <button @click="changeChart('bar')"
                    class="bg-[var(--roxoEscuro)] h-14 w-[3.5rem] rounded-xl flex justify-center items-center">
                    <img src="../../assets/GraficoBarraVertical.svg" />
                </button>
                <button @click="changeChart('horizontalBar')"
                    class="bg-[var(--roxoEscuro)] h-14 w-[3.5rem] rounded-xl flex justify-center items-center">
                    <img src="../../assets/GraficoHorizontal.svg" />
                </button>
                <button @click="changeChart('line')"
                    class="bg-[var(--roxoEscuro)] h-14 w-[3.5rem] rounded-xl flex justify-center items-center">
                    <img src="../../assets/GraficoDeLinha.svg" />
                </button>
            </div>
            <div class="flex flex-col h-[90%] w-[50%] justify-center">
                <canvas id="chart"></canvas>
            </div>
        </div>
        <div class="flex items-center justify-center">
            <!-- <div class="w-[80%] h-[30%] justify-center flex items-center">
                <Carousel :value="tarefas.value" :numVisible="3" containerClass="" contentClass="w-[100%] h-[100%]"
                    indicatorsContentClass="*:bg-gray-300 active:*:bg-roxo w-full" :showNavigators="true"
                    :showIndicators="true" verticalViewPortHeight="500px" :numScroll="3" :responsiveOptions="projetos">
                    <template #item="tarefa">
                        <div class="bg-orange-600">
                            <p>{{ tarefa.nome }}</p>
                        </div>
                    </template>
</Carousel>
</div> -->
        </div>
    </div>
    <HistoricoPopUp :texto-requisicao="textoRequisicao"
    :id="number.id" v-if="funcaoPopUp.variavelModal"></HistoricoPopUp>
</template>
<script setup>
import { format } from "date-fns";
import { ref, onMounted, computed } from 'vue'
import Chart from 'chart.js/auto'
let chart = null
import { conexaoBD } from "../../stores/conexaoBD.js";
import VueCookies from "vue-cookies";
import checkBox from "../../components/checkBox.vue";
import AprovedIcon from "../../assets/AprovadoAdm.vue";
import RejectedIcon from "../../assets/VoltaAdm.vue";
import IconeHistorico from "../../assets/Historico.vue";
import HistoricoPopUp from "../../components/HistoricoPopUp.vue";
import { funcaoPopUpStore } from "../../stores/funcaoPopUp";

let number = ref();
let textoRequisicao = ref('');

import router from '@/router';

import tinycolor from "tinycolor2";
import CheckBox from "../../components/checkBox.vue";
const funcaoPopUp = funcaoPopUpStore();
funcaoPopUp.variavelModal = false;

async function abrePopUp(objeto, tipo) {
    if(tipo == 'tarefa'){
        number.value = objeto;
        console.log(number.value.id)
        textoRequisicao.value = tipo;
        console.log(textoRequisicao.value)
        funcaoPopUp.abrePopUp()
    }else if(tipo == "projeto"){
        number.value = objeto;
        console.log(number.value.id)
        textoRequisicao.value = tipo;
        console.log(textoRequisicao.value)
    }
        
}

function corDaFonte(backgroundColor) {
    const isLight = tinycolor(backgroundColor).isLight();
    return isLight ? "#000" : "#fff";
}

function redirecionamento(local, id) {
    localStorage.removeItem('TarefaNaoFinalizada')
    VueCookies.set('idReloadTarefa', '0');
    VueCookies.set('IdTarefaCookies', id, 100000000)
    router.push(local)
}

async function deixaTarefaConcluida(tarefa, status) {
    banco.buscarTarefaProjeto(VueCookies.get('IdProjetoAtual'), '/projeto').then((projeto) => {
        let emProgresso = {}
        let pronto = {}
        console.log(projeto);
        projeto.statusList.forEach(status => {
            if (status.nome == 'Em Progresso') {
                emProgresso = status
            }
            if (status.nome == 'Pronto') {
                pronto = status
            }
        })
        if (status == 'Rejeitado') {
            tarefa.concluida = false
            tarefa.status = emProgresso
            banco.atualizar(tarefa, "/tarefa")
        }
        else {
            tarefa.concluida = true
            tarefa.status = pronto
            banco.atualizar(tarefa, "/tarefa")
        }
    })
}

const banco = conexaoBD();

let projeto = ref({})

async function pegaTarefasDoProjeto() {
    banco.buscarTarefaProjeto(VueCookies.get('IdProjetoAtual'), '/projeto').then((projeto) => {
        projeto.tarefas.forEach(tarefa => {
            if (tarefa.nome == null) {
                tarefa.nome = "Tarefa sem nome"
            }
        });
        projeto.value = projeto
        tarefas.value = projeto.tarefas
        console.log(tarefas.value);
    })
    renderChart('bar');
}

onMounted(() => {
    pegaTarefasDoProjeto()
    renderChart('bar')
    changeChart('bar')
})

let tarefas = ref([]);

function renderChart(type) {
    let options
    if (chart) {
        chart.destroy(); // Destruir o gráfico existente se existir
    }
    if (type == 'horizontalBar') {
        type = 'bar'
        options = {
            indexAxis: 'y',
            scales: {
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Minutos'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    } else {
        options = {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Minutos'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    }

    chart = new Chart(
        document.getElementById('chart'), {
        type: type,
        data: {
            labels: tarefas.value.map(tarefa => tarefa.nome),
            datasets: [{
                label: 'Minutos por Tarefa',
                data: tarefas.value.map(tarefa => separaOsMinutos(tarefa)),
                backgroundColor: tarefas.value.map((tarefa, index) => {
                    return tarefa.status === 'Pronta' ? 'rgba(54, 162, 235, 0.2)' : 'rgba(255, 99, 132, 0.2)';
                }),
                borderColor: tarefas.value.map((tarefa, index) => {
                    return tarefa.status === 'Pronta' ? 'rgba(54, 162, 235, 1)' : 'rgba(255, 99, 132, 1)';
                }),
                borderWidth: 1
            }]
        },
        options: options
    }
    );
}

function separaOsMinutos(tarefa) {
    const [horas, minutos, segundos] = tarefa.tempoAtuacao.split(':').map(Number);
    return minutos;
}
function changeChart(type) {
    renderChart(type)
}
let totalDeTarefas = computed(() => tarefas.value.length)
let totalEmProgresso = computed(() => tarefas.value.filter(tarefa => tarefa.status && tarefa.status.nome === 'Em Progresso').length)
let totalProntas = computed(() => tarefas.value.filter(tarefa => tarefa.status && tarefa.status.nome === 'Pronto').length)
let totalHorasTrabalhadas = computed(() => {
    if (tarefas) {
        return tarefas.value.reduce((acc, tarefa) => {
            if (tarefa.tempoAtuacao) {
                const [horas, minutos, segundos] = tarefa.tempoAtuacao.split(':').map(Number);
                return acc + minutos;
            } else {
                return 0
            }
        }, 0);
    } else {
        return 0
    }

});
</script>
<style scoped>
#poligono {
    clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
    background-color: var(--roxoEscuro);
}

#scrollbar::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 3px rgba(117, 117, 117, 0.3);
    width: 6px;
}

#scrollbar::-webkit-scrollbar {
    width: 8px;
}

#scrollbar::-webkit-scrollbar-thumb {
    width: 6px;
    -webkit-box-shadow: inset 0 0 3px rgba(117, 117, 117, 0.3);
}
</style>