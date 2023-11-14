<template>
    
   <div class="styleInputPadrao" 
        v-if="icon!='null'"  :style="estilizaDivInput">
        <img :src=icon :style="tamanhoIcon">
        <input :placeholder=conteudoInput :style="estilizaInput" class="inputStyle" :disabled=desabilitado>
   </div>
   <div class=" bg-transparent
        border-b-roxo
        border-b-2 border-transparent 
        max-w-max grid grid-row-2  justify-around 
        items-center focus-within:border-roxo 
        focus-within:rounded-sm focus-within:border-2" 
        v-if="icon=='null'">
        <input :placeholder=conteudoInput  :style="estilizaInput" class="inputStyle" :disabled=desabilitado>
   </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import {Usuario} from '../models/usuario'
import {Equipe} from '../models/Equipe'
  const props=defineProps({
        styleInput: String, // pode passar input-escuro, input-claro, input-transparente-escuro, input-transparente-claro
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
        height:Number,
        desabilitado:ref(false)  
      })
    
    onMounted(()=>{
           console.log(Usuario.equipeAtual=Equipe);
           
        }
        
    )
    const tamanhoIcon={
        //faz função que decide o tamanho do icon como 10 vezes menor que o input (henrique) acho esse tamanho bom
        width:(props.width/2)+"vw",
        height: (props.height/2)+"vh",
    }

    const estilizaInput={
        // faz as estilizações do input verificando se a cor vai ser preta ou branca de acordo com o style recebido e de acordo com o tamanho recebido
        height: props.height+"vh",
        backgroundColor:"inherit",
        color: verificaCor(),
        fontSize: verificaTamanho()
    }

    const estilizaDivInput={
        backgroundColor: verificaCorBack(),
    }

    function verificaCorBack(){
         // só muda a cor de fundo da div do input de acordo com o style recebido
        if(props.styleInput=="input-escuro" || props.styleInput=="input-grande-escuro" || 
        props.styleInput=="input-escuro-grande" || props.styleInput=="input-grande-escuro-grande"){
            return "#484848"
        }else if(props.styleInput=="input-claro" || props.styleInput=="input-grande-claro" || 
        props.styleInput=="input-claro-grande" || props.styleInput=="input-grande-claro-grande"){
            return "#D7D7D7"
        }
    }

    function verificaTamanho(){
        //Aumenta o tamanho da font size de acordo 
        if(props.styleInput=="input-escuro-grande" || props.styleInput=="input-grande-escuro-grande" 
        || props.styleInput=="input-claro-grande" || props.styleInput=="input-grande-claro-grande"){
            return "30px"
        }
    }

    function verificaCor(){
        //verificando se a cor vai ser preta ou branca de acordo com o style recebido
        if(props.styleInput=="input-escuro" || props.styleInput=="input-transparente-escuro"){
            return"white"
        }else if(props.styleInput=="input-transparente-claro" || props.styleInput=="input-transparente-claro"){
            return 'black';
        }
    }

</script>
<style>
@import url(../assets/main.css);
@layer components{
    .styleInputPadrao{
       @apply bg-transparent
        border-b-roxo
        border-b-2 border-transparent 
        max-w-max 
        items-center focus-within:border-roxo 
        focus-within:rounded-sm focus-within:border-2;
        display: grid;
        grid-template-columns: 20% 80%;
    }
    .inputStyle{
        @apply focus-visible:outline-0;

    }
}
</style>