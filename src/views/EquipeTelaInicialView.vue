<template>
    <div>
        <div class="corDiv">
          <img class="imagemEquipe" v-if="equipeEditar.foto" :src="'data:' + equipeEditar.foto.tipo + ';base64,' + equipeEditar.foto.dados" @click="abrePopUp(equipeSelecionada.equipe, 'engrenagem') " @mouseover="expandirImagem" @mouseleave="reduzirImagem">
          <img class="imagemEquipe" v-else src="" @click="abrePopUp(equipeSelecionada.equipe, 'engrenagem') ">
          
            <h1 class="tituloEquipe ">{{ equipeEditar.nome }}</h1>
        </div>
        <div class="flex justify-end">
            <div class="flex mt-[-3vh] mr-[1vw]">
                <Botao  preset="PadraoVazado" tamanhoDaBorda="2px" sombreado="sim" corBordaHover="#620BA7" corBorda="#620BA7" tamanhoPadrao="pequeno"  texto="+ Projetos" tamanhoDaFonte="1rem" :funcaoClick="cadastrarEquipe">
                </Botao>
            </div>
            <div class="botaoIcone flex justify-center mt-[-3vh] mr-[1vw] shadow-xl " @click="abrePopUp(equipeSelecionada.equipe, 'engrenagem') " @mouseover="hover = true" @mouseleave="hover = false">
                <img src="../imagem-vetores/engrenagem.svg" alt="" :class="{ 'imagem-hover': hover }">
            </div>
            <div class="botaoIcone flex mt-[-3vh] 2xl:mr-[2.5vw] xl:mr-[2.5vw] lg:mr-[2.5vw] md:mr-[2.5vw]  shadow-xl  " @click="abrePopUp(equipeSelecionada, 'membros')" @mouseover="hoverMembros = true" @mouseleave="hoverMembros = false">
                <img src="../imagem-vetores/membrosEquipe.svg" alt="" :class="{ 'imagem-hover-membros': hoverMembros }">
                <p class="flex items-center 2xl:ml-2 2xl:mt-1 xl:ml-2 xl:mt-1 lg:ml-3 lg:mt-2 md:ml-3 md:mt-2 text-md" :class="{ 'imagem-hover-membros': hoverMembros }">{{ numeroMembrosLimitado() }}</p>
            </div>
                <editarEquipePopUp  v-if="funcaoPopUp.variavelModal && variavelEngrenagem == true"  ></editarEquipePopUp>
                <ListaMembrosEquipe v-if="funcaoPopUp.variavelModal && variavelMembros == true">  </ListaMembrosEquipe>
          
        </div>
       
    </div>  
    <div class="flex justify-center ">
          <div class="listaEquipes overflow-auto"  >
                    <H1 class="text-4xl mt-5 text-black font-semibold">PROJETOS</H1> 
          </div>
    </div>
</template>
<script setup>
  import navBar from "../components/navBar.vue"
  import Botao from '../components/Botao.vue';
  import {ref, onMounted, watch} from 'vue';
  import VueCookies from "vue-cookies";
  import editarEquipePopUp from "../components/editarEquipePopUp.vue";
  import { funcaoPopUpStore } from "../stores/funcaoPopUp";
  import ListaMembrosEquipe from "../components/listaMembrosEquipe.vue";
  import { conexaoBD } from "../stores/conexaoBD.js";

   

const equipeSelecionada = VueCookies.get('equipeSelecionada')
const usuarioLogado = VueCookies.get('usuarioCookie');
const funcaoPopUp = funcaoPopUpStore();
const quantidadeMembros = ref([]);
let membrosEquipe = ref([]);
funcaoPopUp.variavelModal=false;
let variavelEngrenagem = false;
let variavelMembros = false;
const banco = conexaoBD();
let equipeEditar = ref({
    nome: '',
    descricao: ''
});

async function filtrarEquipe(){
    console.log(await(banco.buscarUm(equipeSelecionada, "/equipe")))
    equipeEditar.value = await(banco.buscarUm(equipeSelecionada, "/equipe"))
}
filtrarEquipe();

async function buscarMembrosEquipe() {
    // Chama a função do banco de dados para buscar os membros da equipe
    membrosEquipe.value = await (banco.buscarMembrosEquipe(equipeSelecionada,"/usuario/buscarMembros"));
   if (Array.isArray(membrosEquipe.value)) {
        // Filtrar espaços nulos (null) da lista de membros da equipe
        quantidadeMembros.value = membrosEquipe.value.filter(membro => membro != null);
    } else {
        console.error("O retorno de buscarMembrosEquipe() não é um array válido.");
    }
  }

  // Chamada da função para buscar membros da equipe assim que o componente for montado
  onMounted(() => {
    buscarMembrosEquipe();
  });


   watch(() => VueCookies.get('equipeSelecionada'), async (newValue, oldValue) => {
    if (newValue !== oldValue) {
        await filtrarEquipe();
        await buscarMembrosEquipe();
    }
  });


  function numeroMembrosLimitado() {
    return Math.min(quantidadeMembros.value.length, 99);
  }

console.log(usuarioLogado)
console.log(equipeSelecionada)

  const hover = ref(false);
  const hoverMembros = ref(false);

 function abrePopUp(equipe, tipo){

    if (tipo === 'membros') {
    variavelMembros = true;
    variavelEngrenagem = false;
    } else {
    variavelEngrenagem = true;
    variavelMembros = false;
    }

    const equipeEditada = equipe;
    console.log(equipeEditada)
    VueCookies.set("equipeEditada", equipeEditada, 30000)
    funcaoPopUp.abrePopUp()

    }
</script>
<style scoped>
.corDiv{
    @apply flex 2xl:ml-[5vw] 2xl:mt-[5vh] xl:ml-[5vw] xl:mt-[5vh] lg:ml-[5vw] lg:mt-[1vh]  md:ml-[5vw] md:mt-[-5vh] 
    2xl:h-[10vh] 2xl:w-[40vw] xl:h-[12vh] xl:w-[35vw] lg:h-[15vh] lg:w-[45vw] md:h-[20vh] md:w-[55vw]
    border-transparent
    border-b-roxo    
    border-b-2
    items-center focus-within:border-roxo 
    focus-within:border-4;
 }

 .botaoIcone:hover {
  background-color:#620BA7;
  
 }

.imagem-hover {
  filter: brightness(0) invert(1);
  transition: filter 0.3s ease;
}

.imagem-hover-membros {
  filter: brightness(0) invert(1);
  transition: filter 0.3s ease;
}

 .botaoIcone {
  @apply 2xl:w-[3.5vw] 2xl:h-[4vh] xl:w-[5vw] xl:h-[4vh] lg:w-[7vw] lg:h-[4vh] md:w-[9vw] md:h-[4vh];
  border: 2px solid #620BA7;
  background-color: transparent;
  padding: 8px;
  cursor: pointer;
  transition: border-color 0.3s ease;
}


 .tituloEquipe {
    @apply text-4xl ml-4 text-[#877E7E]
    2xl:mt-5 xl:mt-10 lg:mt-24 md:mt-[12vh]
    ;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; 
}

.listaEquipes{
    @apply  flex flex-wrap justify-center mt-[11vh] w-[95vw] h-[65vh] bg-[#f8f8f8] shadow-md  shadow-gray-200;
    flex: 1 1 px;
 }

 .imagemEquipe{
     @apply flex ml-5 2xl:mt-2 xl:mt-5 lg:mt-20 md:mt-[12vh] 2xl:h-[80px] 2xl:w-[80px] xl:h-[80px] xl:w-[80px] lg:w-[80px] lg:h-[80px] md:h-[80px] md:w-[80px] rounded-full;
     transition: transform 0.3s ease;
 }

.imagemEquipe:hover, .imagemEquipe[data-expanded="true"] {
    transform: scale(1.1);
}

 @media(min-width: 2560px){
        .botaoIcone{
          @apply w-[3vw] h-[4vh]
        }
    }

</style>