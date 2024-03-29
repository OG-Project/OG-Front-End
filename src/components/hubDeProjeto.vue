<template>
    <div class="w-full h-[30%] flex  items-center">
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
        <div class="w-[40%]">

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
        <div class="w-max bg-[#CECCCE] px-2 flex flex-row justify-center items-center">
            <svg width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M0.152344 0.328613V10.3198H9.81154V0.328613H0.152344ZM13.0313 0.328613V3.659H25.9102V0.328613H13.0313ZM13.0313 6.98939V10.3198H22.6905V6.98939H13.0313ZM0.152344 13.6502V23.6413H9.81154V13.6502H0.152344ZM13.0313 13.6502V16.9806H25.9102V13.6502H13.0313ZM13.0313 20.3109V23.6413H22.6905V20.3109H13.0313Z"
                    fill="black" />
            </svg>
            <button class="w-[110%]">
                Agrupar Por: status
            </button>
        </div>
    </div>
</template>

<script setup>
import router from '@/router'
import Dashboard from '../assets/dashboard.vue';
import { conexaoBD } from '../stores/conexaoBD';
import VueCookies from 'vue-cookies';
import { onMounted, ref } from 'vue';

let api = conexaoBD()
let projetoId = VueCookies.get('IdProjetoAtual')
let projeto = ref({})
let tarefas = []
let porcentagemDeConclusao = ref("")
let tarefasConcluidas = []
let subtarefasConcluidas = ref([])
let subtarefas = ref([])

onMounted(async () => {
    projeto.value = await api.buscarUm("1", '/projeto')
    definePorcentagem()
})



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
    for(const tarefa of tarefas){
        for(const subtarefa of tarefa.subTarefas){
            subtarefas.value.push(subtarefa)
        }
    }
    subtarefasConcluidas.value = subtarefas.value.filter(subtarefa => subtarefa.concluido)
}


</script>

<style lang="scss"></style>