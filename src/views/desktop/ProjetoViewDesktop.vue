<template>
    <div class="w-full  flex flex-col items-center justify-end overflow-hidden">
        <hubDeProjeto @trocaValor="(event) => opcao = event"
            @atualizaPropriedadesVisiveis="atualizaValorDaLista($event)" @verSuasTarefas="atualizaListaDeTarefaVisivel">
        </hubDeProjeto>
        <div id="step-17" class="w-full h-[63vh] flex justify-center items-end">
            <div class="divMaior ">
                <div v-if="defineOpcao(route.path, '/projeto/calendario')"
                    class="w-[100%] h-screen flex justify-center items-center">
                    <calendario :listaTarefas="listaTarefaEnvio"></calendario>
                </div>
                <div v-if="defineOpcao(route.path, '/projeto/timeline')"
                    class="w-[100%] h-screen flex justify-center items-center">
                    <timeLine></timeLine>
                </div>
                <div v-if="defineOpcao(route.path, '/projeto/kanban')"
                    class="w-full max-w-full h-screen flex justify-start px-4 items-center overflow-x-auto">
                    <KanbanDeStatus></KanbanDeStatus>
                </div>
                <div v-if="defineOpcao(route.path, '/projeto/lista') && listaDePropriedadesVisiveis.length < 7"
                    class="w-full max-w-full h-screen flex justify-center px-4 items-center overflow-x-auto">
                    <cardList :projeto="projeto.value" :listaDePropriedadesVisiveis="listaDePropriedadesVisiveis">
                    </cardList>
                </div>
                <div v-if="defineOpcao(route.path, '/projeto/lista') && listaDePropriedadesVisiveis.length >= 7"
                    class="w-full max-w-full h-screen flex justify-start px-4 items-center overflow-x-auto">
                    <cardList :projeto="projeto.value" :listaDePropriedadesVisiveis="listaDePropriedadesVisiveis">
                    </cardList>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import calendario from '../../components/calendario.vue';
import KanbanDeStatus from '../../components/KanbanDeStatus.vue';
import timeLine from '../../components/timeLine.vue';
import cardList from '../../components/CardTarefaList.vue';
import hubDeProjeto from '../../components/hubDeProjeto.vue'
import { conexaoBD } from '../../stores/conexaoBD';
import { useRoute } from 'vue-router';
import { editaProjetoStore } from '../../stores/editaProjeto';
import VueCookies from 'vue-cookies';
import { Usuario } from '../../models/usuario';
let tempoAtuado;
let horaEntrada;
let listaDePropriedadesVisiveis = ref([])
let idProjeto = VueCookies.get("IdProjetoAtual")
let IdUsuarioCookie = VueCookies.get("IdUsuarioCookie")
let projeto = ref({})
let listaTarefaEnvio = ref([]);
const banco = conexaoBD();
onMounted(async () => {
    projeto.value = await banco.buscarUm(idProjeto, "/projeto")
    timerTempoAtuacao();
    atualizaListaDeTarefaVisivel(false);
})

function reloadTelaProjeto() {
    const reload = VueCookies.get('idReloadProjeto');
    if (reload == '0') {
        console.log("reload")
        VueCookies.set('idReloadProjeto', '1');
        window.location.reload();
    }
}

reloadTelaProjeto()


async function atualizaListaDeTarefaVisivel(verSuaTarefas) {
    let listaAuxParaAtualizar =[]
    listaTarefaEnvio.value = []
    if (verSuaTarefas) {
        let tarefas = projeto.value.tarefas
        tarefas.forEach(tarefa => {
            console.log(tarefa);
            tarefa.responsaveis.forEach(async (tarefaResponsavel) => {
                lo
                if (tarefaResponsavel.responsavel.id == Number(IdUsuarioCookie)) {
                    listaAuxParaAtualizar.push(tarefa)
                }
            })
            listaTarefaEnvio.value = listaAuxParaAtualizar;
            console.log(listaTarefaEnvio.value);
        });
        return
    } else {
         banco.buscarUm(idProjeto, '/projeto').then((response)=>{
            listaTarefaEnvio.value = response.tarefas;
            return
        })
    }
    listaTarefaEnvio.value=[]
}

const editaProjetoFunc = editaProjetoStore();


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
    let segundos
    let minutos
    let horas
    let segundosSoma = 0
    let minutosSoma = 0
    let horasSoma = 0
    if (projeto.value.tempoAtuacao != null && projeto.value.tempoAtuacao != undefined && projeto.value.tempoAtuacao != 0 && projeto.value.tempoAtuacao != "") {
        [horasSoma, minutosSoma, segundosSoma] = projeto.value.tempoAtuacao.split(":").map(Number);
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
function atualizaValorDaLista(objeto) {
    listaDePropriedadesVisiveis.value = objeto
}


async function atualizaProjetoBanco() {
    let idProjeto = VueCookies.get("IdProjetoAtual")
    let projeto = await banco.buscarUm(idProjeto, "/projeto")
    //(id: any, nome: any, descricao: any, equipes: any, propriedades: any, status: any, responsaveis: any, dataFinal: any, tempoAtuacao: any)
    console.log(projeto.projetoEquipes)
    editaProjetoFunc.editaProjeto(projeto.id, projeto.nome, projeto.descricao, projeto.projetoEquipes, projeto.propriedades
        , projeto.statusList, projeto.responsaveis, projeto.dataFinal, tempoAtuado, projeto.categoria, projeto.indexLista, projeto.comentarios, projeto.tarefas)
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
    background-color: var(--backgroundItems);
    clip-path: polygon(5% 0, 95% 0, 100% 9%, 100% 100%, 0 100%, 0 10%);
    position: relative;
    border: 2px solid var(--backgroundItems);
    border-top: none;

}
</style>
