<template>
    <div>
        <div class="tituloProjeto">
                <h1 class="flex text-6xl font-semibold ">PROJETOS</h1>
                <p class="bordaTitulo"></p>
        </div>
        <div class="flex justify-center">
            <listaProjetos width="95vw" height="75vh"></listaProjetos>
        </div>
    </div>
</template>
<script setup>
import listaProjetos from '../components/listaProjetos.vue';
</script>
<style scoped>
.bordaTitulo{
    @apply  border-transparent flex justify-center
   border-b-roxo    
   border-b-2
   items-center focus-within:border-roxo 
   focus-within:border-4;
   ;
}
.tituloProjeto{
   @apply flex justify-center p-10 w-full;
}
</style>