
<!--
    EXEMPLOS - WIDTH E HEIGTh VOCÊ DECIDE
    <Input styleInput="input-claro" icon="../src/imagem-vetores/icon-lapis-preto.svg" width="23" height="5" direcao="direita"></Input>
<br>
<Input styleInput="input-escuro" icon="../src/imagem-vetores/icon-lapis.svg" width="23" height="5"></Input>
<br>
<Input styleInput="input-claro" icon="../src/imagem-vetores/icon-lapis-preto.svg" width="23" height="5"></Input>
<br>
<Input styleInput="input-transparente-escuro-grande" icon="../src/imagem-vetores/icon-lapis-preto.svg" width="23" height="10"></Input>
<br>
<Input styleInput="input-transparente-claro-grande" icon="../src/imagem-vetores/icon-lapis-preto.svg" width="38" height="10"></Input> -->

<template>
    
   <div class="styleInputPadrao" 
        v-if="icon!='null' && direcao!='direita'" :style="estilizaDivInput">
        <img :src=icon :style="tamanhoIcon">
        <input :placeholder=conteudoInput :style="estilizaInput" class="inputStyle" :disabled=desabilitado>
   </div>
   <div class="styleInputPadrao" 
        v-if="icon=='null'"  :style="estilizaDivInput">
        <input :placeholder=conteudoInput  :style="estilizaInput" class="inputStyle" :disabled=desabilitado>
   </div>
   <div class="styleInputPadraoDireita" 
        v-if="direcao=='direita'" :style="estilizaDivInput">
        <input :placeholder=conteudoInput  :style="estilizaInput" class="inputStyle" :disabled=desabilitado>
        <img :src=icon :style="tamanhoIcon">
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
        desabilitado:ref(false),
        direcao:String  
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
        width:  props.width+"vh",
        backgroundColor:"inherit",
        color: verificaCor(),
        fontSize: verificaTamanho(),
    }

    const estilizaDivInput={
        backgroundColor: verificaCorBack(),
    
    }

    function verificaCorBack(){
         // só muda a cor de fundo da div do input de acordo com o style recebido
        if(props.styleInput=="input-escuro" || props.styleInput=="input-grande-escuro" || 
        props.styleInput=="input-escuro-grande" || props.styleInput=="input-escuro-grande"){
            return "#484848"
        }else if(props.styleInput=="input-claro" || props.styleInput=="input-grande-claro" || 
        props.styleInput=="input-claro-grande" || props.styleInput=="input-claro-grande"){
            return "#D7D7D7"
        }
    }

    function verificaTamanho(){
        //Aumenta o tamanho da font size de acordo 
        if(props.styleInput=="input-grande" || props.styleInput=="input-grande-escuro-grande" 
        || props.styleInput=="input-claro-grande" || props.styleInput=="input-claro-grande" || 
        props.styleInput=="input-transparente-claro-grande" || props.styleInput=="input-transparente-escuro-grande"){
            return "30px"
        }   
    }

    function verificaCor(){
        //verificando se a cor vai ser preta ou branca de acordo com o style recebido
        if(props.styleInput=="input-escuro" || props.styleInput=="input-transparente-escuro" || props.styleInput=="input-transparente-escuro-grande" ){
            return"white"
        }else if(props.styleInput="input-transparente-claro"){
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

    .styleInputPadraoDireita{
        @apply bg-transparent
        border-b-roxo
        border-b-2 border-transparent 
        max-w-max 
        items-center focus-within:border-roxo 
        focus-within:rounded-sm focus-within:border-2;
        display: grid;
        grid-template-columns: 80% 20%;
    }
    .inputStyle{
        @apply focus-visible:outline-0;

    }
}
</style>