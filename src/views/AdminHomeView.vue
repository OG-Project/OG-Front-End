<template>
    <div class="h-[90%]">
        <div v-if="screenWidth >= 1024" class="h-[90%]">
            <TelaAdmViewDesktop></TelaAdmViewDesktop>
        </div>
        <div v-else>
            <TelaAdmViewMobile></TelaAdmViewMobile>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue'
const screenWidth = ref(window.innerWidth)
import TelaAdmViewDesktop from './desktop/TelaAdministradorDesktop.vue';
import TelaAdmViewMobile from './mobile/TelaAdministradorMobile.vue';
import { format } from "date-fns";
import { ref, onMounted, computed } from 'vue'
import Chart from 'chart.js/auto'
let chart = null
import { conexaoBD } from "../stores/conexaoBD.js";
import VueCookies from "vue-cookies";
import checkBox from "../components/checkBox.vue";
import AprovedIcon from "../assets/AprovadoAdm.vue";
import RejectedIcon from "../assets/VoltaAdm.vue";
import IconeHistorico from "../assets/Historico.vue";
import HistoricoPopUp from "../components/HistoricoPopUp.vue";
import { funcaoPopUpStore } from "../stores/funcaoPopUp";

let number = ref();
let textoRequisicao = ref('');

import router from '@/router';

import tinycolor from "tinycolor2";
import CheckBox from "../components/checkBox.vue";
const funcaoPopUp = funcaoPopUpStore();
funcaoPopUp.variavelModal = false;

async function abrePopUp(objeto, tipo) {
    if(tipo == 'tarefa'){
        number.value = objeto;
        console.log(number.value.id)
        textoRequisicao.value = tipo;
        console.log(textoRequisicao.value)
        funcaoPopUp.abrePopUp()
    }else if(tipo == "projeto"){
        number.value = objeto;
        console.log(number.value.id)
        textoRequisicao.value = tipo;
        console.log(textoRequisicao.value)
    }
        
}

function corDaFonte(backgroundColor) {
    const isLight = tinycolor(backgroundColor).isLight();
    return isLight ? "#000" : "#fff";
}

function redirecionamento(local, id) {
    localStorage.removeItem('TarefaNaoFinalizada')
    VueCookies.set('idReloadTarefa', '0');
    VueCookies.set('IdTarefaCookies', id, 100000000)
    router.push(local)
}

async function deixaTarefaConcluida(tarefa, status) {
    banco.buscarTarefaProjeto(VueCookies.get('IdProjetoAtual'), '/projeto').then((projeto) => {
        let emProgresso = {}
        let pronto = {}
        console.log(projeto);
        projeto.statusList.forEach(status => {
            if (status.nome == 'Em Progresso') {
                emProgresso = status
            }
            if (status.nome == 'Pronto') {
                pronto = status
            }
        })
        if (status == 'Rejeitado') {
            tarefa.concluida = false
            tarefa.status = emProgresso
            banco.atualizar(tarefa, "/tarefa")
        }
        else {
            tarefa.concluida = true
            tarefa.status = pronto
            banco.atualizar(tarefa, "/tarefa")
        }
    })
}

const banco = conexaoBD();

let projeto = ref({})

async function pegaTarefasDoProjeto() {
    banco.buscarTarefaProjeto(VueCookies.get('IdProjetoAtual'), '/projeto').then((projeto) => {
        projeto.tarefas.forEach(tarefa => {
            if (tarefa.nome == null) {
                tarefa.nome = "Tarefa sem nome"
            }
        });
        projeto.value = projeto
        tarefas.value = projeto.tarefas
        console.log(tarefas.value);
    })
    renderChart('bar');
}
watch(() => window.innerWidth, () => {
    screenWidth.value = window.innerWidth
})
onMounted(() => {
    window.addEventListener('resize', () => {
        screenWidth.value = window.innerWidth
    })
    console.log("entrou na home on mounted");
})
</script>