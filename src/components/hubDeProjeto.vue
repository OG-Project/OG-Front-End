<template>
    <div v-if="enviandoMensagem" class="absolute w-full h-full z-[5]" @click="abreModalMensagem()">
    </div>
    <div v-if="funcaoPopUp.variavelModal == true" class="flex justify-center">
        <ListaDeEquipesProjeto :boolean="listaDeEquipes"></ListaDeEquipesProjeto>
    </div>
    <div class="w-full h-[30%] flex  items-center ">
        <div class="w-[60%] h-full flex flex-col items-center">
            <div class="w-[60%] h-[50%] border-b-4 text-[64px] flex items-end justify-between pb-[1%]">
                <div class="h-[45%]">
                    {{ projeto.nome }}
                </div>
                <div class="flex items-end">
                    <Dashboard></Dashboard>
                </div>
            </div>
            <div class="w-[45%]  flex justify-end">
                {{ porcentagemDeConclusao }}
            </div>
        </div>
        <div class="w-[35%] h-[20%] flex flex-row gap-3 justify-end">
            <button class="w-[20%] border-2 border-[#620BA7] flex justify-center items-center"
                @click="enviaCookieTarefaNova()">
                +Tarefa
            </button>
            <button class="w-[7%] border-2 border-[#620BA7] flex justify-center items-center"
                @click="abreModalMensagem()">
                <iconMensagem></iconMensagem>
            </button>
            <button class="w-[7%] border-2 border-[#620BA7] flex justify-center items-center"
                @click="enviaCookieProjeto()">
                <IconEngrenagem1></IconEngrenagem1>
            </button>
            <button class="w-[7%] border-2 border-[#620BA7] flex justify-center items-center"
                @click="mudaVariavelBooleana()">
                <ImagemPessoasProjeto></ImagemPessoasProjeto>
            </button>
                <div v-if="enviandoMensagem" class=" animation">
                    <comentarioProjeto></comentarioProjeto>
                </div>
        </div>
        
    </div>
    <div class="w-[80%] flex flex-row justify-around">
        <div class="pl-[7%] w-[80%] h-[100%] flex flex-row gap-[0.3%]">
            <button @click="router.push('/projeto/kanban')" class="bg-[#CECCCE] px-[1%]">
                Kanban
            </button>
            <button @click="router.push('/projeto/lista')" class="bg-[#CECCCE] px-[1%]">
                Lista
            </button>
            <button @click="router.push('/projeto/timeline')" class="bg-[#CECCCE] px-[1%]">
                Linha Do Tempo
            </button>
            <button @click="router.push('/projeto/calendario')" class="bg-[#CECCCE] px-[1%]">
                Calendário
            </button>
        </div>
        <div v-if="$route.path === '/projeto/lista'" class="flex flex-row bg-[#CECCCE] px-2" >
            Propriedades Visiveis
            <select v-model="listaPropriedadeVisiveis" multiple :options="listaPropriedadeVisiveis"></select>
        </div>
    </div>
</template>

<script setup>
import router from '@/router'
import Dashboard from '../assets/dashboard.vue';
import { conexaoBD } from '../stores/conexaoBD';
import VueCookies from 'vue-cookies';
import { onMounted, ref } from 'vue';
import IconEngrenagem1 from '../assets/iconEngrenagem 1.vue';
import ImagemPessoasProjeto from '../assets/imagemPessoasProjeto.vue';
import ListaDeMembrosEquipe from '../components/listaMembrosEquipe.vue'
import ListaDeEquipesProjeto from './listaDeEquipesProjeto.vue';
import { funcaoPopUpStore } from '../stores/funcaoPopUp';
import iconMensagem from '../assets/iconMensagem.vue';
import comentarioProjeto from './comentarioProjeto.vue';
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
onMounted(async () => {
    projeto.value = await api.buscarUm(projetoId, '/projeto')
    visualizacao.value = await api.buscarUm(projetoId, '/visualizacaoEmLista')
    console.log(visualizacao)
    listaPropriedadeVisiveis.value = visualizacao.propriedadesVisiveis
    definePorcentagem()
})


function enviaCookieTarefaNova() {
    VueCookies.set("IdTarefaCookies", 0, new Date())
    localStorage.setItem("TarefaNaoFinalizada", "", new Date())
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

    if (tarefas.length > 0) {
        porcentagem = (100 / subtarefas.value.length * (subtarefasConcluidas.value.length)).toFixed(2)
    }
    string = "Progressão " + porcentagem + "%"
    console.log(string)
    porcentagemDeConclusao = string
}
function defineSubTarefasConcluida(tarefas) {
    for (const tarefa of tarefas) {
        for (const subtarefa of tarefa.subTarefas) {
            subtarefas.value.push(subtarefa)
        }
    }
    subtarefasConcluidas.value = subtarefas.value.filter(subtarefa => subtarefa.concluido)
}

function abreModalMensagem(){
    enviandoMensagem.value=!enviandoMensagem.value
    console.log(enviandoMensagem.value)
}

</script>

<style lang="scss">

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
</style>