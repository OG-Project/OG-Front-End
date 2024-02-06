<template>
    <div class="w-screen h-screen flex justify-center items-center absolute z-50 top-0" v-if="funcaoPopUp.variavelModal==true">
        <div class="blur-background" v-if="funcaoPopUp.variavelModal==true" @click=" funcaoPopUp.fechaPopUp()"></div>
            <div class="style-bg-roxo" :style="estilizaDivTotal">
                <img src="../imagem-vetores/botao-x.svg" class="botao-sair" @click=" funcaoPopUp.fechaPopUp()">
                <div class="w-full h-full flex justify-center items-center">
                    <div class="style-bg-branco">
                            <slot>
                            </slot>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { funcaoPopUpStore } from '../stores/funcaoPopUp'
const funcaoPopUp = funcaoPopUpStore();


    const props=defineProps({
        listaSelect:[],
        styleSelect: String,
        altura: {
            type: String,
            default: "80vh"
        },
        largura:{
            type:String, 
            default: "40vw"
        }
    })

    const estilizaDivTotal={
        width: props.largura,
        height: props.altura
    }
</script>
<style >
@import url(../assets/main.css);
@layer components{
    .style-bg-roxo{
       @apply  bg-roxoEscuro backdrop-blur-xl flex-col-reverse  absolute ;
       
       backdrop-filter: blur(10px);
       animation-name: aparecePopUp;
       animation-duration: 0.09s;
       animation-iteration-count: initial;
       overflow: hidden; 
    }

    @keyframes aparecePopUp {
        from {
            bottom: 10%;
        }

        to {
            bottom: 15%
        }
    }
    .style-bg-branco{
        @apply w-[100%] h-[95%] bg-brancoNeve ;
        clip-path: polygon(20% 0%, 80% 0%, 94% 15%, 94% 100%, 6% 100%, 6% 15%);
    }
    .botao-sair{
        @apply w-[5%] h-[5%] top-3 right-4 absolute 

    }

    .blur-background {
        @apply fixed z-0 top-0 inset-0 w-screen h-screen bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg ;
    }

    @media(min-width: 2560px){
        .style-bg-branco{
            @apply w-[25vw]
        }
    }

}   
</style>

