
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
        </select>
        <div class="w-full h-full">
            <div v-if="opcao == 'calendario'" class="w-[100%] h-screen flex justify-center items-center">
                <calendario></calendario>
            </div>
            <div v-if="opcao == 'timeLine'" class="w-[100%] h-screen flex justify-center items-center">
                <timeLine></timeLine>
            </div>
            <div v-if="opcao == 'Kanbam'" class="w-[100%] h-screen flex justify-center items-center">
                <KanbanDePropriedade></KanbanDePropriedade>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import calendario from '../components/calendario.vue';
import KanbanDePropriedade from '../components/KanbanDePropriedade.vue';
import timeLine from '../components/timeLine.vue';

let opcao = ref("")
</script>
<style></style>

