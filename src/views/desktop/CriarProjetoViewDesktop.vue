<template>
    <div class="gridTotal mt-[2%] overflow-hidden">
        <div class=" flex flex-col pl-[5%] overflow-hidden gap-10">
            <div class="flex items-start justify-start font-semibold">
                <Input styleInput="input-transparente-claro-grande" tipo="obrigatorio" conteudoInput="Nome Projeto"
                    :isInvalido="semNome" textoInvalido="O Nome é obrigatorio" largura="30" altura="6" fontSize="1.5rem"
                    v-model="nomeProjeto" :modelValue="nomeProjeto" @updateModelValue="(e) => {
                        nomeProjeto = e
                    }"></Input>
            </div>
            <div class="h-[15%] w-max flex items-center">
                <TextAreaPadrao placeholder="Descrição" resize="none" width="30vw " height="8vh" preset="transparente"
                    tamanhoDaFonte="1.0rem" v-model="descricaoProjeto"></TextAreaPadrao>
            </div>
            <div class="w-max h-max" @mouseenter="fazHoverPlaceHolder()" @mouseleave="fazBackPadraoPlaceHolder()">
                <span :style="stylePlaceHolder" @mouseenter="fazBackPadraoPlaceHolder()"
                    @mouseleave="fazHoverPlaceHolder()">{{ placeHolderDataFinalProjeto }}</span>
                <Input altura="2" fontSize="1rem" largura="13" tipo="date" v-model="dataFinalProjeto"
                    :modelValue="dataFinalProjeto" @updateModelValue="(e) => {
                        dataFinalProjeto = e
                    }" />

            </div>
            <div class="">
                <div class="  flex flex-col gap-10">
                    <div>
                        <div class="w-[50%] grid grid-cols-2">
                            <selectPadrao altura="4" largura="8" :listaSelect="listaSelecao"
                                placeholder-select="Equipes" v-model="equipesRelacionadasProjeto"
                                fonte-tamanho="0.9rem"></selectPadrao>

                            <Botao preset="PadraoVazado" texto="Convidar" tamanho-da-borda="2px" tamanhoPadrao="pequeno"
                                :funcaoClick="colocaListaEquipes" :parametrosFuncao="[equipesRelacionadasProjeto]">
                            </Botao>

                        </div>
                    </div>
                    <div class="flex flex-col  items-start justify-start gap-6 w-full ">
                        <inputDePesquisa :lista-da-pesquisa=listaDeUsuariosParaBusca :tem-icon="false"
                            place-holder-pesquisa="Responsáveis pelo projeto"
                            @item-selecionado="pegaValorSelecionadoPesquisa" largura="13" fontSize="1rem"
                            :is-invalido="semResponsavel" :texto-invalido="'Responsável é obrigatório'">
                        </inputDePesquisa>
                        <div v-if="responsaveisProjeto != ''" class="scrollListaResponsaveis" v-dragscroll>
                            <div
                                class=" bg-[var(--backgroundItems)] p-[0.50rem] rounded-sm border-transparent shadow-md flex flex-row items-center gap-2  w-max ">
                                <div v-for="responsavel of responsaveisProjeto ">
                                    <div
                                        class="bg-[var(--roxoClaro)] rounded-md p-[0.10rem]    w-max flex flex-row items-center gap-1 ">
                                        <img src="../../imagem-vetores/userTodoPreto.svg">
                                        <p>{{ responsavel }}</p>
                                        <div class="w-full flex justify-end pr-2">
                                            <div class="w-[40%]">
                                                <img src="../../imagem-vetores/botao-x.svg"
                                                    @click="removeResponsavel(responsavel)"
                                                    v-if="responsaveisProjeto.length != 1">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class=" w-[96%] ">
                <ListaConvidados altura="20vh" altDaImagemIcon="2vh" lagImagemIcon="4vw"
                    :listaConvidados="listaEquipesSelecionadas" texto="Equipes Vinculadas" class="w-[100%]"
                    @foi-clicado="removeListaEquipeConvidadas">
                </ListaConvidados>
            </div>
        </div>
        <div class=" w-[83%] h-full flex-row ">
            <div class="h-[85%] max-h-[85%]">
                <ListaPropiedadesStatus @manda-lista-propriedade="colocaListaPropriedades"
                    @manda-lista-status-back="colocaListaStatus"></ListaPropiedadesStatus>
            </div>

            <div id="step-12" class="h-[10%] w-[90%] flex items-end justify-end pr-4 gap-6">
                <Botao preset="Deletar" texto="Deletar Projeto" tamanho-da-borda="4px" tamanhoPadrao="medio"
                    tamanhoDaFonte="2.5vh" sombras='nao' :funcaoClick="excluiProjeto"
                    v-if="projetoEdita && isResponsavel && responsaveisProjeto.length == 1 && !naoPodeDeletar"></Botao>
                <Botao preset="PadraoVazado" texto="Criar Projeto" tamanho-da-borda="4px" tamanhoPadrao="medio"
                    tamanhoDaFonte="2.5vh" sombras='nao' :funcaoClick="criaProjeto" v-if="!projetoEdita"></Botao>
                <Botao preset="PadraoVazado" texto="Editar Projeto" tamanho-da-borda="4px" tamanhoPadrao="medio"
                    tamanhoDaFonte="2.5vh" sombras='nao' :funcaoClick="criaProjeto"
                    v-if="projetoEdita && isResponsavel"></Botao>


            </div>
        </div>
        <div class="flex justify-end items-start">
            <informacoesProjeto :nome-projeto="nomeProjeto" :lista-status="listaStatus"
                :lista-propriedades="listaPropriedades" :-data-inicial-projeto="dataFormatada"
                :-data-final-projeto="dataFinalFormatada"></informacoesProjeto>
        </div>

    </div>
    <div v-if="mensagem != ''" class="alert">
        <alertTela :mensagem="mensagem" :cor="mensagemCor" :key="mensagem" @acabou-o-tempo="limparMensagemErro">
        </alertTela>
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
import router from "@/router";
import alertTela from '../../components/alertTela.vue';
import { webSocketStore } from '../../stores/webSocket';
const funcaoPopUp = funcaoPopUpStore();
const conexao = conexaoBD();
const route = useRoute();
const webSocket = webSocketStore();
import { criaHistoricoStore } from '../../stores/criaHistorico.js'

const criaHistorico = criaHistoricoStore();

var listaSelecao = ref([]);
let idUsuario = VueCookies.get("IdUsuarioCookie")
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
let dataFormatada = ref("")
funcaoPopUp.variavelModal = false
let idProjeto = VueCookies.get('IdProjetoAtual');
let idEquipe = VueCookies.get('equipeSelecionada');
let placeHolderDataFinalProjeto = ref("")
let stylePlaceHolder = ref({});
let dataFinalFormatada = ref("");
let projeto = ref({});
let equipeSelecionada = ref({})
let mensagem = ref("");
let mensagemCor = ref("");
let semNome = ref(false);
let semResponsavel = ref(false)
let isResponsavel = ref(false)
let naoPodeDeletar = ref(false)
let usuario;
let usuarioId = VueCookies.get('IdUsuarioCookie')

function reloadTelaTarefa() {
  const reload = VueCookies.get('idReloadProjeto');
  if (reload == '0') {
    console.log("reload")
    VueCookies.set('idReloadProjeto', '1');
    window.location.reload();
  }
}

// reloadTelaTarefa()

onMounted(async () => {

    if (idProjeto != undefined && idProjeto != "undefined") {
        projeto.value = await conexao.buscarUm(idProjeto, '/projeto')
    }
    if (idEquipe != undefined && idEquipe != "undefined") {
        equipeSelecionada.value = (await conexao.buscarUm(idEquipe, '/equipe'))
    }
    usuario = await conexao.buscarUm(usuarioId, "/usuario")
    verificaEdicaoProjeto();
    defineSelect()
    pesquisaBancoUserName();
    buscaProjetoCookies();
    mandaDataInformacoes();
    let listaEquipe = [equipeSelecionada.value.nome]
    colocaListaEquipes(listaEquipe)
    listaEquipesConvidadas.value = [];
    placeHolderDataFinalProjeto.value = "Data final:"
})



onUpdated(() => {
    criarProjetoCookies();
    fazPlaceHolderDataFinalProjeto()
})

function limparMensagemErro() {
    mensagem.value = "";
}

function voltaPagina() {
    router.go(-1)
}

stylePlaceHolder.value = {
    position: "absolute",
    left: "2.7%",
    width: "11%",
    height: "2.5%",
    zIndex: "10",
    backgroundColor: "var(--backgroundPuro)",
    marginTop: "0.35%",
    display: "flex",
    alingItems: "center"
}

async function verificaResponsavel() {
    if (projeto.value != undefined) {
        let responsaveis = responsaveisProjeto.value
        if (responsaveis != null) {
            for (const responsavel of responsaveis) {
                if (responsavel == usuario.username) {
                    isResponsavel.value = true
                    return
                }
            }
        }
    }
    isResponsavel.value = false
    return

}

function fazPlaceHolderDataFinalProjeto() {
    if (dataFinalProjeto.value != undefined && dataFinalProjeto.value != "" && dataFinalProjeto.value != null) {
        const [ano, mes, dia] = dataFinalProjeto.value.split("-");
        dataFinalFormatada.value = `${dia}/${mes}/${ano}`
        placeHolderDataFinalProjeto.value = "Data Final: " + dataFinalFormatada.value;
    }
}


function excluiProjeto() {
    conexao.deletar(idProjeto, "/projeto").then(() => {
        voltaPagina()
    })
}

function fazHoverPlaceHolder() {
    stylePlaceHolder.value.backgroundColor = "var(--backgroundItemsClaros)"
}

function fazBackPadraoPlaceHolder() {
    stylePlaceHolder.value.backgroundColor = "var(--backgroundPuro)"
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
    let listaAux = []
    usuario.equipes.forEach((equipe) => listaAux.push(equipe.equipe))
    let listaAux1 = []
    listaAux.forEach(equipeAtual => {
        listaAux1.push(equipeAtual.nome);
        listaSelecao.value = listaAux1
    });
    return listaSelecao.value
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

async function buscaRascunhoCriacaoProjeto() {
    if (!projetoEdita.value && VueCookies.get("projetoCookie") != "undefined") {

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
            && variavelCookieProjeto.responsaveis != null && variavelCookieProjeto.responsaveis.length != 0) {
            responsaveisProjeto.value = variavelCookieProjeto.responsaveis
            listaAuxResponsaveisProjeto = variavelCookieProjeto.responsaveis
            variavelCookieProjeto.responsaveis.forEach(responsavel => {
                adicionaResponsaveisProjeto(responsavel)
            })
        } 
    } else {
            let usuario = await conexao.buscarUm(idUsuario, "/usuario")
            responsaveisProjeto.value.push(usuario.username)
            listaAuxResponsaveisProjeto.push(usuario.username)
            adicionaResponsaveisProjeto(usuario)
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
    projeto.responsaveis.forEach(async (responsavelAtual) => {
        let responsavel = await conexao.buscarUm(responsavelAtual.idResponsavel, "/usuario")
        let username = responsavel.username
        if (verificaTemEsseResponsavelProjeto(username)) {
            responsaveisProjeto.value.push(username)
            listaAuxResponsaveisProjeto.push(username)
            adicionaResponsaveisProjeto(responsavel)
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
    if (usuarioRecebe.id == undefined) {
        let listaAux = (await conexao.procurar('/usuario'))
        listaAux.forEach(usuario => {
            if (usuario.username == usuarioRecebe) {
                let responsavelBanco = {
                    idResponsavel: usuario.id
                }
                listaResponsaveisBack.push(responsavelBanco);
                verificaResponsavel();
                criaHistorico.criaHistoricoProjeto("Adicionou um novo responsavel", projeto, usuario)
                return;
            }
        })

    } else {
        let responsavelBanco = {
            idResponsavel: usuarioRecebe.id
        }
        listaResponsaveisBack.push(responsavelBanco);
        criaHistorico.criaHistoricoProjeto("Adicionou um novo responsavel", projeto, usuario)
        verificaResponsavel();
    }

}

async function criaProjeto() {
    if (nomeProjeto.value == "") {
        semResponsavel.value = false
        semNome.value = true
        mensagem.value = "Projeto com dados faltando"
        mensagemCor.value = "#CD0000"
        return
    } else if (responsaveisProjeto.value == "") {
        mensagem.value = "Projeto com dados faltando"
        mensagemCor.value = "#CD0000"
        semResponsavel.value = true
        semNome.value = false
        return
    }
    if (!projetoEdita.value) {
        const criaProjeto = criaProjetoStore()
        criaProjeto.criaProjeto(nomeProjeto.value, descricaoProjeto.value, listaEquipeEnviaBack, listaPropriedades.value
            , listaStatus.value, listaResponsaveisBack, dataFinalProjeto.value)
        restauraCookies();
        router.push("/projeto");
    } else {
        const editaProjeto = editaProjetoStore()
        let projeto = await conexao.buscarUm(idProjeto, "/projeto")
        editaProjeto.editaProjeto(idProjeto, nomeProjeto.value, descricaoProjeto.value, listaEquipeEnviaBack, listaPropriedades.value
            , listaStatus.value, listaResponsaveisBack, dataFinalProjeto.value, projeto.tempoAtuacao, projeto.categoria, projeto.indexLista, projeto.comentarios, projeto.tarefas)
        restauraCookies();
        criaHistorico.criaHistoricoProjeto("Editou o Projeto", projeto, usuario)
        router.push("/projeto");
    }
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
    criaHistorico.criaHistoricoProjeto("Convidou uma Equipe", projeto, usuario)
    listaEquipesSelecionadas.value.push(equipeVinculada)
    transformaListaDeEquipeFrontEmListaBack(listaEquipesSelecionadas.value)
    defineSelect();
}

async function transformaListaDeEquipeFrontEmListaBack(listaEquipeFront) {
    let idProjetoEquipe = ""
    let equipeBack;
    let projeto
    if (projetoEdita.value) {
        projeto = await conexao.buscarUm(idProjeto, '/projeto')
    }
    let listaBackEquipe = listaEquipeFront.map((equipeFront) => {
        if (projetoEdita.value) {
            idProjetoEquipe = verificaIdProjetoEquipe(equipeFront, projeto)
        }
        return equipeBack = {
            id: idProjetoEquipe,
            equipe: {
                id: equipeFront.id
            }
        }
    })
    console.log(listaBackEquipe)
    listaEquipeEnviaBack = listaBackEquipe;
    
}

function verificaIdProjetoEquipe(equipe, projeto) {
    let idRetorno;
    projeto.projetoEquipes.forEach((projetoEquipe) => {
        if (projetoEquipe.equipe.id == equipe.id) {
            idRetorno = projetoEquipe.id
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
    if (projetoEdita.value) {
        console.log("vai deletar")
        conexao.deletarProjetoEquipe(equipeVinculada.id, Number(idProjeto), "/equipe")
    }
    criarProjetoCookies();
    criaHistorico.criaHistoricoProjeto("Removeu uma Equipe", projeto, usuario)
}

async function removeResponsavel(responsavelRemover) {
    responsaveisProjeto.value.forEach((objetoAtual) => {
        if (objetoAtual.username == responsavelRemover.username) {
            let index = responsaveisProjeto.value.indexOf(responsavelRemover)
            responsaveisProjeto.value.splice(index, 1);
            listaAuxResponsaveisProjeto.splice(index, 1)
            listaResponsaveisBack.splice(index, 1);
            criaHistorico.criaHistoricoProjeto("Removeu o responsavel" + responsavelRemover.username, projeto, usuario)
        }
    }
    )
    if (!projetoEdita) {
        criarProjetoCookies();
    }
    if (responsavelRemover == usuario.username) {
        naoPodeDeletar.value = true;
    }
}
</script>

<style lang="scss">
.gridTotal {
    display: grid;
    width: 100%;
    height: 90%;
    grid-template-columns: 41.175% 41.175% 17.65%;
    ;
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