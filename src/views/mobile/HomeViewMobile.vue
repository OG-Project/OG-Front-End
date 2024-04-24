<template>
    <div class="w-full h-full flex flex-col items-center justify-center">
        <div class="h-16 flex items-center justify-center">
            <h1 class="text-5xl font-bold w-fit border-b-2 border-black">
                Bem-Vindo
                Lil X!
            </h1>
        </div>
        <div class="h-48 flex items-center justify-around w-full">
            <div class="text-xl flex flex-col items-center">
                <img :src="VerificadoVerdeIcon" />
                <p class="text-[#428A6A]">{{ tarefasFeitas }}</p>
                <p>Tarefas</p>
            </div>
            <div class="text-xl flex flex-col items-center">
                <img :src="VerificadoVermelhoIcon" />
                <p class="text-[#8A4242]">{{ tarefasNaoFeitas }}</p>
                <p>Tarefas</p>
            </div>
        </div>
        <div class="h-16 flex items-center justify-center">
            <h1 class="text-4xl w-fit font-bold">
                Minhas Tarefas
            </h1>
        </div>
        <div class="h-32 w-full flex items-center justify-around">
            <img :src="EstrelaHomeIcon" @click="trocaTopico('Tarefas Urgentes')" />
            <img :src="DiaHomeIcon" @click="trocaTopico('Tarefas do Dia')" />
            <img :src="SemanaHomeIcon" @click="trocaTopico('Tarefas da Semana')" />
            <img :src="MesHomeIcon" @click="trocaTopico('Tarefas do Mês')" />
        </div>
        <div class="w-[90%] h-[45vh] flex flex-col items-center"
            style="box-shadow: -2px 6px 13px 7px rgba(0, 0, 0, 0.18)">
            <h1 class="text-4xl pt-4">{{ nomeDoTopico }}</h1>
            <div class="w-[80%] h-[80%] flex flex-col gap-12 mt-6">
                <div v-for="projeto of listaDeProjetos"
                    class="w-[100%] h-[12%] bg-[#F6F6F6] flex items-center justify-around"
                    style="box-shadow: -2px 6px 13px 7px rgba(0, 0, 0, 0.18)">
                    <div class="m-4 flex w-[70%] justify-between" style="border-bottom: 2px solid #620ba7"
                        @click="redireciona('/projeto/kanban', projeto.id)">
                        <p>{{ projeto.nome }}</p>
                        <p v-if="projeto.responsaveis[0]">{{ projeto.responsaveis[0].responsavel.username }}</p>
                        <p v-if="!projeto.responsaveis[0]"> Não possui responsável</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script setup>
import { ref, onMounted } from 'vue';
import VerificadoVermelhoIcon from '../../assets/VerificadoVermelhoIcon.svg';
import VerificadoVerdeIcon from '../../assets/VerificadoVerdeIcon.svg';
import EstrelaHomeIcon from '../../assets/EstrelaHomeIcon.svg';
import DiaHomeIcon from '../../assets/DiaHomeIcon.svg';
import SemanaHomeIcon from '../../assets/SemanaHomeIcon.svg';
import MesHomeIcon from '../../assets/MesHomeIcon.svg';
import { conexaoBD } from "../../stores/conexaoBD.js"
import VueCookies from "vue-cookies";
import router from "@/router";

const banco = conexaoBD();
let nomeDoTopico = ref();
let listaDeProjetos = ref([]);
let tarefasFeitas = ref(0);
let tarefasNaoFeitas = ref(0);

function redireciona(rota, id) {
    VueCookies.set("IdProjetoAtual", id);
    router.push(rota);
}

async function verificaTarefasFeitas() {
    const equipeUsuario = await banco.procurar("/usuario/" + VueCookies.get("IdUsuarioCookie"));
    equipeUsuario.equipes.forEach(async equipe => {
        let projetosDoBanco = await banco.buscarProjetosEquipe(equipe.id, "/projeto/buscarProjetos");
        projetosDoBanco.forEach(projeto => {
            projeto.tarefas.forEach(tarefa => {
                tarefa.subTarefas.forEach(subtarefa => {
                    console.log(subtarefa);
                    if (subtarefa.concluido == true) {
                        tarefasFeitas.value++;
                    }
                    else {
                        tarefasNaoFeitas.value++;
                    }
                });
            });
        });
    });
    console.log(tarefasFeitas.value);
    console.log(tarefasNaoFeitas.value);
}

onMounted(() => {
    trocaTopico('Tarefas Urgentes')
    verificaTarefasFeitas();
});

function trocaTopico(nome) {
    if (nome === 'Tarefas Urgentes') {
        nomeDoTopico.value = "Tarefas Urgentes";
        console.log(nomeDoTopico.value);
        listaDeProjetos.value = [];
        pegaListaDeProjetosUrgentes();
    }
    else if (nome === 'Tarefas do Dia') {
        nomeDoTopico.value = "Tarefas do Dia";
        console.log(nomeDoTopico.value);
        listaDeProjetos.value = [];
        pegaListaDeProjetosDia();
    }
    else if (nome === 'Tarefas da Semana') {
        nomeDoTopico.value = "Tarefas da Semana";
        console.log(nomeDoTopico.value);
        listaDeProjetos.value = [];
        pegaListaDeProjetosSemana();
    }
    else if (nome === 'Tarefas do Mês') {
        nomeDoTopico.value = "Tarefas do Mês";
        console.log(nomeDoTopico.value);
        listaDeProjetos.value = [];
        pegaListaDeProjetosMes();
    }
}

async function pegaListaDeProjetosMes() {
    const equipeUsuario = await banco.procurar("/usuario/" + VueCookies.get("IdUsuarioCookie"));

    console.log(equipeUsuario.equipes);
    equipeUsuario.equipes.forEach(async equipe => {
        let projetoDoBanco = await banco.buscarProjetosEquipe(equipe.id, "/projeto/buscarProjetos")
        projetoDoBanco.forEach(projeto => {
            if (projeto.dataFinal) {
                const dataFinal = new Date(projeto.dataFinal);
                const dataAtual = new Date();
                console.log(dataFinal);
                console.log(dataAtual);
                if (dataFinal.getMonth() === dataAtual.getMonth() && dataFinal.getFullYear() === dataAtual.getFullYear()) {
                    listaDeProjetos.value.push(projeto);
                }
            }
        });
    });
    console.log(listaDeProjetos.value);
}

async function pegaListaDeProjetosUrgentes() {
    const equipeUsuario = await banco.procurar("/usuario/" + VueCookies.get("IdUsuarioCookie"));

    equipeUsuario.equipes.forEach(async equipe => {
        let projetosDoBanco = await banco.buscarProjetosEquipe(equipe.id, "/projeto/buscarProjetos");
        projetosDoBanco.forEach(projeto => {
            console.log(projeto.categoria);
            if (projeto.categoria === "urgentes") {
                listaDeProjetos.value.push(projeto);
            }
        });
    });
}

async function pegaListaDeProjetosSemana() {
    const equipeUsuario = await banco.procurar("/usuario/" + VueCookies.get("IdUsuarioCookie"));
    const dataAtual = new Date();
    const primeiroDiaSemana = new Date(dataAtual);
    primeiroDiaSemana.setDate(primeiroDiaSemana.getDate() - primeiroDiaSemana.getDay());
    const ultimoDiaSemana = new Date(primeiroDiaSemana);
    ultimoDiaSemana.setDate(ultimoDiaSemana.getDate() + 6);

    equipeUsuario.equipes.forEach(async equipe => {
        let projetoDoBanco = await banco.buscarProjetosEquipe(equipe.id, "/projeto/buscarProjetos")
        projetoDoBanco.forEach(projeto => {
            if (projeto.dataFinal) {
                const dataFinal = new Date(projeto.dataFinal);
                if (dataFinal >= primeiroDiaSemana && dataFinal <= ultimoDiaSemana) {
                    listaDeProjetos.value.push(projeto);
                }
            }
        });
    });
}

async function pegaListaDeProjetosDia() {
    const equipeUsuario = await banco.procurar("/usuario/" + VueCookies.get("IdUsuarioCookie"));
    const dataAtual = new Date();
    const primeiroDiaSemana = new Date(dataAtual);
    primeiroDiaSemana.setDate(primeiroDiaSemana.getDate() - primeiroDiaSemana.getDay());
    const ultimoDiaSemana = new Date(primeiroDiaSemana);
    ultimoDiaSemana.setDate(ultimoDiaSemana.getDate() + 6);

    equipeUsuario.equipes.forEach(async equipe => {
        let projetoDoBanco = await banco.buscarProjetosEquipe(equipe.id, "/projeto/buscarProjetos")
        projetoDoBanco.forEach(projeto => {
            if (projeto.dataFinal) {
                const dataFinal = new Date(projeto.dataFinal);
                if (dataFinal.toDateString() === dataAtual.toDateString()) {
                    listaDeProjetos.value.push(projeto);
                }
            }
        });
    });
}

</script>
