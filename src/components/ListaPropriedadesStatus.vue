<template>
    <div class="bg-brancoNeve shadow-md  w-[80%]  max-h-[80vh] flex flex-col  pt-6 justify-end p-[2%] m-[3%] gap-10">
                <div v-if="opcaoSelecionadaNaTabela == 'propriedade' || opcaoSelecionadaNaTabela == ''" class="h-full">
                    <div class="flex flex-row justify-between items-center border-b-2 border-b-roxo" @click="buscandoPor()">
                        <p @click="navegaPelaTabela('propriedade')" class="bg-roxo-claro p-2">Propriedades</p>
                        <p @click="navegaPelaTabela('status')">Status</p>
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
                            v-if="listaSelecionada == '' && buscarPor == 'Todos' || buscarPor == ''">
                            
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
                        <div class="flex  flex-row items-center gap-4 h-[8vh]" v-for="status of listaStatus">
                            <p class="w-[33%]">{{ status.nome }}</p>
                            <p class="w-[33%]">Tipo: {{ status.tipo }}</p>
                            <div class="bg-roxo-claro rounded-md p-1 w-[50%]">
                                Tarefas Atribuidas
                            </div>
                        </div>
                        <div class="flex  flex-row items-center gap-4 h-[8vh]" v-for="status of listaStatus"
                            v-if="listaSelecionada != []">
                            <p class="w-[33%]">{{ status.nome }}</p>
                            <p class="w-[33%]">Tipo: {{ status.tipo }}</p>
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
                   
                    <div class="animation">
                        <div class="flex justify-end">
                            <img src="../imagem-vetores/triangulo.svg">
                        </div>
                        <div class="flex flex-row justify-between">
                            <div class="pl-2">
                                <Input largura="10" conteudoInput="Nome Propriedade" fontSize="1rem" altura="2"
                                    v-model="nomePropriedade"></Input>
                            </div>
                            <div class="pr-2">
                                <selectPadrao placeholderSelect="Tipo"
                                    :lista-select="['Texto', 'Data', 'Numero', 'Seleção']" largura="5" altura="3.8"
                                    fonteTamanho="1rem" v-model="tipoPropriedade"> </selectPadrao>
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
import {Propriedade} from '../models/Propriedade'
import { getCurrentInstance } from 'vue';
const instance = getCurrentInstance();
let opcoesSelect = ["Todos", "Data", "Numero", "Seleção", "Texto"];
let opcaoSelecionadaNaTabela = ref("");
let buscarPor = ref("");
var listaPropriedades = ref([]);
let listaSelecionada = ref([]);
let nomePropriedade = ref("");
let tipoPropriedade = ref("");
let AuxParaCriarPropriedades = [];
const funcaoPopUp =funcaoPopUpStore()


onMounted(() => {
    buscaPropriedadeCookies();
    funcaoPopUp.variavelModal=false
}
)

async function buscandoPor() {
    var listaAux = []
    var listaAux1 = []
    listaAux = listaPropriedades.value
    listaAux.forEach(opcaoAtual => {
        if (opcaoAtual.tipo != "") {
            if (opcaoAtual.tipo.toLowerCase() == this.buscarPor.toLowerCase()) {
                listaAux1.push(opcaoAtual)
            }
        }
    });
    listaSelecionada.value = listaAux1;
}

function navegaPelaTabela(opcaoSelecionada) {
    if (opcaoSelecionada == 'propriedade') {
        this.opcaoSelecionadaNaTabela = 'propriedade'
    } else if (opcaoSelecionada == 'status') {
        this.opcaoSelecionadaNaTabela = 'status'
    }
}

function buscaPropriedadeCookies() {
    const propriedadeArmazenada = VueCookies.get("propriedadeCookie");
    if(propriedadeArmazenada==null){
        return;
    }
    listaPropriedades.value = propriedadeArmazenada
    AuxParaCriarPropriedades= propriedadeArmazenada
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

    instance.emit('mandaListaPropriedade',listaPropriedades)
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