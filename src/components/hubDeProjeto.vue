<template>
    <div v-if="enviandoMensagem" class="absolute w-full h-full z-[5]" @click="abreModalMensagem()">
    </div>
    <div  v-if="variavel == true && funcaoPopUp.variavelModal" class="flex justify-center">
        <ListaDeEquipesProjeto :boolean="listaDeEquipes"></ListaDeEquipesProjeto>
    </div>
    <div class="w-full h-[25vh] flex  items-center ">
        <div class="w-[60%] h-full flex flex-col items-center">
            <div class="w-[60%] h-[120px] border-b-4 flex flex-row items-end justify-between pb-[1%]">
                <div class="h-[12vh] flex items-end">
                    <p class="h-[8vh] w-[30vw] truncate flex items-center" style="font-size:var(--fonteTituloTamanho)">{{ projeto.nome }}</p>
                </div>
                <div class="flex items-end" v-if="verificaSeEResponsavel()"
                    @click="router.push('/projeto/responsavel')">
                    <Dashboard></Dashboard>
                </div>
            </div>
            <div class="w-[45%]  flex justify-end">
                {{ porcentagemDeConclusao }}
            </div>
        </div>
        <div class="w-[35%] h-[20%] flex flex-row gap-3 justify-end">
            <div class="w-[60%] h-full flex items-center gap-8">
                <span> Ver só as suas terefas</span>
                <div  @click="mudaEstadoDeVerSuasTarefas()">
                    <CheckBox :key="verSuaTarefas.valueOf" tamanho="pequeno" tipo="toggle"  :checked="verSuaTarefas" el-id="checkLibras">
                    </CheckBox>
                </div>
            </div>
            <button id="step-14" class="w-[20%] border-2 border-[var(--roxo)] flex justify-center items-center"
                @click="enviaCookieTarefaNova()">
                +Tarefa
            </button>
            <button class="w-[7%] border-2 border-[var(--roxo)] flex justify-center items-center"
                @click="abreModalMensagem()">
                <iconMensagem></iconMensagem>
            </button>
            <button class="w-[7%] border-2 border-[var(--roxo)] flex justify-center items-center"
                @click="enviaCookieProjeto()">
                <IconEngrenagem1></IconEngrenagem1>
            </button>
            <button class="w-[7%] border-2 border-[var(--roxo)] flex justify-center items-center"
                @click="abrePopUp(null, 'equipes')">
                <ImagemPessoasProjeto></ImagemPessoasProjeto>
            </button>
            <button class="w-[7%] border-2 border-[var(--roxo)] flex justify-center items-center"
            @click="abrePopUp(projeto, 'projeto')">
                <IconeHistorico  class="w-[70%] h-[100%]  cursor-pointer">
                </IconeHistorico>
            </button>

            
            <div v-if="enviandoMensagem" class=" animation">
                <comentarioProjeto></comentarioProjeto>
            </div>
        </div>

    </div>
    <div class="w-[80%] h-[3.5vh] flex flex-row justify-between align-bottom">
        <div class="pl-[7%] w-[80%] h-[100%] flex flex-row gap-[0.3%]">
            <button @click="router.push('/projeto/kanban')" v-bind="styleBotao()"
                :style="{ backgroundColor: corKanban, paddingLeft: '1%', paddingRight: '1%' }">
                Kanban
            </button>
            <button @click="router.push('/projeto/lista')" v-bind="styleBotao()"
                :style="{ backgroundColor: corLista, paddingLeft: '1%', paddingRight: '1%' }">
                Lista
            </button>
            <button @click="router.push('/projeto/timeline')" v-bind="styleBotao()"
                :style="{ backgroundColor: corTimeline, paddingLeft: '1%', paddingRight: '1%' }">
                Linha Do Tempo
            </button>
            <button @click="router.push('/projeto/calendario')" v-bind="styleBotao()"
                :style="{ backgroundColor: corCalendario, paddingLeft: '1%', paddingRight: '1%' }">
                Calendário
            </button>
        </div>
        <div v-if="$route.path === '/projeto/lista'"
            class="flex justify-center items-center bg-[var(--backgroundItemsClaros)] px-2 w-[17%] h-[3.5vh]">
            <MultiSelect v-model="listaPropriedadeVisiveis" isFocus="false" placeholder="Propriedades Visiveis" filter
                optionLabel="nome" :options="projeto.propriedades"
                :pt="{ root: 'select', labelContainer: 'labelContainer' }"
                class="bg-[var(--backgroundItemsClaros)] h-[3vh] w-[110%] flex justify-center items-center"
                :onclick="atualizaVisualizacao()"></MultiSelect>
        </div>
        
    </div>
    <HistoricoPopUp :texto-requisicao="textoRequisicao"
    :id="number.id" v-if="variavelHistorico == true && funcaoPopUp.variavelModal"></HistoricoPopUp>
</template>

<script setup>
import router from '@/router'
import Dashboard from '../assets/dashboard.vue';
import { conexaoBD } from '../stores/conexaoBD';
import VueCookies from 'vue-cookies';
import { onMounted, ref, watch } from 'vue';
import IconEngrenagem1 from '../assets/iconEngrenagem 1.vue';
import ImagemPessoasProjeto from '../assets/imagemPessoasProjeto.vue';
import ListaDeMembrosEquipe from '../components/listaMembrosEquipe.vue'
import ListaDeEquipesProjeto from './listaDeEquipesProjeto.vue';
import { funcaoPopUpStore } from '../stores/funcaoPopUp';
import iconMensagem from '../assets/iconMensagem.vue';
import MultiSelect from 'primevue/multiselect';
import comentarioProjeto from './comentarioProjeto.vue';
import { criaTarefaEBuscaStore } from '../stores/criaTarefaEBusca'
import HistoricoPopUp from "../components/HistoricoPopUp.vue";
import IconeHistorico from "../assets/historicoProjeto.vue";
import { inject } from 'vue';
import CheckBox from '../components/checkBox.vue'
import { getCurrentInstance } from 'vue';

const instance = getCurrentInstance();
let verSuaTarefas = ref(false)
let criaTarefa = criaTarefaEBuscaStore()
let listaPropriedadeVisiveis = ref([])
let api = conexaoBD()
let projetoId = VueCookies.get('IdProjetoAtual')
let projeto = ref({})
let tarefas = []
let porcentagemDeConclusao = ref("")
let tarefasConcluidas = []
let subtarefasConcluidas = ref([])
let subtarefas = ref([])
let listaDeEquipes = ref(false)
let funcaoPopUp = funcaoPopUpStore();
let funcaoAbrePopUp = ref(false);
let funcaoAbrePopUp2 = ref(false);

let visualizacao = ref({})
let enviandoMensagem = ref(false)
let corKanban = ref("var(--backgroundItemsClaros)")
let corLista = ref("var(--backgroundItemsClaros)")
let corTimeline = ref("var(--backgroundItemsClaros)")
let corCalendario = ref("var(--backgroundItemsClaros)")

let isResponsavel = ref(false)
const tour =inject('tour')
let number = ref();
let textoRequisicao = ref('');
let variavelHistorico = ref(false)
let variavel = ref(false)

async function abrePopUp(objeto, tipo) {
    if (tipo == 'projeto') {
        number.value = objeto;
        variavelHistorico.value = true;
        variavel.value = false;
        textoRequisicao.value = tipo;
        funcaoPopUp.abrePopUp()
    } else {
        variavelHistorico.value = false;
        variavel.value = true;
        mudaVariavelBooleana();


    }
}

onMounted(async () => {
    let visualizacaoAux = ref({})
    projeto.value = await api.buscarUm(projetoId, '/projeto')
    console.log(listaPropriedadeVisiveis.value)
    visualizacao.value = await api.buscarUm(projetoId, '/visualizacaoEmLista').then((response)=>{
        visualizacaoAux.value = response
    })
    visualizacao.value = visualizacaoAux.value
    if (visualizacao.value.propriedadeVisiveis != null) {
        listaPropriedadeVisiveis.value = visualizacao.value.propriedadeVisiveis
    }
    verificaSeEResponsavel()
    definePorcentagem()
    styleBotao()
})

async function verificaSeEResponsavel() {
    let usuario = VueCookies.get('IdUsuarioCookie')
    let responsaveis = projeto.value.responsaveis
    if (responsaveis != null) {
        for (const responsavel of responsaveis) {
            if (responsavel.idResponsavel == usuario) {
                isResponsavel.value= true
                return
            }
        }
    }
    isResponsavel.value = false
    return
}


function mudaEstadoDeVerSuasTarefas() {
    verSuaTarefas.value = !verSuaTarefas.value;
    instance.emit('verSuasTarefas', verSuaTarefas.value);
}

function styleBotao() {
    if (window.location.href.includes("lista")) {
        corLista.value = "var(--roxoClaro)"
        corKanban.value = "var(--backgroundItemsClaros)"
        corTimeline.value = "var(--backgroundItemsClaros)"
        corCalendario.value = "var(--backgroundItemsClaros)"
    }
    if (window.location.href.includes("kanban")) {
        corKanban.value = "var(--roxoClaro)"
        corLista.value = "var(--backgroundItemsClaros)"
        corTimeline.value = "var(--backgroundItemsClaros)"
        corCalendario.value = "var(--backgroundItemsClaros)"
    }
    if (window.location.href.includes("timeline")) {
        corTimeline.value = "var(--roxoClaro)"
        corKanban.value = "var(--backgroundItemsClaros)"
        corLista.value = "var(--backgroundItemsClaros)"
        corCalendario.value = "var(--backgroundItemsClaros)"
    }
    if (window.location.href.includes("calendario")) {
        corTimeline.value = "var(--backgroundItemsClaros)"
        corKanban.value = "var(--backgroundItemsClaros)"
        corLista.value = "var(--backgroundItemsClaros)"
        corCalendario.value = "var(--roxoClaro)"
    }
}

function atualizaVisualizacao() {
    setTimeout(() => {
    console.log(listaPropriedadeVisiveis.value)
    console.log( visualizacao.value)
    if( listaPropriedadeVisiveis.value!=''){
        visualizacao.value.propriedadeVisiveis = listaPropriedadeVisiveis.value
        api.atualizar(visualizacao.value, '/visualizacaoEmLista').then((response) => {
            console.log(response)
        })
    }
    }, 1000)
}

const emit = defineEmits(['atualizaPropriedadesVisiveis'])

watch(listaPropriedadeVisiveis, () => {
    emit('atualizaPropriedadesVisiveis', listaPropriedadeVisiveis.value)
})

async function enviaCookieTarefaNova() {
    VueCookies.set("IdTarefaCookies", 0, new Date())
    localStorage.setItem("TarefaNaoFinalizada", "", new Date())
    VueCookies.set('idReloadTarefa', '0');
    let usuario=await api.buscarUm(VueCookies.get('IdUsuarioCookie'),'/usuario')
    if(tour.isActive()){
        usuario.configuracao.ultimoPassoId='step-15'
        usuario.configuracao.rotaDoPasso='/criatarefa'
        api.atualizar(usuario,'/usuario')
        tour.next()
    }
    criaTarefa.criaTarefa()
    tour.show(usuario.value.configuracao.ultimoPassoId,true)
}
function enviaCookieProjeto() {
    VueCookies.set('idReloadProjeto', '0');
    router.push('/editaProjeto')
}
function mudaVariavelBooleana() {
    funcaoPopUp.abrePopUp()
}

function definePorcentagem() {
    tarefas = projeto.value.tarefas
    let string = ""
    let porcentagem = 0
    defineSubTarefasConcluida(tarefas)
    if (subtarefasConcluidas.value.length != 0 && subtarefasConcluidas.value != null) {
        porcentagem = (100 / subtarefas.value.length * (subtarefasConcluidas.value.length)).toFixed(2)

    }
    string = "Progressão " + porcentagem + "%"
    porcentagemDeConclusao.value = string
}
function defineSubTarefasConcluida(tarefas) {
    for (const tarefa of tarefas) {
        for (const subtarefa of tarefa.subTarefas) {
            subtarefas.value.push(subtarefa)
        }
    }
    subtarefasConcluidas.value = subtarefas.value.filter(subtarefa => subtarefa.concluido)
}

function abreModalMensagem() {
    enviandoMensagem.value = !enviandoMensagem.value
}

</script>

<style lang="scss">

.select:active {
    border: none;
    outline: none;
    border-radius: 0;
}

.labelContainer:active {
    border-color: grey;
    border: none;

    .animation {
        @apply absolute w-[30%] h-[80%] z-10;
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
}

.animation {
    @apply absolute  2xl:w-[30%] xl:w-[30%] lg:w-[30%]
     md:w-[80%] h-[70%] z-10 mobile:w-full miniMobile:w-full;
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