
<template>
    <div class="w-full h-full flex flex-col items-center justify-end overflow-hidden">
        <hubDeProjeto @trocaValor="(event) => opcao = event" :projeto="projeto"></hubDeProjeto>
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
import { onMounted, ref } from 'vue';
import calendario from '../components/calendario.vue';
import KanbanDeStatus from '../components/KanbanDeStatus.vue';
import timeLine from '../components/timeLine.vue';
import cardList from '../components/CardTarefaList.vue';
import hubDeProjeto from '../components/hubDeProjeto.vue'
import { conexaoBD } from '../stores/conexaoBD';
import { useRoute } from 'vue-router';
import VueCookies from 'vue-cookies';

const route = useRoute()
let api = conexaoBD()
let projetoId = VueCookies.get('IdProjetoAtual')
let projeto = defineProjeto()

onMounted(()=>{

})

async function defineProjeto(){
    let projeto2 = await api.buscarUm(projetoId, '/projeto')
    console.log(projeto2)
    return projeto2
} 

function defineOpcao(rotaAtual, rota) {
    if (rotaAtual == rota) {
        return true
    }
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
    border: 2px solid rgb(235, 235, 235);
    border-top: none;

}</style>

