<template>
    <div>
        <div>
            <div class="tituloProjeto">
                <h1 class="flex text-6xl font-semibold ">PROJETOS</h1>
                <p class="bordaTitulo"></p>    
            </div>
            <div v-if="screenWidth >= 620" class="flex justify-end mx-10 mt-[-5vh] mb-5">
                <Botao  preset="PadraoVazado" tamanhoDaBorda="2px" sombreado="sim" corBordaHover="#620BA7" corBorda="#620BA7" tamanhoPadrao="medio"  texto="Novo Projetos" tamanhoDaFonte="1rem" :funcaoClick="enviaTelaCriaProjeto"></Botao> 
            </div>  
            <div v-else class="flex justify-center mx-10 mt-[2vh] mb-10">
                <Botao  preset="PadraoVazado" tamanhoDaBorda="2px" sombreado="sim" corBordaHover="#620BA7" corBorda="#620BA7" tamanhoPadrao="personalizado" width="80vw" height="6vh"  texto="Novo Projetos" tamanhoDaFonte="1.5rem" :funcaoClick="enviaTelaCriaProjeto"></Botao> 
            </div> 
        </div>
        
        <div class="flex justify-center">
            <listaProjetos width="95vw" height="73vh">
            </listaProjetos>
        </div>
    </div>
</template>
<script setup>
import Botao from '../components/Botao.vue';
import listaProjetos from '../components/listaProjetos.vue';
import router from "@/router";
const screenWidth = window.innerWidth;
function enviaTelaCriaProjeto(){
    router.push('/criaProjeto')
}
</script>
<style scoped>
.bordaTitulo{
    @apply absolute z-50 border-transparent justify-center mt-16
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