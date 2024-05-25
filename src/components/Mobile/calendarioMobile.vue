<template>
    <div class="flex flex-col w-full h-full relative justify-start items-start overflow-y-scroll overflow-x-hidden">
        <div class="sticky top-0 h-[20%] w-full bg-[var(--backgroundItems)] flex justify-center z-10">
            <div class="flex flex-row w-full ">
                <div class="flex w-full">
                    <div class="w-[80%] h-full ml-[7%] flex flex-row items-center gap-4">
                        <button @click="setaEsquerda()" class="w-[5%]">
                            <div class="w-[23px] h-[23px] rounded-full border-[1px] flex justify-center items-center">
                                <div class="setaEsquerda"></div>
                            </div>
                        </button>
                        <div class="text-[160%] w-[45%] flex justify-center">
                            {{ format(new Date(data), "MMMM", {
                            locale: idioma
                        }).charAt(0).toUpperCase() +
                            format(new Date(data), "MMMM", { locale: idioma }).slice(1) }}
                        </div>
                        <button @click="setaDireita()" class="w-[5%]">
                            <div class="w-[23px] h-[23px] rounded-full border-[1px]  flex justify-center items-center">
                                <div class="setaDireita"></div>
                            </div>
                        </button>
                    </div>
                    <div class="w-[10%] flex justify-end items-center">
                        <h1 class="text-[5vw] ">{{ getYear(data) }}</h1>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-full h-[80%] flex flex-col items-start overflow-x-auto over">
            <div class=" pl-[1%] flex justify-end items-start">
                <div class="w-[24vw] flex justify-start">
                    <h1>{{$t('calendario.domingo')}}</h1>
                </div>
                <div class="w-[24vw] flex justify-start">
                    <h1>{{$t('calendario.segunda')}}</h1>
                </div>
                <div class="w-[24vw] flex justify-start">
                    <h1>{{$t('calendario.terca')}}</h1>
                </div>
                <div class="w-[24vw] flex justify-start">
                    <h1>{{$t('calendario.quarta')}}</h1>
                </div>
                <div class="w-[24vw] flex justify-start">
                    <h1>{{$t('calendario.quinta')}}</h1>
                </div>
                <div class="w-[24vw] flex justify-start">
                    <h1>{{$t('calendario.sexta')}}</h1>
                </div>
                <div class="w-[24vw] flex justify-start">
                    <h1>{{$t('calendario.sabado')}}</h1>
                </div>
            </div>
            <div class="h-full w-[30%] flex flex-col justify-start">
                <div class="calendario">
                    <div v-for="dia of calendario" v-bind="estilizaDia(dia)" :style="cardDia"
                        @dragover="retornaDiaEIndice(dia)" @mouseenter="hover(dia)" @mouseleave="getCalendario()">
                        <h1 v-if="getMonth(dia.dia) == getMonth(data)" class="m-[5%]">{{ format(new Date(dia.dia), 'd')
                            }}
                        </h1>
                        <h1 v-if="getMonth(dia.dia) != getMonth(data)" class="m-[5%] text-[#9C9494]">{{ format(new
                            Date(dia.dia), 'd') }}</h1>
                        <div :style="dia.style">
                            <div v-for="(tarefa, indice) of dia.listaDeTarefas.sort(sortBy('indice'))">
                                <div v-bind="verificaQauntidadetarefa(dia)" class="w-max flex flex-row h-full"
                                    @dragend="trocaDiaEIndice(tarefa, diaNovo, indiceNovo)"
                                    @dragover="retornaDiaEIndice(dia, indice)">
                                    <cardTarefaMobile :tarefa=tarefa.tarefa altura="1vh" largura="7vw" preset="2">
                                    </cardTarefaMobile>
                                </div>
                            </div>
                        </div>
                        <div class="w-full h-[20%] flex justify-center items-center">
                            <div class="w-[40%] h-[15%] bg-[var(--backgroundItemsClaros)] flex items-end"
                                v-if="dia.temTres == true"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import cardTarefas from '../cardTarefas.vue'
import { addDays, subDays, startOfMonth, endOfMonth, eachDayOfInterval, format, getMonth, setMonth, getYear, setYear, getWeekOfMonth, getDate } from 'date-fns';
import { ja, ru, zhCN, es, enUS, ptBR } from 'date-fns/locale';
import { conexaoBD } from '../../stores/conexaoBD';
import sortBy from 'sort-by'
import VueCookies from 'vue-cookies';
import cardTarefaMobile from '../Mobile/cardTarefaMobile.vue'
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
let idioma = ref();
let idiomaCookies = VueCookies.get('Idioma')
let data = Date.now()
let diaNovo = ref()
let indiceNovo = ref()
let calendario = ref();
let abrePopup = ref(false)
let api = conexaoBD()
let cardDia
let projeto = {}
let tarefas = []
let border = "none"

getCalendario();

onMounted(async () => {
    projeto = await api.buscarUm(VueCookies.get('IdProjetoAtual'), '/projeto')
    tarefas = projeto.tarefas;
    getCalendario();
    mudarIdioma();
})

function ordenaTarefas() {
    calendario.value.forEach(dia => {
        dia.listaDeTarefas.sort((tarefa, tarefa2) => {
            if (tarefa.tarefa.nome != null && tarefa2.tarefa.nome != null) {
                return tarefa.tarefa.indice[0].indice - tarefa2.tarefa.indice[0].indice
            }
        })
    })
}

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

function estilizaDia(dia) {
    if (getDate(dia.dia) == getDate(Date.now()) && getMonth(dia.dia) == getMonth(Date.now()) && getYear(dia.dia) == getYear(Date.now())) {
        border = "2px solid purple"
    }
    cardDia = {
        width: "100%",
        height: "100%",
        backgroundColor: "[var(--backgroundItemsClaros)]",
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
    ordenaTarefas()
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
    let tarefas2 = tarefas
    tarefas2 = tarefas2.sort(sortBy('indice'))
    for (const tarefa of tarefas2) {
        for (const propriedade of tarefa.valorPropriedadeTarefas) {
            if (propriedade.valor.valor != null && propriedade.propriedade.tipo == "DATA" && tarefa.nome != null) {
                if (format(new Date(propriedade.valor.valor), 'yyyy-MM-dd') == format(new Date(dia), 'yyyy-MM-dd')) {
                    let tarefaObjeto = {
                        tarefa: tarefa,
                        propriedade: propriedade
                    }
                    const tarefaDuplicada = lista.find((objeto) => objeto.tarefa == tarefaObjeto.tarefa)
                    if (tarefaDuplicada == null) {
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
            if (getDate(dia.dia) == getDate(Date.now()) && getMonth(dia.dia) == getMonth(Date.now()) && getYear(dia.dia) == getYear(Date.now())) {
                border = "1px solid purple"
                dia.style = {
                    height: "max-content",
                    width: "21.5vw",
                    display: "flex",
                    overflow: "hidden",
                    flexDirection: "column",
                    gap: "8px",
                    paddingBottom: "1%",
                    backgroundColor: "var(--backgroundItems)",
                    borderBottomLeftRadius: "10%",
                    borderBottomRightRadius: "10%",
                    zIndex: "0",
                    boxShadow: "0px 6px 6px rgb(145, 145, 145)",
                    border: border,
                    borderTop: "none"
                }
            } else {
                dia.style = {
                    height: "max-content",
                    width: "21.5vw",
                    display: "flex",
                    overflow: "hidden",
                    flexDirection: "column",
                    gap: "8px",
                    paddingBottom: "1%",
                    backgroundColor: "var(--backgroundItems)",
                    borderBottomLeftRadius: "10%",
                    borderBottomRightRadius: "10%",
                    zIndex: "0",
                    boxShadow: "0px 6px 6px rgb(145, 145, 145)",
                    border: border,
                    borderTop: "none"
                }
            }
            dia.temTres = false
        }
    }
    border = "none"
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
    console.log(dia.listaDeTarefas)
    tarefa.propriedade.valor.valor = format(new Date(dia.dia), "yyyy-MM-dd") + "T" + new Date(tarefa.propriedade.valor.valor).toLocaleTimeString()
    let indiceDaTarefaAtual = dia.listaDeTarefas.indexOf(tarefa)
    dia.listaDeTarefas.splice(indiceDaTarefaAtual, 1)
    dia.listaDeTarefas.splice(indice, 0, tarefa)
    console.log(dia.listaDeTarefas)
    onDragEnd(dia.listaDeTarefas)
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

function onDragEnd(tarefas) {
    console.log(tarefas)
    let tarefaPut = {}
    tarefas.forEach(async (tarefaAux, index) => {
        let tarefa = tarefaAux.tarefa
        if (tarefa.nome != null) {
            tarefa.indice[0].indice = tarefas.indexOf(tarefaAux)
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

</script>

<style scoped>
@import url(../../assets/main.css);

@layer components {

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
        grid-template-columns: repeat(7, 90%);
        justify-content: start;
        align-items: start;
        gap: 5%;
    }

    .setaEsquerda {
        width: 7px;
        height: 7px;
        border-left: 2px solid;
        border-bottom: 2px solid;
        border-radius: 10%;
        transform: rotate(45deg);
    }

    .setaDireita {
        width: 7px;
        height: 7px;
        border-right: 2px solid;
        border-top: 2px solid;
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