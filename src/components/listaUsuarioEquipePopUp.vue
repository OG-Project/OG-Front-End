<template>
    <div>
      <fundoPopUp largura="30vw" altura="88vh">
        <div class="flex justify-center">
           <div class="primeiraDiv">
             <img class="imgEquipe rounded-full" src="img" alt="">
             <h1 class=" text-3xl w-[10vw] ">Equipe OG</h1>
             
           </div>
        </div>
        <div class="flex justify-center p-4">
         
            <div class="primeiraDiv">
              <img class="imgEquipe" src="img" alt="">
              
              <h1 class=" text-3xl w-[10vw] ">Joao</h1>
            </div>
            <SelectPadrao class="flex items-center " styleSelect="select-branco" :listaSelect="opcoesSelect"></SelectPadrao> 
        </div>
          
      </fundoPopUp>

    </div>
</template>

<script setup>
import fundoPopUp from './fundoPopUp.vue';
import SelectPadrao from './selectPadrao.vue';

const Usuario = {
    nome: String,
    permissao: String,
    img: String
}
const opcoesSelect = ['Edit', 'View']
Usuario.nome = "EduardoCosta"
Usuario.img = ""

</script>

<style>

.primeiraDiv{
    @apply  
    border-4 
    border-transparent
    border-b-roxo    
    pt-2
    pb-2
    px-3
    max-w-max
    w-full
    border-b-4
    items-center focus-within:border-roxo 
    focus-within:border-4 focus-within:rounded-md;
    display: grid;
    grid-template-columns: 20% 80%;
}

.imgEquipe{
    @apply justify-start;
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
        items-center focus-within:border-roxo 
        focus-within:border-4 focus-within:rounded-md;
        display: grid;
        grid-template-columns: 20% 80%;
        align-content: center;
    }

</style>