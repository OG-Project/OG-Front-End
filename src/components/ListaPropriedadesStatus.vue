<template>
    <div class="bg-brancoNeve shadow-md  w-[80%]  max-h-[80vh] flex flex-col  pt-6 justify-end p-[2%] m-[3%] gap-10">
        <div v-if="opcaoSelecionadaNaTabela == 'propriedade' || opcaoSelecionadaNaTabela == ''" class="h-full">
            <div class="flex flex-row justify-between items-center border-b-2 border-b-roxo" @click="buscandoPor()">
                <p @click="navegaPelaTabela('propriedade')" class="bg-roxo-claro p-2">Propriedades</p>
                <p @click="navegaPelaTabela('status')" class="p-2">Status</p>
                <selectPadrao placeholder-select="Buscar por" v-model="buscarPor" :listaSelect="opcoesSelect"
                    styleSelect="styleSelectSemBordaBaixo" fonteTamanho="1rem"></selectPadrao>

            </div>
        </div>

        <div v-if="opcaoSelecionadaNaTabela == 'status'">
            <div class="flex flex-row justify-between items-center border-b-2 border-b-roxo" @click="buscandoPor()">
                <p @click="navegaPelaTabela('propriedade')" class="p-2">Propriedades</p>
                <p @click="navegaPelaTabela('status')" class="bg-roxo-claro p-2">Status</p>
                <selectPadrao placeholder-select="Buscar por" v-model="buscarPor" :listaSelect="opcoesSelect"
                    styleSelect="styleSelectSemBordaBaixo" fonteTamanho="1rem"></selectPadrao>
            </div>
        </div>

        <div class="scrollBar">
            <div v-if="opcaoSelecionadaNaTabela == 'propriedade' || opcaoSelecionadaNaTabela == ''">
                <div class="flex  flex-row items-center gap-4 h-[8vh]" v-for="propriedade of listaPropriedades"
                    v-if="listaSelecionada == '' || listaSelecionada == [] && buscarPor == 'Todos' || buscarPor == ''">

                    <p class="w-[33%]">{{ propriedade.nome }}</p>
                    <p class="w-[33%]">Tipo: {{ propriedade.tipo }}</p>
                    <div class="bg-roxo-claro rounded-md p-1 w-[50%]">
                        Tarefas Atribuidas
                    </div>
                </div>
                <div class="flex  flex-row items-center gap-4 h-[8vh]" v-for="propriedade of listaSelecionada"
                    v-if="listaSelecionada != []">
                    <p class="w-[33%]">{{ propriedade.nome }}</p>
                    <p class="w-[33%]">Tipo: {{ propriedade.tipo }}</p>
                    <div class="bg-roxo-claro rounded-md p-1 w-[50%]">
                        Tarefas Atribuidas
                    </div>
                </div>
            </div>
            <div v-if="opcaoSelecionadaNaTabela == 'status'">
                <div class="flex  flex-row items-center gap-4 h-[8vh]" v-for="status of listaSelecionada">
                    <p class="w-[33%] truncate " @mouseenter="startTimer" @mouseleave="clearTimer" v-if="verNomeCompleto==false">{{ status.nome }}</p>
                    <ColorPicker v-model="status.cor" @hide="criaStatusCookies()"></ColorPicker>
                    <div class="bg-roxo-claro rounded-md p-1 w-[50%]">
                        Tarefas Atribuidas
                    </div>
                </div>

            </div>

        </div>
        <div class="w-full flex flex-row justify-end gap-3 sticky" @click="funcaoPopUp.abrePopUp"
            v-if="funcaoPopUp.variavelModal == false">
            <p>Nova</p>
            <img src="../imagem-vetores/sinalDeMaisIcon.svg">
        </div>

        <div v-if="funcaoPopUp.variavelModal == true" class=" h-full  flex flex-row  justify-end">

            <div class="animation" v-if="opcaoSelecionadaNaTabela == 'propriedade' || opcaoSelecionadaNaTabela == ''">
                <div class="flex justify-end">
                    <img src="../imagem-vetores/triangulo.svg">
                </div>
                <div class="flex flex-row justify-between">
                    <div class="pl-2">
                        <Input largura="10" conteudoInput="Nome Propriedade" fontSize="1rem" altura="2"
                            v-model="nomePropriedade"></Input>
                    </div>
                    <div class="pr-2">
                        <selectPadrao placeholderSelect="Tipo" :lista-select="['Texto', 'Data', 'Numero', 'Seleção']"
                            largura="5" altura="3.8" fonteTamanho="1rem" v-model="tipoPropriedade"> </selectPadrao>
                    </div>

                </div>
                <div class="flex felx-row justify-between">
                    <div class="pl-2 pt-2 pb-2">
                        <Botao preset="Sair" tamanhoPadrao="pequeno" :funcaoClick="funcaoPopUp.fechaPopUp"></Botao>
                    </div>
                    <div class="pr-2 pt-2 pb-2">

                        <Botao preset="Confirmar" tamanhoPadrao="pequeno" :funcaoClick="criaPropriedadeCookies">
                        </Botao>
                    </div>
                </div>

            </div>

            <div class="animation" v-if="opcaoSelecionadaNaTabela == 'status'">
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
                <div class="flex felx-row justify-between">
                    <div class="pl-2 pt-2 pb-2">
                        <Botao preset="Sair" tamanhoPadrao="pequeno" :funcaoClick="funcaoPopUp.fechaPopUp"></Botao>
                    </div>
                    <div class="pr-2 pt-2 pb-2">

                        <Botao preset="Confirmar" tamanhoPadrao="pequeno" :funcaoClick="criaStatusCookies">
                        </Botao>
                    </div>
                </div>

            </div>

        </div>
    </div>
</template>

<script setup>
import { onMounted, onUpdated, ref, defineEmits } from 'vue';
import selectPadrao from "../components/selectPadrao.vue"
import Botao from "../components/Botao.vue"
import Input from "../components/Input.vue"
import VueCookies from 'vue-cookies';
import { funcaoPopUpStore } from '../stores/funcaoPopUp';
import { Propriedade } from '../models/Propriedade'
import { getCurrentInstance } from 'vue';
import ColorPicker from 'primevue/colorpicker';
import sortBy from 'sort-by'
const instance = getCurrentInstance();
let opcoesSelect = ref([]);
let opcaoSelecionadaNaTabela = ref("");
let buscarPor = ref("");
var listaPropriedades = ref([]);
var listaStatus = ref([]);
let listaSelecionada = ref([]);
let nomePropriedade = ref("");
let nomeStatus = ref("");
let tipoPropriedade = ref("");
let AuxParaCriarPropriedades = [];
let AuxParaCriarStatus = [];
let corStatus = ref("")
const funcaoPopUp = funcaoPopUpStore()
let timeoutId = null;
let verNomeCompleto = ref(Boolean);

onMounted(() => {
    buscaPropriedadeCookies();
    buscarStatusCookies();
    navegaPelaTabela("");
    funcaoPopUp.variavelModal = false
    verNomeCompleto=false;
}
)

async function buscandoPor() {
    listaSelecionada.value = []
    if (opcaoSelecionadaNaTabela.value == "propriedade" || opcaoSelecionadaNaTabela.value == "") {
        if (this.buscarPor == "") {
            return;
        }
        return listaSelecionada.value = filtroPropriedades(listaPropriedades, this.buscarPor);
    }
    if (opcaoSelecionadaNaTabela.value == "status") {
        if (this.buscarPor == "A-Z" || this.buscarPor == "") {
            return listaSelecionada.value = filtroStatus("A-Z");
        }
        return listaSelecionada.value = filtroStatus("Z-A");
    }
}

function filtroStatus(ordem) {

    let listaOrdenadaPorNome = []
    AuxParaCriarStatus.forEach((statusAtual) => {
        listaOrdenadaPorNome.push(statusAtual.nome)
    });

    if (ordem == "Z-A") {
        return AuxParaCriarStatus.sort((a, b) => {
            let itemA = a.nome.toLowerCase();
            let itemB = b.nome.toLowerCase();

            if (itemA < itemB) {
                return 1; // Retorna 1 para indicar que o itemA deve vir depois do itemB
            }
            if (itemA > itemB) {
                return -1; // Retorna -1 para indicar que o itemA deve vir antes do itemB
            }
            return 0;
        });

    }
    return AuxParaCriarStatus.sort(sortBy('nome'));
}

function filtroPropriedades(listaRecebida, buscarPor) {
    var listaAux = []
    var listaAux1 = []
    listaAux = listaRecebida.value
    listaAux.forEach(opcaoAtual => {
        if (opcaoAtual.tipo != "") {
            if (opcaoAtual.tipo.toLowerCase() == buscarPor.toLowerCase()) {
                listaAux1.push(opcaoAtual)
            }
        }
    });
    console.log(listaAux1)
    return listaAux1;
}

function navegaPelaTabela(opcaoSelecionada) {
    if (opcaoSelecionada == '' || opcaoSelecionada == 'propriedade') {
        if (opcaoSelecionada == 'propriedade') {
            this.opcaoSelecionadaNaTabela = 'propriedade';
        }
        opcoesSelect.value = ["Todos", "Data", "Numero", "Seleção", "Texto"];
        console.log("Eita: " + opcoesSelect.value)
    } else if (opcaoSelecionada == 'status') {
        this.opcaoSelecionadaNaTabela = 'status';
        opcoesSelect.value = ["A-Z", "Z-A"]
    }
}

function buscaPropriedadeCookies() {
    const propriedadeArmazenada = VueCookies.get("propriedadeCookie");
    if (propriedadeArmazenada == null) {
        return;
    }
    listaPropriedades.value = propriedadeArmazenada
    AuxParaCriarPropriedades = propriedadeArmazenada
}

function criaPropriedadeCookies() {

    let propriedadeCriada = {
        nome: nomePropriedade.value,
        tipo: tipoPropriedade.value.toUpperCase()
    }
    AuxParaCriarPropriedades.push(propriedadeCriada)
    VueCookies.set("propriedadeCookie", AuxParaCriarPropriedades, 864000000)
    listaPropriedades = AuxParaCriarPropriedades
    funcaoPopUp.fechaPopUp();

    instance.emit('mandaListaPropriedade', listaPropriedades)
}

function criaStatusCookies() {

    let statusCriado = {
        nome: nomeStatus.value,
        cor: corStatus.value
    }
    let verificaIgual = AuxParaCriarStatus.find((objetoAtual) => objetoAtual.nome == statusCriado.nome)
    if (verificaIgual == null && statusCriado.nome != null) {
        AuxParaCriarStatus.push(statusCriado)
    }
    console.log(AuxParaCriarStatus)
    VueCookies.set("statusCookie", AuxParaCriarStatus, 864000000)
    listaStatus = AuxParaCriarStatus
    funcaoPopUp.fechaPopUp();

    instance.emit('mandaListaStatus', listaPropriedades)
}


function buscarStatusCookies() {
    if (VueCookies.get("statusCookie") != null) {
        listaStatus.value = VueCookies.get("statusCookie");
        AuxParaCriarStatus = listaStatus.value;
    }
}

function startTimer() {
    timeoutId = setTimeout(() => {
        console.log('Hover ativado por 2 segundos');
        verNomeCompleto = true;
       
    }, 2000);
}

function clearTimer() {
    clearTimeout(timeoutId);
    verNomeCompleto=false;
}
</script>

<style lang="scss">
.scrollBar::-webkit-scrollbar {
    width: 0.7vw;
}

.scrollBar::-webkit-scrollbar-thumb {
    @apply bg-gray-200;
    border-radius: 10px;
}

.scrollBar::-webkit-scrollbar-thumb:hover {
    @apply bg-gray-300;
    border-radius: 10px;
}

.scrollBar::-webkit-scrollbar-track {
    display: none;
}

.scrollBar::-webkit-scrollbar-button {
    display: none;
}

.scrollBar {
    position: relative;
    overflow: hidden;
    transition: overflow-y 0.3s ease;
    @apply p-2 overflow-y-auto w-full;
}
</style>