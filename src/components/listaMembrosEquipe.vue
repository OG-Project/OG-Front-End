<template>
    <div>
      <fundoPopUp largura="" altura="100%">
      <div class="divGeral">
            <div class="flex justify-center">
                <div class="primeiraDiv justify-end">
                    <img class="imagemEquipe" src=".../src/imagem-vetores/adicionarPessoa.svg" alt="">
                    <h1 class=" text-3xl 2xl:w-[20vw] xl:w-[30vw] lg:w-[40vw] md:w-[70vw]">{{ equipeSelecionada }}</h1>
                </div>
            </div>
            <div class="flex justify-center p-5" v-for="Usuario of usuarios">
                <img class="imgIcon" src="../src/imagem-vetores/adicionarPessoa.svg" alt="">
                <div class="corDiv">
                    <img class="imgPerfil" src="usuarios.img" alt="">
                    <h1 class=" text-xl 2xl:w-[10vw] xl:w-[15vw] lg:w-[15vw] md:w-[15vw] "></h1>
                </div>
                <SelectPadrao class="styleSelectPadraoBranco text-sm" styleSelect="select-branco" :listaSelect="opcoesSelect"></SelectPadrao> 
            </div>
            <div>
                <div class="div-adiciona ">
                    <div class="grid-template flex justify-start">
                        <Input styleInput="input-transparente-claro"  :largura="larguraInputConvidado()" altura="10vh" icon="../src/imagem-vetores/adicionarPessoa.svg"  conteudoInput="Adicionar Pessoa"></Input>
                    </div>
                 </div>
            </div>
            <div class="flex justify-center p-1">
                <Botao class="flex justify-center" preset="PadraoVazado" tamanhoPadrao="pequeno" texto="convidar" tamanhoDaFonte="0.9rem"></Botao>
            </div>
            <div class="div-lista xl:mt-[2vh] lg:mt-[4vh] md:mt-[4vh] ">
                <ListaConvidados texto="Convites" mostrar-select="true"  altura="40vh" class="listaConvidados"></ListaConvidados>
            </div>
            <div class="botao">
                <div class="gap-2">
                    <Botao preset="Sair" tamanhoPadrao="medio" tamanhoDaFonte="0.9rem"  >
                    </Botao>
                </div>
                <div>
                    <div>
                         <Botao  preset="PadraoRoxo" tamanhoPadrao="medio" texto="Confirmar" tamanhoDaFonte="0.9rem"  >
                        </Botao>
                    </div>
              </div>
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
import { conexaoBD } from "../stores/conexaoBD.js";
import { ref } from 'vue';

let membros = ref([]);
const banco = conexaoBD();
let usuarios = banco.procurar("/usuario");
let equipes = banco.procurar("/equipe");
let equipeSelecionada= ref ('');

listaUsuarios();

function larguraInputConvidado(){
        const screenWidth = window.innerWidth;
    if (screenWidth <= 768) {
        return '30';
    } else if (screenWidth > 768 && screenWidth <= 1024) {
        return '35';
    } else if (screenWidth > 1024 && screenWidth < 1920) {
        return '35';
    } else {
        return '18';
    }
    }


    async function listaUsuarios(){
        let listaUsuarios = await usuarios;
        if (listaUsuarios.length > 0) {
        equipeSelecionada.value = listaUsuarios[0].equipe;
        
        // Filtra os usuários pela equipe selecionada
        membros.value = listaUsuarios.filter(usuario => usuario.equipe === equipeSelecionada.value);
    }
    }

</script>

<style scoped>

.imagemEquipe {
   @apply 2xl:h-[6vh] 2xl:w-[3vw] xl:h-[5vh] xl:w-[4vw] lg:w-[4vw] lg:h-[4vh] md:w-[6vw] md:h-[4vh];
}

.div-lista{
    @apply flex 2xl:w-[80vw] xl:w-[100vw] lg:w-[115vw] md:w-[135vw] p-2 2xl:ml-4 xl:ml-[5%] lg:ml-[5%] md:ml-[7%] ;
}

.botao{
 @apply flex justify-center 2xl:gap-20 xl:gap-16 lg:gap-12 md:gap-16 w-[60%] 
  p-10 2xl:mt-8 xl:mt-[8vh] 2xl:mx-[6vw] xl:mx-[8vw] lg:mx-[9vw] md:mx-[11vw] lg:mt-[8vh] md:mt-[8vh];
}

.div-adiciona{
    @apply  flex justify-center w-[55vw] 2xl:w-[55vw] xl:w-[70vw] lg:w-[80vw] md:w-[100vw];
}

.divGeral{
        @apply w-[30vw] 2xl:w-[30vw] xl:w-[40vw] lg:w-[45vw] md:w-[55vw] flex justify-center flex-col ;
    }

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
        items-center mr-[1vw] ml-[2vw] mt-[10px]
        2xl:w-[2vw] 2xl:h-[4vh] xl:w-[3vw] xl:h-[4vh] lg:w-[4vw] lg:h-[4vh] md:w-[6vw] md:h-[4vh];
    }

.styleSelectPadraoBranco{
        @apply border-4 
        border-transparent
        border-b-brancoNeve
        pt-2
        pb-2
        px-4
        border-b-4
        w-max
        items-center justify-center focus-within:border-white
        focus-within:border-4 focus-within:rounded-md truncate;
        
    }

.corDiv{
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

.primeiraDiv{
    @apply     
    pt-2
    pb-2
    px-3
    max-w-max
    w-full
    items-center
    focus-within:border-4 focus-within:rounded-md;
    display: grid;
    grid-template-columns: 15% 60%;
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

    @media(min-width: 2560px){
        .divGeral{
            @apply w-[25vw];
        }
        .div-lista{
            @apply 2xl:w-[65vw];
        }
        .div-adiciona{
            @apply 2xl:w-[45vw];
        }
        .botao{
            @apply 2xl:w-[52%] gap-8 2xl:mt-[2vh];
        }
    }
    
</style>