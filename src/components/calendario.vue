<template>
    <div class="flex flex-col w-[full] h-[100%] items-center justify-end">
        <div class="flex flex-row">
            <button v-on:click="setaEsquerdaMes()">&lt</button>

            <button v-on:click="setaDireitaMes(data)">></button>

            <button v-on:click="abrePopUp()" class="text-[50px]"> {{ format(data, "MMMM", { locale: ptBR }).charAt(0).toUpperCase() +
                format(data, "MMMM", { locale: ptBR }).slice(1) }}</button>
            <div  class="h-[100px] w-[100px] bg-red-500 absolute">
                <button v-on:click="fechaPopUp()">X</button>
            </div>

            <select v-on:change="getCalendario()" v-model="data">
                <option :value="setMonth(data, 0)">Janeiro</option>
                <option :value="setMonth(data, 1)">Fevereiro</option>
                <option :value="setMonth(data, 2)">Março</option>
                <option :value="setMonth(data, 3)">Abril</option>
                <option :value="setMonth(data, 4)">Maio</option>
                <option :value="setMonth(data, 5)">Junho</option>
                <option :value="setMonth(data, 6)">Julho</option>
                <option :value="setMonth(data, 7)">Agosto</option>
                <option :value="setMonth(data, 8)">Setembro</option>
                <option :value="setMonth(data, 9)">Outubro</option>
                <option :value="setMonth(data, 10)">Novembro</option>
                <option :value="setMonth(data, 11)">Dezembro</option>
            </select>

            <h1 class="text-[50px]">{{ getYear(data) }}</h1>
        </div>
        <div class="h-full flex ">
            <div class="calendario">
                <div v-for="dia of calendario" class="dia">
                    <h1 v-if="getMonth(dia) == getMonth(data)" class="m-[10px]">{{ format(dia, 'd') }}</h1>
                    <h1 v-if="getMonth(dia) != getMonth(data)" class="m-[10px] text-[#9C9494]">{{ format(dia,
                        'd') }}
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
import { addDays, subDays, startOfMonth, endOfMonth, eachDayOfInterval, format, getMonth, setMonth, getYear } from 'date-fns';
import { ptBR } from 'date-fns/locale';


let data = Date.now()
let popUp = false
let calendario = ref();
getCalendario()


// Muda de acordo com o mes
function getCalendario() {
    console.log(data)
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

function setaEsquerdaMes() {
    data = setMonth(data, getMonth(data) - 1)
    getCalendario()

}

function setaDireitaMes() {
    data = setMonth(data, getMonth(data) + 1)
    getCalendario()
}
function abrePopUp() {
    
    popUp = true
    console.log(popUp)

}
function fechaPopUp() {
    popUp = false
}

</script>

<style scoped>
@import url(../assets/main.css);

@layer components {
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
        height: 683px;
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