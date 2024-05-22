<template>
    <div class="w-full h-full flex justify-center items-center absolute z-[996] top-0" v-if="funcaoPopUp.variavelModal==true">
        <div class="blur-background" v-if="funcaoPopUp.variavelModal==true" @click=" funcaoPopUp.fechaPopUp()"></div>
            <div class="style-bg-branco" :style="estilizaDivTotal">
                <botaoX  class="cursor-pointer botao-sair" @click=" funcaoPopUp.fechaPopUp()" />
                <div class="w-full h-full flex justify-center items-center">
                    <div>
                            <slot>
                            </slot>
                    </div>
                </div>
            </div>

        </div>
</template>
<script setup>
import { funcaoPopUpStore } from '../stores/funcaoPopUp'
const funcaoPopUp = funcaoPopUpStore();
import botaoX from '../imagemVetores/botaoXDinamic.vue';


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
    .style-bg-branco{
       @apply  bg-[var(--backgroundItems)] backdrop-blur-xl flex-col-reverse  absolute z-[999] ;
       
       backdrop-filter: blur(10px);
       animation-name: aparecePopUp;
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
    
    .botao-sair{
        @apply w-[5%] h-[5%] top-3 right-4 absolute text-[var(--fonteCor)];

    }

    .blur-background {
        @apply  z-[995] top-0 inset-0 w-full h-full bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg  ;
    }

    @media(min-width: 2560px){
        .style-bg-branco{
            @apply w-[25vw]
        }
    }

}   
</style>

