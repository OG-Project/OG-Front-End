<template>
    <span class="overflow-y-scroll overflow-x-auto items-center flex flex-col w-full h-[72%]">
        <div class="h-full flex flex-col justify-start">
            <div class="h-full w-[100vw] flex flex-col items-start bg-[var(--backgroundItems)]">
                <span class="absolute flex items-start justify-center h-[25%] w-[100vw] top-0 bg-[var(--backgroundItems)]">
                    <div class=" w-[70%] h-[100%] flex flex-col items-center bg-[var(--backgroundItems)]">
                        <div class="w-full h-full">
                            <div class="w-[100%] h-[50%] flex flex-row">
                                <div class="w-[80%] flex flex-row gap-4 text-[160%] items-start ">
                                    <button @click="setaEsquerda()" class="h-full w-[5%]">
                                        <div
                                            class="w-[15px] h-[15px] rounded-full border-[1px] flex justify-center items-center">

                                            <div class="setaEsquerda"></div>
                                        </div>
                                    </button>
                                    <div class="flex flex-row h-full items-center justify-center w-[90%]">
                                        <div class="text-[80%]">
                                            {{ format(data, "MMMM", {
                                        locale: idioma
                                    }).charAt(0).toUpperCase() +
                                        format(data, "MMMM", { locale: idioma }).slice(1)}}
                                        {{  $t('timeline.de')+ " "  + getYear(data) }}
                                        </div>
                                    </div>

                                    <button @click="setaDireita()" class="h-full w-[5%] justify-end">
                                        <div
                                            class="w-[15px] h-[15px] rounded-full border-[1px] flex justify-center items-center">
                                            <div class="setaDireita"></div>
                                        </div>
                                    </button>
                                </div>
                                <div class="w-[30%] flex justify-end items-center text-[160%]">
                                    {{ horaAtual }}
                                </div>
                            </div>
                            <div class="flex justify-center w-full h-[50%]">
                                <div class="w-[20%] flex flex-col justify-end items-center">
                                    <button @click="mudaIntervalo()" class=" bg-[var(--backgroundItemsClaros)] w-[90%] h-[60%] rounded-xl">
                                        {{ visualizacao }}
                                    </button>
                                    <div>
                                        <p>HH:mm</p>
                                    </div>
                                </div>
                                <div class="w-full h-full flex justify-end items-end ">
                                    <Carousel :value="calendario"
                                        :page="gerarDiaSelecionado((format(diaSelecionado.dia.value, 'dd') - 1))"
                                        :numVisible="8" circular class="w-[95%] h-[50%] flex justify-center">
                                        <template #item="dia">
                                            <div class="text-[120%]">
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
                    </div>
                </span>
                <div class="linhaDoTempo ml-[7vw]">
                    <div v-if="tipoDeIntervalo == 1" v-for="hora of diaSelecionado.listaDeHoras.value"
                        class=" h-[10vh] flex gap-2 justify-start" @dragover="retornaHoraEIndice(hora)">
                        <div :class="'colunaDeHoras h-[10vh] flex items-start justify-center rounded-none ' +
                                        (hora == '00:00' ? 'rounded-t-2xl' : hora == '23:00' ? 'rounded-b-2xl' : '')">
                            {{ hora }}
                        </div>
                        <div
                            class="w-max min-w-[100vw] bg-[var(--backgroundItemsClaros)] h-[90%] border-2 border-y-0 border-r-roxoEscuro border-l-roxoEscuro flex flex-row overflow-x-auto ">
                            <div v-for="(tarefa, indice) of diaSelecionado.listaDeTarefas.value" class=" flex flex-row "
                                @dragover="retornaHoraEIndice(hora, indice)">
                                <div v-for="propriedade of tarefa.valorPropriedadeTarefas">
                                    <div v-if="propriedade.propriedade.tipo == 'DATA' && (format(new Date(propriedade.valor.valor), 'HH') + (':00')) == hora"
                                        class=" pl-[5%] pt-[5%]">
                                        <div class="mr-2" v-bind="tarefaAnterior = tarefa"
                                            @dragend="trocaHoraEIndice(tarefa, diaSelecionado, indiceNovo, propriedade, horaNova)">
                                            <cardTarefaMobile :tarefa=tarefa altura="1vw" largura="7vw" preset="2">
                                            </cardTarefaMobile>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="tipoDeIntervalo == 2" v-for="hora of diaSelecionado.listaDeHoras.value"
                        class=" h-[10vh] flex gap-2" @dragover="retornaHoraEIndice(hora)">

                        <div :class="'colunaDeHoras flex items-start justify-start rounded-none ' +
                                        (hora == '00:00' ? 'rounded-t-2xl' : hora == '23:30' ? 'rounded-b-2xl' : '')">
                            {{ hora }}
                        </div>
                        <div
                            class="w-[60vw] bg-[var(--backgroundItemsClaros)] h-[90%] border-2 border-y-0 border-r-roxoEscuro border-l-roxoEscuro flex flex-row">
                            <div v-for="(tarefa, indice) of diaSelecionado.listaDeTarefas.value" class="flex flex-row"
                                @dragover="retornaHoraEIndice(hora, indice)">
                                <div v-for="propriedade of tarefa.valorPropriedadeTarefas">
                                    <div v-if="propriedade.propriedade.tipo == 'DATA' && (format(new Date(propriedade.valor.valor), 'HH') + (getMinutes(new Date(propriedade.valor.valor)) >= 30 ? ':30' : ':00')) == hora"
                                        class="pl-[5%] pt-[5%]">
                                        <div class="mr-2"
                                            @dragend="trocaHoraEIndice(tarefa, horaNova, indiceNovo, propriedade, horaNova)"
                                            v-bind="tarefaAnterior = tarefa">
                                            <cardTarefaMobile :tarefa=tarefa altura="1vw" largura="7vw" preset="2">
                                            </cardTarefaMobile>
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
import cardTarefas from '../cardTarefas.vue'
import { subDays, startOfMonth, endOfMonth, eachDayOfInterval, format, getMonth, setMonth, getYear, setYear, setDate, getMinutes, setHours, parseISO } from 'date-fns';
import { ja, ru, zhCN, es, enUS, ptBR } from 'date-fns/locale';
import { conexaoBD } from '../../stores/conexaoBD';
import Carousel from 'primevue/carousel';
import { Propriedade } from '../../models/Propriedade';
import VueCookies from 'vue-cookies';
import cardTarefaMobile from './cardTarefaMobile.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

let horaAtual = ref()

defineHora()
let setaRef = ref(null)
let horaNova = ref()
let tipoDeIntervalo = ref(1)
let visualizacao = ref()
let idioma = ref();
let idiomaCookies = VueCookies.get('Idioma')
defineVizualizacao()
let diaSelecionado =
{
    dia: ref(funcao()),
    listaDeHoras: ref([]),
    listaDeTarefas: ref([])
}
let data = Date.now()
let diaNovo = ref()
let calendario = ref();
let abrePopup = ref(false)
let api = conexaoBD()
let tarefaAnterior = {}
let index = 0;
let indiceNovo = ref()
let listaDePropriedades = ref([])
let projeto = {}
let listaDeTarefasTeste = []
onMounted(async () => {
    projeto = await api.buscarUm(VueCookies.get("IdProjetoAtual"), "/projeto")
    listaDeTarefasTeste = projeto.tarefas
    getCalendario()
    adicionaNaLista().then(() => {
        ordenaTarefas()
    })
    defineListaDeHoras()
    mudarIdioma();
})

watch(diaSelecionado.dia, (novoValor, valorAntigo) => {
    adicionaNaLista();
});

function mudarIdioma(){
   if(idiomaCookies == 'jp'){
    idioma.value = ja 
   }
   if(idiomaCookies == 'en'){
    idioma.value = enUS 
   }
   if(idiomaCookies == 'pt-BR'){
    idioma.value = ptBR 
   }
   if(idiomaCookies == 'es'){
    idioma.value = es 
   }
   if(idiomaCookies == 'zh'){
    idioma.value = zhCN
   }
   if(idiomaCookies == 'ru'){
    idioma.value = ru
   }
}

function retornaHoraEIndice(hora, indice) {
    horaNova = hora;
    if (indice != undefined) {
        indiceNovo = indice;
    }

}

function funcao() {
    if (localStorage.getItem('diaSelecionado') != null) {
        let data = new Date(localStorage.getItem('diaSelecionado'))
        return data
    }
    return new Date(Date.now())
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
    let lista = []
    listaDeTarefasTeste.forEach(tarefa => {
        tarefa.valorPropriedadeTarefas.forEach(propriedade => {
            if (propriedade.propriedade.tipo == "DATA") {
                if (propriedade.valor.valor != "") {
                    const dataFormatada = format(new Date(propriedade.valor.valor), 'yyyy-MM-dd');
                    if (format(diaSelecionado.dia.value, 'yyyy-MM-dd') == dataFormatada) {
                        if (!lista.includes(tarefa)) {
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
    diaSelecionado.listaDeTarefas.value = lista;
    getCalendario()
};

function defineDiaSelecionado(dia) {
    diaSelecionado.dia.value = dia;
    localStorage.setItem('diaSelecionado', dia)
    getCalendario();
}

async function trocaHoraEIndice(tarefa, diaSelecionado, indice, propriedade, hora) {
    propriedade.valor.valor = format(new Date(propriedade.valor.valor), "yyyy-MM-dd") + "T" + hora
    let indiceDaTarefaAtual = diaSelecionado.listaDeTarefas.value.indexOf(tarefa)
    diaSelecionado.listaDeTarefas.value.splice(indiceDaTarefaAtual, 1)
    diaSelecionado.listaDeTarefas.value.splice(indice, 0, tarefa)
    onDragEnd(diaSelecionado.listaDeTarefas.value)
}

function onDragEnd(tarefas) {
    console.log(tarefas)
    let tarefaPut = {}
    tarefas.forEach(async (tarefa, index) => {
        if (tarefa.nome != null) {
            tarefa.indice[2].indice = tarefas.indexOf(tarefa)
            tarefaPut = {
                id: tarefa.id,
                nome: tarefa.nome,
                descricao: tarefa.descricao,
                status: tarefa.status,
                cor: tarefa.cor,
                status: tarefa.status,
                valorPropriedadeTarefas: [...tarefa.valorPropriedadeTarefas],
                comentarios: tarefa.comentarios,
                arquivos: tarefa.arquivos,
                indice: tarefa.indice,
            }
            for (let valorPropriedadeTarefaPut of tarefaPut.valorPropriedadeTarefas) {
                if (valorPropriedadeTarefaPut.propriedade.tipo == "TEXTO") {
                    valorPropriedadeTarefaPut.valor = {
                        id: valorPropriedadeTarefaPut.valor.id,
                        texto: valorPropriedadeTarefaPut.valor.valor ?? null,
                        valor: valorPropriedadeTarefaPut.valor.valor ?? null,
                    }
                } if (valorPropriedadeTarefaPut.propriedade.tipo == "DATA") {
                    valorPropriedadeTarefaPut.valor = {
                        id: valorPropriedadeTarefaPut.valor.id,
                        data: valorPropriedadeTarefaPut.valor.valor ?? null,
                        valor: valorPropriedadeTarefaPut.valor.valor ?? null,
                    }
                } if (valorPropriedadeTarefaPut.propriedade.tipo == "NUMERO") {
                    valorPropriedadeTarefaPutPut.valor = {
                        id: valorPropriedadeTarefaPut.valor.id,
                        numero: valorPropriedadeTarefaPut.valor.valor ?? null,
                        valor: valorPropriedadeTarefaPut.valor.valor ?? null,
                    }
                } if (valorPropriedadeTarefaPut.propriedade.tipo == "SELECAO") {
                    valorPropriedadeTarefaPutPut.valor = {
                        id: valorPropriedadeTarefaPut.valor.id,
                        valores: valorPropriedadeTarefaPut.valor.valor ?? null,
                        valor: valorPropriedadeTarefaPut.valor.valor ?? null,
                    }
                }
            }
            console.log(tarefaPut)
            await api.atualizar(tarefaPut, '/tarefa').then((response) => {
                console.log(response)
                tarefa = {
                    id: response.data.id,
                    nome: response.data.nome,
                    descricao: response.data.descricao,
                    status: response.data.status,
                    cor: response.data.cor,
                    status: response.data.status,
                    valorPropriedadeTarefas: response.data.valorPropriedadeTarefas,
                    comentarios: response.data.comentarios,
                    arquivos: response.data.arquivos,
                    indice: response.data.indice,
                }
                getCalendario()
                // for (let valorPropriedadeTarefaPut of tarefa.valorPropriedadeTarefas) {
                //   if (valorPropriedadeTarefaPut.propriedade.tipo == "TEXTO") {
                //     valorPropriedadeTarefaPut.valor = {
                //       id: valorPropriedadeTarefaPut.valor.id,
                //       valor: valorPropriedadeTarefaPut.valor.texto ?? null,
                //     }
                //   } if (valorPropriedadeTarefaPut.propriedade.tipo == "DATA") {
                //     valorPropriedadeTarefaPut.valor = {
                //       id: valorPropriedadeTarefaPut.valor.id,
                //       valor: valorPropriedadeTarefaPut.valor.data ?? null,

                //     }
                //   } if (valorPropriedadeTarefaPut.propriedade.tipo == "NUMERO") {
                //     valorPropriedadeTarefaPutPut.valor = {
                //       id: valorPropriedadeTarefaPut.valor.id,
                //       valor: valorPropriedadeTarefaPut.valor.numero ?? null,

                //     }
                //   } if (valorPropriedadeTarefaPut.propriedade.tipo == "SELECAO") {
                //     valorPropriedadeTarefaPutPut.valor = {
                //       id: valorPropriedadeTarefaPut.valor.id,
                //       valor: valorPropriedadeTarefaPut.valor.valores ?? null,

                //     }
                //   }
                // }
            })
        }
    })
}

function ordenaTarefas() {
    console.log(diaSelecionado);
    if (diaSelecionado.listaDeTarefas.value != null) {
        diaSelecionado.listaDeTarefas.value.sort((tarefa, tarefa2) => {
            if (tarefa.nome != null && tarefa2.nome != null) {
                return tarefa.indice[2].indice - tarefa2.indice[2].indice
            }
        })
    }
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
@import url(../../assets/main.css);

@layer components {

    .colunaDeHoras {
        @apply rounded-[1.7vh] w-[15vw] max-h-min bg-[var(--backgroundItemsClaros)] gap-[8vh]
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
        width: 5px;
        height: 5px;
        border-left: 2px solid ;
        border-bottom: 2px solid ;
        border-radius: 10%;
        transform: rotate(45deg);
    }

    .linhaDoTempo {
        width: 120vw;
        max-height: min-content;
        margin-top: 22vh;
    }

    .setaDireita {
        width: 5px;
        height: 5px;
        border-right: 2px solid ;
        border-top: 2px solid ;
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