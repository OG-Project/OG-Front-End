<template>
    <navBar>
    </navBar>
    <div>
     <div class="flex justify-center mt-20 p-6 text-5xl">
         <h1>
              Equipes
         </h1>
     </div>
     <div class="flex justify-center ">
          <div class="listaEquipes overflow-auto" >
             <div class="criarEquipe "  :class="'mao-clique'" @mouseover="mostrarNomeCompleto(equipe.equipe.nome)" @mouseleave="limparNomeCompleto()" :title="nomeCompleto"  v-for="equipe in equipesUsuario">
                <div class="flex justify-center"  >
                        <div class="corDiv">
                         <img class="imagemEquipe" src="" alt="">
                         <p class=" text-2xl mt-5 ml-4 text-[#877E7E] " >{{ truncarNome(equipe.equipe.nome , 12) }}</p>
                        </div>
                            <div  @click="abrePopUp(equipe, 'engrenagem')">
                                <img class="imgIcon " src="../imagem-vetores/engrenagem.svg" alt="">
                            </div>
                    </div>
                    <div class="textArea">
                        <p>{{ equipe.equipe.descricao }}</p>
                    </div>
                </div>
                <div class="maisEquipes" @click="abrePopUp(equipe, 'criar')">
                    <img class="flex w-[8vw] h-[6vh]" src="../imagem-vetores/maisIcon.svg" alt="">
                </div>  
         </div>
        <div class="absolute top-0 left-0 right-0">
            <editarEquipePopUp  v-if="funcaoPopUp.variavelModal && variavelEngrenagem == true"  ></editarEquipePopUp>
        </div>
        <div class="absolute top-0 left-0 right-0">
            <CriarEquipePopUp v-if="funcaoPopUp.variavelModal && variavelCria == true"></CriarEquipePopUp>
        </div>
     </div>
    </div>
 </template>
 
 <script setup>
  import navBar from "../components/navBar.vue"
  import VueCookies from "vue-cookies";
  import { ref, } from 'vue';
  import { conexaoBD } from "../stores/conexaoBD.js";
  import editarEquipePopUp from "../components/editarEquipePopUp.vue";
  import { funcaoPopUpStore } from "../stores/funcaoPopUp";
import CriarEquipePopUp from "../components/CriarEquipePopUp.vue";

  const truncarNome = (nome, comprimentoMaximo) => (nome.length > comprimentoMaximo ? `${nome.slice(0, comprimentoMaximo)}...` : nome);

  let equipesUsuario = ref([]);
  const banco = conexaoBD();
  const usuarioLogado = VueCookies.get('usuarioCookie')
  let usuarios = banco.procurar("/usuario");
  const funcaoPopUp = funcaoPopUpStore();
  funcaoPopUp.variavelModal=false;
  let variavelCria = false;
  let variavelEngrenagem = false;
  const nomeCompleto = ref('');

  listaUsuarios();

  async function listaUsuarios(){
        let listaUsuarios = await usuarios;
        listaUsuarios.forEach((usuario)=>{
           if(usuarioLogado.nome === usuario.nome ){ 
            equipesUsuario.value = usuario.equipes;
           }
        })
    }

  function abrePopUp(equipe, tipo){

    if (tipo === 'criar') {
        variavelCria = true;
        variavelEngrenagem = false;
    } else {
        variavelEngrenagem = true;
        variavelCria = false;
    }

    const equipeSelecionada = equipe;
    console.log(equipeSelecionada)
    VueCookies.set("equipeSelecionada", equipeSelecionada, 30000)
    funcaoPopUp.abrePopUp()

  }

function mostrarNomeCompleto(nome) {
    nomeCompleto.value = nome;
}

function limparNomeCompleto() {
    nomeCompleto.value = '';
}

 
  
 </script>
 
 <style scoped>

 .mao-clique{
    cursor: pointer;
 }
 .textArea{
     @apply flex mr-4 items-start justify-start ml-5 mt-[2vh] 2xl:w-[18vw] xl:h-[10vh] xl:w-[35vw] lg:w-[36vw] md:w-[38vw] md:h-[8vh] w-full  bg-[#D7D7D7] text-black text-lg
     border-transparent border-b-roxo border-b-4  focus-within:border-roxo focus-within:border-4;
     border-bottom: 'solid 4px #620BA7' ;
 }
 
 .corDiv{
    @apply flex  ml-10 h-20 w-[13vw] 
    border-transparent
    border-b-roxo    
    border-b-4
    items-center focus-within:border-roxo 
    focus-within:border-4;
    
 }

 .maisEquipes{
 @apply flex flex-col ml-[5vw] mr-16 mt-[5vh] w-[20vw] h-[23vh] bg-[#f8f8f8] shadow-md  shadow-gray-400 justify-center items-center;
 }
 
 .listaEquipes{
    @apply  flex flex-wrap justify-start w-[88vw] h-[73vh] bg-[#f8f8f8] shadow-md  shadow-gray-200;
    flex: 1 1 px;
   
 }

 ::-webkit-scrollbar{
    @apply hidden;
 }
 
 .criarEquipe{
     @apply flex flex-col ml-[5vw] mr-16 mt-[5vh] w-[20vw] h-[23vh] bg-[#f8f8f8] shadow-md  shadow-gray-400;
 }
 
 .imagemEquipe{
     @apply flex ml-2 mt-5 2xl:h-[4vh] 2xl:w-[2vw] rounded-full;
 }
 
 .imgIcon{
     @apply flex ml-2 mt-2 h-[4vh] w-[2vw] ;
 }
 </style>
 