<template>
    <div class="flex flex-col w-[full] h-[100%] items-center justify-end">
        <div class="flex flex-row w-full h-full">
            <div class="flex flex-row w-full h-full mt-[15%]">
                <div class="w-[40%] ml-[10%]">
                    <button @click="abrePopUp()" class="text-[50px]"> {{ format(data, "MMMM", {
                        locale: ptBR
                    }).charAt(0).toUpperCase() +
                        format(data, "MMMM", { locale: ptBR }).slice(1) }}</button>
                </div>
                <div class="w-[40%] flex justify-end ]">
                    <h1 class="text-[50px] ">{{ getYear(data) }}</h1>
                </div>
            </div>

            <div v-if="abrePopup == true" class="absolute">
                <button @click="fechaPopUp()">X</button>
                <button @click="setaEsquerda()">&lt</button>
                <button>{{ getYear(data) }}</button>
                <button @click="setaDireita()">></button>
                <div class="popUp">
                    <button v-on:click="escolheMes(0)">Janeiro</button>
                    <button v-on:click="escolheMes(1)">Fevereiro</button>
                    <button v-on:click="escolheMes(2)">Março</button>
                    <button v-on:click="escolheMes(3)">Abril</button>
                    <button v-on:click="escolheMes(4)">Maio</button>
                    <button v-on:click="escolheMes(5)">Junho</button>
                    <button v-on:click="escolheMes(6)">Julho</button>
                    <button v-on:click="escolheMes(7)">Agosto</button>
                    <button v-on:click="escolheMes(8)">Setembro</button>
                    <button v-on:click="escolheMes(9)">Outubro</button>
                    <button v-on:click="escolheMes(10)">Novembro</button>
                    <button v-on:click="escolheMes(11)">Dezembro</button>
                </div>
            </div>
            



        </div>
        <div class="w-[90%] flex row justify-around">
            <div class="w-[12,8%]">
                <h1>Domingo</h1>
            </div>
            <div class="w-[12,8%]">
                <h1>Segunda</h1>
            </div>
            <div class="w-[12,8%]">
                <h1>Terça</h1>
            </div>
            <div class="w-[12,8%]">
                <h1>Quarta</h1>
            </div>
            <div class="w-[12,8%]">
                <h1>Quinta</h1>
            </div>
            <div class="w-[12,8%]">
                <h1>Sexta</h1>
            </div>
            <div class="w-[12,8%]">
                <h1>Sábado</h1>
            </div>
        </div>
        <div class="h-full flex ">
            <div class="calendario">
                <div v-for="dia of calendario" class="dia">
                    <h1 v-if="getMonth(dia) == getMonth(data)" class="m-[10px]">{{ format(dia, 'd') }}</h1>
                    <h1 v-if="getMonth(dia) != getMonth(data)" class="m-[10px] text-[#9C9494]">{{ format(dia, 'd') }}
                    </h1>
                    <div v-for="tarefa of tarefas" v-if="tarefas.length < 3" class="h-[25%]">
                        <div v-for="propriedade of tarefa.propriedades">
                            <div v-if="propriedade.nome == format(dia, 'dd-MM-yyyy')">
                                <cardTarefas :tarefa=tarefa altura="27px" largura="133px" preset="2"></cardTarefas>
                            </div>
                        </div>
                    </div>

                    <div v-for="tarefa of tarefas" v-if="tarefas.length >= 3" class="h-[25%]">
                        <div v-for="propriedade of tarefa.propriedades">
                            <div v-if="propriedade.nome == format(dia, 'dd-MM-yyyy')">
                                <cardTarefas :tarefa=tarefa altura="27px" largura="133px" preset="2"></cardTarefas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import cardTarefas from './cardTarefas.vue'
import { tarefas } from '../ObjetosTeste/tarefa.js'
import { addDays, subDays, startOfMonth, endOfMonth, eachDayOfInterval, format, getMonth, setMonth, getYear, setYear } from 'date-fns';
import { da, ptBR } from 'date-fns/locale';


let data = Date.now()
let mes = ref()
let calendario = ref();
let abrePopup = ref(false)
getCalendario();


// Muda de acordo com o mes
function getCalendario() {
    console.log(abrePopup)
    const d = new Date(data)
    const primeiroDiaDoMes = startOfMonth(new Date(d));
    const ultimoDiaDoMes = endOfMonth(new Date(d));
    const todosOsDiasDoMes = eachDayOfInterval({ start: primeiroDiaDoMes, end: ultimoDiaDoMes });

    let lista = []
    for (let i = primeiroDiaDoMes.getDay(); i > 0; i--) {
        lista.push(subDays(primeiroDiaDoMes, i))
    }

    let lista2 = []
    for (let i = 1; i < 7 - ultimoDiaDoMes.getDay(); i++) {
        lista2.push(addDays(ultimoDiaDoMes, i))
    }
    calendario.value = [...lista, ...todosOsDiasDoMes, ...lista2]

}

function setaEsquerda() {
    data = setYear(data, getYear(data) - 1)
    getCalendario()

}

function setaDireita() {
    data = setYear(data, getYear(data) + 1)
    getCalendario()
}
function abrePopUp() {
    abrePopup.value = true

}
function fechaPopUp() {
    abrePopup.value = false
}
function escolheMes(numero) {
    data = setMonth(data, numero)
    getCalendario()
}

</script>

<style scoped>
@import url(../assets/main.css);

@layer components {
    .popUp {
        width: 400px;
        height: 400px;
        background-color: darkgray;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .dia {
        width: 200px;
        height: 150px;
        background-color: lightgray;
        display: flex;
        justify-content: baseline;
        flex-direction: column;
        border-radius: 10%;
        font-weight: 700;
        font-size: 20px;
    }

    .calendario {
        width: 1800px;
        height: 560px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 37px;
        justify-content: center;
        overflow-y: scroll;
    }

    select {
        appearance: none;
        text-decoration: none;
        outline: none;

        padding: 8px;
        flex-wrap: wrap;
        background-color: transparent;
        -webkit-appearance: none;
        -moz-appearance: none;

    }

}
</style>