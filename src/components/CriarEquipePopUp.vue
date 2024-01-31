<template>
    <div>
        <fundoPopUp  largura="" altura="82vh">
            <div class="divGeral">
                 <div class=" grid-template flex w-full">
                        <h1 class="flex font-semibold xl:text-3xl md:text-2xl sm:text-xs color-[#000]">Equipe</h1>
                 </div>
                 <div class=" grid-template  flex w-full p-5">
                       <Input styleInput="input-transparente-claro" largura="70vw" altura="10vh" icon="../src/imagem-vetores/Equipe.svg" conteudoInput="Nome da Equipe" v-model="nome" ></Input> 
                 </div>
                    <div class=" grid-template  flex w-full">
                        <Input styleInput="input-transparente-claro"  largura="70vw" altura="10vh" icon="../src/imagem-vetores/adicionarPessoa.svg"  conteudoInput="Adicionar Membro" v-model="usuarioConvidado"></Input>
                 </div>
                 <div class="grid-template flex w-full mt-[1vh]">
                      <Botao class="flex justify-center " preset="PadraoVazado" tamanhoPadrao="pequeno" texto="convidar" tamanhoDaFonte="0.9rem" :funcaoClick="adicionarMembro"></Botao>
                 </div>
                 <div class=" grid-template flex w-full p-5 xl:p-3">
                      <textAreaPadrao class="flex 2xl:w-[18vw] xl:h-[10vh] xl:w-[24vw] lg:w-[36vw] md:w-[36vw] md:h-[8vh] w-full  justify-center" height="10vh" resize="none" tamanho-da-fonte="1rem" placeholder="Descrição(opcional)" v-model="descricao"></textAreaPadrao>
                 </div> 
                 <div class="convidados-div flex justify-center">
                       <ListaConvidados  texto="Convites" mostrar-select="true" class="listaConvidados" altura="25vh" :listaConvidados="membrosEquipe" ></ListaConvidados>
                 </div>
                 <div class="botao flex  justify-end mx-[3vw] w-[86%] xl:w-[80%] ">
                        <Botao preset="PadraoRoxo" tamanhoPadrao="medio" texto="Criar Equipe" tamanhoDaFonte="0.9rem" :funcaoClick="cadastrarEquipe">
                        </Botao>
                 </div>
            </div>
                
        </fundoPopUp>
    </div>
</template>

<script setup>
  import { ref } from 'vue';
  import fundoPopUp from './fundoPopUp.vue';
  import Input from './Input.vue';
  import textAreaPadrao from './textAreaPadrao.vue';
  import Botao from './Botao.vue';
  import ListaConvidados from './ListaConvidados.vue';
  import { conexaoBD } from "../stores/conexaoBD.js";
  import { criaEquipeStore } from "../stores/criarEquipe";
import { Equipe } from '../models/Equipe';

  const banco = conexaoBD();
  let nome = ref('');
  let descricao = ref('');
  let usuarioConvidado = ref('');
  let mensagemError = ref("");
  let membrosEquipe = ref([]);
  let usuarios = banco.procurar("/usuario")

 async function adicionarMembro(){
    let listaUsuarios = await usuarios;
    listaUsuarios.forEach((usuario) => {
    if (usuarioConvidado.value === usuario.username) {
        membrosEquipe.value.push(usuario);

    }if(usuarioConvidado.value === usuario.nome) {
        membrosEquipe.value.push(usuario);

    }if(usuarioConvidado.value === usuario.email) {
        membrosEquipe.value.push(usuario);
    
    }

});
  }
 
  function cadastrarEquipe() { 
  const cria = criaEquipeStore();
            
  if (!nome.value.trim()) {
     console.log("O nome da equipe é obrigatório.");
     return;
  }

  mensagemError.value = "";

  cria.criaEquipe(
        nome.value,
        descricao.value,
        membrosEquipe.value
    
   );

  console.log('Equipe cadastrada:', cria);

  nome.value = '';
  descricao.value = '';
  membrosEquipe.value = '';
 };

 </script>
 <style scoped>
    @import url(../assets/main.css);


    @layer components {

     .mensagem-error {
        @apply flex justify-center text-red-600 mt-10;
     }
    .botao{
        @apply w-[80%] h-[11%] gap-4  items-center justify-items-center justify-center  md:mt-[4%] lg:mt-[8%] xl:mt-[4%] ; 
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
            @apply md:w-[55VW];
        }
        .listaConvidados{
            @apply w-[40vw];
        }
        .botao{
            @apply lg:mt-[5%] md:mt-[5%]
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

    @media(min-width: 1440px) and (min-height: 768px){
        .botao{
            @apply 2xl:mt-[1%] xl:mt-[1%]
        }
        .convidados-div{
            @apply xl:mt-0
        }

    }

    @media(min-width: 768px) and (min-height: 1080px){
        .botao{
            @apply md:mt-[20%] xl:mt-[4%];
        }
        .convidados-div{
            @apply mt-[4%]
        }
    }

    @media(min-width: 1366px){
        .botao{
            @apply mt-[1vh]
        }
    }
        
}
</style>