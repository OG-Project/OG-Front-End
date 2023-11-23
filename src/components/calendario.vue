<template>
    <div class="divMaior">
        <div class="sticky top-0 h-[20%] w-full bg-[#FBFBFB]">
            <div class="flex flex-row w-full ">
                <div class="flex w-full">
                    <div class="w-[50%] ml-[7%]">
                        <button @click="abrePopUp()">
                            <svg width="46" height="50" viewBox="0 0 46 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M20 26H24V39M1 17H45M33 9V1M13 9V1M5 49H41C42.0609 49 43.0783 48.5786 43.8284 47.8284C44.5786 47.0783 45 46.0609 45 45V9C45 7.93913 44.5786 6.92172 43.8284 6.17157C43.0783 5.42143 42.0609 5 41 5H5C3.93913 5 2.92172 5.42143 2.17157 6.17157C1.42143 6.92172 1 7.93913 1 9V45C1 46.0609 1.42143 47.0783 2.17157 47.8284C2.92172 48.5786 3.93913 49 5 49Z"
                                    stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>

                        <button @click="abrePopUp()" class="text-[50px]"> {{ format(data, "MMMM", {
                            locale: ptBR
                        }).charAt(0).toUpperCase() +
                            format(data, "MMMM", { locale: ptBR }).slice(1) }}

                        </button>
                    </div>
                    <div class="w-[36.5%] flex justify-end">
                        <h1 class="text-[2.5vw] ">{{ getYear(data) }}</h1>
                    </div>
                </div>

                <div v-if="abrePopup == true" class="absolute w-[20%] flex justify-center h-[300px] ml-[5%] bg-roxoEscuro"
                    @mouseleave="fecharPopUp()">
                    <div class="w-full flex justify-end absolute">
                        <button @click="fechaPopUp()"
                            class="text-[2vw] flex text-white w-[15%] h-[100%] mr-[3%] items-start justify-end">X</button>
                    </div>

                    <div class="fundoPopup">
                        <div class="w-[100%] flex flex-row justify-center items-center bg-brancoNeve ">
                            <div class="w-full h-full flex justify-center items-center gap-[1%]">
                                <div class="w-[17px] h-[17px] rounded-full border-[1px] border-black flex justify-center items-center">
                                    <button @click="setaEsquerda()"><div class="setaEsquerda"></div></button>
                                </div>
                                <p>{{ getYear(data) }}</p>
                                <div class="w-[17px] h-[17px] rounded-full border-[1px] border-black flex justify-center items-center">
                                    <button @click="setaDireita()"><div  class="setaDireita"></div></button>
                                </div>
                            </div>
                        </div>
                        <div class="popUp">
                            <div class="w-[50%] flex flex-col pt-5 justify-center items-center text-[20px]">
                                <button @click="escolheMes(0)" class="border-b-2 w-[70%]">Janeiro</button>
                                <button @click="escolheMes(1)" class="border-b-2 w-[70%]">Fevereiro</button>
                                <button @click="escolheMes(2)" class="border-b-2 w-[70%]">Março</button>
                                <button @click="escolheMes(3)" class="border-b-2 w-[70%]">Abril</button>
                                <button @click="escolheMes(4)" class="border-b-2 w-[70%]">Maio</button>
                                <button @click="escolheMes(5)" class="border-b-2 w-[70%]">Junho</button>
                            </div>
                            <div class="w-[50%] flex flex-col  pt-5 justify-center items-center text-[20px]">
                                <button @click="escolheMes(6)" class="border-b-2 w-[70%]">Julho</button>
                                <button @click="escolheMes(7)" class="border-b-2 w-[70%]">Agosto</button>
                                <button @click="escolheMes(8)" class="border-b-2 w-[70%]">Setembro</button>
                                <button @click="escolheMes(9)" class="border-b-2 w-[70%]">Outubro</button>
                                <button @click="escolheMes(10)" class="border-b-2 w-[70%]">Novembro</button>
                                <button @click="escolheMes(11)" class="border-b-2 w-[70%]">Dezembro</button>
                            </div>
                        </div>
                    </div>
                </div>




            </div>
            <div class="w-[85%] ml-[7.1%] gap-[2.5%]  flex row justify-between">
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
        </div>
        <div class="h-[80%] w-[18.6%] flex flex-col justify-start">
            <div class="calendario">
                <div v-for="dia of calendario" class="dia" @dragover="retornaDia(dia.dia)" @mouseenter="hover(dia)"
                    @mouseleave="getCalendario()">
                    <h1 v-if="getMonth(dia.dia) == getMonth(data)" class="m-[7%]">{{ format(dia.dia, 'd') }}</h1>
                    <h1 v-else="getMonth(dia.dia) != getMonth(data)" class="m-[7%] text-[#9C9494]">{{ format(dia.dia, 'd')
                    }}
                    </h1>
                    <div :style="dia.style">
                        <div v-for="tarefa of tarefas">
                            <div v-for="propriedade of tarefa.propriedades">
                                <div v-if="propriedade.valor == format(dia.dia, 'dd/MM/yyyy')"
                                    v-bind="adicionaNaLista(tarefa, dia), verificaTarefasDoDia(dia)" class="pb-[4%] w-max"
                                    draggable="true" @dragend="trocaDia(propriedade, diaNovo)">
                                    <cardTarefas :tarefa=tarefa altura="1vw" largura="7vw" preset="2" ></cardTarefas>
                                </div>
                            </div>
                        </div>
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
import { tarefas } from '../ObjetosTeste/tarefa.js'
import { addDays, subDays, startOfMonth, endOfMonth, eachDayOfInterval, format, getMonth, setMonth, getYear, setYear, getWeekOfMonth, } from 'date-fns';
import { ptBR } from 'date-fns/locale';


let data = Date.now()
let diaNovo = ref()
let calendario = ref();
let abrePopup = ref(false)
getCalendario();


// Muda de acordo com o mes
function getCalendario() {
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
        dia.listaDeTarefas = 0
        let dia1 = {
            dia,
            listaDeTarefas: [],
            temTres: false,
            style: dia.style = {
                height: "45%",
                display: "flex",
                overflow: "hidden",
                flexDirection: "column",
                gap: "2%",
            }
        }
        listaDeDias.push(dia1)
    });
    calendario.value = listaDeDias;



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
            console.log(dia.style)
        }

    }
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
function fechaPopUp(e) {

    abrePopup.value = false

}
function escolheMes(numero) {
    data = setMonth(data, numero)
    fechaPopUp()
    getCalendario()
}
function trocaDia(propriedade, dia) {
    propriedade.valor = format(dia, "dd-MM-yyyy")
    getCalendario()

}
function retornaDia(dia) {
    diaNovo = dia;
}
function verificaTarefasDoDia(dia) {
    if (dia.listaDeTarefas.length >= 3) {
        dia.temTres = true
    } else if (dia.listaDeTarefas.length < 3) {
        dia.temTres = false
    }
}
function adicionaNaLista(tarefa, dia) {
    if (dia.listaDeTarefas.includes(tarefa)) {
    } else {
        dia.listaDeTarefas.push(tarefa)
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

    .dia {
        width: 100%;
        height: 100%;
        background-color: lightgray;
        border-radius: 10%;
        font-weight: 700;
        font-size: 1vw;
        box-shadow: 0px 3px 6px rgb(145, 145, 145);
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
    .setaEsquerda{
        width: 7px;
        height: 7px;
        border-left:2px solid black ;
        border-bottom:2px solid black ;
        border-radius: 10%;
        transform: rotate(45deg);
    }
    .setaDireita{
        width: 7px;
        height: 7px;
        border-right:2px solid black ;
        border-top:2px solid black ;
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