<template>
    <div class="gridTotal">
        <div class=" flex flex-col  gap-6 pl-[5%] mt-[3%]">
            <div class="flex items-start justify-start font-semibold">
                <Input styleInput="input-transparente-claro-grande" type="text" conteudoInput="Nome Projeto" largura="40"
                    altura="8" fontSize="2.5rem" v-model="nomeProjeto"></Input>
            </div>
            <div class="h-[18%] w-max flex items-center ">
                <TextAreaPadrao placeholder="Descrição" resize="none" width="30vw " height="10vh" preset="transparente"
                    tamanhoDaFonte="1.5rem" v-model="descricaoProjeto"></TextAreaPadrao>
            </div>
            <div class="grid grid-cols-2">
                <div class=" w-full h-[90%] flex flex-col gap-16">

                    <div class="h-[5%] flex items-start justify-start mt-2">
                        <Input styleInput="input-transparente-claro-pequeno" largura="19" v-model="dataInicioProjeto"
                            tipo="date" conteudoInput="Data Inicio" altura="2"></Input>
                    </div>
                    <div>
                        <div class="w-full grid grid-cols-2">
                            <selectPadrao altura="4" largura="8" :listaSelect="listaSelecao" placeholder-select="Equipes"
                                v-model="equipesRelacionadasProjeto" fonte-tamanho="1rem"></selectPadrao>
                            <Botao preset="PadraoVazado" texto="Convidar" tamanho-da-borda="2px" tamanhoPadrao="pequeno">
                            </Botao>
                        </div>
                    </div>
                    <div class="h-[5%] flex  items-start justify-start gap-3">
                        <inputDePesquisa :lista-da-pesquisa=listaDeUsuariosParaBusca :tem-icon="false"
                            place-holder-pesquisa="Responsáveis pelo projeto"
                            @item-selecionado="pegaValorSelecionadoPesquisa"></inputDePesquisa>
                        <div v-if="responsaveisProjeto!= ''">
                            <div v-for="responsavel of responsaveisProjeto " class="w-full bg-brancoNeve h-full rounded-sm border-transparent shadow-md  ">
                                <div>
                                        {{ responsavel }}
                                    <!-- 17.65% -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class=" w-[50vw]">
                <ListaConvidados altura="20vh" altDaImagemIcon="2vh" lagImagemIcon="4vw"
                    :listaConvidados=listaDeUsuariosParaBusca texto="Equipes Vinculadas"></ListaConvidados>
            </div>

        </div>
        <div class=" w-[83%] h-full flex-row  ">
            <div
                class="bg-brancoNeve shadow-md  w-[80%]  max-h-[80vh] flex flex-col  pt-6 justify-end p-[2%] m-[3%] gap-10">
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
                        <div class="flex  flex-row items-center gap-4 h-[8vh]" v-for="status of listaStatus"
                            v-if="listaSelecionada == '' && buscarPor == 'Todos' || buscarPor == ''">
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
                <div class="w-full flex flex-row justify-end gap-3 sticky" @click="funcaoPopUp.abrePopUp()"
                    v-if="funcaoPopUp.variavelModal == false">
                    <p>Nova</p>
                    <img src="../imagem-vetores/sinalDeMaisIcon.svg">
                </div>

                <div v-if="funcaoPopUp.variavelModal == true" class=" h-full  flex flex-row  justify-end">
                    <!-- fiz como um popUp, tem um botão que abre o popUp -->
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
                                <!-- mudar a função -->
                                <Botao preset="Confirmar" tamanhoPadrao="pequeno" :funcaoClick="criaPropriedadeCookies">
                                </Botao>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
        <div class="flex justify-end items-end ">
            <div class="w-[20vw] h-[92vh] flex flex-col border-2 gap-8 overflow-y-auto border-black border-b-0 ">
                <div class="h-[6%] pt-8 flex items-end justify-center">
                    <h1 class="text-3xl font-semibold">Informações</h1>
                </div>
                <div class="pt-8 gap-4 min-h-[8%] w-[100%] flex flex-col justify-evenly">
                    <div class="flex pl-8">
                        <div class="w-[50%] justify-start flex-row">
                            <p>Nome do projeto</p>
                        </div>
                        <div class="w-[40%] justify-end flex-row">
                            <p class="w-[100%] text-[#620BA7]">asdasd asdasd asdasdasdasd asdasd</p>
                        </div>
                    </div>
                    <div class="flex pl-8">
                        <div class="w-[50%] justify-start flex-row">
                            <p>Data Inicial</p>
                        </div>
                        <div class="w-[40%] justify-end flex-row">
                            <p class="text-[#620BA7]">13/02/2006</p>
                        </div>
                    </div>
                    <div class="flex pl-8">
                        <div class="w-[50%] justify-start flex-row">
                            <p>Data Inicial</p>
                        </div>
                        <div class="w-[40%] justify-end flex-row">
                            <p class="text-[#620BA7]">13/02/2006</p>
                        </div>
                    </div>
                </div>
                <div class="h-[4%] flex items-center justify-center p-8">
                    <h1 class="text-xl font-semibold">Status</h1>
                </div>
                <div class="h-[4%] flex items-center justify-center">
                    <div class="flex items-center justify-center h-[80%] w-[100%]">
                        <p class="h-[100%] w-[50%] flex items-center justify-center bg-[#7CC0E5]">
                            Status aleatório
                        </p>
                    </div>
                </div>
                <div class="h-[4%] flex items-center justify-center p-8">
                    <h1 class="text-xl font-semibold">Propriedades</h1>
                </div>
                <div class="h-[35%] flex flex-col items-center justify-center p-8">
                    <img :src="NotePad" class="h-[200px] w-[200px]" />
                    <p class="text-center">Esta tarefa não possui nenhuma propriedade</p>
                </div>
            </div>
        </div>

    </div>


    <div class="h-[1%] w-[70.4%] flex items-end justify-end pr-4 ">
        <Botao preset="PadraoVazado" texto="Criar Projeto" tamanho-da-borda="4px" tamanhoPadrao="medio"
            tamanhoDaFonte="2.5vh" sombras='nao' :funcaoClick="criaProjeto"></Botao>
    </div>
</template>

<script setup>
import Input from '../components/Input.vue';
import inputDePesquisa from '../components/inputDePesquisa.vue';
import selectPadrao from '../components/selectPadrao.vue';
import Botao from '../components/Botao.vue';
import { conexaoBD } from '../stores/conexaoBD';
import { onMounted, onUpdated, ref, watch } from 'vue';
import TextAreaPadrao from '../components/textAreaPadrao.vue';
import ListaConvidados from '../components/ListaConvidados.vue';
import { criaProjetoStore } from '../stores/criaProjeto'
import { funcaoPopUpStore } from '../stores/funcaoPopUp'
import { criaPropriedadeStore } from '../stores/criaPropriedade'
import { Propriedade } from '../models/Propriedade';
import { Projeto } from '../models/Projeto';
import VueCookies from 'vue-cookies';
const funcaoPopUp = funcaoPopUpStore();
const conexao = conexaoBD();
var listaSelecao = ref([]);
let nomeProjeto = ref("");
let tipoProjeto = ref("");
let nomePropriedade = ref("");
let tipoPropriedade = ref("");
let dataInicioProjeto = ref("");
let equipesEscolhidaRelacionadaProjeto = ref("");
let descricaoProjeto = ref("");
let responsaveisProjeto = ref([]);
let listaDeUsuariosParaBusca = ref([]);
var listaPropriedades = ref([]);
let buscarPor = ref("");
let opcoesSelect = ["Todos", "Data", "Numero", "Seleção", "Texto"];
let listaSelecionada = ref([]);
let opcaoSelecionadaNaTabela = ref("");
let listaStatus = ref([]);
let equipesRelacionadasProjeto = ref([]);
let AuxParaCriarPropriedades = [];
let itemSelecionadoPesquisa = ref("")
let listaAuxResponsaveisProjeto = []
onMounted(() => {
    defineSelect()
    buscandoPor();

    pesquisaBancoUserName();
    statusDoProjeto();
    buscaPropriedadeCookies();
    buscaProjetoCookies();
    funcaoPopUp.variavelModal = false;

})

onUpdated(() => {
    criarProjetoCookies();
})
async function defineSelect() {
    let listaAux = (await conexao.procurar('/equipe'))
    let listaAux1 = []
    listaAux.forEach(equipeAtual => {
        listaAux1.push(equipeAtual.nome);
        listaSelecao.value = listaAux1
    });

}

function buscaPropriedadeCookies() {
    const propriedadeArmazenada = VueCookies.get("propriedadeCookie");
    listaPropriedades.value = propriedadeArmazenada

}

function buscaProjetoCookies() {

    if (VueCookies.get("projetoCookie") != null) {
        const variavelCookieProjeto = (VueCookies.get('projetoCookie'))
        descricaoProjeto.value = variavelCookieProjeto.descricao;
        nomeProjeto.value = variavelCookieProjeto.nome;
        equipesEscolhidaRelacionadaProjeto.value = variavelCookieProjeto.equipes;
    }

}

async function pesquisaBancoUserName() {
    let listaAux = (await conexao.procurar('/usuario'))
    let listaAux1 = []
    listaAux.forEach(usuarioAtual => {
        listaAux1.push(usuarioAtual.nome);
        listaDeUsuariosParaBusca.value = listaAux1
    });
}

async function statusDoProjeto() {
    var listaAux = (await conexao.procurar('/status'))
    var listaAux1 = []
    listaAux.forEach(equipeAtual => {
        listaAux1.push(equipeAtual);
        listaStatus.value = listaAux1

    });
    return listaStatus;
}

function criarProjetoCookies() {
    const criaProjetoCookies = Projeto
    criaProjetoCookies.descricao = descricaoProjeto.value;
    criaProjetoCookies.nome = nomeProjeto.value;
    console.log(criaProjetoCookies.equipes)
    criaProjetoCookies.equipes = equipesEscolhidaRelacionadaProjeto.value;
    VueCookies.set('projetoCookie', criaProjetoCookies, 86400000000)
    console.log(VueCookies.get('projetoCookie'))
    buscaProjetoCookies();
}

async function pegaValorSelecionadoPesquisa(n) {
    console.log(n)
    let listaAux = (await conexao.procurar('/usuario'))
    listaAux.forEach(usuarioAtual => {
        if (n == usuarioAtual.nome) {
            listaAuxResponsaveisProjeto.push(usuarioAtual.nome) 
            console.log(responsaveisProjeto)
            responsaveisProjeto = listaAuxResponsaveisProjeto
        }
    });
    
}

function criaProjeto() {
    const criaProjeto = criaProjetoStore()
    criaProjeto.criaProjeto(nomeProjeto.value, descricaoProjeto.value, equipesRelacionadasProjeto.value)
    console.log("" + nomeProjeto.value + " " + descricaoProjeto.value)
    criaPropriedade();
}


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
function criaPropriedadeCookies() {

    let propriedadeCriada = Propriedade
    propriedadeCriada.nome = nomePropriedade.value
    propriedadeCriada.tipo = tipoPropriedade.value
    AuxParaCriarPropriedades.push({ ...propriedadeCriada })
    VueCookies.set("propriedadeCookie", AuxParaCriarPropriedades, 86400000000)
    listaPropriedades.value = AuxParaCriarPropriedades

    funcaoPopUp.fechaPopUp();


}
function criaPropriedade() {
    const criaProjeto = criaPropriedadeStore()
    if (tipoPropriedade.value == "Seleção") {
        tipoPropriedade.value = "SELECAO"
    }
    criaProjeto.criaPropriedade(nomePropriedade.value, tipoPropriedade.value.toUpperCase())

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

.gridTotal {
    display: grid;
    grid-template-columns: 41.175% 41.175% 17.65%;
    width: 100%;
    height: 100%;
}

.animation {
    @apply w-[65%] bg-brancoNeve shadow-md flex justify-around flex-col;
    animation: myAnim 0.15s ease 0s 1 normal none;
}

@keyframes myAnim {
    0% {
        opacity: 0;
        transform: translateY(50px);
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>