<template>
    <div class="divMaior">
        <div class="sticky top-0 h-[20%] w-full bg-[#FBFBFB] flex justify-center">
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
                <div v-for="dia of calendario" v-bind="estilizaDia(dia)" :style="cardDia" @dragover="retornaDia(dia.dia)"
                    @mouseenter="hover(dia)">
                    <h1 v-if="getMonth(dia.dia) == getMonth(data)" class="m-[7%]">{{ format(new Date(dia.dia), 'd') }}</h1>
                    <h1 v-else="getMonth(dia.dia) != getMonth(data)" class="m-[7%] text-[#9C9494]">{{ format(new
                        Date(dia.dia),
                        'd')
                    }}
                    </h1>
                    <div :style="dia.style">
                        <!-- <div v-for="tarefa of tarefas">
                            <div v-for="propriedade of tarefa.valorPropriedadeTarefas"> -->
                                {{ console.log(dia.listaDeTarefas) }}
                        <div v-for="tarefa of dia.listaDeTarefas.value">
                            <div v-bind="adicionaNaLista(tarefa, dia), verificaQauntidadetarefa(dia)"
                                class="pb-[4%] w-max" @dragend="trocaDia(propriedade, diaNovo)">
                                <cardTarefas :tarefa=tarefa altura="1vw" largura="7vw" preset="2"></cardTarefas>
                            </div>
                        </div>
                        <!-- </div>
                        </div> -->
                    </div>
                    <div class="w-full h-[20%] flex justify-center mt-[5%]">
                        <div v-if="dia.temTres == true" class="w-[40%] h-[15%] bg-gray-400 flex items-end"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import cardTarefas from './cardTarefas.vue'
import { addDays, subDays, startOfMonth, endOfMonth, eachDayOfInterval, format, getMonth, setMonth, getYear, setYear, getWeekOfMonth, getDate } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { conexaoBD } from '../stores/conexaoBD';


let data = Date.now()
let diaNovo = ref()
let calendario = ref();
let abrePopup = ref(false)
let api = conexaoBD()
let cardDia
let tarefasApi = api.procurar("/tarefa")
let tarefas = defineTarefas()
let border = "none"
getCalendario();


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
        boxShadow: "0px 3px 6px rgb(145, 145, 145)",
        border: border
    }
    border = "none"
}
// Muda de acordo com o mes
async function getCalendario() {
    let listaDeDias = [];
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
    calendario.value = [...lista, ...todosOsDiasDoMes, ...lista2]
    calendario.value.forEach(dia => {
        dia1.listaDeTarefas.value = null
        let lista = verificaTarefasDoDia(dia)
        let dia1 = {
            dia,
            listaDeTarefas: ref(lista),
            temTres: false,
            style: dia.style = {
                height: "45%",
                display: "flex",
                overflow: "hidden",
                flexDirection: "column",
                gap: "2%",
                border: border
            }
        }
        listaDeDias.push(dia1)
    });
    calendario = listaDeDias;

}
async function defineTarefas() {
    return tarefas = await (tarefasApi)

}
function verificaTarefasDoDia(dia) {
    let lista = []
    let tarefas
    (async () => {
       tarefas = await tarefasApi
       tarefas.forEach(tarefa => {
           tarefa.valorPropriedadeTarefas.forEach(propriedade => {
               if (propriedade.valor.valor != null && propriedade.propriedade.tipo == "DATA") {
                   if (format(new Date(propriedade.valor.valor), 'yyyy-MM-dd') == format(new Date(dia), 'yyyy-MM-dd')) {
                       lista.push(tarefa)
                   }
               }
           });
       });
    })()
    
    return lista
}

function hover(dia) {
    if (dia != null) {
        if (dia.temTres) {
            dia.style = {
                height: "max-content",
                width: "11.6%",
                display: "flex",
                overflow: "hidden",
                flexDirection: "column",
                gap: "2%",
                paddingBottom: "1%",
                backgroundColor: "lightgray",
                position: "absolute",
                borderBottomLeftRadius: "10%",
                borderBottomRightRadius: "10%",
                boxShadow: "0px 2px rgb(189, 189, 189)",

            }
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
function abrePopUp() {
    abrePopup.value = true

}
function fechaPopUp(e) {

    abrePopup.value = false

}
function escolheMes(numero) {
    data = setMonth(data, numero)
    fechaPopUp()
    getCalendario()
}
function trocaDia(propriedade, dia) {
    propriedade.valor.valor = format(new Date(dia), "dd-MM-yyyy")
    getCalendario()

}
function retornaDia(dia) {
    diaNovo = dia;
}
function verificaQauntidadetarefa(dia) {
    if (dia.listaDeTarefas.length >= 3) {
        dia.temTres = true
    } else if (dia.listaDeTarefas.length < 3) {
        dia.temTres = false
    }
}
function adicionaNaLista(tarefa, dia) {
    if (dia.listaDeTarefas.value.includes(tarefa)) {
    } else {
        dia.listaDeTarefas.value.push(tarefa)
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
</style>