
<template>
    <div class="gridTotal">
        <div class=" flex flex-col pl-[5%] mt-[3%] overflow-hidden gap-10">
            <div class="flex items-start justify-start font-semibold">
                <Input styleInput="input-transparente-claro-grande" type="text" conteudoInput="Nome Projeto" largura="30"
                    altura="6" fontSize="1.5rem" v-model="nomeProjeto"></Input>
            </div>
            <div class="h-[15%] w-max flex items-center">
                <TextAreaPadrao placeholder="Descrição" resize="none" width="30vw " height="8vh" preset="transparente"
                    tamanhoDaFonte="1.0rem" v-model="descricaoProjeto" ></TextAreaPadrao>
            </div>
            <div class="">
                <div class="  flex flex-col gap-10">
                    <div>
                        <div class="w-[50%] grid grid-cols-2">
                            <selectPadrao altura="4" largura="8" :listaSelect="listaSelecao" placeholder-select="Equipes"
                                v-model="equipesRelacionadasProjeto" fonte-tamanho="0.9rem"></selectPadrao>

                            <Botao preset="PadraoVazado" texto="Convidar" tamanho-da-borda="2px" tamanhoPadrao="pequeno"
                                :funcaoClick="colocaListaEquipes" :parametrosFuncao="[equipesRelacionadasProjeto]">
                            </Botao>

                        </div>
                    </div>
                    <div class="flex flex-col  items-start justify-start gap-3 w-full ">
                        <inputDePesquisa :lista-da-pesquisa=listaDeUsuariosParaBusca :tem-icon="false"
                            place-holder-pesquisa="Responsáveis pelo projeto"
                            @item-selecionado="pegaValorSelecionadoPesquisa" largura="13" fontSize="1rem"></inputDePesquisa>
                        <div v-if="responsaveisProjeto != ''" class="scrollListaResponsaveis" v-dragscroll>
                            <div
                                class=" bg-brancoNeve p-[0.50rem] rounded-sm border-transparent shadow-md flex flex-row items-center gap-2  w-max ">
                                <div v-for="responsavel of responsaveisProjeto ">
                                    <div
                                        class="bg-roxo-claro rounded-md p-[0.10rem]    w-max flex flex-row items-center gap-1 ">
                                        <img src="../imagem-vetores/userTodoPreto.svg">
                                        <p>{{ responsavel }}</p>
                                        <img src="../imagem-vetores/X-preto.svg" @click="removeResponsavel(responsavel)">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class=" pt-8 w-[96%] ">
                <ListaConvidados altura="30vh" altDaImagemIcon="2vh" lagImagemIcon="4vw"
                    :listaConvidados="listaEquipesSelecionadas" texto="Equipes Vinculadas" class="w-[100%]" :caminho-da-imagem-icon=srcIconListaEquipes @foi-clicado="removeListaEquipeConvidadas">
                </ListaConvidados>
            </div>
        </div>
        <div class=" w-[83%] h-[90%] flex-row ">
            <ListaPropiedadesStatus @manda-lista-propriedade="colocaListaPropriedades" @manda-lista-status-back="colocaListaStatus"></ListaPropiedadesStatus>
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
    <div class="h-[10%] w-[70.4%] flex items-end justify-end pr-4 ">
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
import { Projeto } from '../models/Projeto';
import VueCookies from 'vue-cookies';
import Sair from "../imagem-vetores/Sair.svg"
import ListaPropiedadesStatus from "../components/ListaPropriedadesStatus.vue"
const funcaoPopUp = funcaoPopUpStore();
const conexao = conexaoBD();
var listaSelecao = ref([]);
let nomeProjeto = ref("");
let dataInicioProjeto = ref("");
let descricaoProjeto = ref("");
let listaDeUsuariosParaBusca = ref([]);
var listaPropriedades = ref([]);
let listaStatus = ref([]);
let equipesRelacionadasProjeto = ref([]);
let listaAuxResponsaveisProjeto = [];
let responsaveisProjeto = ref([]);
let listaEquipesConvidadas = ref([]);
let listaEquipesSelecionadas = ref([]);
let listaEquipeEnviaBack = []
let srcIconListaEquipes = Sair
funcaoPopUp.variavelModal = false

onMounted(() => {
    defineSelect()
    pesquisaBancoUserName();
    statusDoProjeto();
    buscaProjetoCookies();
    listaEquipesConvidadas.value = []
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
    return listaSelecao
}

function colocaListaPropriedades(propriedades){
    listaPropriedades.value=propriedades
}

function colocaListaStatus(status){
    listaStatus.value=[]
    listaStatus.value= status
    console.log(status)
}

function buscaProjetoCookies() {
    if (VueCookies.get("projetoCookie") != null) {
        console.log(VueCookies.get("projetoCookie"))
        const variavelCookieProjeto = (VueCookies.get('projetoCookie'))
        descricaoProjeto.value = variavelCookieProjeto.descricao;
        nomeProjeto.value = variavelCookieProjeto.nome;
        if (variavelCookieProjeto.equipes.length != 0) {
            listaEquipesSelecionadas.value = variavelCookieProjeto.equipes.map((x) => x)
            variavelCookieProjeto.equipes.forEach(EquipeAtual => {
                const objetoEnviaBack = {
                    equipe: {
                        id: EquipeAtual.id
                    }
                }
                listaEquipeEnviaBack.push(objetoEnviaBack)
            })
        }
        if(variavelCookieProjeto.responsveis!=[]){
            responsaveisProjeto.value=variavelCookieProjeto.reponsaveis
            listaAuxResponsaveisProjeto=variavelCookieProjeto.reponsaveis
        }
    }

}

async function pesquisaBancoUserName() {
    let listaAux = (await conexao.procurar('/usuario'))
    listaAux.forEach(usuarioAtual => {
        listaDeUsuariosParaBusca.value.push(usuarioAtual.username);
    });
    return listaDeUsuariosParaBusca;
}

async function statusDoProjeto() {
    var listaAux = (await conexao.procurar('/status'))
    listaAux.forEach(statusAtual => {
        listaStatus.value.push(statusAtual)
    });
    return listaStatus;
}

function criarProjetoCookies() {
    const criaProjetoCookies = Projeto
    criaProjetoCookies.descricao = descricaoProjeto.value;
    criaProjetoCookies.nome = nomeProjeto.value;
    if (listaEquipesSelecionadas.value != "") {
        criaProjetoCookies.equipes = listaEquipesSelecionadas.value.map((x) => x);
    }else{
        criaProjetoCookies.equipes= ""
    }
    criaProjetoCookies.reponsaveis=responsaveisProjeto.value
    VueCookies.set('projetoCookie', criaProjetoCookies, 86400000)
}

async function pegaValorSelecionadoPesquisa(valorPesquisa) {
    let listaAux = (await conexao.procurar('/usuario'))
    listaAux.forEach(usuarioAtual => {
        if (valorPesquisa == usuarioAtual.username && !responsaveisProjeto.value.includes(valorPesquisa)) {
            listaAuxResponsaveisProjeto.push(usuarioAtual.username)
            responsaveisProjeto.value = null;
            responsaveisProjeto.value = listaAuxResponsaveisProjeto;
            
        }
    });

}

async function criaProjeto() {
    const criaProjeto = criaProjetoStore()
    criaProjeto.criaProjeto(nomeProjeto.value, descricaoProjeto.value, listaEquipeEnviaBack, listaPropriedades)
   let projeto= await  conexao.buscarUm(1,"projeto")
    console.log(projeto)
    VueCookies.set("projetoEditar",projeto,8640000)
}

async function colocaListaEquipes(equipeEscolhidaParaProjeto) {
    
    let listaEquipes = await conexao.procurar('/equipe');
    let equipeVinculada = listaEquipes.find((objeto) => objeto.nome == equipeEscolhidaParaProjeto[0]);
    if(equipeEscolhidaParaProjeto == ""){
        equipeVinculada = listaEquipes[0]
    }
    if(listaEquipesSelecionadas.value.find( (equipeComparação) => equipeComparação.nome == equipeVinculada.nome) != undefined){
            return;
        }
        console.log("ele não retornou")
    const objetoEnviaBack = {
        equipe: {
            id: equipeVinculada.id
        }
    }
    listaEquipeEnviaBack.push(objetoEnviaBack)
    listaEquipesSelecionadas.value.push(equipeVinculada)
    defineSelect();
}

async function removeListaEquipeConvidadas(equipeRemover){
    
    let listaEquipes = await conexao.procurar('/equipe');
    let equipeVinculada = listaEquipes.find((objeto) => objeto.nome == equipeRemover.nome);
    let indice = listaEquipesSelecionadas.value.findIndex((obj) => obj.nome === equipeVinculada.nome);
    if (indice !== -1) {
        // Remover o objeto da lista usando splice
        listaEquipesSelecionadas.value.splice(indice, 1);
    }
    criarProjetoCookies();
    
}

async function removeResponsavel(responsavelRemover){
    console.log(responsavelRemover)
    let listaUsuarios = await conexao.procurar('/usuario');
    let usuarioRemovido = listaUsuarios.find((objeto) => objeto.username == responsavelRemover.username);
    let indice = responsaveisProjeto.value.findIndex((obj) => obj.username == responsavelRemover.username);

    if (indice !== -1) {
        // Remover o objeto da lista usando splice
        responsaveisProjeto.value.splice(indice, 1);
    }
    criarProjetoCookies();
}
</script>

<style lang="scss">


.gridTotal {
    display: grid;
    grid-template-columns: 41.175% 41.175% 17.65%;
    width: 100%;
    height: 90%;
    
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

.scrollListaResponsaveis::-webkit-scrollbar {
    height: 0.3vw;
}

.scrollListaResponsaveis::-webkit-scrollbar-thumb {
    @apply bg-gray-200;
    border-radius: 10px;
    width: 5vw;
    display: none;
}

.scrollListaResponsaveis::-webkit-scrollbar-thumb:hover {
    @apply bg-gray-300;
    border-radius: 10px;
}

.scrollListaResponsaveis::-webkit-scrollbar-track {
    display: none;
}

.scrollListaResponsaveis::-webkit-scrollbar-button {
    display: none;
}

.scrollListaResponsaveis {
    position: relative;
    overflow: auto;
    transition: overflow-y 0.3s ease;
    @apply overflow-y-auto w-[80%];
}

.scrollListaResponsaveis {
    cursor: -webkit-grab;
    cursor: -moz-grab;
    cursor: -o-grab;
    cursor: grab;
}


.scrollListaResponsaveis:active {
    cursor: -webkit-grabbing;
    cursor: -moz-grabbing;
    cursor: -o-grabbing;
    cursor: grabbing;
}
</style>