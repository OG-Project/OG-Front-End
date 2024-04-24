<template>
    <div class="flex flex-col items-center w-full h-[90%]">
        <div class=" flex flex-col  mt-[3%] overflow-hidden gap-20">
            <div class="flex items-start justify-start font-semibold">
                <Input styleInput="input-transparente-claro-grande" type="text" conteudoInput="Nome Projeto"
                    largura="80" altura="6" fontSize="1.5rem" v-model="nomeProjeto" :modelValue="nomeProjeto"
                    @updateModelValue="(e) => {
                        nomeProjeto = e
                    }"></Input>
            </div>
            <div class="h-[15%] w-max flex items-center">
                <TextAreaPadrao placeholder="Descrição" resize="none" width="80vw " height="8vh" preset="transparente"
                    tamanhoDaFonte="1.0rem" v-model="descricaoProjeto"></TextAreaPadrao>
            </div>
            <div class="w-max h-max" @mouseenter="fazHoverPlaceHolder()" @mouseleave="fazBackPadraoPlaceHolder()">
                <Input altura="2" fontSize="1rem" largura="50" tipo="date" v-model="dataFinalProjeto" tipoInput="float" conteudoInput="Data Final: "
                    :modelValue="dataFinalProjeto" @updateModelValue="(e) => {
                        dataFinalProjeto = e
                    }" />

            </div>
            <div class="">
                <div class="  flex flex-col gap-10">
                        <div class="w-[50%] grid grid-cols-2 gap-[100%]">
                            <selectPadrao altura="4" largura="30" :listaSelect="listaSelecao"
                                placeholder-select="Equipes" v-model="equipesRelacionadasProjeto"
                                fonte-tamanho="0.9rem"></selectPadrao>

                            <Botao preset="PadraoVazado" texto="Convidar" tamanho-da-borda="2px" tamanhoPadrao="pequeno"
                                :funcaoClick="colocaListaEquipes" :parametrosFuncao="[equipesRelacionadasProjeto]">
                            </Botao>
                        </div>
                    <div class="flex flex-col  items-start justify-start gap-3 w-full ">
                        <inputDePesquisa :lista-da-pesquisa=listaDeUsuariosParaBusca :tem-icon="false"
                            place-holder-pesquisa="Responsáveis pelo projeto"
                            @item-selecionado="pegaValorSelecionadoPesquisa" largura="50" fontSize="1rem">
                        </inputDePesquisa>
                        <div v-if="responsaveisProjeto != ''" class="scrollListaResponsaveis" v-dragscroll>
                            <div
                                class=" bg-brancoNeve p-[0.50rem] rounded-sm border-transparent shadow-md flex flex-row items-center gap-2  w-max ">
                                <div v-for="responsavel of responsaveisProjeto ">
                                    <div
                                        class="bg-roxo-claro rounded-md p-[0.10rem]    w-max flex flex-row items-center gap-1 ">
                                        <img src="../../imagem-vetores/userTodoPreto.svg">
                                        <p>{{ responsavel }}</p>
                                        <img src="../../imagem-vetores/X-preto.svg"
                                            @click="removeResponsavel(responsavel)">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class=" w-[96%] ">
                <ListaConvidados altura="25vh" altDaImagemIcon="2vh" lagImagemIcon="4vw"
                    :listaConvidados="listaEquipesSelecionadas" texto="Equipes Vinculadas" class="w-[100%]"
                    :caminho-da-imagem-icon=srcIconListaEquipes @foi-clicado="removeListaEquipeConvidadas">
                </ListaConvidados>
            </div>
        </div>
        <div class=" w-full h-[90%] flex flex-row justify-center miniMobile:mr-7">
            <ListaPropiedadesStatus @manda-lista-propriedade="colocaListaPropriedades"
                @manda-lista-status-back="colocaListaStatus"></ListaPropiedadesStatus>
        </div>
    </div>
    <div class="h-[10%] w-full flex items-center justify-center  pr-4 pb-4 ">
        <Botao preset="PadraoRoxo" texto="Criar Projeto" tamanho-da-borda="4px" tamanhoPadrao="personalizado" height="5vh" width="79vw"
            tamanhoDaFonte="1.5vh" sombras='nao' :funcaoClick="criaProjeto"  v-if="!projetoEdita"></Botao>
            <Botao preset="PadraoRoxo" texto="Editar Projeto" tamanho-da-borda="4px" tamanhoPadrao="personalizado" height="5vh" width="79vw"
            tamanhoDaFonte="1.5vh" sombras='nao' :funcaoClick="criaProjeto"  v-if="projetoEdita"></Botao>
            
    </div>
</template>

<script setup>
import Input from '../../components/Input.vue';
import inputDePesquisa from '../../components/inputDePesquisa.vue';
import selectPadrao from '../../components/selectPadrao.vue';
import Botao from '../../components/Botao.vue';
import { conexaoBD } from '../../stores/conexaoBD';
import { onMounted, onUpdated, ref, watch } from 'vue';
import TextAreaPadrao from '../../components/textAreaPadrao.vue';
import ListaConvidados from '../../components/ListaConvidados.vue';
import { criaProjetoStore } from '../../stores/criaProjeto'
import { editaProjetoStore } from '../../stores/editaProjeto'
import { funcaoPopUpStore } from '../../stores/funcaoPopUp'
import { Projeto } from '../../models/Projeto';
import VueCookies from 'vue-cookies';
import Sair from "../../imagem-vetores/Sair.svg";
import ListaPropiedadesStatus from "../../components/ListaPropriedadesStatus.vue";
import informacoesProjeto from '../../components/informacoesProjeto.vue';
import { useRoute } from 'vue-router';
import { format } from 'date-fns';
import router from "@/router";
import { webSocketStore } from '../../stores/webSocket';
const funcaoPopUp = funcaoPopUpStore();
const conexao = conexaoBD();
const route = useRoute();
const webSocket = webSocketStore();
var listaSelecao = ref([]);
let nomeProjeto = ref("");
let dataFinalProjeto = ref("");
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
let listaResponsaveisBack = []
var projetoEdita = ref(true)
let srcIconListaEquipes = Sair
let dataFormatada = ref("")
funcaoPopUp.variavelModal = false
let idProjeto;
let placeHolderDataFinalProjeto = ref("")
let stylePlaceHolder = ref({});
let dataFinalFormatada = ref("");

onMounted(() => {
    verificaEdicaoProjeto();
    defineSelect()
    pesquisaBancoUserName();
    buscaProjetoCookies();
    mandaDataInformacoes();
    listaEquipesConvidadas.value = [];
    placeHolderDataFinalProjeto.value = "Data final:"
})

onUpdated(() => {
    criarProjetoCookies();
    fazPlaceHolderDataFinalProjeto()
})


stylePlaceHolder.value = {
    position: "absolute",
    left: "2.7%",
    width: "12%",
    height: "2.5%",
    zIndex: "10",
    backgroundColor: "#FFFFFF",
    marginTop: "0.35%",
    display: "flex",
    alingItems: "center"
}

function fazPlaceHolderDataFinalProjeto() {
    if (dataFinalProjeto.value != undefined && dataFinalProjeto.value != "" && dataFinalProjeto.value != null) {
        const [ano, mes, dia] = dataFinalProjeto.value.split("-");
        dataFinalFormatada.value = `${dia}/${mes}/${ano}`
        placeHolderDataFinalProjeto.value = "Data Final: " + dataFinalFormatada.value;
    }
}

function fazHoverPlaceHolder() {
    stylePlaceHolder.value.backgroundColor = "#D7D7D7"
}

function fazBackPadraoPlaceHolder() {
    stylePlaceHolder.value.backgroundColor = "#FFFFFF"
}

async function mandaDataInformacoes() {
    if (projetoEdita.value) {
        idProjeto = VueCookies.get("IdProjetoAtual");
        let projeto = await conexao.buscarUm(idProjeto, "/projeto")
        const dataBack = projeto.dataCriacao;
        const [data, hora] = dataBack.split("T");
        const [ano, mes, dia] = data.split("-");
        dataFormatada.value = `${dia}/${mes}/${ano}`;
    } else {
        let dia = new Date().getDate();
        let mes = new Date().getMonth();
        let ano = new Date().getFullYear()
        dataFormatada.value = `${dia}/${'0' + (mes + 1)}/${ano}`;

    }
}

function verificaEdicaoProjeto() {
    if (route.path == '/editaProjeto') {
        projetoEdita.value = true
    } else {
        projetoEdita.value = false
    }

}

async function defineSelect() {
    let listaAux = (await conexao.procurar('/equipe'))
    let listaAux1 = []
    listaAux.forEach(equipeAtual => {
        listaAux1.push(equipeAtual.nome);
        listaSelecao.value = listaAux1
    });
    return listaSelecao
}

function colocaListaPropriedades(propriedades) {
    listaPropriedades.value = propriedades
}

function colocaListaStatus(status) {
    listaStatus.value = status
}

function buscaProjetoCookies() {

    if (!projetoEdita.value) {
        buscaRascunhoCriacaoProjeto();
        return;
    } else {
        buscaProjetoEditar();
    }
}

function buscaRascunhoCriacaoProjeto() {
    if (VueCookies.get("projetoCookie") != null
        && !projetoEdita.value
        && VueCookies.get("projetoCookie") != undefined
        && VueCookies.get("projetoCookie") != "undefined") {
        const variavelCookieProjeto = (VueCookies.get('projetoCookie'))
        descricaoProjeto.value = variavelCookieProjeto.descricao;
        nomeProjeto.value = variavelCookieProjeto.nome;
        dataFinalProjeto.value = variavelCookieProjeto.dataFinal;
        if (variavelCookieProjeto.equipes != []
            && variavelCookieProjeto.equipes != undefined
            && variavelCookieProjeto.equipes != "undefined"
            && variavelCookieProjeto.equipes != null) {
            listaEquipesSelecionadas.value = variavelCookieProjeto.equipes.map((x) => x)
            variavelCookieProjeto.equipes.forEach(EquipeAtual => {
                const objetoEnviaBack = {
                    equipe: {
                        id: EquipeAtual.id,
                    }
                }
                listaEquipeEnviaBack.push(objetoEnviaBack)
            })
        }
        if (variavelCookieProjeto.responsaveis != []
            && variavelCookieProjeto.responsaveis != undefined
            && variavelCookieProjeto.responsaveis != "undefined"
            && variavelCookieProjeto.responsaveis != null) {
            responsaveisProjeto.value = variavelCookieProjeto.responsaveis
            listaAuxResponsaveisProjeto = variavelCookieProjeto.responsaveis
            variavelCookieProjeto.responsaveis.forEach(responsavel => {
                adicionaResponsaveisProjeto(responsavel)
            })
        }
    }
}

async function buscaProjetoEditar() {
    idProjeto = VueCookies.get("IdProjetoAtual");
    let projeto = await conexao.buscarUm(idProjeto, "/projeto")
    if (projeto != null) {
        nomeProjeto.value = projeto.nome;
        descricaoProjeto.value = projeto.descricao;
        if (projeto.dataFinal != null) {
            dataFinalProjeto.value = projeto.dataFinal;
        } else {
            dataFinalProjeto.value = "";
        }
        buscaListaResponsaveisBack(projeto);
        buscaListaEquipesRelacionadas(projeto);
    }
}

async function buscaListaResponsaveisBack(projeto) {
    projeto.responsaveis.forEach((responsavelAtual) => {
        let username = responsavelAtual.responsavel.username
        if (verificaTemEsseResponsavelProjeto(username)) {
            responsaveisProjeto.value.push(username)
            listaAuxResponsaveisProjeto.push(username)
            adicionaResponsaveisProjeto(responsavelAtual.responsavel)
        }
    })

}

function verificaTemEsseResponsavelProjeto(username) {
    return (!responsaveisProjeto.value.includes(username) && !listaAuxResponsaveisProjeto.includes(username));
}

function buscaListaEquipesRelacionadas(projeto) {
    projeto.projetoEquipes.forEach((projetoEquipe) => colocaListaEquipes(projetoEquipe.equipe))
}

async function pesquisaBancoUserName() {
    let listaAux = (await conexao.procurar('/usuario'))
    listaAux.forEach(usuarioAtual => {
        listaDeUsuariosParaBusca.value.push(usuarioAtual.username);
    });
    return listaDeUsuariosParaBusca;
}

function criarProjetoCookies() {
    if (!projetoEdita.value) {
        const criaProjetoCookies = Projeto
        criaProjetoCookies.descricao = descricaoProjeto.value;
        criaProjetoCookies.nome = nomeProjeto.value;
        criaProjetoCookies.dataFinal = dataFinalProjeto.value
        if (listaEquipesSelecionadas.value != "") {
            criaProjetoCookies.equipes = listaEquipesSelecionadas.value.map((x) => x);
        } else {
            criaProjetoCookies.equipes = ""
        }
        criaProjetoCookies.responsaveis = responsaveisProjeto.value
        VueCookies.set('projetoCookie', criaProjetoCookies, 86400000)
    }
}

async function pegaValorSelecionadoPesquisa(valorPesquisa) {
    const listaUsuarios = (await conexao.procurar('/usuario'))
    listaUsuarios.forEach(usuarioAtual => {
        if (valorPesquisa == usuarioAtual.username && verificaTemEsseResponsavelProjeto(usuarioAtual.username)) {
            listaAuxResponsaveisProjeto.push(usuarioAtual.username)
            responsaveisProjeto.value = null;
            responsaveisProjeto.value = listaAuxResponsaveisProjeto;
            adicionaResponsaveisProjeto(usuarioAtual)
        }
    });

}

async function adicionaResponsaveisProjeto(usuarioRecebe) {
    console.log(usuarioRecebe)
    if (usuarioRecebe.id == undefined) {
        let listaAux = (await conexao.procurar('/usuario'))
        listaAux.forEach(usuario => {
            if (usuario.username == usuarioRecebe) {
                let responsavelBanco = {
                    responsavel: {
                        id: usuario.id
                    }
                }
                listaResponsaveisBack.push(responsavelBanco);
                return;
            }
        })

    } else {
        let responsavelBanco = {
            responsavel: {
                id: usuarioRecebe.id
            }
        }
        listaResponsaveisBack.push(responsavelBanco);
    }

}

async function criaProjeto() {
    if (!projetoEdita.value) {
        const criaProjeto = criaProjetoStore()

        criaProjeto.criaProjeto(nomeProjeto.value, descricaoProjeto.value, listaEquipeEnviaBack, listaPropriedades.value
            , listaStatus.value, listaResponsaveisBack, dataFinalProjeto.value)
        restauraCookies();
        router.push('/projeto')

    } else {
        const editaProjeto = editaProjetoStore()
        let projeto = await conexao.buscarUm(idProjeto, "/projeto")
        editaProjeto.editaProjeto(idProjeto, nomeProjeto.value, descricaoProjeto.value, listaEquipeEnviaBack, listaPropriedades.value
            , listaStatus.value, listaResponsaveisBack, dataFinalProjeto.value, projeto.tempoAtuacao, projeto.indexLista)
        restauraCookies();
        router.push('/projeto')
    }

}

function enviaWebSocket(response) {
    console.log(response.data.id)
    webSocket.url = "ws://localhost:8082/og/webSocket/tarefa/" + response.data.id;
    webSocket.enviaMensagemWebSocket()
}

function restauraCookies() {
    VueCookies.set("projetoCookie")
    VueCookies.set("propriedadeCookie")
    VueCookies.set("statusCookie")
}

async function colocaListaEquipes(equipeEscolhidaParaProjeto) {
    const listaEquipes = await conexao.procurar('/equipe');
    let equipeVinculada;
    if (equipeEscolhidaParaProjeto == "") {
        equipeVinculada = listaEquipes[0]

    } else if (equipeEscolhidaParaProjeto.nome == null) {
        equipeVinculada = listaEquipes.find((equipe) => equipe.nome == equipeEscolhidaParaProjeto[0]);

    } else {
        equipeVinculada = equipeEscolhidaParaProjeto;
    }
    if (listaEquipesSelecionadas.value.find((equipeComparação) => equipeComparação.nome == equipeVinculada.nome) != undefined) {
        return;
    }
    listaEquipesSelecionadas.value.push(equipeVinculada)
    transformaListaDeEquipeFrontEmListaBack(listaEquipesSelecionadas.value)
    defineSelect();
}

async function transformaListaDeEquipeFrontEmListaBack(listaEquipeFront) {
    let idProjetoEquipe = ""
    let equipeBack;
    let projeto
    if(projetoEdita.value){
         projeto = await conexao.buscarUm(idProjeto, '/projeto')
    }
    let listaBackEquipe =  listaEquipeFront.map((equipeFront) => {
        if (projetoEdita.value) {
             idProjetoEquipe =  verificaIdProjetoEquipe(equipeFront,projeto)   
        }
         return equipeBack = {
             id:  idProjetoEquipe,
            equipe: {
                id: equipeFront.id
            }
        }
    })
    console.log(listaBackEquipe)
    listaEquipeEnviaBack = listaBackEquipe;
}

 function verificaIdProjetoEquipe(equipe,projeto){
    let idRetorno;
    projeto.projetoEquipes.forEach((projetoEquipe) =>{
        if(projetoEquipe.equipe.id == equipe.id){
            idRetorno=  projetoEquipe.id
        }
    })
    return idRetorno;
}

async function removeListaEquipeConvidadas(equipeRemover) {
    
    let listaEquipes = await conexao.procurar('/equipe');
    let equipeVinculada = listaEquipes.find((equipe) => equipe.nome == equipeRemover.nome);
    let indice = listaEquipesSelecionadas.value.findIndex((obj) => obj.nome === equipeVinculada.nome);
    if (indice !== -1) {
        // Remover o objeto da lista usando splice
        listaEquipesSelecionadas.value.splice(indice, 1);
    }
    transformaListaDeEquipeFrontEmListaBack(listaEquipesSelecionadas.value)
    if(projetoEdita.value){
        conexao.deletarProjetoEquipe(equipeVinculada.id, Number(idProjeto), "/equipe")
    }
    criarProjetoCookies();

}

async function removeResponsavel(responsavelRemover) {
    let listaUsuarios = await conexao.procurar('/usuario');
    responsaveisProjeto.value.forEach((objetoAtual) => {
        if (objetoAtual.username == responsavelRemover.username) {
            let index = responsaveisProjeto.value.indexOf(responsavelRemover)
            responsaveisProjeto.value.splice(index, 1);
            listaAuxResponsaveisProjeto.splice(index, 1)
            listaResponsaveisBack.splice(index, 1);
        }
    }
    )
    if (!projetoEdita) {
        criarProjetoCookies();
    }
}
</script>

<style lang="scss">

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