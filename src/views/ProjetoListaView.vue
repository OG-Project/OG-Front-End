<template>
    <div>
        <div>
            <div class="tituloProjeto">
                <h1 class="flex text-6xl font-semibold ">{{ $t('projeto.PROJETOS') }}</h1>
                <p class="bordaTitulo"></p>    
            </div>
            <div v-if="screenWidth >= 750" class="flex justify-end mx-10 mt-[-5vh] mb-5">
                <Botao  preset="PadraoVazado" tamanhoDaBorda="2px" sombreado="sim" corBordaHover="var(--roxo)" corBorda="var(--roxo)" tamanhoPadrao="medio"  :texto="$t('projeto.NOVO PROJETO')" tamanhoDaFonte="1rem" :funcaoClick="enviaTelaCriaProjeto"></Botao> 
            </div>  
            <div v-else class="flex justify-center mx-10 mt-[2vh] mb-10">
                <Botao  preset="PadraoVazado" tamanhoDaBorda="2px" sombreado="sim" corBordaHover="var(--roxo)" corBorda="var(--roxo)" tamanhoPadrao="mobilegrande"  :texto="$t('projeto.NOVO PROJETO')" tamanhoDaFonte="1.5rem" :funcaoClick="enviaTelaCriaProjeto"></Botao> 
            </div> 
        </div>
        
        <div class="flex justify-center">
            <listaProjetos v-if="screenWidth >= 750" width="95vw" height="73vh">
            </listaProjetos>
            <listaProjetos v-else width="95vw" height="59vh">
            </listaProjetos>
        </div>
    </div>
</template>
<script setup>
import Botao from '../components/Botao.vue';
import listaProjetos from '../components/listaProjetos.vue';
import router from "@/router";
import VueCookies from 'vue-cookies';
const screenWidth = window.innerWidth;

function enviaTelaCriaProjeto(){
VueCookies.set("idAuxEquipe")
    router.push('/criaProjeto').then(() => {
        window.location.reload()
    });
}
</script>
<style scoped>
.bordaTitulo{
    @apply absolute z-40 border-transparent justify-center mt-16
    border-b-gray-300   
    border-b-4
    items-center
    focus-within:border-4 w-[45vw];
  
   ;
}
.tituloProjeto{
   @apply flex justify-center p-10 w-full;
}

@media(max-width: 620px){
    .bordaTitulo{
        @apply absolute z-50 border-transparent justify-center mt-16
        border-b-gray-300   
        border-b-4
        items-center
        focus-within:border-4 w-[80vw];
    }
}
</style>