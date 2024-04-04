<template>
    <div @click="enviaCookie(tarefa)">
        <!-- Preset 1 Kanban -->
        <div :style="isHovered ? hoverCard : kanban" @mouseover="hover" @mouseout="unhover" v-if="preset == 1" >
            <div :style="tarefa1"> </div>
            <div class="w-[60%] m-[5%] font-Poppins font-medium text-[1vw]">
                <p class="truncate text-[2vh]">{{ props.tarefa.nome }}</p>
            </div>
            <div class="teste2">
                <div class="h-[50%] flex items-center">
                    <svg width="1.9vw" height="7" viewBox="0 0 29 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <ellipse cx="2.96387" cy="3.33062" rx="2.78614" ry="2.88189" fill="black" />
                        <ellipse cx="14.1084" cy="3.33062" rx="2.78614" ry="2.88189" fill="black" />
                        <ellipse cx="25.2529" cy="3.33062" rx="2.78614" ry="2.88189" fill="black" />
                    </svg>
                </div>
                <div class="h-[50%] flex justify-center">
                    <div class="bola"></div>
                </div>
    
            </div>
            <div class="abaRoxa" v-for="tarefa of usuarioLogado.tarefas">
                {{ console.log(tarefa) }}
                <div v-if="tarefa.tarefa.id == props.tarefa.id" class="flex justify-end pl-[20%]">
                    <svg width="2vh" height="2vh" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.6252 14.3234L0.464865 14.3233L14.6257 0.610178L14.6252 14.3234Z" fill="#620BA7" />
                    </svg>
                </div>
            </div>
    
        </div>
        <!-- Preset 2 Tira -->
        <div :style="tira" v-if="preset == 2" id="draggableElement" draggable="true">
            <div class="flex column gap-2 justify-center items-center">
                <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M11.5 7H17L11.5 1.5V7ZM2.5 0H12.5L18.5 6V16C18.5 16.5304 18.2893 17.0391 17.9142 17.4142C17.5391 17.7893 17.0304 18 16.5 18H2.5C1.96957 18 1.46086 17.7893 1.08579 17.4142C0.710714 17.0391 0.5 16.5304 0.5 16V2C0.5 0.89 1.39 0 2.5 0ZM2.5 2V16H16.5V9H9.5V2H2.5Z"
                        fill="white" />
                </svg>
                <p class="truncate w-[70%]">{{ props.tarefa.nome }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>

import { Tarefa } from '../models/Tarefa.js';
import { ref } from 'vue';
import tinycolor from "tinycolor2";
import VueCookies from "vue-cookies";
import router from '@/router'

const isHovered = ref(false);

const props = defineProps({
    tarefa: Tarefa,
    largura: String,
    altura: String,
    preset: String
})
let tarefa1
let kanban
let hoverCard
let tira
let usuarioLogado = $cookies.get("usuarioCookie");
tarefa1 = {
    backgroundColor:("#"+ props.tarefa.cor),
    width: "6%",
    height: "100%"
}
tira = {
    width: "7vw",
    height: "1vh",
    backgroundColor:("#"+ props.tarefa.cor),
    color: verificaCorTexto(props.tarefa),
    display: "flex",
    alignItems: "center",
    padding: "1.4vh",
    fontSize: "0.7vw"
}
kanban = {
    width: "12.7vw",
    height: "8vh",
    backgroundColor: "#D9D9D9",
    display: "flex",

}

hoverCard = {
    width: "12.7vw",
    height: "8vh",
    backgroundColor: "#D9D9D9",
    display: "flex",
    outline: "2px solid purple"
}
function hover() {
    isHovered.value = true;
}

function unhover() {
    isHovered.value = false;
}
function verificaCorTexto(tarefa) {
    if (tinycolor(tarefa.cor).isDark()) {
        console.log("gay")
        return "white"
    } else {
        console.log("gay2")
        return "black"
    }
}
function enviaCookie(tarefa){
    $cookies.set("IdTarefaCookies",tarefa.id)
    router.push('/criaTarefa') 
}

</script>
<style >
@import url(../assets/main.css);

@layer components {
    .teste2 {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 15%;
        height: 100%;
    }

    .bola {
        width: 1.5vw;
        height: 1.5vw;
        border-radius: 100%;
        background-color: orange;
    }

    .abaRoxa {
        height: 100%;
        display: flex;
        align-items: flex-end;
    }

    #draggableElement {
  background-color: blue;
  color: white;
  transition: transform 0.3s ease; /* Adicionando uma transição para suavizar o movimento */
}

#draggableElement:active {
  transform: scale(1.1); /* Aumenta um pouco o tamanho quando arrastado */
}

}
</style>