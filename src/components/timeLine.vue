<template>
    <div class="divMaior">
        <div class="h-[80%] w-[80%] flex flex-col justify-start">
            <div class="flex flex-col  items-center">
                <div class="w-full h-full flex flex-row text-[64px]">
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

                <Carousel :value="calendario" :numVisible="20" :numScroll="1" 
                    circular class="w-[90%]">
                    <template #item="dia"  >
                        <div class="font-Poppins text-[24px]">
                            <button v-if="getMonth(dia.data.dia) == getMonth(data)" @click="diaSelecionado = dia.data.dia">
                                {{ format(dia.data.dia, 'd') }}
                            </button>
                        </div>
                    </template>
                </Carousel>
                <div>
                    {{ format(diaSelecionado,"hh:mm") }}
                </div>
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
</template>

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

let diaSelecionado
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
function trocaDia(propriedade, dia) {
    propriedade.valor = format(dia, "dd-MM-yyyy")
    getCalendario()

}
function retornaDia(dia) {
    diaNovo = dia;
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