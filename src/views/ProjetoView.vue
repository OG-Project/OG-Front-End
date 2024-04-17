<template>
    <div class="w-full h-full flex flex-col items-center justify-end overflow-hidden">
        <hubDeProjeto @trocaValor="(event) => opcao = event"></hubDeProjeto>
        <div class="w-full h-[72%] flex justify-center items-end">
            <div class="divMaior ">
                <div v-if="defineOpcao(route.path, '/projeto/calendario')"
                    class="w-[100%] h-screen flex justify-center items-center">
                    <calendario></calendario>
                </div>
                <div v-if="defineOpcao(route.path, '/projeto/timeline')"
                    class="w-[100%] h-screen flex justify-center items-center">
                    <timeLine></timeLine>
                </div>
                <div v-if="defineOpcao(route.path, '/projeto/kanban')"
                    class="w-[100%] h-screen flex justify-center items-center">
                    <KanbanDeStatus></KanbanDeStatus>
                </div>
                <div v-if="defineOpcao(route.path, '/projeto/lista')"
                    class="w-[100%] h-screen flex justify-center items-center">
                    <cardList></cardList>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import calendario from '../components/calendario.vue';
import KanbanDeStatus from '../components/KanbanDeStatus.vue';
import timeLine from '../components/timeLine.vue';
import cardList from '../components/CardTarefaList.vue';
import hubDeProjeto from '../components/hubDeProjeto.vue'
import { conexaoBD } from '../stores/conexaoBD';
import { useRoute } from 'vue-router';
import { editaProjetoStore } from '../stores/editaProjeto';
import VueCookies from 'vue-cookies';
let tempoAtuado;
let horaEntrada;
let horaSaida;
const banco = conexaoBD();


const editaProjetoFunc = editaProjetoStore();
onMounted(() => {
    
    timerTempoAtuacao();
})

onUnmounted(() => {
    calculaTempoAtuacao()
})

const route = useRoute()

function defineOpcao(rotaAtual, rota) {
    if (rotaAtual == rota) {
        return true
    }
}

async function calculaTempoAtuacao() {
    let idProjeto = VueCookies.get("IdProjetoAtual")
    let projeto = await banco.buscarUm(idProjeto, "/projeto")
    let segundos
    let minutos
    let horas
    let segundosSoma = 0
    let minutosSoma = 0
    let horasSoma = 0
    if (projeto.tempoAtuacao != null && projeto.tempoAtuacao != undefined && projeto.tempoAtuacao != 0 && projeto.tempoAtuacao != "") {
        [horasSoma, minutosSoma, segundosSoma] = projeto.tempoAtuacao.split(":").map(Number);
        console.log(horasSoma)
    }
    const horaSaida = new Date().getTime();
    const diferenca = horaSaida - horaEntrada;
    segundos = Math.floor((diferenca / 1000) % 60);
    minutos = Math.floor((diferenca / (1000 * 60)) % 60);
    horas = Math.floor(diferenca / (1000 * 60 * 60));

    segundos += segundosSoma;
    minutos += minutosSoma;
    horas += horasSoma;
    console.log(horasSoma)
    minutos += Math.floor(segundos / 60);
    segundos = segundos % 60;

    horas += Math.floor(minutos / 60);
    minutos = minutos % 60;

    segundos = segundos < 10 ? `0${segundos}` : segundos;
    minutos = minutos < 10 ? `0${minutos}` : minutos;
    horas = horas < 10 ? `0${horas}` : horas;

    tempoAtuado = `${horas}:${minutos}:${segundos}`;
    console.log(tempoAtuado)
    atualizaProjetoBanco();
}

function timerTempoAtuacao() {
    horaEntrada = new Date().getTime()
}

async function atualizaProjetoBanco() {
    let idProjeto = VueCookies.get("IdProjetoAtual")
    let projeto = await banco.buscarUm(idProjeto, "/projeto")
    //(id: any, nome: any, descricao: any, equipes: any, propriedades: any, status: any, responsaveis: any, dataFinal: any, tempoAtuacao: any)
    console.log(projeto)
    editaProjetoFunc.editaProjeto(projeto.id, projeto.nome, projeto.descricao, projeto.projetoEquipes, projeto.propriedades, projeto.status, projeto.responsaveis, projeto.dataFinal, tempoAtuado)
}

</script>
<style>
.divMaior {
    display: flex;
    flex-direction: column;
    width: 90%;
    height: 100%;
    align-items: center;
    justify-content: center;
    background-color: #FBFBFB;
    clip-path: polygon(5% 0, 95% 0, 100% 9%, 100% 100%, 0 100%, 0 10%);
    position: relative;
    border: 2px solid rgb(235, 235, 235);border-top: none;

}
</style>
