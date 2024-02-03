<template>
    <div class="divMaior">
        <div class="h-[95%] w-[80%] flex flex-col justify-start">
            <div class="h-full flex flex-col  items-center">
                <div class="fixed top-[14%] w-[80%] h-[18%] flex flex-col items-center bg-[#FBFBFB]">
                    <div class="w-[89%] h-full ">
                        <div class="w-[100%] h-[50%] flex flex-row text-[64px]">
                            <button class="w-[70%] flex flex-row" @click="abrePopUp()">
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
                            <div class="w-[20%] flex flex-col justify-end items-center">
                                <button @click="mudaIntervalo()" class=" bg-gray-300 w-[90%] h-[60%] rounded-xl">
                                    {{ visualizacao }}
                                </button>
                                <div>
                                    <p>HH:mm</p>
                                </div>
                            </div>
                            <Carousel :value="calendario" :page="gerarDiaSelecionado(diaSelecionado.dia.value)" :numVisible="20" 
                                 circular class="w-[95%] h-[100%] flex justify-end" id="carrosel">
                                 
                                <template #item="dia">
                                    <div class="font-Poppins text-[24px]">
                                        <button v-if="getMonth(dia.data.dia) == getMonth(data)">
                                            <button @click="diaSelecionado.dia.value = dia.data.dia">
                                                <div v-if="format(diaSelecionado.dia.value, 'yyyy/MM/dd') == format(dia.data.dia, 'yyyy/MM/dd')"
                                                    class="riscoAbaixoDoDia">
                                                    {{ format(dia.data.dia, 'dd') }}
                                                </div>
                                                <div
                                                    v-if="format(diaSelecionado.dia.value, 'yyyy/MM/dd') != format(dia.data.dia, 'yyyy/MM/dd')">
                                                    {{ format(dia.data.dia, 'dd') }}
                                                </div>
                                            </button>
                                        </button>
                                    </div>
                                </template>
                            </Carousel>
                        </div>
                    </div>
                    <!-- Começo do Popup -->
                    <div v-if="abrePopup == true" class="absolute w-full h-full flex justify-start">
                        <div class="absolute w-full h-full z-0" @click="fecharPopUp()"></div>
                        <div class="absolute w-[20%] flex justify-center h-[300px] mt-[9%] ml-[10%] bg-roxoEscuro">
                            <div class="w-full flex justify-end absolute">
                                <button @click="fechaPopUp()"
                                    class="text-[2vw] flex text-white w-[15%] h-[100%] mr-[3%] items-start justify-end">X</button>
                            </div>

                            <div class="fundoPopup">
                                <div class="w-[100%] h-[20%] flex flex-row bg-brancoNeve ">
                                    <div class="w-full h-full flex justify-center items-center gap-[1%]">
                                        <button @click="setaEsquerda()" class="h-[30%]">
                                            <div
                                                class="w-[23px] h-[23px] rounded-full border-[1px] border-black flex justify-center items-center">

                                                <div class="setaEsquerda"></div>

                                            </div>
                                        </button>
                                        <div class="w-[25%] h-[50%]">
                                            <p class="text-3xl">{{ getYear(data) }}</p>
                                        </div>
                                        <button @click="setaDireita()" class="h-[30%]">
                                            <div
                                                class="w-[23px] h-[23px] rounded-full border-[1px] border-black flex justify-center items-center">
                                                <div class="setaDireita"></div>
                                            </div>
                                        </button>

                                    </div>
                                </div>
                                <div class="popUp">
                                    <div class="w-[50%] flex flex-col gap-[3px] justify-end items-center text-[20px]">
                                        <button @click="escolheMes(0)" class="border-b-2 w-[70%]">Janeiro</button>
                                        <button @click="escolheMes(1)" class="border-b-2 w-[70%]">Fevereiro</button>
                                        <button @click="escolheMes(2)" class="border-b-2 w-[70%]">Março</button>
                                        <button @click="escolheMes(3)" class="border-b-2 w-[70%]">Abril</button>
                                        <button @click="escolheMes(4)" class="border-b-2 w-[70%]">Maio</button>
                                        <button @click="escolheMes(5)" class="border-b-2 w-[70%]">Junho</button>
                                    </div>
                                    <div class="w-[50%] flex flex-col gap-[3px] justify-end items-center text-[20px]">
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

                    <div v-if="tipoDeIntervalo == 1" v-for="hora of diaSelecionado.listaDeHoras.value"
                        class=" h-[4%] flex gap-2">

                        <div :class="'colunaDeHoras h-[10vh] flex items-start justify-center rounded-none ' +
                            (hora == '00:00' ? 'rounded-t-2xl' : hora == '23:00' ? 'rounded-b-2xl' : '')">
                            {{ hora }}
                        </div>


                        <div
                            class="w-full bg-gray-200 h-[90%] border-2 border-r-roxoEscuro border-l-roxoEscuro flex flex-row">
                            <div v-for="tarefa of diaSelecionado.listaDeTarefas.value" class=" flex flex-row ">
                                <div v-for="propriedade of tarefa.valorPropriedadeTarefas">
                                    <div v-if="(format(new Date(propriedade.valor.valor), 'HH')+(':00'))==hora" class=" pl-[5%] pt-[5%]">
                                        <div class="mr-2">
                                            <cardTarefas :tarefa=tarefa altura="1vw" largura="7vw" preset="2"></cardTarefas>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div v-if="tipoDeIntervalo == 2" v-for="hora of diaSelecionado.listaDeHoras.value"
                        class=" h-[2%] flex gap-2">

                        <div :class="'colunaDeHoras h-[10vh] flex items-start justify-center rounded-none ' +
                            (hora == '00:00' ? 'rounded-t-2xl' : hora == '23:30' ? 'rounded-b-2xl' : '')">
                            {{ hora }}
                        </div>


                        <div
                            class="w-full bg-gray-200 h-[90%] border-2 border-r-roxoEscuro border-l-roxoEscuro flex flex-row">
                            <div v-for="tarefa of diaSelecionado.listaDeTarefas.value" class="w-0 flex flex-row gap-2">
                                <div v-for="propriedade of tarefa.valorPropriedadeTarefas">
                                    {{ console.log(getMinutes(new Date(propriedade.valor.valor))) }}
                                    <div v-if="(format(new Date(propriedade.valor.valor),'HH')+(getMinutes(new Date(propriedade.valor.valor)) >= 30 ? ':30' : ':00')) == hora"  class="pl-[5%] pt-[5%]">
                                        <div>
                                            <cardTarefas :tarefa=tarefa altura="1vw" largura="7vw" preset="2"></cardTarefas>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>aliza

<script setup>
import { ref, VueElement, watch } from 'vue';
import cardTarefas from './cardTarefas.vue'
import { addDays, subDays, startOfMonth, endOfMonth, eachDayOfInterval, format, getMonth, setMonth, getYear, setYear, getDate, getHours, parse, setDay, setDate, lastDayOfMonth, getMinutes } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { conexaoBD } from '../stores/conexaoBD';
import Carousel from 'primevue/carousel';
import { Propriedade } from '../models/Propriedade';



let horaAtual = ref()

defineHora()
let index = 0;
let setaRef = ref(null)
let tipoDeIntervalo = ref(1)
let visualizacao = ref()
defineVizualizacao()
let diaSelecionado =
{
    dia: ref(new Date(Date.now())),
    listaDeHoras: ref([]),
    listaDeTarefas: ref([])
}
defineListaDeHoras()
let data = Date.now()
let diaNovo = ref()
let calendario = ref();
let abrePopup = ref(false)
let api = conexaoBD()
api.procurar("/tarefa")
getCalendario();
adicionaNaLista();

watch(diaSelecionado.dia, (novoValor, valorAntigo) => {
    adicionaNaLista();
});

function gerarDiaSelecionado(dia){
     dia = format(diaSelecionado.dia.value, 'dd') - 1
    let ultimoDia = format(endOfMonth(diaSelecionado.dia.value), 'dd')
    if(dia > ultimoDia - 20){
        return ultimoDia -20
    }
    return dia
}

async function adicionaNaLista() {
    let api = conexaoBD()
    let listaDeTarefasTeste = api.procurar("/tarefa")
    let listaDeTarefasTeste2 = await listaDeTarefasTeste
    let lista = []
    let hora
    listaDeTarefasTeste2.forEach(tarefa => {
        tarefa.valorPropriedadeTarefas.forEach(propriedade => {
            const dataFormatada = format(new Date(propriedade.valor.valor), 'yyyy-MM-dd');
            if (format(diaSelecionado.dia.value, 'yyyy-MM-dd') == dataFormatada) {
                if (!lista.includes(tarefa)) {
                    lista.push(tarefa)
                }
            }
        });
    });
    diaSelecionado.listaDeTarefas.value = lista;
};

function verificaHora(propriedade){
    console.log(diaSelecionado.listaDeHoras.value[index])
    console.log(diaSelecionado.listaDeHoras.value[index])
    if(format(new Date(propriedade.valor.valor), 'HH:mm')>=diaSelecionado.listaDeHoras.value[index] && format(new Date(propriedade.valor.valor), 'HH:mm')<diaSelecionado.listaDeHoras.value[(index+1)]){
        return true;
    }
    index = index+1
    if(index>=23){
        index = 0;
    }
    return false;
}

function defineHora() {
    horaAtual.value = format(Date.now(), "HH:mm")
    setTimeout((() => defineHora()), 1000)
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
function escolheMes(numero) {
    data = setMonth(data, numero)
    data = setDate(data, 1)
    diaSelecionado.dia.value = data
    fechaPopUp()
    getCalendario()
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



function defineListaDeHoras() {
    let listaDeHoras2 = []
    let hora
    let numeroAuxiliar
    if (tipoDeIntervalo.value == 1) {
        for (var i = 0; i < 24; i++) {
            if (i < 10) {
                numeroAuxiliar = "0" + i
            } else {
                numeroAuxiliar = i
            }
            hora = numeroAuxiliar + ":00"
            listaDeHoras2.push(hora)
        }
    } else if (tipoDeIntervalo.value == 2) {
        for (var i = 0; i < 24;) {
            numeroAuxiliar = " " + i

            if (numeroAuxiliar.includes(".5")) {

                if (i < 10 && numeroAuxiliar.includes(".5")) {
                    numeroAuxiliar = "0" + parseInt(i) + ":30"
                } else {
                    numeroAuxiliar = parseInt(i) + ":30"
                }
            } else {

                if (i < 10) {
                    numeroAuxiliar = "0" + i + ":00"
                } else {
                    numeroAuxiliar = i + ":00"
                }
            }
            hora = numeroAuxiliar
            listaDeHoras2.push(hora)

            i = i + (0.5)
        }
    }
    diaSelecionado.listaDeHoras.value = listaDeHoras2


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
        height: 75%;
        background-color: #FBFBFB;
        display: flex;
        flex-direction: row;

    }

    .riscoAbaixoDoDia {
        width: 100%;
        border-bottom: 3px solid purple;
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
        width: 10px;
        height: 10px;
        border-left: 2px solid black;
        border-bottom: 2px solid black;
        border-radius: 10%;
        transform: rotate(45deg);
    }

    .setaDireita {
        width: 10px;
        height: 10px;
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


}</style>