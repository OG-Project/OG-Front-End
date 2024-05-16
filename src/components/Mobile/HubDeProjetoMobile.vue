<template>
    <div v-if="enviandoMensagem" class="absolute w-full h-full z-[5]" @click="abreModalMensagem()">
    </div>
    <div v-if="funcaoPopUp.variavelModal == true" class="flex justify-center">
        <ListaDeEquipesProjeto :boolean="listaDeEquipes"></ListaDeEquipesProjeto>
    </div>
    <div class="w-full h-[13vh] flex  items-center ">
        <div class="w-[90%] h-[20vh] flex flex-col items-center ">
            <div class="w-[80%] h-[55%] border-b-4 flex items-end justify-between pb-[1%]"
                style="font-size:var(--fonteTituloTamanho)">
                <div class="h-[100%] flex items-end truncate">
                    <p class="h-[60%] pt-[2vh] truncate">{{ projeto.nome }}</p>
                </div>
            </div>
            <div class="w-[80%] mt-2  flex justify-start">
                {{ porcentagemDeConclusao }}
            </div>
        </div>
    </div>
    <div class="w-[80%] h-[10vh] flex flex-row justify-center items-center">
        <div class="pl-[7%] w-[90%] h-[50%] flex flex-row gap-[1%]">
            <button @click="router.push('/projeto/kanban')" v-bind="styleBotao()"
                :style="{ backgroundColor: corKanban, paddingLeft: '1%', paddingRight: '1%' }">
                <KanbanIcon cor="var(--fonteCor)"></KanbanIcon>
            </button>
            <button @click="router.push('/projeto/lista')" v-bind="styleBotao()"
                :style="{ backgroundColor: corLista, paddingLeft: '1%', paddingRight: '1%' }">
                <ListaIcon cor="var(--fonteCor)"></ListaIcon>
            </button>
            <button @click="router.push('/projeto/timeline')" v-bind="styleBotao()"
                :style="{ backgroundColor: corTimeline, paddingLeft: '1%', paddingRight: '1%' }">
                <TimelineIcon cor="var(--fonteCor)"></TimelineIcon>
            </button>
            <button @click="router.push('/projeto/calendario')" v-bind="styleBotao()"
                :style="{ backgroundColor: corCalendario, paddingLeft: '1%', paddingRight: '1%' }">
                <CalendarioIcon cor="var(--fonteCor)"></CalendarioIcon>
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
</template>

<script setup>
import router from '@/router'
import Dashboard from '../../assets/dashboard.vue';
import { conexaoBD } from '../../stores/conexaoBD';
import VueCookies from 'vue-cookies';
import { onMounted, ref, watch } from 'vue';
import IconEngrenagem1 from '../../assets/iconEngrenagem 1.vue';
import ImagemPessoasProjeto from '../../assets/imagemPessoasProjeto.vue';
import ListaDeMembrosEquipe from '../../components/listaMembrosEquipe.vue'
import ListaDeEquipesProjeto from '../listaDeEquipesProjeto.vue';
import { funcaoPopUpStore } from '../../stores/funcaoPopUp';
import iconMensagem from '../../assets/iconMensagem.vue';
import MultiSelect from 'primevue/multiselect';
import comentarioProjeto from '../comentarioProjeto.vue';
import { criaTarefaEBuscaStore } from '../../stores/criaTarefaEBusca'
import KanbanIcon from '../../assets/KanbanIcon.vue'
import ListaIcon from '../../assets/ListaIcon.vue'
import TimelineIcon from '../../assets/TimelineIcon.vue'
import CalendarioIcon from '../../assets/CalendarioIcon.vue'

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
let funcaoPopUp = funcaoPopUpStore()
let visualizacao = ref({})
let enviandoMensagem = ref(false)
let corKanban = ref("var(--backgroundItemsClaros)")
let corLista = ref("var(--backgroundItemsClaros)")
let corTimeline = ref("var(--backgroundItemsClaros)")
let corCalendario = ref("var(--backgroundItemsClaros)")

onMounted(async () => {
    projeto.value = await api.buscarUm(projetoId, '/projeto')
    console.log(projeto.value)
    visualizacao.value = await api.buscarUm(projetoId, '/visualizacaoEmLista')
    if (visualizacao.value.propriedadeVisiveis != null) {
        listaPropriedadeVisiveis.value = visualizacao.value.propriedadeVisiveis
    }
    console.log(visualizacao.value)
    definePorcentagem()
    styleBotao()
})

async function verificaSeEResponsavel() {
    let usuario = VueCookies.get('IdUsuarioCookie')
    let responsaveis = projeto.value.responsaveis
    console.log(responsaveis)
    if (responsaveis != null) {
        for (const responsavel of responsaveis) {
            if (responsavel.idResponsavel == usuario) {
                return true
            }
        }
    }
    return false

}

function styleBotao() {
    if (window.location.href.includes("lista")) {
        corLista.value = "#DBB3FF"
        corKanban.value = "var(--backgroundItemsClaros)"
        corTimeline.value = "var(--backgroundItemsClaros)"
        corCalendario.value = "var(--backgroundItemsClaros)"
    }
    if (window.location.href.includes("kanban")) {
        corKanban.value = "#DBB3FF"
        corLista.value = "var(--backgroundItemsClaros)"
        corTimeline.value = "var(--backgroundItemsClaros)"
        corCalendario.value = "var(--backgroundItemsClaros)"
    }
    if (window.location.href.includes("timeline")) {
        corTimeline.value = "#DBB3FF"
        corKanban.value = "var(--backgroundItemsClaros)"
        corLista.value = "var(--backgroundItemsClaros)"
        corCalendario.value = "var(--backgroundItemsClaros)"
    }
    if (window.location.href.includes("calendario")) {
        corTimeline.value = "var(--backgroundItemsClaros)"
        corKanban.value = "var(--backgroundItemsClaros)"
        corLista.value = "var(--backgroundItemsClaros)"
        corCalendario.value = "#DBB3FF"
    }
}

function atualizaVisualizacao() {
    setTimeout(() => {
        visualizacao.value.propriedadeVisiveis = listaPropriedadeVisiveis.value
        api.atualizar(visualizacao.value, '/visualizacaoEmLista')
    }, 1000)
}

const emit = defineEmits(['atualizaPropriedadesVisiveis'])

watch(listaPropriedadeVisiveis, () => {
    emit('atualizaPropriedadesVisiveis', listaPropriedadeVisiveis.value)
})

function enviaCookieTarefaNova() {
    VueCookies.set("IdTarefaCookies", 0, new Date())
    localStorage.setItem("TarefaNaoFinalizada", "", new Date())
    criaTarefa.criaTarefa()
    router.push('/criaTarefa')
}
function enviaCookieProjeto() {
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
    if (subtarefasConcluidas.length != 0) {
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

<style lang="scss"></style>