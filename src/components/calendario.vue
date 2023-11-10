<template>
    <div class="flex flex-col w-full items-center">
        <input type="date" v-on:change="getCalendario()" v-model="data">
        <div class="calendario">
            <div v-for="dia of calendario" class="dia">
                <h1 class="m-[10px]">{{ format(dia, 'd') }}</h1>
                <div v-for="propriedade of tarefa.propriedades">
                    <div v-if="propriedade.nome == format(dia,'dd-MM-yyyy')">
                        <cardTarefas :tarefa=tarefa altura="27px" largura="133px" preset="2"></cardTarefas>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import cardTarefas from './cardTarefas.vue'
import { tarefa } from '../ObjetosTeste/tarefa.js'
import { addDays, subDays, startOfMonth, endOfMonth, eachDayOfInterval, format } from 'date-fns';

let data = Date.now()


let calendario = ref();
getCalendario()

// Muda de acordo com o mes
function getCalendario() {
    const d = new Date(data)
    const primeiroDiaDoMes = startOfMonth(new Date(d));
    const ultimoDiaDoMes = endOfMonth(new Date(d));
    const todosOsDiasDoMes = eachDayOfInterval({ start: primeiroDiaDoMes, end: ultimoDiaDoMes });

    let lista = []
    for (let i = primeiroDiaDoMes.getDay(); i > 0; i--) {
        lista.push(subDays(primeiroDiaDoMes, i))
    }

    let lista2 = []
    for (let i = 1; i < 7-ultimoDiaDoMes.getDay(); i++) {
        lista2.push(addDays(ultimoDiaDoMes, i))
    }
    calendario.value = [...lista, ...todosOsDiasDoMes, ...lista2]
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
        width: 1627px;
        height: 683px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 37px;
        justify-content: center;
    }
}
</style>