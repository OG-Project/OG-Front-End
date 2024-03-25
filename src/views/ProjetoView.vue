
<template>
    <div>
        
    </div>
    <div class="w-full h-full flex flex-col items-center justify-end overflow-hidden">
        <hubDeProjeto @trocaValor="(event)=>opcao=event"></hubDeProjeto>
        <div class="w-full h-[72%] flex justify-center items-end" >
            <div class="divMaior">
                <div v-if="opcao == 'Calendario'" class="w-[100%] h-screen flex justify-center items-center">
                    <calendario></calendario>
                </div>
                <div v-if="opcao == 'TimeLine'" class="w-[100%] h-screen flex justify-center items-center">
                    <timeLine></timeLine>
                </div>
                <div v-if="opcao == 'Kanban'" class="w-[100%] h-screen flex justify-center items-center">
                    <KanbanDeStatus></KanbanDeStatus>
                </div>
                <div v-if="opcao == 'Lista'" class="w-[100%] h-screen flex justify-center items-center">
                    <cardList></cardList>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import calendario from '../components/calendario.vue';
import KanbanDeStatus from '../components/KanbanDeStatus.vue';
import timeLine from '../components/timeLine.vue';
import cardList from '../components/CardTarefaList.vue';
import hubDeProjeto from '../components/hubDeProjeto.vue'

let opcao = ref("Lista")
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


}
</style>

