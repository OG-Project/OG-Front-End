<template>
    <navBar>
    </navBar>
    <div>
     <div class="flex justify-center mt-20 p-6 text-5xl">
         <h1>
              Equipes
         </h1>
     </div>
     <div class="flex justify-center">
          <div class="listaEquipes">
             <div class="criarEquipe"  v-for="equipe in equipesUsuario">
                    <div class="flex justify-center">
                        <div class="corDiv">
                         <img class="imagemEquipe" src=".../src/imagem-vetores/adicionarPessoa.svg" alt="">
                         <p class=" text-3xl mt-5 ml-4 text-[#877E7E]">{{ equipe.nome }}</p>
                        </div>
                        <div>
                            <img class="imgIcon" src="../src/imagem-vetores/adicionarPessoa.svg" alt="">
                        </div>
                    </div>
                    <div class="textArea">
                        <p>{{ equipe.descricao }}</p>
                    </div>
             </div>
             <div class="maisEquipes">
                <img class="flex w-[8vw] h-[16vh]" src="../src/imagem-vetores/adicionarPessoa.svg" alt="">
             </div>  
             
         </div>
     </div>
    </div>
 </template>
 
 <script setup>
  import navBar from "../components/navBar.vue"
  import VueCookies from "vue-cookies";
  import { ref, } from 'vue';
  import { conexaoBD } from "../stores/conexaoBD.js";

  let equipesUsuario = ref([]);
  const banco = conexaoBD();
  const usuarioLogado = VueCookies.get('usuarioCookie')
  let usuarios = banco.procurar("/usuario");

  listaUsuarios();

  async function listaUsuarios(){
        let listaUsuarios = await usuarios;
        listaUsuarios.forEach((usuario)=>{
           if(usuarioLogado.nome === usuario.nome ){ 
            equipesUsuario.value = usuario.equipes;
           }
        })
        
    }
 </script>
 
 <style scoped>
 .textArea{
     @apply flex  ml-5 mt-[2vh] 2xl:w-[18vw] xl:h-[10vh] xl:w-[35vw] lg:w-[36vw] md:w-[38vw] md:h-[8vh] w-full  bg-[#D7D7D7] text-black
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
 @apply flex flex-col ml-16 mr-16 w-[20vw] h-[23vh] bg-[#f8f8f8] shadow-md  shadow-gray-400 justify-center items-center;
 }
 
 .listaEquipes{
    @apply flex flex-wrap justify-start p-16 w-[88vw] h-[73vh] bg-[#f8f8f8] shadow-md  shadow-gray-200;
    flex: 1 1 px;

 }
 
 .criarEquipe{
     @apply flex flex-col ml-16 mr-16 w-[20vw] h-[23vh] bg-[#f8f8f8] shadow-md  shadow-gray-400;
 }
 
 .imagemEquipe{
     @apply flex ml-2 mt-5 2xl:h-[4vh] 2xl:w-[2vw] rounded-full;
 }
 
 .imgIcon{
     @apply flex ml-2 mt-2 h-[4vh] w-[2vw];
 }
 </style>
 