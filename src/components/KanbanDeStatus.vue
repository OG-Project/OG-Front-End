<template>
    <div class="w-min h-[40%] justify-start flex  gap-[5vw]">
        <div v-for="propriedade of lista" class="w-auto flex h-full">
            <div :style="propriedade.style">

                <div class="w-[80%] p-[1%] flex bg-white justify-center font-Poppins font-medium text-[1vw] rounded-md">
                    <div class="w-[90%] flex justify-center">
                        {{ propriedade.propriedade.nome }}
                    </div>
                    <div class="w-[10%]">
                        <img src="../assets/image 3.png">
                    </div>
                </div>
                <draggable class="min-h-[15px] min-w-full flex flex-col items-center justify-center"
                    v-model="propriedade.tarefas" :animation="300" group="tarefa" @start="drag = true"
                    @end="drag = false" item-key="tarefa.indice">
                    <template #item="{ element: tarefa }">
                        <div class="w-full h-full flex items-center justify-center">
                            <div class="w-[80%] pt-[2vh]" v-if="tarefa != null">
                                <CardTarefas :tarefa=tarefa preset="1"></cardTarefas>
                            </div>
                        </div>
                    </template>
                </draggable>
                <button class="flex justify-start w-[80%] pb-[2vh] pt-[2vh]"  @click="store.criaTarefa(), router.push('/criaTarefa')">
                    <p :style="corDoTexto(propriedade.propriedade)">+ Nova</p>
                </button>
            </div>
        </div>
        <span class="pr-4">

            <button class="novaPropriedade " @click="popUpStatus = true">
                {{ console.log(popUpStatus) }}
                <h1>+Novo</h1>
            </button>
        </span>
    </div>
    <div v-if="popUpStatus==true">
        <div class="flex justify-end">
            <img src="../imagem-vetores/triangulo.svg">
        </div>
        <div class="flex flex-row justify-between">
            <div class="pl-2">
                <Input largura="10" conteudoInput="Nome Propriedade" fontSize="1rem" altura="2"
                    v-model="nomeStatus"></Input>
            </div>
            <div class="pr-2">
                <ColorPicker v-model="corStatus" class="rounded-sm" />
            </div>

        </div>
        <div class="flex justify-between">
            <div class="pl-2 pt-2 pb-2">
                <Botao preset="Sair" tamanhoPadrao="pequeno" :funcaoClick="popUpStatus=false"></Botao>
            </div>
            <div class="pr-2 pt-2 pb-2">

                <Botao preset="Confirmar" tamanhoPadrao="pequeno" :funcaoClick="criaStatusBack">
                </Botao>
            </div>
        </div>
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

let api = conexaoBD()
let projetoApi = api.buscarUm(VueCookies.get("IdProjetoAtual"), "/projeto")
let lista = ref([]);
let listaStyle = ''
let store = criaTarefaEBuscaStore()
let popUpStatus = ref(false);
const propriedadeAtual = ref("STATUS");
const funcaoPopUp = funcaoPopUpStore()


onMounted(() => {
    cookies()
    defineListaDePropriedades()
})

watch(propriedadeAtual, async () => {
    await defineListaDePropriedades()
})

async function cookies() {
    let usuario = await api.procurar("/usuario/"+VueCookies.get("IdUsuarioCookie"))
}

function verificaCorTexto(status) {
    if (tinycolor(status.cor).isDark()) {
        return "white"
    } else {
        return "black"
    }
}

function corDoTexto(status) {
    console.log(status)
    return {
        color: verificaCorTexto(status)
    }
}

function fechaPopUp() {
    popUpStatus = false
}
async function defineListaDePropriedades() {
    let listaDePropriedades = []
    let projetoTeste = (await (projetoApi))
    if (propriedadeAtual.value == "STATUS") {
        console.log(projetoTeste)
        for (const status of projetoTeste.statusList) {
            let listaDeTarefas = []
            for (const tarefa of projetoTeste.tarefas) {
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
                    boxShadow: " 0px 5px 7px rgb(99, 99, 99)"
                }
            }
            tarefa2.tarefas.sort(sortBy('nome'))
            console.log(tarefa2.tarefas)
            listaDePropriedades.push(tarefa2)

        };
    }
    lista.value = []
    lista.value = listaDePropriedades
    listaDePropriedades = null;
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
    box-shadow: "0px 2px rgb(189, 189, 189)";
}

.novaPropriedade {
    @apply w-[15vw] h-[50%] bg-[#A79DB0] flex justify-center items-center text-[2vw] p-[3.2vw];
    box-shadow: 0px 5px 7px rgb(99, 99, 99);

}
</style>
