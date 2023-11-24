<template>
    <div class="w-full h-full flex justify-center items-center absolute" v-if="funcaoPopUp.variavelModal==true">
        <div class="blur-background" v-if="funcaoPopUp.variavelModal==true" @click=" funcaoPopUp.fechaPopUp()"></div>
            <div class="style-bg-roxo">
                <img src="../imagem-vetores/botao-x.svg" class="botao-sair" @click=" funcaoPopUp.fechaPopUp()">
                <div class="w-full h-full flex justify-center items-center">
                    <div class="style-bg-branco">
                            <slot>
                            </slot>
                    </div>
                </div>
            </div>
     </div>

    
</template>
<script setup>
import {useCounterStore} from '../stores/funcaoPopUp'
const funcaoPopUp = useCounterStore();
    const props=defineProps({
        listaSelect:[],
        styleSelect: String
    })
</script>
<style >
@import url(../assets/main.css);

@layer components{
    .style-bg-roxo{
       @apply w-full xl:w-[30%] h-[70%] bg-roxoEscuro backdrop-blur-xl flex-col-reverse  absolute;
       backdrop-filter: blur(10px);
       animation-name: aparecePopUp;
       animation-duration: 0.09s;
       animation-iteration-count: initial;
       animation-timing-function: cubic-bezier(0.15, 0.15, 0.15, 0.15); 
       overflow: hidden; 
    }
    @keyframes aparecePopUp {
        from{
            bottom: 10%;
        }
        to{
            bottom: 15%
        }
    }
    .style-bg-branco{
        @apply w-[100%] h-[95%] bg-brancoNeve;
        clip-path: polygon(20% 0%, 80% 0%, 94% 15%, 94% 100%, 6% 100%, 6% 15%);
    }
    .botao-sair{
        @apply w-[5%] h-[5%]  top-3 right-4 absolute 
    }
    .blur-background {
        @apply fixed inset-0 w-full h-full bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg absolute ;
       
    }
}   
</style>