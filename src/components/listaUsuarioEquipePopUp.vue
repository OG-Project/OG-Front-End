<template>
    <div class="flex justify-center w-full">
      <fundoPopUp largura="30vw" altura="88vh">
        <div class="flex justify-center">
           <div class="primeiraDiv">
             <img class="imgEquipe rounded-full" src="img" alt="">
             <h1 class=" text-3xl w-[10vw]">Equipe OG</h1>
             
           </div>
        </div>
        <div class="flex justify-center p-10" v-for="Usuario of usuarios">
           <img class="imgIcon" src="" alt="">
            <div class="primeiraDiv">
              <img class="imgPerfil" src="usuarios.img" alt="">
              <h1 class=" text-xl w-[14vw]">{{usuarios.nome}}</h1>
            </div>
            <SelectPadrao class="styleSelectPadraoBranco text-sm" styleSelect="select-branco" :listaSelect="opcoesSelect"></SelectPadrao> 
        </div>
        <div>
          <div class="justify-center w-[72vw]">
            <div class="grid-template flex justify-center w-full">
              <Input  styleInput="input-transparente-claro"  largura="70vw" altura="10vh" icon="../src/imagem-vetores/adicionarPessoa.svg"  conteudoInput="Adicionar Pessoa"></Input>
              <SelectPadrao class="styleSelectPadrao flex justify-start" styleSelect="select-cinza" :listaSelect="opcoesSelect"></SelectPadrao>
            </div>
              <div class="px-[21.5vw] mt-[-3.5vw]">
                <SelectPadrao class="styleSelectPadraoBranco" styleSelect="select-branco" :listaSelect="opcoesSelect"></SelectPadrao>
              </div>
          </div>
        </div>
        <div class="flex w-[80vw] p-6 mt-5 ">
            <ListaConvidados class="listaConvidados"></ListaConvidados>
        </div>
        <div>
          <div class="flex  justify-end mx-[6vw] w-[86%] xl:w-[80%] p-10">
            <Botao preset="PadraoRoxo" tamanhoPadrao="medio" texto="Confirmar" tamanhoDaFonte="0.9rem"  >
            </Botao>
          </div>
          <div class="botaoSair flex  justify-start mx-[2vw] w-[86%] xl:w-[80%] mt-[-9.1vh]">
            <Botao preset="Sair" tamanhoPadrao="medio" texto="Sair" tamanhoDaFonte="0.9rem"  >
            </Botao>
          </div>
        </div>
      
     
      </fundoPopUp>
    </div>
</template>

<script setup>
import fundoPopUp from './fundoPopUp.vue';
import SelectPadrao from './selectPadrao.vue'
import Input from './Input.vue';
import ListaConvidados from './ListaConvidados.vue';
import Botao from './Botao.vue';

const Usuario = {
    nome: String,
    permissao: String,
    img: String
}
const opcoesSelect = ['Edit', 'View']
Usuario.nome = "",
Usuario.img = ""

 let usuarios=[
  Usuario.nome = "bolsonaro",
  Usuario.img = "img"
]

</script>

<style>

.listaConvidados{
        @apply w-full
    }

.grid-template{ 
        @apply w-[80%] h-[11%] gap-4  items-center justify-items-center justify-center ; 
        display: grid;
        grid-template-columns: 40% 55%;
    }

.imgIcon {
        @apply bg-cover 
        bg-center flex flex-col justify-center 
        items-center mr-[1px] ml-[10px] mt-[10px]
        xl:w-[2vw] xl:h-[4vh];
    }

.styleSelectPadraoBranco{
        @apply   border-4 
        border-transparent
        border-b-brancoNeve   
        pt-2
        pb-2
        px-4
        border-b-4
        w-max
        items-center justify-center focus-within:border-roxo 
        focus-within:border-4 focus-within:rounded-md truncate
        ;
        
    }

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

.imgDePerfil {
        @apply rounded-full bg-cover bg-center flex 
        flex-col mr-[5px] ml-[-25px]
        xl:w-[2vw] xl:h-[4vh];
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