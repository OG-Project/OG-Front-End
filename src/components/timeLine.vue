<template>
    <div class="divMaior">
        <div class="h-[95%] w-[80%] flex flex-col justify-start">
            <div class="h-full flex flex-col  items-center">
                <div class="fixed top-[14%] w-full h-[18%] flex flex-col items-center bg-[#FBFBFB]">
                    <div class="w-[72%] h-full ">
                        <div class="w-full h-[50%] flex flex-row text-[64px]">
                            <button class="w-[50%] flex flex-row" @click="abrePopUp()">
                                {{ format(data, "MMMM", {
                                    locale: ptBR
                                }).charAt(0).toUpperCase() +
                                    format(data, "MMMM", { locale: ptBR }).slice(1) }}
                            </button>
                            <div class="w-[50%] flex justify-end">
                                {{ horaAtual }}
                            </div>
                        </div>
                        <div class="flex justify-center w-full h-[50%]">
                            <div class="w-[20%] flex flex-col justify-end">
                                <button @click="mudaIntervalo()" class=" bg-gray-500 w-[60%] h-[40%]">
                                    {{ visualizacao }}
                                </button>
                                <div class="flex justify-center items-end ">
                                    <p>HH:mm</p>
                                </div>
                            </div>
                            <Carousel :value="calendario" :numVisible="20" :numScroll="1" circular
                                class="w-[95%] h-[100%] flex justify-end">
                                <template #item="dia">
                                    <div class="font-Poppins text-[24px]">
                                        <button v-if="getMonth(dia.data.dia) == getMonth(data)"
                                            @click="diaSelecionado.dia.value = dia.data.dia">
                                            {{ format(dia.data.dia, 'd') }}
                                        </button>
                                    </div>
                                </template>
                            </Carousel>
                        </div>
                    </div>
                    <!-- Começo do Popup -->
                    <div v-if="abrePopup == true" class="absolute w-full h-full flex justify-start">
                        <div class="absolute w-[20%] flex justify-center h-[300px] mt-[9%] ml-[10%] bg-roxoEscuro"
                            @mouseleave="fecharPopUp()">
                            <div class="w-full flex justify-end absolute">
                                <button @click="fechaPopUp()"
                                    class="text-[2vw] flex text-white w-[15%] h-[100%] mr-[3%] items-start justify-end">X</button>
                            </div>

                            <div class="fundoPopup">
                                <div class="w-[100%] flex flex-row justify-center items-center bg-brancoNeve ">
                                    <div class="w-full h-full flex justify-center items-center gap-[1%]">
                                        <div
                                            class="w-[17px] h-[17px] rounded-full border-[1px] border-black flex justify-center items-center">
                                            <button @click="setaEsquerda()">
                                                <div class="setaEsquerda"></div>
                                            </button>
                                        </div>
                                        <p>{{ getYear(data) }}</p>
                                        <div
                                            class="w-[17px] h-[17px] rounded-full border-[1px] border-black flex justify-center items-center">
                                            <button @click="setaDireita()">
                                                <div class="setaDireita"></div>
                                            </button>
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
                </div>
                <div class="w-full max-h-min mt-[11%]">

                    <div v-for="hora of diaSelecionado.listaDeHoras" class=" h-[4%] flex gap-2">

                        <div :class="'colunaDeHoras h-32 flex items-start justify-center rounded-none ' +
                            (hora == '00:00' ? 'rounded-t-2xl' : hora == '23:00' ? 'rounded-b-2xl' : '')">
                            {{ hora }}
                        </div>

                        <div class="w-full bg-gray-200 h-[90%] border-2 border-r-roxoEscuro border-l-roxoEscuro">

                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>aliza

<script setup>
import { ref, VueElement } from 'vue';
import cardTarefas from './cardTarefas.vue'
import { addDays, subDays, startOfMonth, endOfMonth, eachDayOfInterval, format, getMonth, setMonth, getYear, setYear, } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { conexaoBD } from '../stores/conexaoBD';
import Carousel from 'primevue/carousel';


let horaAtual = ref()

defineHora()

let setaRef = ref(null)
let tipoDeIntervalo = ref(1)
let visualizacao = ref()
defineVizualizacao()
let diaSelecionado =
{
    dia: ref(Date.now()),
    listaDeHoras: ref([])
}
defineListaDeHoras(diaSelecionado)
let data = Date.now()
let diaNovo = ref()
let calendario = ref();
let abrePopup = ref(false)
let api = conexaoBD()
api.procurar("/tarefa")
let tarefas = defineTarefas()
getCalendario();

function defineHora() {
    horaAtual.value = format(Date.now(), "HH:mm")
    setTimeout((() => defineHora()), 1000)
}
function teste(teste) {
    alert(teste)
}
function defineVizualizacao() {
    if (tipoDeIntervalo.value == 1) {
        visualizacao.value = "01:00"
    } else {
        visualizacao.value = "00:30"
    }
}
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

    calendario.value = todosOsDiasDoMes
    calendario.value.forEach(dia => {
        dia.listaDeTarefas = 0
        let dia1 = {
            dia,
            listaDeTarefas: [],
            temTres: false,
            style: dia.style = {

            }
        }
        listaDeDias.push(dia1)
    });
    calendario.value = listaDeDias;

}
async function defineTarefas() {
    tarefas = ref((await api.api).data)
}

function abrePopUp() {
    abrePopup.value = true

}
function fechaPopUp(e) {

    abrePopup.value = false

}

function setaEsquerda() {
    data = setYear(data, getYear(data) - 1)
    getCalendario()

}

function setaDireita() {
    data = setYear(data, getYear(data) + 1)
    getCalendario()
}

function escolheMes(numero) {
    data = setMonth(data, numero)
    fechaPopUp()
    getCalendario()
}


function defineListaDeHoras(dia) {
    let listaDeHoras2 = []
    let hora
    let numeroAuxiliar
    console.log(tipoDeIntervalo)
    if (tipoDeIntervalo.value == 1) {
        for (var i = 0; i < 24; i++) {
            if (i < 10) {
                numeroAuxiliar = "0" + i
            }
            hora = numeroAuxiliar + ":00"
            listaDeHoras2.push(hora)
        }
    } else {
        for (var i = 0; i < 24;) {
            numeroAuxiliar = " " + i

            if (numeroAuxiliar.includes(".5")) {

                if (i < 10 && numeroAuxiliar.includes(".5")) {
                    numeroAuxiliar = "0" + parseInt(i) + ":30"
                }else{
                    numeroAuxiliar =parseInt(i) + ":30"
                }   
            } else {

                if (i < 10 ) {
                    numeroAuxiliar = "0" + i + ":00"
                }else{
                    numeroAuxiliar =i + ":00"
                }   
            }
            hora = numeroAuxiliar
            listaDeHoras2.push(hora)

            i = i + (0.5)
        }
    }
    dia.listaDeHoras.value = listaDeHoras2


}
function mudaIntervalo() {
    if (tipoDeIntervalo.value == 1) {
        tipoDeIntervalo.value = 2
    } else {
        tipoDeIntervalo.value = 1
    }
    defineVizualizacao()
    defineListaDeHoras()
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

    .colunaDeHoras {
        @apply rounded-[1.7vh] w-[5%] max-h-min bg-gray-300 flex gap-[8vh]
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