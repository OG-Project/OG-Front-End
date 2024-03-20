<template>
    <div>
        <div>
            <div class="tituloProjeto">
                <h1 class="flex text-6xl font-semibold ">PROJETOS</h1>
                <p class="bordaTitulo"></p>    
            </div>
            <div class="flex justify-end mx-10 mt-[-5vh] mb-5">
                <Botao  preset="PadraoVazado" tamanhoDaBorda="2px" sombreado="sim" corBordaHover="#620BA7" corBorda="#620BA7" tamanhoPadrao="medio"  texto="Novo Projetos" tamanhoDaFonte="1rem" :funcaoClick="cadastrarEquipe"></Botao> 
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
</script>
<style scoped>
.bordaTitulo{
    @apply  absolute border-transparent justify-center mt-16
    border-b-gray-300   
    border-b-4
    items-center
    focus-within:border-4 w-[45vw];
   ;
}
.tituloProjeto{
   @apply flex justify-center p-10 w-full;
}
</style>