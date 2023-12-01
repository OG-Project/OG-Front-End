<template>
    <div class="divMaior">
        <div class="h-[80%] w-[18.6%] flex flex-col justify-start">
            <div class="flex flex-row w-[100%] h-full overflow-hidden	gap-[10%]">
                <div v-for="dia of calendario" class="dia" @dragover="retornaDia(dia.dia)" @mouseenter="hover(dia)"
                    @mouseleave="getCalendario()">
                    <h1 v-if="getMonth(dia.dia) == getMonth(data)" class="m-[7%]">{{ format(dia.dia, 'd') }}</h1>
                    <h1 v-else="getMonth(dia.dia) != getMonth(data)" class="m-[7%] text-[#9C9494]">{{ format(dia.dia, 'd')
                    }}
                    </h1>
                    <div :style="dia.style">
                        <div v-for="tarefa of tarefas">
                            <div v-for="propriedade of tarefa.valorPropriedadeTarefas">
                                <div v-if="propriedade.valor == format(dia.dia, 'yyyy-MM-dd')"
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
import { addDays, subDays, startOfMonth, endOfMonth, eachDayOfInterval, format, getMonth, setMonth, getYear, setYear, getWeekOfMonth, } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { conexaoBD } from '../stores/conexaoBD';


let data = Date.now()
let diaNovo = ref()
let calendario = ref();
let abrePopup = ref(false)
let api = conexaoBD()
api.procurar("/tarefa")
let tarefas = defineTarefas()

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
async function  defineTarefas(){
    tarefas = ref((await api.api).data)
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