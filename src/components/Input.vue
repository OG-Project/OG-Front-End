
<template>
    <div class="styleInputPadraoIcon" 
        v-if="icon!='null' && direcao!='direita' && tipo!='float'" 
        :style="estilizaDivInput">
        <div 
        class=" cursor-pointer flex items-center justify-center">
            <img 
            :src=icon 
            :style="tamanhoIcon" 
            class="flex items-center justify-center">
        </div>
            <input 
            :type="tipo" 
            :style="estilizaInput" 
            id="inputStyle" 
            :disabled=desabilitado 
            :value="modelValue"
            @focus="$emit('clickInput',perfil.el=$event.target)"
            @input="$emit('update:modelValue', $event.target.value)" 
            :placeholder=conteudoInput > 
            
        <div class="flex items-center justify-center">

            <svgIconMic 
            @click="mic" 
            v-show="isVoiceMaker" 
            :class="{'*:fill-black':verificaCorFill(props.styleInput),
            '*:fill-white':verificaCorFill(props.styleInput),
            '*:fill-roxo':perfil.isTecladoAtivado}"
            class="  
            cursor-pointer 
            w-[2.5vw] 
            h-[2.5vh] 
            flex 
            items-center 
            justify-center" />
            <svgIconKeyboard 
            @click="teclado" 
            v-show="isTecladoVirtual "
            :class="{'*:fill-black':verificaCorFill(props.styleInput),
            '*:fill-white':verificaCorFill(props.styleInput),
            '*:fill-roxo':perfil.isTecladoAtivado}"
            class=" 
            cursor-pointer 
            w-[2.5vw] 
            h-[2.5vh] 
            flex 
            items-center 
            justify-center" />
        </div>
   </div>

   <!-- fazer input com botão com um ou dois -->


   <div class="styleInputPadrao flex items-center" 
        v-if="icon=='null' & tipo=='float'">
        
        <div class="estiloPlaceHolder">
            
            <input 
            :type="tipo" 
            :style="estilizaInput" 
            id="inputStyle" 
            :disabled=desabilitado 
            :value="modelValue"
            @focus="$emit('clickInput',perfil.el=$event.target)"
            @input="$emit('update:modelValue', $event.target.value)" 
            class="peer" 
            placeholder=" "  > 
            <div class="flex items-center justify-center">
                <svgIconMic 
                @click="mic" 
                v-show="isVoiceMaker" 
                :class="{'*:fill-black':verificaCorFill(props.styleInput),
                '*:fill-white':verificaCorFill(props.styleInput),
                '*:fill-roxo':perfil.isTecladoAtivado}"
                class="  
                cursor-pointer 
                w-[2.5vw] 
                h-[2.5vh] 
                flex 
                items-center 
                justify-center" />
                <svgIconKeyboard 
                @click="teclado" 
                v-show="isTecladoVirtual "
                :class="{'*:fill-black':verificaCorFill(props.styleInput),
                '*:fill-white':verificaCorFill(props.styleInput),
                '*:fill-roxo':perfil.isTecladoAtivado}"
                class=" 
                cursor-pointer 
                w-[2.5vw] 
                h-[2.5vh] 
                flex 
                items-center 
                justify-center" />
            </div>
            <label 
            :style="estilizaDivPlaceHolder" 
            for="inputStyle"  
            class=" absolute text-gray-500 duration-300 transform -translate-y-8 scale-80  z-10 origin-[0]  peer-focus:text-roxo  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-80 peer-focus:-translate-y-8 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
            {{ conteudoInput }}
            </label>
        </div>
   </div>

   <div 
   class="styleInputPadrao flex flex-row-reverse items-center" 
    v-if="icon=='null' && tipo!='float'" >
        <div class="flex items-center justify-center">
            <svgIconMic 
            @click="mic" 
            v-show="isVoiceMaker" 
            :class="{'*:fill-black':verificaCorFill(props.styleInput),
            '*:fill-white':verificaCorFill(props.styleInput),
            '*:fill-roxo':perfil.isTecladoAtivado}"
            class="  
            cursor-pointer 
            w-[2.5vw] 
            h-[2.5vh] 
            flex 
            items-center 
            justify-center" />
            <svgIconKeyboard 
            @click="teclado" 
            v-show="isTecladoVirtual " 
            :class="{'*:fill-black':verificaCorFill(props.styleInput),
            '*:fill-white':verificaCorFill(props.styleInput),
            '*:fill-roxo':perfil.isTecladoAtivado}"
            class=" 
            cursor-pointer 
            w-[2.5vw] 
            h-[2.5vh] 
            flex 
            items-center 
            justify-center" />
        </div>
            <input 
            :type="tipo" 
            :style="estilizaInput" 
            id="inputStyle" 
            :disabled=desabilitado 
            :value="modelValue"
            @change="modelValue=modelValue"
            @focus="$emit('clickInput',perfil.el=$event.target)"
            @input="$emit('update:modelValue', $event.target.value)" 
            :placeholder=conteudoInput  > 
      
   </div>
   <div 
   class="styleInputPadraoIconDireita " 
   :class="styleInputPadraoDireita" 
    v-if="direcao=='direita' && tipo!='float'" 
    :style="estilizaDivInput">
        
        <input 
        :type="tipo" 
        :placeholder=conteudoInput
        :style="estilizaInput" 
        id="inputStyle" 
        :disabled=desabilitado
        :value="modelValue"
        @focus="$emit('clickInput',perfil.el=$event.target)"
        @input="$emit('update:modelValue', $event.target.value)">
        
        <div 
        class="flex items-center justify-center">
            <img :src=icon :style="tamanhoIcon" class="flex items-center justify-center">   
            <svgIconMic 
            @click="mic" 
            v-show="isVoiceMaker" 
            :class="{'*:fill-black':verificaCorFill(props.styleInput),
            '*:fill-white':verificaCorFill(props.styleInput),
            '*:fill-roxo':perfil.isTecladoAtivado}"
            class="  
            cursor-pointer 
            w-[2.5vw] 
            h-[2.5vh] 
            flex 
            items-center 
            justify-center" />
            <svgIconKeyboard 
            @click="teclado" 
            v-show="isTecladoVirtual "
            :class="{'*:fill-black':verificaCorFill(props.styleInput),
            '*:fill-white':verificaCorFill(props.styleInput),
            '*:fill-roxo':perfil.isTecladoAtivado}"
            class=" 
            cursor-pointer 
            w-[2.5vw] 
            h-[2.5vh] 
            flex 
            items-center 
            justify-center" />

        </div>
   </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import svgIconMic from '../assets/svgIconMic.vue';
import svgIconKeyboard from '../assets/svgIconKeyboard.vue';
import VueCookies from 'vue-cookies';

import KeyBoard from '../components/Keyboard.vue'

import { perfilStore } from '../stores/perfilStore';
import { storeToRefs } from 'pinia';
const perfil=perfilStore()

const {isTecladoVirtual} = storeToRefs(perfil)
const {isVoiceMaker} = storeToRefs(perfil)
let cookieVoice
let cookieTeclado

onBeforeMount(()=>{
    cookieVoice=VueCookies.get('isVoiceMaker')
    cookieTeclado=VueCookies.get('isTecladovirtual')
})

function mic(){

}

function teclado(){
    perfil.isTecladoAtivado=!perfil.isTecladoAtivado
}


//funcao de passar para o pai 
    defineEmits(['update:modelValue','clickInput'])
  const props=defineProps({
        styleInput: String, // pode passar input-escuro, input-claro, input-transparente-escuro, input-transparente-claro
        icon: {
            type:String,
            default:"null"
        },
        direcao: String,
        conteudoInput:String,
        desabilitado:ref(false),
        direcao:String ,
        modelValue:String,
        tipo: String,
        largura:String,
        altura:String,
        fontSize: String,
        corHover: String,
        tamanhoMinimoAltura:String,
      })

    const hoverPadrao = {
        color : verificaCorHover()
    }

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
        width:"50%",
        height:"50%",
    }

   const estilizaInput={
        backgroundColor:"inherit",
        color: verificaCor(),
        fontSize: verificaTamanhoFont(),
        height: verificaHeigth()+'vh',
        width: verificaWidth()+"vw",
    }

    const estilizaDivPlaceHolder= {
        fontSize: verificaTamanhoFont(),
        position: "absolute",
        top: "",
        backgroundColor: ""
    }

    const estilizaDivInput={
        backgroundColor: verificaCorBack(),
    }
    
    function verificaHeigth(){
        let teste=heigthResponsivo()
        if(props.altura==undefined){
            return teste
        }
        return props.altura;

    }
    
    function verificaWidth(){
        if(props.largura==undefined ){
            if(props.icon==undefined){
                return (widthResponsivo()*0.80)
            }
            return widthResponsivo();
        }else{
            if(props.icon==undefined){
                return (props.largura*0.80);
            }
            return (props.largura)
        }
        
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

         if(props.styleInput=="input-pequeno" || props.styleInput=="input-pequeno-escuro" 
        || props.styleInput=="input-claro-pequeno" ||  props.styleInput=="input-transparente-claro-pequeno" || props.styleInput=="input-transparente-escuro-pequeno" ){
                if(window.innerWidth >= 600 && window.innerWidth <= 850){
                    console.log(window.innerWidth)
                    return "0.8rem"

                }else if(window.innerWidth >= 850 && window.innerWidth <= 1000){
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
            return "white"
        }else if(props.styleInput="input-transparente-claro"){
            return 'black';
        }
    }
    function verificaCorFill(a){
        if(a=="input-escuro" || a=="input-transparente-escuro" || a=="input-transparente-escuro-grande" ){
            return true
        }
        return false
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
         focus-within:border-roxo 
        focus-within:border-4 focus-within:rounded-[4px]  ;
        
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
        border-b-4
        hover:rounded-[4px] hover:border-4
         focus-within:border-roxo 
        focus-within:border-4 focus-within:rounded-[4px] ;
        display: grid;
        grid-template-columns: 80% 10% 10%;
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
        px-2
        max-w-max
        border-b-4
        hover:rounded-[4px] hover:border-4
         focus-within:border-roxo 
        focus-within:border-4 focus-within:rounded-[4px];
        display: grid;
        grid-template-columns: 10% 70% 10%;
        align-content: center;
    }
    .styleInputPadraoIcon:hover{
        background-color: v-bind('hoverPadrao.color');
    }
    
    #inputStyle{
        @apply focus-visible:outline-0  bg-transparent m-1;
    }

    

    .estiloPlaceHolder{
        @apply flex items-center
    }

    .estiloPlaceHolder label{
        @apply absolute;
    }



    // <div class="relative">
//     <input type="text" id="floating_filled" class="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
//     <label for="floating_filled" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Floating filled</label>
// </div>
</style>