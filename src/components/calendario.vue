<template>
    <div class="flex flex-col w-[full] h-[100%] items-center justify-end">
        <div class="flex flex-row">
            <Calendar v-model="mes"  view="month"/>

            <button v-on:click="abrePopUp()" class="text-[50px]"> {{ format(data, "MMMM", { locale: ptBR }).charAt(0).toUpperCase() +
                format(data, "MMMM", { locale: ptBR }).slice(1) }}</button>
            
            <h1 class="text-[50px]">{{ getYear(data) }}</h1>
        </div>
        <div class="h-full flex ">
            <div class="calendario">
                <div v-for="dia of calendario" class="dia">
                    <h1 v-if="getMonth(dia) == getMonth(data)" class="m-[10px]">{{ format(dia, 'd') }}</h1>
                    <h1 v-if="getMonth(dia) != getMonth(data)" class="m-[10px] text-[#9C9494]">{{ format(dia,'d') }}
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
import { ref,watch } from 'vue';
import cardTarefas from './cardTarefas.vue'
import { tarefas } from '../ObjetosTeste/tarefa.js'
import { addDays, subDays, startOfMonth, endOfMonth, eachDayOfInterval, format, getMonth, setMonth, getYear, setYear } from 'date-fns';
import { ptBR } from 'date-fns/locale';


let data = Date.now()
let mes = ref()
let calendario = ref();
watch(mes, (novoMes) => {
      getCalendario(novoMes);
    });

// Muda de acordo com o mes
function getCalendario(novoMes) {
       
    data = setMonth(data,getMonth(novoMes))
    data = setYear(data, getYear(novoMes))
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