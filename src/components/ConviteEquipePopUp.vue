
<template>
    <div>
        <fundoPopUp  largura="" altura="85vh">
            <div class="divGeral">
                    <div class=" grid-template flex w-full">
                        <h1 class="flex font-semibold xl:text-3xl md:text-2xl sm:text-xs color-[#000]">Equipe</h1>
                    </div>
                    <div class=" grid-template  flex w-full p-5">
                    <Input styleInput="input-transparente-claro" largura="70vw" altura="10vh" icon="../src/imagem-vetores/Equipe.svg" conteudoInput="Nome da Equipe"></Input> 
                    </div>
                    <div class=" grid-template  flex w-full">
                        <Input  styleInput="input-transparente-claro"  largura="70vw" altura="10vh" icon="../src/imagem-vetores/adicionarPessoa.svg"  conteudoInput="Adicionar Pessoa"></Input>
                    </div>
                    <div class=" grid-template flex w-full p-10 xl:p-7">
                        <TextAreaPadrao   class="flex xl:w-[18vw] xl:h-[10vh] md:w-[36vw] md:h-[8vh] w-full justify-center" height="10vh" resize="none" tamanho-da-fonte="1rem" placeholder="Descrição(opcional)"></TextAreaPadrao>
                    </div> 
                    <div class="flex justify-center">
                        <ListaConvidados class="listaConvidados"></ListaConvidados>
                    </div>
                    <div class="botao flex  justify-end mx-[3vw] w-[86%] xl:w-[80%] ">
                        <Botao preset="PadraoRoxo" tamanhoPadrao="medio" texto="Criar Equipe" tamanhoDaFonte="0.9rem"  >
                        </Botao>
                    </div>
            </div>
           
        </fundoPopUp>
    </div>
</template>

<script setup>
import fundoPopUp from './fundoPopUp.vue';
import Input from './Input.vue';
import TextAreaPadrao from './textAreaPadrao.vue';
import Botao from './Botao.vue';
import ListaConvidados from './ListaConvidados.vue';
const Usuario = {
    nome: String,
    permissao: String,
    img: String
}
const opcoesSelect = ['Edit', 'View']
Usuario.nome = "EduardoCosta"
Usuario.img = ""



</script>

<style scoped>
@import url(../assets/main.css);


@layer components {

    .botao{
        @apply w-[80%] h-[11%] gap-4  items-center justify-items-center justify-center  md:mt-[6%] lg:mt-[8%] xl:mt-[1%] 2xl:mt-[8%]; 
        display: grid;
        grid-template-columns: 40% 55%;
    }

    .grid-template{ 
        @apply w-[80%] h-[11%] gap-4  items-center justify-items-center justify-center ; 
        display: grid;
        grid-template-columns: 40% 55%;
    }

    #convites-bg {
        clip-path: polygon(20% 0, 80% 0, 100% 15%, 100% 100%, 0 100%, 0 15%);
    }

    .listaConvidados{
        @apply w-full
    }
    .divGeral{
        @apply w-full flex justify-center p-5 flex-col;
    }
    

    @media(min-width: 2560px){
        .divGeral{
            @apply w-[55vw];
        }
    }

    @media(min-width: 1024px){
        .divGeral{
            @apply w-[50vw];
        }
        .listaConvidados{
            @apply w-[40vw];
        }
    }

    @media(min-width: 768px){
        .divGeral{
            @apply w-[50VW];
        }
        .listaConvidados{
            @apply w-[40vw];
        }
    }
    @media(min-width: 1280px){
        .divGeral{
            @apply w-[25VW];
        }
        .listaConvidados{
            @apply w-[20vw];
        }
    }

    @media(min-width: 1280px ) and ( max-width: 1440px){
        .divGeral{
            @apply w-[50vw];
        }
        .listaConvidados{
            @apply w-[30vw];
            
        }
    }

    @media(min-width: 1440px) and (min-height: 1080px){
        .botao{
           @apply xl:mt-[4%] ;
        }
    }

    @media(min-width: 768px) and (min-height: 1080px){
        .botao{
           @apply md:mt-[25%];
        }
    }
   
}
</style>