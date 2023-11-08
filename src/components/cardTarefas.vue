<script setup>

    import {Tarefa} from '../models/Tarefa.js' ;

    const props = defineProps({
        tarefa: Tarefa,
    })
    let tarefa

    tarefa={
        backgroundColor: props.tarefa.cor,
        width:"6%",
        height:"100%"
    }
    

</script>

<template>
    <div class="teste">
        <div :style="tarefa"> </div>
        <div class="w-[50%] " v-for="propriedade of props.tarefa.propriedades">
            <p v-if="propriedade.id==1" class="truncate ...">{{propriedade.nome}}</p>
        </div>
        <div class="teste2">
            <div class="h-[50%] flex items-center">
                <svg width="29" height="7" viewBox="0 0 29 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="2.96387" cy="3.33062" rx="2.78614" ry="2.88189" fill="black"/>
                <ellipse cx="14.1084" cy="3.33062" rx="2.78614" ry="2.88189" fill="black"/>
                <ellipse cx="25.2529" cy="3.33062" rx="2.78614" ry="2.88189" fill="black"/>
                </svg>            
            </div>
            <div class="h-[50%]">
                <div class="bola"></div>
            </div>
        </div>
        <div>

        </div>
    </div>
</template>

<style >
@import url(../assets/main.css);
@layer components{
    .teste{
        width: 300px;
        height: 80px;
        background-color: #D9D9D9;
        margin-bottom: 30px;
        display: flex;
        align-items: center;
    }
    .teste2{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 10%;
        height: 100%;
    }
    .p{
        font-size: 2rem; 
    }
    .bola{
        height: 50%;
        width: 30px;
        height: 30px;
        border-radius: 100%;
        background-color: orange;
    }
}

</style>