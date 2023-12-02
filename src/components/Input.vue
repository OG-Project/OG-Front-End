
<!-- <br>
<Input styleInput="input-transparente-claro-grande" icon="../src/imagem-vetores/icon-lapis-preto.svg" width="38" height="10"></Input> -->

<template>
    
   <div class="styleInputPadraoIcon" 
        v-if="icon!='null' && direcao!='direita'" :style="estilizaDivInput">
        <div class="flex justify-center">
            <img :src=icon :style="tamanhoIcon" class="flex items-center justify-center">
        </div>
        <input :type="tipo" :placeholder=conteudoInput :style="estilizaInput" class="inputStyle xl:pl-5 sm:pl-1 md:pl-2" :disabled=desabilitado >
   </div>
   <div class="styleInputPadrao flex items-center" 
        v-if="icon=='null'"  :style="estilizaDivInput">
        <input :type="tipo" :placeholder=conteudoInput  :style="estilizaInput" class="inputStyle" :disabled=desabilitado>
   </div>
   <div class="styleInputPadraoIconDireita " :class="styleInputPadraoDireita" 
        v-if="direcao=='direita'" :style="estilizaDivInput">
        <input :type="tipo" :placeholder=conteudoInput  :style="estilizaInput" class="inputStyle xl:pr-5 sm:pr-1 md:pr-2" :disabled=desabilitado 
        :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)">
        <div class="flex justify-center">
            <img :src=icon :style="tamanhoIcon" class="flex items-center justify-center">
        </div>
   </div>
</template>

<script setup>
import { onBeforeMount, onMounted, onUpdated, ref } from 'vue';
import {Usuario} from '../models/usuario'
import {Equipe} from '../models/Equipe'


//funcao de passar para o pai 
    defineEmits(['update:modelValue'])
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
        desabilitado:ref(false),
        direcao:String ,
        modelValue:String,
        tipo: String,
        largura:String,
        altura:String,
        fontSize: String,
        corHover: String
      })
    const hoverPadrao = {
        color : verificaCorHover()
    }
        onMounted(()=>{})

    function widthResponsivo(){
        if(props.styleInput=="input-grande" || props.styleInput=="input-grande-escuro-grande" 
        || props.styleInput=="input-claro-grande" || props.styleInput=="input-claro-grande" || 
        props.styleInput=="input-transparente-claro-grande" || props.styleInput=="input-transparente-escuro-grande" ){
            return "20vw"
        } else  if(props.styleInput=="input-pequeno" || props.styleInput=="input-pequeno-escuro" 
        || props.styleInput=="input-claro-pequeno" ||  props.styleInput=="input-transparente-claro-pequeno" || props.styleInput=="input-transparente-escuro-pequeno" ){
            return "10vw"
        }
           return "25vw"
    }

    function heigthResponsivo(){
        if(props.styleInput=="input-grande" || props.styleInput=="input-grande-escuro"  || props.styleInput=="input-claro-grande" ||  
        props.styleInput=="input-transparente-claro-grande" || props.styleInput=="input-transparente-escuro-grande" ){
            return "9vh"
        } 
        else if(props.styleInput=="input-pequeno" || props.styleInput=="input-pequeno-escuro" 
        || props.styleInput=="input-claro-pequeno" ||  props.styleInput=="input-transparente-claro-pequeno" || props.styleInput=="input-transparente-escuro-pequeno" ){
            return "4vh"
        } 

        return "6vh"
           
    }
   const tamanhoIcon={
        //faz função que decide o tamanho do icon como 10 vezes menor que o input (henrique) acho esse tamanho bom
        width:"80%",
        height:"80%",
    }

   const estilizaInput={
        backgroundColor:"inherit",
        color: verificaCor(),
        fontSize: verificaTamanhoFont(),
        width: "100%",
        height: '100%',

    }

    const estilizaDivInput={
        backgroundColor: verificaCorBack(),
        height: verificaHeigth(),
        width: verificaWidth(), 
    }
    
    function verificaHeigth(){
        let teste=heigthResponsivo()
        if(props.altura==undefined){
            console.log(teste)
            return teste
        }
        return props.altura;
    }
    function verificaWidth(){
        if(props.largura==undefined){
            return widthResponsivo()
        }
        return props.largura;
    }

    function verificaCorBack(){
         // só muda a cor de fundo da div do input de acordo com o style recebido
        if(props.styleInput=="input-escuro" || props.styleInput=="input-grande-escuro" || 
        props.styleInput=="input-escuro-grande" || props.styleInput=="input-escuro-grande" ){
            return "#484848"
        }else if(props.styleInput=="input-claro" || props.styleInput=="input-grande-claro" || 
        props.styleInput=="input-claro-grande" || props.styleInput=="input-claro-grande"){
            return "#D7D7D7"
        }
    }
    function verificaCorHover(){
        if(props.corHover=="escuro"){
            return "#484848"
        }
        return "#D7D7D7"
    }


    function verificaTamanhoFont(){
        //Aumenta o tamanho da font size de acordo com a tela
        if(props.fontSize == undefined){ 

            if(props.styleInput==="input-grande" || props.styleInput==="input-grande-escuro"  || props.styleInput==="input-claro-grande" ||
        props.styleInput==="input-transparente-claro-grande" || props.styleInput==="input-transparente-escuro-grande" ){

            if(window.innerWidth >= 600 && window.innerWidth <= 850){
                console.log(window.innerWidth)
                return "1.1rem"

            }else if(window.innerWidth >= 850 && window.innerWidth <= 1000){
                return '1.5rem'
            }else{
                return '2.0rem'
            }
        }else if(props.styleInput=="input-pequeno" || props.styleInput=="input-pequeno-escuro" 
        || props.styleInput=="input-claro-pequeno" ||  props.styleInput=="input-transparente-claro-pequeno" || props.styleInput=="input-transparente-escuro-pequeno" ){
                if(window.innerWidth >= 600 && window.innerWidth <= 850){
                    console.log(window.innerWidth)
                    return "0.8rem"

                }else if(window.innerWidth >= 850 && window.innerWidth <= 1000){
                    return '1.0rem'
                }else if(window.innerWidth >= 1000 && window.innerWidth <=1500 ){
                    return '1.0rem'
                }
            }
             return '1.2rem'
        }
     return props.fontSize;
    }

    function verificaCor(){
        //verificando se a cor vai ser preta ou branca de acordo com o style recebido
        if(props.styleInput=="input-escuro" || props.styleInput=="input-transparente-escuro" || props.styleInput=="input-transparente-escuro-grande" ){
            return"white"
        }else if(props.styleInput="input-transparente-claro"){
            return 'black';
        }
    }

    function hoverStyle(){
            if(props.corHover=="escuro"){
                return props.corHover=="#484848"
        }
           return props.corHover=="#D7D7D7"  
    }
    
</script>
<style lang="scss" scoped>
@import url(../assets/main.css);

    .styleInputPadrao{
       @apply 
       border-4 
        border-transparent
        border-b-roxo    
        px-2
        max-w-max
        w-min
        border-b-4
        hover:rounded-[4px] hover:border-4
        items-center focus-within:border-roxo 
        focus-within:border-4 focus-within:rounded-[4px];
        
    }
    .styleInputPadrao:hover{
        background-color: v-bind('hoverPadrao.color');
    }

    .styleInputPadraoIconDireita{
       @apply 
        border-4 
        border-transparent
        border-b-roxo    
        pt-2
        pb-2
        px-4
        max-w-max
        w-min
        border-b-4
        hover:rounded-[4px] hover:border-4
        items-center focus-within:border-roxo 
        focus-within:border-4 focus-within:rounded-[4px] ;
        display: grid;
        grid-template-columns: 80% 20%;
        align-content: center;
    }
    .styleInputPadraoIconDireita:hover{
        background-color: v-bind('hoverPadrao.color');
    }

    .styleInputPadraoIcon{
       @apply 
        border-4 
        border-transparent
        border-b-roxo    
        pt-2
        pb-2
        px-4
        max-w-max
        w-min
        border-b-4
        hover:rounded-[4px] hover:border-4
        items-center focus-within:border-roxo 
        focus-within:border-4 focus-within:rounded-[4px];
        display: grid;
        grid-template-columns: 20% 80%;
        align-content: center;
    }
    .styleInputPadraoIcon:hover{
        background-color: v-bind('hoverPadrao.color');
    }
    
   
    .inputStyle{
        @apply focus-visible:outline-0  bg-transparent;
    }

</style>