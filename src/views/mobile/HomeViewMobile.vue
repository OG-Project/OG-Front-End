<template>
    <div class="w-full h-full flex flex-col items-center justify-center">
        <div class="h-16 flex items-center justify-center">
            <h1 class="text-3xl sm:text-5xl font-bold w-fit border-b-2 border-black" v-if="usuarioCookies">
                {{ $t('home.bemVindoUsuario', {nome: usuarioCookies.username}) }}
            </h1>
        </div>
        <div class="h-48 flex items-center justify-around w-full">
            <div class="text-xl flex flex-col items-center">
                <img :src="VerificadoVerdeIcon" />
                <p class="text-[#428A6A]">{{ $t('home.tarefasFeitas') }}</p>
                <p>{{ tarefasFeitas }}</p>
            </div>
            <div class="text-xl flex flex-col items-center">
                <img :src="VerificadoVermelhoIcon" />
                <p class="text-[#8A4242]">{{ $t('home.tarefasNaoFeitas') }}</p>
                <p>{{ tarefasNaoFeitas }}</p>
            </div>
        </div>
        <div class="h-16 flex items-center justify-center">
            <h1 class="text-3xl sm:text-4xl w-fit font-bold">
                {{ $t('home.minhasTarefas') }}
            </h1>
        </div>
        <div class="h-32 w-full flex items-center justify-around">
            <EstrelaHomeIcon @click="trocaTopico('Projetos Urgentes')" />
            <DiaHomeIcon @click="trocaTopico('Projetos do Dia')" />
            <SemanaHomeIcon @click="trocaTopico('Projetos da Semana')" />
            <MesHomeIcon @click="trocaTopico('Projetos do Mês')" />
        </div>
        <div class="w-[90%] h-[45vh] flex flex-col items-center"
            style="box-shadow: -2px 6px 13px 7px rgba(0, 0, 0, 0.18)">
            <h1 class="text-2xl sm:text-4xl pt-4">{{ nomeDoTopico }}</h1>
            <div class="w-[80%] h-[80%] flex flex-col gap-12 mt-6">
                <div v-for="projeto of listaDeProjetos"
                    class="w-[100%] h-[12%] bg-[#F6F6F6] flex items-center justify-around"
                    style="box-shadow: -2px 6px 13px 7px rgba(0, 0, 0, 0.18)">
                    <div class="m-4 flex w-[70%] justify-between" style="border-bottom: 2px solid var(--roxo)"
                        @click="redireciona('/projeto/kanban', projeto.id)">
                        <p>{{ projeto.nome }}</p>
                        <p v-if="projeto.responsaveis[0]">{{ projeto.responsaveis[0].responsavel.username }}</p>
                        <p v-if="!projeto.responsaveis[0]">{{ $t('home.naoPossuiResponsavel') }}</p>
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
import EstrelaHomeIcon from '../../assets/EstrelaHomeIcon.vue';
import DiaHomeIcon from '../../assets/DiaHomeIcon.vue';
import SemanaHomeIcon from '../../assets/SemanaHomeIcon.vue';
import MesHomeIcon from '../../assets/MesHomeIcon.vue';
import { conexaoBD } from "../../stores/conexaoBD.js"
import VueCookies from "vue-cookies";
import router from "@/router";

const banco = conexaoBD();
let nomeDoTopico = ref();
let listaDeProjetos = ref([]);
let tarefasFeitas = ref(0);
let tarefasNaoFeitas = ref(0);
let usuarioCookies;
let usuarioId = VueCookies.get("IdUsuarioCookie");

async function pegaUsuario() {
    let usuario = await banco.procurar("/usuario/" + VueCookies.get("IdUsuarioCookie"));
    return usuario;
}

async function autenticarUsuario(id) {
    let usuarios = banco.procurar("/usuario");
    let listaUsuarios = await usuarios;
    let usuario = listaUsuarios.find((usuario) => usuario.id == id);
    return usuario;
}

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

onMounted(async () => {
    usuarioCookies = await autenticarUsuario(usuarioId);
    trocaTopico('Projetos Urgentes')
    verificaTarefasFeitas();
});

function trocaTopico(nome) {
    if (nome === 'Projetos Urgentes') {
        nomeDoTopico.value = "Projetos Urgentes";
        console.log(nomeDoTopico.value);
        listaDeProjetos.value = [];
        pegaListaDeProjetosUrgentes();
    }
    else if (nome === 'Projetos do Dia') {
        nomeDoTopico.value = "Projetos do Dia";
        console.log(nomeDoTopico.value);
        listaDeProjetos.value = [];
        pegaListaDeProjetosDia();
    }
    else if (nome === 'Projetos da Semana') {
        nomeDoTopico.value = "Projetos da Semana";
        console.log(nomeDoTopico.value);
        listaDeProjetos.value = [];
        pegaListaDeProjetosSemana();
    }
    else if (nome === 'Projetos do Mês') {
        nomeDoTopico.value = "Projetos do Mês";
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
    try {
        const equipeUsuario = await banco.procurar("/usuario/" + VueCookies.get("IdUsuarioCookie"));
        let dataAtual;
        let dia = new Date().getDate();
        let mes = new Date().getMonth();
        let ano = new Date().getFullYear();
        dataAtual = `${ano}-${'0' + (mes + 1)}-${dia}`;

        for (const equipe of equipeUsuario.equipes) {
            const projetosDaEquipe = await banco.buscarProjetosEquipe(equipe.id, "/projeto/buscarProjetos");

            for (const projeto of projetosDaEquipe) {
                if (projeto.dataFinal) {

                    console.log(projeto.dataFinal);
                    console.log(dataAtual);

                    // Comparando apenas dia, mês e ano das datas
                    if (projeto.dataFinal == dataAtual) {
                        listaDeProjetos.value.push(projeto);
                    }
                }
            }
        }
    } catch (error) {
        console.error("Erro ao buscar projetos do dia:", error);
    }
}


</script>
