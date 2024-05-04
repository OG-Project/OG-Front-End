<template>
    <div class="h-[92vh] w-full">
        <div class="flex p-2 text-4xl justify-center">
            <h1>Lista de Tarefas</h1>
        </div>
        <div class="flex items-center relative justify-center mt-4 h-[38%] ml-16">
            <div id="poligono"
                class="h-[100%] w-[40vh] shadow-2xl flex justify-center flex-col left-[-0.50rem] absolute overflow-visible"
                style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; z-index: 5;">
                <p class="flex justify-center items-center text-2xl">Tarefas do seu projeto</p>
            </div>
            <div class="bg-[var(--backgroundItems)] ml-8 w-[90%] h-[92%] flex items-center justify-end"
                style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px">
                <div class="overflow-y-auto h-[100%] w-[80%] flex items-center flex-col">
                    <div class="flex gap-12 mt-6 flex-wrap justify-center w-[100%] text-md">
                        <div class="flex gap-14 w-[80%] items-center justify-center">
                            <p class="w-[16%] flex items-center justify-center" >Nome da tarefa</p>
                            <p class="w-[16%] flex items-center justify-center" >Lider</p>
                            <p class="w-[16%] flex items-center justify-center" >Membros</p>
                            <p class="w-[16%] flex items-center justify-center" >Status</p>
                            <p class="w-[16%] flex items-center justify-center" >Tempo trabalhado</p>
                            <p class="w-[16%] flex items-center justify-center" >Entrega</p>
                        </div>
                        <div v-for="tarefa of tarefas" class="w-[80%] text-md">
                            <div class="flex gap-14">
                                <p class="w-[16%] truncate flex items-center justify-center h-8 bg-[#B488D7]" >{{ tarefa.nome }}</p>
                                <p class="w-[16%] flex items-center justify-center h-8" >{{ tarefa.lider }}</p>
                                <p class="w-[16%] flex items-center justify-center h-8 bg-[#8A59B1]" >{{ tarefa.membros.length }}</p>
                                <p class="w-[16%] flex items-center justify-center h-8 bg-[#C6B473]" v-if="tarefa.status == 'Em progresso'">{{ tarefa.status }}</p>
                                <p class="w-[16%] flex items-center justify-center h-8 bg-[#7CC0E5]" v-if="tarefa.status == 'Pronta'">{{ tarefa.status }}</p>
                                <p class="w-[16%] flex items-center justify-center h-8 bg-[#93E28D]" >{{ tarefa.horas }}</p>
                                <p class="w-[16%] flex items-center justify-center h-8 bg-[#EF8F7A]">{{ format(new Date(tarefa.diaCompleto), "dd/MM/yyyy") }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex items-center relative justify-center mt-16 h-[38%]">
            <div class="flex pl-12 flex-col justify-center w-[15%] h-[85%] border-r-2 border-black">
                <p class="text-2xl">Tarefas</p>
                <p>Total: {{ totalDeTarefas }}</p>
                <p>Em progresso: {{ totalEmProgresso }}</p>
                <p>Prontas: {{ totalProntas }}</p>
                <p>Horas trabalhadas: {{ totalHorasTrabalhadas }}</p>
            </div>
            <div class="flex flex-col w-[5%] h-full items-center justify-center gap-4">
                <button @click="changeChart('bar')"
                    class="bg-[var(--roxoEscuro)] h-14 w-[3.5rem] rounded-xl flex justify-center items-center">
                    <img src="../assets/GraficoBarraVertical.svg" />
                </button>
                <button @click="changeChart('horizontalBar')"
                    class="bg-[var(--roxoEscuro)] h-14 w-[3.5rem] rounded-xl flex justify-center items-center">
                    <img src="../assets/GraficoHorizontal.svg" />
                </button>
                <button @click="changeChart('line')"
                    class="bg-[var(--roxoEscuro)] h-14 w-[3.5rem] rounded-xl flex justify-center items-center">
                    <img src="../assets/GraficoDeLinha.svg" />
                </button>
            </div>
            <div class="flex flex-col w-[60%] h-[100%]">
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
</template>
<script setup>
import { format } from "date-fns";
import { ref, onMounted, computed } from 'vue'
import Chart from 'chart.js/auto'
let chart = null

async function getProjeto() {
    const response = await fetch('http://localhost:8082/projeto')
    const data = await response.json()
    console.log(data);
    tarefas.value = data.tarefas
    console.log(tarefas.value);
}

onMounted(() => {
    getProjeto()
    renderChart('line')
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
                        text: 'Horas'
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
                        text: 'Horas'
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
                label: 'Horas por Tarefa',
                data: tarefas.value.map(tarefa => tarefa.horas),
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

function changeChart(type) {
    renderChart(type)
}
//aqui é onde eu faço a contagem de tarefas, horas trabalhadas, tarefas em progresso e prontas
let totalDeTarefas = computed(() => tarefas.value.length)
let totalEmProgresso = computed(() => tarefas.value.filter(tarefa => tarefa.status === 'Em progresso').length)
let totalProntas = computed(() => tarefas.value.filter(tarefa => tarefa.status === 'Pronta').length)
let totalHorasTrabalhadas = computed(() => tarefas.value.reduce((acc, tarefa) => acc + tarefa.horas, 0))
</script>
<style scoped>
#poligono {
    clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
    background-color: var(--roxoEscuro);
}
</style>