<template>
    <navBar>
    </navBar>
    <div>
        <div class="corDiv">
            <img class="imagemEquipe" src="" alt="">
            <h1 class="tituloEquipe ">equipe</h1>
        </div>
        <div class="flex justify-end">
            <div class="flex mt-[-3vh] mr-[2vw]">
                <Botao preset="PadraoVazado" tamanhoPadrao="pequeno"  texto="+ Projetos" tamanhoDaFonte="1rem" :funcaoClick="cadastrarEquipe">
                </Botao>
            </div>
            <div class="botaoIcone flex mt-[-3vh] mr-[10vw] ">
                <img src="../imagem-vetores/engrenagem.svg" alt="">
            </div>
            
        </div>
       
    </div>  
    <div class="flex justify-center ">
          <div class="listaEquipes overflow-auto" >
                    <H1 class="text-4xl mt-5 text-black font-semibold">PROJETOS</H1> 
          </div>
    </div>
</template>
<script setup>
  import navBar from "../components/navBar.vue"
  import Botao from '../components/Botao.vue';

 


</script>
<style scoped>
.corDiv{
    @apply flex  ml-[5vw] mt-[5vh] h-[10vh] w-[30vw]
    border-transparent
    border-b-roxo    
    border-b-4
    items-center focus-within:border-roxo 
    focus-within:border-4;

    
 }

 
.botaoIcone:hover {
  border-color: #8A2BE2; /* Cor da borda roxa ao passar o mouse */
}

.imagem-hover {
  filter: brightness(0) invert(1); /* Inverte e torna a imagem branca ao passar o mouse */
}

 .botaoIcone {
  border: 2px solid #8A2BE2; /* Cor da borda roxa */
  background-color: transparent;
  padding: 8px;
  cursor: pointer;
  transition: border-color 0.3s ease; /* Transição suave para a cor da borda */
}


 .tituloEquipe {
    @apply text-6xl ml-4 text-[#877E7E];
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; 
}

.listaEquipes{
    @apply  flex flex-wrap justify-center mt-[17vh] w-[95vw] h-[58vh] bg-[#f8f8f8] shadow-md  shadow-gray-200;
    flex: 1 1 px;
   
 }

 .imagemEquipe{
     @apply flex ml-5 mt-5 2xl:h-[6vh] 2xl:w-[3vw] xl:h-[4vh] xl:w-[3vw] lg:w-[4vw] lg:h-[4vh] rounded-full;
 }

</style>