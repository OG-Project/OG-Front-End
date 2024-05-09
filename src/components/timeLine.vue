<template>
    <span class="overflow-y-scroll overflow-x-hidden items-center flex flex-col w-full h-[72%]">
        <div class="h-full w-[80%] flex flex-col justify-start">
            <div class="h-full flex flex-col w-full items-center">
                <span class="absolute flex items-start justify-center h-[30%] w-full top-0">
                    <div class=" w-[80%] h-[100%] flex flex-col items-center bg-[#FBFBFB]">
                        <div class="w-full h-full">
                            <div class="w-[100%] h-[50%] flex flex-row">
                                <div class="w-[70%] flex flex-row gap-4 text-[28px] items-start">
                                    <button @click="setaEsquerda()" class="h-full w-[10%]">
                                        <div
                                            class="w-[27px] h-[27px] rounded-full border-[1px] border-black flex justify-center items-center">

                                            <div class="setaEsquerda"></div>
                                        </div>
                                    </button>
                                    <div class="flex flex-row h-full items-center w-[35%]">
                                        <div>
                                            {{ format(data, "MMMM", {
                                        locale: ptBR
                                    }).charAt(0).toUpperCase() +
                                        format(data, "MMMM", { locale: ptBR }).slice(1) + ' ‎ ' }}
                                        </div>
                                        <div>
                                            {{ " de " + getYear(data) }}
                                        </div>
                                    </div>

                                    <button @click="setaDireita()" class="h-full w-[10%]">
                                        <div
                                            class="w-[27px] h-[27px] rounded-full border-[1px] border-black flex justify-center items-center">
                                            <div class="setaDireita"></div>
                                        </div>
                                    </button>
                                </div>
                                <div class="w-[50%] flex justify-end items-center text-[42px]">
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
                                <Carousel :value="calendario"
                                    :page="gerarDiaSelecionado((format(diaSelecionado.dia.value, 'dd') - 1))"
                                    :numVisible="20" circular class="w-[95%] h-[100%] flex justify-end">

                                    <template #item="dia">
                                        <div class="text-[24px]">
                                            <button v-if="getMonth(dia.data.dia) == getMonth(data)">
                                                <button @click="defineDiaSelecionado(dia.data.dia)">
                                                    <div class="h-full">
                                                        {{ format(dia.data.dia, 'dd') }}
                                                    </div>
                                                    <div class="bg-roxo w-full h-[3px]"
                                                        v-if="format(diaSelecionado.dia.value, 'yyyy/MM/dd') == format(dia.data.dia, 'yyyy/MM/dd')">

                                                    </div>
                                                </button>
                                            </button>
                                        </div>
                                    </template>
                                </Carousel>
                            </div>
                        </div>
                    </div>
                </span>
                <div class="linhaDoTempo ">

                    <div v-if="tipoDeIntervalo == 1" v-for="hora of diaSelecionado.listaDeHoras.value"
                        class=" h-[3.8%] flex gap-2" @dragover="retornaHoraEIndice(hora)">

                        <div :class="'colunaDeHoras h-[10vh] flex items-start justify-center rounded-none ' +
                                        (hora == '00:00' ? 'rounded-t-2xl' : hora == '23:00' ? 'rounded-b-2xl' : '')">
                            {{ hora }}
                        </div>


                        <div
                            class="w-full bg-gray-200 h-[90%] border-2 border-r-roxoEscuro border-l-roxoEscuro flex flex-row">
                            <div v-for="(tarefa, indice) of diaSelecionado.listaDeTarefas.value" class=" flex flex-row "
                                @dragover="retornaHoraEIndice(hora, indice)">
                                <div v-for="propriedade of listaDePropriedades">
                                    <div v-if="(format(new Date(propriedade.valor.valor), 'HH') + (':00')) == hora"
                                        class=" pl-[5%] pt-[5%]">
                                        <div class="mr-2">
                                            <cardTarefas :tarefa=tarefa altura="1vw" largura="7vw" preset="2">
                                            </cardTarefas>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="tipoDeIntervalo == 2" v-for="hora of diaSelecionado.listaDeHoras.value"
                        class=" h-[2%] flex gap-2" @dragover="retornaHoraEIndice(hora)">

                        <div :class="'colunaDeHoras h-[10vh] flex items-start justify-center rounded-none ' +
                                        (hora == '00:00' ? 'rounded-t-2xl' : hora == '23:30' ? 'rounded-b-2xl' : '')">
                            {{ hora }}
                        </div>
                        <div
                            class="w-full bg-gray-200 h-[90%] border-2 border-r-roxoEscuro border-l-roxoEscuro flex flex-row">
                            <div v-for="(tarefa, indice) of diaSelecionado.listaDeTarefas.value" class="flex flex-row"
                                @dragover="retornaHoraEIndice(hora, indice)">
                                <div v-for="propriedade of listaDePropriedades">
                                    <div v-if="(format(new Date(propriedade.valor.valor), 'HH') + (getMinutes(new Date(propriedade.valor.valor)) >= 30 ? ':30' : ':00')) == hora"
                                        class="pl-[5%] pt-[5%]">
                                        <div class="mr-2" @dragend="mudaHoraPropriedade(propriedade, tarefa)">
                                            <cardTarefas :tarefa=tarefa altura="1vw" largura="7vw" preset="2">
                                            </cardTarefas>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </span>
</template>

<script setup>
import { ref, VueElement, watch, onMounted } from 'vue';
import cardTarefas from './cardTarefas.vue'
import { subDays, startOfMonth, endOfMonth, eachDayOfInterval, format, getMonth, setMonth, getYear, setYear, setDate, getMinutes, setHours, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { conexaoBD } from '../stores/conexaoBD';
import Carousel from 'primevue/carousel';
import { Propriedade } from '../models/Propriedade';
import VueCookies from 'vue-cookies';



let horaAtual = ref()

defineHora()
let setaRef = ref(null)
let horaNova = ref()
let tipoDeIntervalo = ref(1)
let visualizacao = ref()
defineVizualizacao()
let diaSelecionado =
{
    dia: ref(new Date(Date.now())),
    listaDeHoras: ref([]),
    listaDeTarefas: ref([])
}
let data = Date.now()
let diaNovo = ref()
let calendario = ref();
let abrePopup = ref(false)
let api = conexaoBD()
let index = 0;
let indiceNovo = ref()
let listaDePropriedades = ref([])
let projeto = {}
let listaDeTarefasTeste = []
onMounted(async () => {
    projeto = await api.buscarUm(VueCookies.get("IdProjetoAtual"), "/projeto")
    listaDeTarefasTeste = projeto.tarefas
    getCalendario();
    adicionaNaLista();
    defineListaDeHoras()

})

watch(diaSelecionado.dia, (novoValor, valorAntigo) => {
    adicionaNaLista();
});

function retornaHoraEIndice(hora, indice) {
    horaNova = hora;
    if (indice != undefined) {
        indiceNovo = indice;
    }

}

function gerarDiaSelecionado(dia) {
    let ultimoDia = format(endOfMonth(diaSelecionado.dia.value), 'dd')
    if (dia > ultimoDia - 20) {
        return ultimoDia - 20
    }
    if (index == 0 && dia < 20) {
        dia = 0;
    }
    return dia
}

async function adicionaNaLista() {
    let lista = diaSelecionado.listaDeTarefas.value
    listaDeTarefasTeste.forEach(tarefa => {
        tarefa.valorPropriedadeTarefas.forEach(propriedade => {
            if (propriedade.propriedade.tipo == "DATA") {
                if (propriedade.valor.valor != "") {
                    const dataFormatada = format(new Date(propriedade.valor.valor), 'yyyy-MM-dd');
                    if (format(diaSelecionado.dia.value, 'yyyy-MM-dd') == dataFormatada) {
                        if(!lista.includes(tarefa)){
                            lista.push(tarefa)
                        }
                        if (!listaDePropriedades.value.includes(propriedade)) {
                            listaDePropriedades.value.push(propriedade)
                        }
                    }
                }
            }
        });
    });
    console.log(lista);
    diaSelecionado.listaDeTarefas.value = lista;
    console.log(diaSelecionado.listaDeTarefas.value)
    getCalendario()
};

function defineDiaSelecionado(dia) {
    diaSelecionado.dia.value = dia;
    getCalendario();
}

async function trocaHoraEIndice(tarefa, hora, indice) {
    console.log(dia.listaDeTarefas)
    tarefa.propriedade.valor.valor = format(new Date(tarefa.propriedade.valor.valor), "yyyy-MM-dd") + "T" + new Date(tarefa.propriedade.valor.valor).toLocaleTimeString()
    let indiceDaTarefaAtual = dia.listaDeTarefas.indexOf(tarefa)
    dia.listaDeTarefas.splice(indiceDaTarefaAtual, 1)
    dia.listaDeTarefas.splice(indice, 0, tarefa)
    console.log(dia.listaDeTarefas)
    onDragEnd(dia.listaDeTarefas)
}

async function mudaHoraPropriedade(propriedade, tarefa) {
    let textoTipo = "";
    let tarefaNova = {
        id: tarefa.id,
        nome: tarefa.nome,
        descricao: tarefa.descricao,
        dataCriacao: tarefa.dataCriacao,
        cor: tarefa.cor,
        valorPropriedadeTarefas: [],
        status: tarefa.status,
        comentarios: tarefa.comentarios

    }
    propriedade.valor.valor = format(new Date(propriedade.valor.valor), 'yyyy-MM-dd') + "T" + horaNova + ":00";
    if (propriedade.propriedade.tipo == "DATA") {
        tarefa.valorPropriedadeTarefas.forEach(propriedade => {

            let propriedadeNova = {
                id: propriedade.id,
                propriedade: {
                    nome: propriedade.propriedade.nome,
                    tipo: propriedade.propriedade.tipo
                },
                valor: {
                    id: propriedade.valor.id,
                    data: propriedade.valor.valor
                }
            }
            tarefaNova.valorPropriedadeTarefas.push(propriedadeNova)
        });
    }

    console.log(tarefa)
    console.log(await tarefaNova)
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
function retornaHora(hora) {
    horaNova = hora;
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


function setaEsquerda() {
    data = setMonth(data, getMonth(data) - 1)
    data = setDate(data, 1)
    diaSelecionado.dia.value = data
    getCalendario()

}

function setaDireita() {
    data = setMonth(data, getMonth(data) + 1)
    data = setDate(data, 1)
    diaSelecionado.dia.value = data
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

    .linhaDoTempo {
        width: 100%;
        max-height: min-content;
        margin-top: 17%;
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


}
</style>