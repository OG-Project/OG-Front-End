<script setup>

import { Tarefa } from '../models/Tarefa.js';
import {ref} from 'vue';


const isHovered = ref(false);

const props = defineProps({
    tarefa: Tarefa,
    largura: String,
    altura:String,
    preset:String
})
let tarefa
let teste
let hoverCard

tarefa = {
    backgroundColor: props.tarefa.cor,
    width: "6%",
    height: "100%"
}
teste = {
    width: props.largura,
    height: props.altura,
    backgroundColor: "#D9D9D9",
    marginBottom: "30px",
    display: "flex",  
    marginLeft:"100px",
}

hoverCard = {
    width: props.largura,
    height: props.altura,
    backgroundColor: "#D9D9D9",
    marginBottom: "30px",
    display: "flex",  
    marginLeft:"100px",
    border: "2px solid purple"
}
function hover() {
  isHovered.value = true;
}

function unhover() {
  isHovered.value = false;
}


</script>

<template>
    <div :style="isHovered ? hoverCard : teste " 
        @mouseover="hover"
        @mouseout="unhover"
        v-if="preset==1">
        <div :style="tarefa" > </div>
        <div class="w-[30%] ml-[5%] flex pt-[5%]" v-for="propriedade of props.tarefa.propriedades">
            <p v-if="propriedade.id == '1'" class="truncate text-[2vh]">{{ propriedade.nome }}</p>
        </div>
            <div class="teste2">
                <div class="h-[45%] flex items-center">
                    <svg width="1.9vw" height="7" viewBox="0 0 29 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <ellipse cx="2.96387" cy="3.33062" rx="2.78614" ry="2.88189" fill="black" />
                        <ellipse cx="14.1084" cy="3.33062" rx="2.78614" ry="2.88189" fill="black" />
                        <ellipse cx="25.2529" cy="3.33062" rx="2.78614" ry="2.88189" fill="black" />
                    </svg>
                </div>
                <div class="h-[55%]">
                    <div class="bola"></div>
                </div>
    
            </div>
            <div class="abaRoxa">
                    <svg width="2vh" height="2vh" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.6252 14.3234L0.464865 14.3233L14.6257 0.610178L14.6252 14.3234Z" fill="#620BA7"/>
                    </svg>
                </div>

    </div>
    <div >

    </div>
</template>

<style >
@import url(../assets/main.css);

@layer components {
    .teste2 {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        width: 20%;
        height: 100%;
    }
    .bola {
        width: 2vw;
        height: 2vw;
        border-radius: 100%;
        background-color: orange;
    }
    .abaRoxa{
        height: 100%;
        display: flex;
        align-items: flex-end;
    }
}</style>