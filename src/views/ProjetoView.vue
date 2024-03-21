
<template>
    <div class="w-full h-full">
        <select v-model="opcao" class="w-[5%] h-[5%]">
            <option>
                calendario
            </option>
            <option>
                timeLine
            </option>
            <option>
                Kanbam
            </option>
            <option>
                Lista
            </option>
        </select>
        <div class="divMaior">
            <div v-if="opcao == 'calendario'" class="w-[100%] h-screen flex justify-center items-center">
                <calendario></calendario>
            </div>
            <div v-if="opcao == 'timeLine'" class="w-[100%] h-screen flex justify-center items-center">
                <timeLine></timeLine>
            </div>
            <div v-if="opcao == 'Kanbam'" class="w-[100%] h-screen flex justify-center items-center">
                <KanbanDeStatus></KanbanDeStatus>
            </div>
            <div v-if="opcao == 'Lista'" class="w-[100%] h-screen flex justify-center items-center">
                <cardList></cardList>
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

let opcao = ref("Lista")
</script>
<style>
.divMaior {
    display: flex;
    flex-direction: column;
    width: 90%;
    height: 72%;
    align-items: center;
    justify-content: center;
    background-color: #FBFBFB;
    clip-path: polygon(5% 0, 95% 0, 100% 9%, 100% 100%, 0 100%, 0 10%);
    position: relative;


}
</style>

