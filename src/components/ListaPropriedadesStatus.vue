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
                <div class="flex  flex-row items-center gap-4 h-[8vh]" v-for="propriedade of listaSelecionada">
                    <p class="w-[33%]">{{ propriedade.nome }}</p>
                    <p class="w-[33%]">Tipo: {{ propriedade.tipo }}</p>
                    <div class=" w-[50%] ">
                        <div v-if="tarefasAtribuidas"
                            class="bg-roxo-claro rounded-md w-full p-1 flex justify-center items-center "
                            @click="mudaPaginaParaKanban()">

                            Tarefas Atribuidas
                        </div>
                        <div v-if="!tarefasAtribuidas"
                            class="bg-cinza-claro rounded-md w-full p-1 flex justify-center items-center">
                            <p>Não há tarefas</p>
                        </div>
                    </div>

                </div>
                <!-- <div class="flex  flex-row items-center gap-4 h-[8vh]" v-for="propriedade of listaSelecionada"
                    v-if="listaSelecionada != []">
                    <p class="w-[33%]">{{ propriedade.nome }}</p>
                    <p class="w-[33%]">Tipo: {{ propriedade.tipo }}</p>
                    <div class=" w-[50%] ">
                        <div v-if="tarefasAtribuidas"
                            class="bg-roxo-claro rounded-md w-full p-1 flex justify-center items-center "
                            @click="mudaPaginaParaKanban()">
                            Tarefas Atribuidas
                        </div>
                        <div v-if="!tarefasAtribuidas"
                            class="bg-cinza-claro rounded-md w-full p-1 flex justify-center items-center">
                            <p>Não há tarefas</p>
                        </div>
                    </div>
                </div> -->
            </div>
            <div v-if="opcaoSelecionadaNaTabela == 'status'">
                <div v-for="status of listaSelecionada">
                    <div class="flex  flex-row items-center gap-4 h-[8vh]" @mouseenter="startTimer(status)"
                        @mouseleave="clearTimer(status)" v-if="status.verNomeCompleto == false">

                        <p class="w-[33%] truncate ">{{ status.status.nome }}</p>
                        <ColorPicker v-model="status.status.cor" @hide="atualizaStatus(status)"></ColorPicker>
                        <div class=" w-[50%] ml-20 ">
                            <div v-if="tarefasAtribuidas"
                                class="bg-roxo-claro rounded-md w-full p-1 flex justify-center items-center "
                                @click="mudaPaginaParaKanban()">
                                Tarefas Atribuidas
                            </div>
                            <div v-if="!tarefasAtribuidas"
                                class="bg-cinza-claro rounded-md w-full p-1 flex justify-center items-center">
                                <p>Não há tarefas</p>
                            </div>
                        </div>

                    </div>

                    <div class="flex  flex-row  gap-4 h-max" @mouseenter="startTimer(status)"
                        @mouseleave="clearTimer(status)" v-if="status.verNomeCompleto == true">
                        <p class="w-[33%] min-h-min h-[4vh] bg-brancoNeve break-words "
                            v-if="status.verNomeCompleto == true">{{
            status.status.nome }}</p>
                        <ColorPicker v-model="status.status.cor" @hide="atualizaStatus(status)"></ColorPicker>
                        <div class=" w-[50%] ml-20 ">
                            <div v-if="tarefasAtribuidas"
                                class="bg-roxo-claro rounded-md w-full p-1 flex justify-center items-center "
                                @click="mudaPaginaParaKanban()">
                                Tarefas Atribuidas
                            </div>
                            <div v-if="!tarefasAtribuidas"
                                class="bg-cinza-claro rounded-md w-full p-1 flex justify-center items-center">
                                <p>Não há tarefas</p>
                            </div>
                        </div>

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

                        <Botao preset="Confirmar" tamanhoPadrao="pequeno" :funcaoClick="criaPropriedadeBack">
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

                        <Botao preset="Confirmar" tamanhoPadrao="pequeno" :funcaoClick="criaStatusBack">
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
import sortBy from 'sort-by';
import { useRoute } from 'vue-router';
import { conexaoBD } from '../stores/conexaoBD';
import router from '../router/index'
const instance = getCurrentInstance();
const route = useRoute();
const conexao = conexaoBD();
const funcaoPopUp = funcaoPopUpStore();
let opcoesSelect = ref([]);
let opcaoSelecionadaNaTabela = ref("");
let buscarPor = ref("");
var listaPropriedades = ref([]);
var listaStatusBack = [];
let listaStatus = ref([])
let listaSelecionada = ref([]);
let nomePropriedade = ref("");
let nomeStatus = ref("");
let tipoPropriedade = ref("");
let auxParaCriarPropriedades = [];
let auxParaCriarStatus = [];
let auxRenderizaStatusTela = [];
let corStatus = ref("")
let projetoEdita = ref(false);
let timeoutId = null;
let idProjeto;
let tarefasAtribuidas = false

onMounted(() => {
    verificaEdicaoProjeto();
    buscaPropriedadeCookies();
    buscarStatusCookies();
    buscandoPor();
    navegaPelaTabela("");
    funcaoPopUp.variavelModal = false
    tarefasAtribuidas = false
}
)

function verificaEdicaoProjeto() {
    if (route.path == '/editaProjeto') {
        projetoEdita.value = true
    } else {
        projetoEdita.value = false
    }

}


function mudaPaginaParaKanban() {
    router.push('/projeto')
}

async function buscandoPor() {
    listaSelecionada.value = []
    if (opcaoSelecionadaNaTabela.value == "propriedade" || opcaoSelecionadaNaTabela.value == "") {
        console.log(buscarPor.value)
        if (buscarPor.value == "" || buscarPor.value == "A-Z" || buscarPor.value == "Z-A") {
            listaSelecionada.value = listaPropriedades.value
            console.log(listaSelecionada.value)
            return;
        }
        return listaSelecionada.value = filtroPropriedades(listaPropriedades.value, this.buscarPor);
    }
    if (opcaoSelecionadaNaTabela.value == "status") {
        if (buscarPor.value == "A-Z" || buscarPor.value == "") {
            return listaSelecionada.value = filtroStatus("A-Z");
        }
        return listaSelecionada.value = filtroStatus("Z-A");
    }
}

function filtroStatus(ordem) {

    let listaOrdenadaPorNome = []
    auxRenderizaStatusTela.forEach((statusAtual) => {
        listaOrdenadaPorNome.push(statusAtual.status.nome)
    });

    if (ordem == "Z-A") {
        return auxRenderizaStatusTela.sort((a, b) => {
            let itemA = a.status.nome.toLowerCase();
            let itemB = b.status.nome.toLowerCase();

            if (itemA < itemB) {
                return 1; // Retorna 1 para indicar que o itemA deve vir depois do itemB
            }
            if (itemA > itemB) {
                return -1; // Retorna -1 para indicar que o itemA deve vir antes do itemB
            }
            return 0;
        });

    }
        return auxRenderizaStatusTela.sort(sortBy('status.nome'));
}

function filtroPropriedades(listaRecebida, buscarPor) {
    var listaAux = []
    var listaAux1 = []
    listaAux = listaRecebida
    listaAux.forEach(opcaoAtual => {
        if (opcaoAtual.tipo != "") {
            if (opcaoAtual.tipo.toLowerCase() == buscarPor.toLowerCase()) {
                listaAux1.push(opcaoAtual)
            }
        }
    });
    return listaAux1;
}

function navegaPelaTabela(opcaoSelecionada) {
    if (opcaoSelecionada == '' || opcaoSelecionada == 'propriedade') {
        opcaoSelecionadaNaTabela.value = 'propriedade';
        opcoesSelect.value = ["Todos", "Data", "Numero", "Seleção", "Texto"];

    } else if (opcaoSelecionada == 'status') {
        opcaoSelecionadaNaTabela.value = 'status';
        opcoesSelect.value = ["A-Z", "Z-A"]
    }
}

function buscaPropriedadeCookies() {
    if (!projetoEdita.value) {
        buscaRascunhoPropiedade()
    } else {
        buscaPropriedadeBanco();
    }
    mandaProrpiedadesBack(listaPropriedades)
}

async function buscaPropriedadeBanco() {
    idProjeto = VueCookies.get("projetoEditarId");
    let projeto = await conexao.buscarUm(idProjeto, "/projeto")
    colocaListaTarefasDoProjeto(projeto.tarefas)
    if (projeto.propriedades != []) {
        projeto.propriedades.forEach((propriedade) => {
            if (propriedade.nome != '') {
                listaPropriedades.value.push(propriedade);

            }
        })
        auxParaCriarPropriedades = listaPropriedades.value;
        criaPropriedadeCookies();
    }
}

function colocaListaTarefasDoProjeto(tarefas) {
    if (tarefas != "") {
        tarefasAtribuidas = true;
    }
}
function buscaRascunhoPropiedade() {
    const propriedadeArmazenada = VueCookies.get("propriedadeCookie");
    if (propriedadeArmazenada == null) {
        return;
    }
    listaPropriedades.value = propriedadeArmazenada
    auxParaCriarPropriedades = propriedadeArmazenada
}

function mandaProrpiedadesBack(listaPropriedades) {
    const propriedadesParaback = listaPropriedades.value.map(objeto => {
        const objetoModificado = { ...objeto };
        if (objetoModificado.tipo == "Seleção") {
            objetoModificado.tipo = "SELECAO";
        }
        return objetoModificado;
    });
    instance.emit('mandaListaPropriedade', propriedadesParaback)
}

function criaPropriedadeCookies(propriedadeBack) {
    if (propriedadeBack != null) {
        let propriedadeFront = {
            propriedade: propriedadeBack,
            verNomeCompleto: false
        }
        if (propriedadeFront.propriedade.nome != '') {
            auxParaCriarPropriedades.push(propriedadeFront.propriedade)
        }

        listaPropriedades.value = auxParaCriarPropriedades
        nomePropriedade.value = "";
        tipoPropriedade.value = "";
        if (!projetoEdita.value) {
            VueCookies.set("propriedadeCookie", auxParaCriarPropriedades, 864000000)
        }
        funcaoPopUp.fechaPopUp();
        mandaProrpiedadesBack(listaPropriedades)
    }
}

function criaStatusBack() {

    let statusCriado = {
        nome: nomeStatus.value,
        cor: corStatus.value
    }

    auxParaCriarStatus.push(statusCriado);
    criaStatusCookies(statusCriado)
    mandaStatusBack();
}

function criaPropriedadeBack() {

    let statusCriado = {
        nome: nomePropriedade.value,
        tipo: tipoPropriedade.value
    }
    criaPropriedadeCookies(statusCriado)

}

function atualizaStatus(statusRecebido) {

    const statusAtulizados = listaStatus.value.map(objeto => {
        if (objeto.status == statusRecebido.status) {

            return statusRecebido;
        }
        return objeto;
    });

    auxRenderizaStatusTela = statusAtulizados;
    console.log(statusAtulizados)
    criaStatusCookies();
    mandaStatusBack();
}

function mandaStatusBack() {
    auxParaCriarStatus = []
    auxRenderizaStatusTela.map((objeto) => auxParaCriarStatus.push(objeto.status))
    listaStatusBack = auxParaCriarStatus;
    console.log(listaStatusBack)
    instance.emit('mandaListaStatusBack', listaStatusBack)
    nomeStatus.value = "";
    corStatus.value = "";
}

function criaStatusCookies(statusBack) {
    if (statusBack != null) {
        let statusFront = {
            status: statusBack,
            verNomeCompleto: false
        }
        auxRenderizaStatusTela.push(statusFront)

    }
    listaStatus.value = auxRenderizaStatusTela;
    if (!projetoEdita.value) {
        VueCookies.set("statusCookie", auxRenderizaStatusTela, 864000000)
    }
    funcaoPopUp.fechaPopUp();
}


function buscarStatusCookies() {
    if (!projetoEdita.value) {
        buscaRascunhoStatus();
    } else {
        buscaStatusBanco();
    }
}

function buscaRascunhoStatus() {
    if (VueCookies.get("statusCookie") != null) {
        listaStatus.value = VueCookies.get("statusCookie");
        console.log(VueCookies.get("statusCookie"))
        auxRenderizaStatusTela = listaStatus.value;
        mandaStatusBack();
    }
}

async function buscaStatusBanco() {
    idProjeto = VueCookies.get("projetoEditarId");
    let projeto = await conexao.buscarUm(idProjeto, "/projeto")
    if (projeto != null) {
        projeto.statusList.forEach((statusAtual) => {
            if (statusAtual.nome != '') {
                criaStatusCookies(statusAtual);
            }
        })
        mandaStatusBack();
    }
}

function startTimer(objeto) {
    timeoutId = setTimeout(() => {
        if (listaStatus.value.includes(objeto)) {
            if (objeto.status.nome.length > 10) {
                console.log('Hover ativado por 2 segundos');
                objeto.verNomeCompleto = true;
            }
            return;
        }
        if (objeto.propriedade.nome > 10) {
            objeto.verNomeCompleto = true;
        }

    }, 2000);
}

function clearTimer(objeto) {
    clearTimeout(timeoutId);
    objeto.verNomeCompleto = false;

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