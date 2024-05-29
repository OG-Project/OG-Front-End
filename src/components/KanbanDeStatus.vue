<template>
    <div class="w-min h-[25%] justify-start flex gap-[5vw]">
        {{ console.log(lista) }}
        <div v-for="status of lista" class="w-auto flex h-full">
            <div :style="status.style" @dragover="retornaStatusNovo(status.propriedade)">

                <div
                    class="w-[80%] p-[1%] flex bg-[var(--backgroundPuro)] justify-center font-Poppins font-medium text-[1vw] rounded-md">
                    <div class="w-full flex justify-center">
                        {{ status.propriedade.nome }}
                    </div>
                </div>
                <draggable class="min-h-[15px] min-w-full flex flex-col items-center justify-center"
                    v-model="status.tarefas" :animation="300" group="tarefa" @start="drag = true"
                    @end="() => mudaStatus(status)" item-key="tarefa.indice">
                    <template #item="{ element: tarefa }">
                        <div class="w-full h-full flex items-center justify-center"
                            @dragstart="(() => { tarefaDrag = tarefa })">
                            <div class="w-[80%] pt-[2vh]" v-if="tarefa != null && tarefa.nome != null">
                                <CardTarefas :tarefa=tarefa preset="1" v-on:deleta-tarefa="deletarTarefa($event)">
                                </cardTarefas>
                            </div>
                        </div>
                    </template>
                </draggable>
                <button class="flex justify-start w-[80%] pb-[2vh] pt-[2vh] select-none"
                    @click="store.criaTarefa(status.propriedade), VueCookies.set('idReloadTarefa', '0')">
                    <p :style="corDoTexto(status.propriedade)">+ {{ $t('criaProjeto.nova') }}</p>
                </button>
            </div>
        </div>
        <span class="pr-4 ">

            <button class="novaPropriedade" @click="abrePopUp()">
                <h1>+ {{ $t('hubProjeto.novo') }}</h1>
            </button>
            <div v-if="popUpStatus" class=" w-[100%] h-full flex justify-end">
                <div class="w-[100%] h-[80%] flex flex-col  justify-center  bg-[var(--backgroundItemsClaros)]">
                    <div class="h-[30%] w-full flex justify-end">
                        <img src="../imagemVetores/triangulo.svg">
                    </div>
                    <div class="flex flex-row justify-between">
                        <div class="pl-2">
                            <Input largura="8" conteudoInput="Nome do Status" fontSize="1rem" altura="2"
                                v-model="nomeStatus" @updateModelValue="(e) => { nomeStatus = e }"></Input>
                        </div>
                        <div class="pr-2">
                            <ColorPicker v-model="corStatus" class="rounded-sm" />
                        </div>

                    </div>
                    <div class="flex flex-col h-full">
                        <div class="flex justify-between h-[60%]">
                            <div class="pl-2 pt-2 pb-2">
                                <Botao preset="Sair" tamanhoPadrao="pequeno" :funcaoClick="fechaPopUp"></Botao>
                            </div>
                            <div class="pr-2 pt-2 pb-2">
                                <Botao preset="Confirmar" tamanhoPadrao="pequeno" :funcaoClick="criaStatusBack">
                                </Botao>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </span>
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import CardTarefas from './cardTarefas.vue';
import { conexaoBD } from '../stores/conexaoBD';
import VueCookies from "vue-cookies"
import draggable from "vuedraggable";
import sortBy from 'sort-by'
import { criaTarefaEBuscaStore } from '../stores/criaTarefaEBusca';
import Botao from '../components/Botao.vue'
import { funcaoPopUpStore } from '../stores/funcaoPopUp'
import ColorPicker from 'primevue/colorpicker';
import tinycolor from "tinycolor2";
import router from '@/router'
import Input from '../components/Input.vue';

let api = conexaoBD()
let projetoApi = api.buscarUm(VueCookies.get("IdProjetoAtual"), "/projeto")
let projeto = ref({})
let lista = ref([]);
let listaStyle = ''
let statusNovo = {}
let tarefaDrag = {}
let store = criaTarefaEBuscaStore()
let popUpStatus = ref(false);
let isFirstLoad = ref(true);
const propriedadeAtual = ref("STATUS");
const funcaoPopUp = funcaoPopUpStore()
let nomeStatus = ref("")
let corStatus = ref("")

const props = defineProps({
    listaTarefas: ref([])
})

onMounted(() => {
    cookies()
    defineListaDePropriedades().then(() => {
        ordenaTarefas()
    })
})

watch(() => props.listaTarefas, async () => {
    setTimeout(() => {
        defineListaDePropriedades().then(() => {
            ordenaTarefas()
        })
    }, 100)

});

watch(propriedadeAtual, async () => {
    await defineListaDePropriedades()
})

async function cookies() {
    let usuario = await api.procurar("/usuario/" + VueCookies.get("IdUsuarioCookie"))
}

function verificaCorTexto(status) {
    if (tinycolor(status.cor).isDark()) {
        return "white"
    } else {
        return "black"
    }
}

function fechaPopUp() {
    popUpStatus.value = false
}

function corDoTexto(status) {
    return {
        color: verificaCorTexto(status)
    }
}

function retornaStatusNovo(status) {
    statusNovo = status
    console.log(status);
}

function abrePopUp() {
    popUpStatus.value = true
}

function criaStatusBack() {
    console.log(nomeStatus.value);
    if (nomeStatus.value != "") {
        let statusCriado = {
            nome: nomeStatus.value,
            cor: corStatus.value
        }
        projeto.value.statusList.push(statusCriado)
        api.atualizar(projeto.value, "/projeto").then(() => {
            defineListaDePropriedades()
            fechaPopUp()
        })
    }
}

function deletarTarefa(id) {
    console.log(id)
    lista.value.forEach((status) => {
        status.tarefas.forEach((tarefa, index) => {
            if (tarefa.id == id) {
                status.tarefas.splice(index, 1)
            }
        })
    })
    api.deletarTarefa("/tarefa", id)
}

function mudaStatus() {
    let tarefaPut = {}
    for (const propriedade of lista.value) {
        propriedade.tarefas.forEach(async (tarefa, index) => {
            if (tarefa.nome != null) {
                if (tarefa.id == tarefaDrag.id) {
                    tarefa.status = statusNovo;
                }
                tarefa.indice[3].indice = propriedade.tarefas.indexOf(tarefa);
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
                        valorPropriedadeTarefaPut.valor = {
                            id: valorPropriedadeTarefaPut.valor.id,
                            numero: valorPropriedadeTarefaPut.valor.valor ?? null,
                            valor: valorPropriedadeTarefaPut.valor.valor ?? null,
                        }
                    } if (valorPropriedadeTarefaPut.propriedade.tipo == "SELECAO") {
                        valorPropriedadeTarefaPut.valor = {
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
                })
            }
        });
    }
    defineListaDePropriedades()
}


function ordenaTarefas() {
    for (const propriedade of lista.value) {
        propriedade.tarefas.sort((tarefa, tarefa2) => {
            if (tarefa.nome != null && tarefa2.nome != null) {
                return tarefa.indice[3].indice - tarefa2.indice[3].indice
            }
        })
    }

}

async function defineListaDePropriedades() {
    let listaDePropriedades = []
    projeto.value = (await (projetoApi))
    if (propriedadeAtual.value == "STATUS") {
        for (const status of projeto.value.statusList) {
            let listaDeTarefas = []
            for (const tarefa of props.listaTarefas) {
                if (tarefa.status != null && status.id == tarefa.status.id) {
                    listaDeTarefas.push(tarefa)
                }
            }
            let tarefa2 = {
                propriedade: status,
                tarefas: listaDeTarefas,
                style: listaStyle = {
                    width: "15vw",
                    height: "max-content",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    backgroundColor: ("#" + status.cor),
                    paddingTop: "5px",
                    boxShadow: " 0px 5px 7px #222222"
                }
            }
            listaDePropriedades.push(tarefa2)

        };
    }
    lista.value = []
    lista.value = listaDePropriedades
    listaDePropriedades = null;
    ordenaTarefas()
}
function verificaListaVaziaBoolean(tarefas) {
    if (tarefas, length == 0) {
        listaVaziaBoolean = true
    }
}
</script>

<style scoped lang="scss">
@import url(../assets/main.css);

.divMaior {
    @apply bg-brancoNeve;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 72%;
    align-items: center;
    justify-content: center;
    clip-path: polygon(5% 0, 95% 0, 100% 9%, 100% 100%, 0 100%, 0 10%);
    overflow-y: scroll;
    overflow-x: auto;
    position: relative;
    box-shadow: "0px 2px #222222";
}

.novaPropriedade {
    @apply w-[15vw] h-[50%] bg-[#A79DB0] flex justify-center items-center text-[2vw] p-[3.2vw] bg-[var(--backgroundItemsClaros)];
    box-shadow: 0px 5px 7px #222222;

}
</style>
