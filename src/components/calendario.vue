<template>
    <div class="divMaior">
        <div class="sticky top-0 h-[20%] w-full bg-[#FBFBFB] flex justify-center z-10">
            <div class="flex flex-row w-full ">
                <div class="flex w-full">
                    <div class="w-[50%] h-full ml-[7%] flex flex-row items-center gap-4">
                        <button @click="setaEsquerda()" class="w-[5%]">
                            <div
                                class="w-[23px] h-[23px] rounded-full border-[1px] border-black flex justify-center items-center">

                                <div class="setaEsquerda"></div>

                            </div>
                        </button>
                        <div class="text-[28px] w-[17%]">
                            {{ format(new Date(data), "MMMM", {
                                locale: ptBR
                            }).charAt(0).toUpperCase() +
                                format(new Date(data), "MMMM", { locale: ptBR }).slice(1) }}
                        </div>
                        <button @click="setaDireita()" class="w-[5%]">
                            <div
                                class="w-[23px] h-[23px] rounded-full border-[1px] border-black flex justify-center items-center">
                                <div class="setaDireita"></div>
                            </div>
                        </button>
                    </div>
                    <div class="w-[36.5%] flex justify-end items-center">
                        <h1 class="text-[2.5vw] ">{{ getYear(data) }}</h1>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-[85%] gap-[2.5%]  flex row justify-between text-[20px]">
            <div class="w-[14%] flex justify-start">
                <h1>Domingo</h1>
            </div>
            <div class="w-[14%] flex justify-start">
                <h1>Segunda</h1>
            </div>
            <div class="w-[14%] flex justify-start">
                <h1>Terça</h1>
            </div>
            <div class="w-[14%] flex justify-start">
                <h1>Quarta</h1>
            </div>
            <div class="w-[14%] flex justify-start">
                <h1>Quinta</h1>
            </div>
            <div class="w-[14%] flex justify-start">
                <h1>Sexta</h1>
            </div>
            <div class="w-[14%] flex justify-start">
                <h1>Sábado</h1>
            </div>
        </div>
        <div class="h-[80%] w-[18.6%] flex flex-col justify-start">
            <div class="calendario">
                <div v-for="dia of calendario" v-bind="estilizaDia(dia)" :style="cardDia" @dragover="retornaDiaEIndice(dia)"
                    @mouseenter="hover(dia)" @mouseleave="getCalendario()">
                    <h1 v-if="getMonth(dia.dia) == getMonth(data)" class="m-[7%]">{{ format(new Date(dia.dia), 'd') }}</h1>
                    <h1 v-if="getMonth(dia.dia) != getMonth(data)" class="m-[7%] text-[#9C9494]">{{ format(new
                        Date(dia.dia), 'd') }}</h1>
                    <div :style="dia.style">
                        <div v-for="(tarefa, indice) of dia.listaDeTarefas">
                            <div v-bind="verificaQauntidadetarefa(dia)" class="w-max flex flex-row"
                                @dragend="trocaDiaEIndice(tarefa, diaNovo, indiceNovo)"
                                @dragover="retornaDiaEIndice(dia, indice)">
                                {{ indice }}
                                <cardTarefas :tarefa=tarefa.tarefa altura="1vw" largura="7vw" preset="2"></cardTarefas>
                            </div>
                        </div>
                    </div>
                    <div class="w-full h-[20%] flex justify-center items-center">
                        <div class="w-[40%] h-[15%] bg-gray-400 flex items-end" v-if="dia.temTres == true"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import cardTarefas from './cardTarefas.vue'
import { addDays, subDays, startOfMonth, endOfMonth, eachDayOfInterval, format, getMonth, setMonth, getYear, setYear, getWeekOfMonth, getDate } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { conexaoBD } from '../stores/conexaoBD';
import sortBy from 'sort-by'

let data = Date.now()
let diaNovo = ref()
let indiceNovo = ref()
let calendario = ref();
let abrePopup = ref(false)
let api = conexaoBD()
let cardDia
let tarefas = api.procurar("/tarefa")
let border = "none"

onMounted(() => {
    getCalendario();
})

function estilizaDia(dia) {
    if (getDate(dia.dia) == getDate(Date.now()) && getMonth(dia.dia) == getMonth(Date.now()) && getYear(dia.dia) == getYear(Date.now())) {
        border = "2px solid purple"
    }
    cardDia = {
        width: "100%",
        height: "100%",
        backgroundColor: "lightgray",
        borderRadius: "10%",
        fontWeight: "700",
        fontSize: "1vw",
        boxShadow: "0px 6px 6px rgb(145, 145, 145)",
        border: border
    }
    border = "none"
}
// Ta zerando o valor da lista de Tarefas por isso que não atualiza as tarefas do drag and drop 
// Muda de acordo com o mes
async function getCalendario() {
    calendario.value = []
    let listaDeDias = [];
    let dias;
    const d = new Date(data)
    const primeiroDiaDoMes = startOfMonth(new Date(d));
    const ultimoDiaDoMes = endOfMonth(new Date(d));
    const todosOsDiasDoMes = eachDayOfInterval({ start: primeiroDiaDoMes, end: ultimoDiaDoMes });

    let lista = []

    for (let i = primeiroDiaDoMes.getDay(); i > 0; i--) {
        lista.push(subDays(primeiroDiaDoMes, i))
    }

    let lista2 = []
    if (getWeekOfMonth(ultimoDiaDoMes) == 6) {
        for (let i = 1; i < 7 - ultimoDiaDoMes.getDay(); i++) {
            lista2.push(addDays(ultimoDiaDoMes, i))
        }
    } else {
        for (let i = 1; i < 14 - ultimoDiaDoMes.getDay(); i++) {
            lista2.push(addDays(ultimoDiaDoMes, i))
        }
    }
    dias = [...lista, ...todosOsDiasDoMes, ...lista2]
    listaDeDias = await adicionaDiasALista(dias)
    calendario.value = listaDeDias;
    listaDeDias = null
}

async function adicionaDiasALista(dias) {
    let listaDeDiasTemporaria = [];
    for (const dia of dias) {
        let lista = await verificaTarefasDoDia(dia)
        let dia1 = {
            dia: dia,
            listaDeTarefas: ref([]),
            temTres: false,
            style: dia.style = {
                height: "45%",
                display: "flex",
                overflow: "hidden",
                flexDirection: "column",
                gap: "12%",
                border: border
            }
        }
        dia1.listaDeTarefas = lista
        listaDeDiasTemporaria.push(dia1)
    }
    return listaDeDiasTemporaria;
}

async function verificaTarefasDoDia(dia) {
    let lista = []
    let tarefas2 = await tarefas
    tarefas2 = tarefas2.sort(sortBy('indice'))
    for (const tarefa of tarefas2) {
        for (const propriedade of tarefa.valorPropriedadeTarefas) {
            if (propriedade.valor.valor != null && propriedade.propriedade.tipo == "DATA") {
                if (format(new Date(propriedade.valor.valor), 'yyyy-MM-dd') == format(new Date(dia), 'yyyy-MM-dd')) {
                    let tarefaObjeto = {
                        tarefa: tarefa,
                        propriedade: propriedade
                    }
                    const tarefaDuplicada = lista.find((objeto)=>objeto==tarefaObjeto)
                    if(tarefaDuplicada==null){
                        lista.push(tarefaObjeto)
                    }
                }
            }
        };
    };
    return lista
}

function hover(dia) {
    if (dia != null) {
        if (dia.temTres) {
            dia.style = {
                height: "max-content",
                width: "11.5%",
                display: "flex",
                overflow: "hidden",
                flexDirection: "column",
                gap: "8px",
                position: "absolute",
                paddingBottom: "1%",
                backgroundColor: "lightgray",
                borderBottomLeftRadius: "10%",
                borderBottomRightRadius: "10%",
                zIndex: "0",
                boxShadow: "0px 6px 6px rgb(145, 145, 145)",
            }
            dia.temTres = false
        }
    }
}


function setaEsquerda() {
    data = setMonth(data, getMonth(data) - 1)
    getCalendario()

}

function setaDireita() {
    data = setMonth(data, getMonth(data) + 1)
    getCalendario()
}
async function trocaDiaEIndice(tarefa, dia, indice) {
    tarefa.propriedade.valor.valor = new Date(dia.dia)
    let indiceDaTarefaAtual = dia.listaDeTarefas.indexOf(tarefa)
    dia.listaDeTarefas.splice(indiceDaTarefaAtual, 1)
    dia.listaDeTarefas.splice(indice, 0, tarefa)
    for (const tarefa2 of dia.listaDeTarefas) {
        let indiceTeste = dia.listaDeTarefas.indexOf(tarefa2)
        tarefa2.tarefa.indice = indiceTeste
    }
    getCalendario()

}
function retornaDiaEIndice(dia, indice) {
    diaNovo = dia;
    if (indice != undefined) {
        indiceNovo = indice;
    }

}
function verificaQauntidadetarefa(dia) {
    if (dia.listaDeTarefas.length >= 3) {
        dia.temTres = true
    } else if (dia.listaDeTarefas.length < 3) {
        dia.temTres = false
    }
}

</script>

<style scoped>
@import url(../assets/main.css);

@layer components {
    .divMaior {
        display: flex;
        flex-direction: column;
        width: 90%;
        height: 72%;
        align-items: center;
        justify-content: center;
        background-color: #FBFBFB;
        clip-path: polygon(5% 0, 95% 0, 100% 9%, 100% 100%, 0 100%, 0 10%);
        overflow-y: scroll;
        overflow-x: hidden;
        position: relative;

    }

    .popUp {
        width: 100%;
        height: 85%;
        background-color: #FBFBFB;
        display: flex;
        flex-direction: row;

    }

    .fundoPopup {
        width: 95%;
        clip-path: polygon(25% 0, 75% 0, 100% 25%, 100% 100%, 0 100%, 0 25%);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .calendario {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-rows: repeat(6, 29%);
        grid-template-columns: repeat(7, 62%);
        justify-content: center;
        align-items: start;
        gap: 5%;
    }

    .setaEsquerda {
        width: 7px;
        height: 7px;
        border-left: 2px solid black;
        border-bottom: 2px solid black;
        border-radius: 10%;
        transform: rotate(45deg);
    }

    .setaDireita {
        width: 7px;
        height: 7px;
        border-right: 2px solid black;
        border-top: 2px solid black;
        border-radius: 10%;
        transform: rotate(45deg);
    }

    ::-webkit-scrollbar {
        width: 12px;
    }

    ::-webkit-scrollbar-button {
        display: none;
    }

    ::-webkit-scrollbar-track {
        height: 100vw;
        background-color: #D7D3DB;
    }

    ::-webkit-scrollbar-thumb {
        background-color: #888;
    }

    ::-webkit-scrollbar-corner {
        background-color: #D7D3DB;
    }


}
</style>1