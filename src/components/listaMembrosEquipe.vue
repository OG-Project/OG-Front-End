<template>
    <div>
      <fundoPopUp largura="" altura="88vh">
      <div class="divGeral">
            <div class="flex justify-center">
                <div class="primeiraDiv flex justify-center">
                    <img class="imgEquipe rounded-full" src="img" alt="">
                    <h1 class=" text-3xl 2xl:w-[10vw] xl:w-[15vw] lg:w-[20vw] md:w-[30vw]">Equipe OG</h1>
                </div>
            </div>
            <div class="flex justify-center p-10" v-for="Usuario of usuarios">
                <img class="imgIcon" src="" alt="">
                <div class="primeiraDiv">
                    <img class="imgPerfil" src="usuarios.img" alt="">
                    <h1 class=" text-xl w-[14vw] ">{{usuarios.nome}}</h1>
                </div>
                <SelectPadrao class="styleSelectPadraoBranco text-sm" styleSelect="select-branco" :listaSelect="opcoesSelect"></SelectPadrao> 
            </div>
            <div>
                <div class="div-adiciona ">
                    <div class="grid-template flex justify-start">
                        <Input styleInput="input-transparente-claro"  largura="70vw" altura="10vh" icon="../src/imagem-vetores/adicionarPessoa.svg"  conteudoInput="Adicionar Pessoa"></Input>
                    </div>
                 </div>
            </div>
            <div class="flex justify-center p-1">
                <Botao class="flex justify-center" preset="PadraoVazado" tamanhoPadrao="pequeno" texto="convidar" tamanhoDaFonte="0.9rem"></Botao>
            </div>
            <div class="div-lista ">
                <ListaConvidados texto="Convites" class="listaConvidados"></ListaConvidados>
            </div>
            <div>
                <div class="botaoConfirma">
                    <Botao preset="PadraoRoxo" tamanhoPadrao="medio" texto="Confirmar" tamanhoDaFonte="0.9rem"  >
                    </Botao>
                </div>
            <div class="botaoSair">
                <Botao preset="Sair" tamanhoPadrao="medio" texto="Sair" tamanhoDaFonte="0.9rem"  >
                </Botao>
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

.div-lista{
    @apply flex 2xl:w-[80vw] xl:w-[85vw] lg:w-[120vw] md:w-[153vw] p-2 2xl:ml-4 xl:ml-[12%]  ;
}

.botaoConfirma{
 @apply flex justify-end mx-[6vw] w-[86%] xl:w-[80%] p-10 2xl:mt-1 xl:mt-[3vh] 2xl:mx-[6vw] lg:mt-[8vh] md:mt-[7vh] ;
}

.botaoSair{
  @apply flex justify-start 2xl:mx-[2vw] xl:mx-[4vw] lg:mx-[4vw] md:mx-[6vw] w-[86%] xl:w-[80%] mt-[-9.1vh] 2xl:mt-[-9.1vh] xl:mt-[-8.7vh] lg:mt-[-8.7vh] md:mt-[-8.7vh];
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
        .botaoConfirma{
            @apply 2xl:w-[80%] 2xl:mx-[4.5vw] 2xl:mt-[2vh];
        }
        .botaoSair{
            @apply 2xl:mx-[2vw] w-[86%] xl:w-[80%] 2xl:mt-[-8.8vh];
        }
    }
    
</style>