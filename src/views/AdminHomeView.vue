<template>
    <div class="h-[90vh] w-full">
        <div class="flex p-2 text-4xl justify-center">
            <h1>Lista de Tarefas</h1>
        </div>
        <div class="flex items-center relative justify-center mt-4 h-[38%] ml-16">
            <div id="poligono"
                class="h-[100%] w-[40vh] shadow-2xl flex justify-center flex-col left-10 absolute overflow-visible"
                style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; z-index: 5;">
            </div>
            <div class="bg-[var(--backgroundItems)] ml-12 w-[76%] h-[92%] flex items-center justify-end"
                style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px">
                <div class="overflow-y-auto h-[100%] w-[75%] flex items-center flex-col">
                    <div class="flex gap-12 mt-16 flex-wrap justify-center w-[70%] text-4xl">

                    </div>
                </div>
            </div>
        </div>
        <div class="flex items-center relative justify-center mt-4 h-[38%]">
            <div class="flex pl-12 flex-col justify-center w-[15%] h-[85%] border-r-2 border-black">
                <p class="text-2xl">Tarefas</p>
                <p>Total: {{ totalDeTarefas }}</p>
                <p>Em progresso: {{ totalEmProgresso }}</p>
                <p>Prontas: {{ totalProntas }}</p>
                <p>Horas trabalhadas: {{ totalHorasTrabalhadas }}</p>
            </div>
            <div class="flex flex-col w-[5%] h-full items-center justify-center gap-4">
                <button @click="changeChart('bar')" class="bg-[var(--roxoEscuro)] h-14 w-[3.5rem] rounded-xl flex justify-center items-center">
                    <img src="../assets/GraficoBarraVertical.svg" />
                </button>
                <button @click="changeChart('horizontalBar')" class="bg-[var(--roxoEscuro)] h-14 w-[3.5rem] rounded-xl flex justify-center items-center">
                    <img src="../assets/GraficoHorizontal.svg" />
                </button>
                <button @click="changeChart('line')" class="bg-[var(--roxoEscuro)] h-14 w-[3.5rem] rounded-xl flex justify-center items-center">
                    <img src="../assets/GraficoDeLinha.svg" />
                </button>
            </div>
            <div class="flex flex-col w-[60%] h-full">
                <canvas ref="chart" class="h-full"></canvas>
            </div>
        </div>
        <div class="flex items-center justify-center">
            <div class="w-[80%] h-[30%] justify-center flex items-center">
                <Carousel :value="tarefas.value" :numVisible="3" containerClass="" contentClass="w-[100%] h-[100%]"
                    indicatorsContentClass="*:bg-gray-300 active:*:bg-roxo w-full" :showNavigators="true"
                    :showIndicators="true" verticalViewPortHeight="500px" :numScroll="3" :responsiveOptions="projetos">
                    <template #item="tarefa">
                        <!-- {{ slotProps.index }} -->
                        <div class="bg-orange-600">
                            <p>{{ tarefa.nome }}</p>
                        </div>
                        <!-- {{ slotProps.index }} -->
                    </template>
                </Carousel>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import Chart from 'chart.js/auto'

let chart = null

onMounted(() => {
    renderChart('bar')
})

function renderChart(type) {
    const ctx = document.getElementById('chart').getContext('2d')
    if (chart) {
        chart.destroy()
    }
    chart = new Chart(ctx, {
        type: type,
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    })
}

function changeChart(type) {
    renderChart(type)
}

let tarefas = ref([
    { nome: 'Tarefa 1', horas: 2, status: 'Em progresso' },
    { nome: 'Tarefa 2', horas: 3, status: 'Pronta' },
    { nome: 'Tarefa 3', horas: 1, status: 'Pronta' },
    { nome: 'Tarefa 4', horas: 4, status: 'Em progresso' },
    { nome: 'Tarefa 5', horas: 2, status: 'Em progresso' },
    { nome: 'Tarefa 6', horas: 3, status: 'Pronta' },
    { nome: 'Tarefa 7', horas: 1, status: 'Pronta' },
    { nome: 'Tarefa 8', horas: 4, status: 'Em progresso' },
    { nome: 'Tarefa 9', horas: 2, status: 'Em progresso' },
    { nome: 'Tarefa 10', horas: 3, status: 'Pronta' },
    { nome: 'Tarefa 11', horas: 1, status: 'Pronta' },
    { nome: 'Tarefa 12', horas: 4, status: 'Em progresso' },
    { nome: 'Tarefa 13', horas: 2, status: 'Em progresso' },
    { nome: 'Tarefa 14', horas: 3, status: 'Pronta' },
    { nome: 'Tarefa 15', horas: 1, status: 'Pronta' },
    { nome: 'Tarefa 16', horas: 4, status: 'Em progresso' },
    { nome: 'Tarefa 17', horas: 2, status: 'Em progresso' },
    { nome: 'Tarefa 18', horas: 3, status: 'Pronta' },
    { nome: 'Tarefa 19', horas: 1, status: 'Pronta' },
    { nome: 'Tarefa 20', horas: 4, status: 'Em progresso' },

])

let totalDeTarefas = ref()
let totalEmProgresso = ref()
let totalProntas = ref()
let totalHorasTrabalhadas = ref()
</script>
<style scoped>
#poligono {
    clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
    background-color: var(--roxoEscuro);
}
</style>