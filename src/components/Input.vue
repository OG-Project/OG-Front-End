<template>
    
   <div :class=styleInput v-if="icon!='null'">
        <img :src=icon :style="tamanhoIcon">
        <input :placeholder=conteudoInput :style="estilizaInput" class=" focus-visible:outline-0">
   </div>
   <div :class=styleInput v-if="icon=='null'">
        <input :placeholder=conteudoInput  :style="estilizaInput" class=" focus-visible:outline-0">
        <input :placeholder=conteudoInput  :style="estilizaInput" class=" focus-visible:outline-0">
   </div>
</template>

<script setup>
import { onMounted } from 'vue';
import {Usuario} from '../models/usuario'
import {Equipe} from '../models/Equipe'
import tinycolor from "https://esm.sh/tinycolor2";
  const props=defineProps({
        styleInput: String,
        icon: {
            type:String,
            default:"null"
        },
        direcao: String,
        conteudoInput:{
            type: String,
            default:"Vazio"
        },
        width:Number,
        height:Number
    
    })
    onMounted(()=>{
           console.log(Usuario.equipeAtual=Equipe);
           
        }
        
    )
    const tamanhoIcon={
        width:(props.width/10)+"%",
        height: (props.height/10)+"%",
    }

    const estilizaInput={
        width:props.width+"%",
        backgroundColor:"background-color: inherit",
        color: verificaCor()
    }
    function verificaCor(){
        if(props.styleInput=="input-escuro"){
            return"white"
        }
        if(props.styleInput=="input-transparente-placeholder-claro"){
            return 'black'
        }
    }

</script>

<style>
@import url(../assets/main.css);


@layer components{

    .input-transparente-placeholder-claro{
        @apply bg-transparent
        border-b-roxo
        border-b-4 border-transparent;
        max-width: max-content;
        @apply flex flex-auto px-1 justify-around items-center focus-within:border-roxo rounded-sm border-2;
    
    }

    .input-escuro{
        @apply bg-transparent
        border-b-roxo
        border-b-4 border-transparent bg-cinza-escuro;
        max-width: max-content;
        @apply flex flex-auto px-1 justify-around items-center  focus-within:border-roxo rounded-sm border-2;
    }
    .input-transparente-placeholder-escuro{
        @apply bg-transparent
        border-b-roxo
        border-b-4 border-transparent;
        max-width: max-content;
        @apply flex flex-auto px-1 justify-around  focus-within:border-roxo rounded-sm border-2;
    }
   

    input {
        background-color: inherit;
    }
    
}
</style>