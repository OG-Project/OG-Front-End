<template>
    <div>
        <div class="flex justify-center mt-20 p-6 text-5xl">
            <h1>
                Equipes
            </h1>
        </div>
        <div class="flex justify-center ">
            <div class="listaEquipes overflow-auto">
                <div class="criarEquipe " @click="abrePaginaEquipe(equipe)" href="#/equipe/telaInicial"
                    :class="'mao-clique'" @mouseover="mostrarNomeCompleto(equipe.equipe.nome)"
                    @mouseleave="limparNomeCompleto()" :title="nomeCompleto" v-for="equipe in equipesUsuario">
                    <div class="flex justify-center">
                        <div class="corDiv">
                            <img class="imagemEquipe"
                                :src="equipe.equipe.foto?.tipo ? 'data:' + equipe.equipe.foto.tipo + ';base64,' + equipe.equipe.foto.dados : ''">
                            <p class=" text-2xl mt-5 ml-4 text-[#877E7E] ">{{ truncarNome(equipe.equipe.nome,
                        larguraNomeEquipe()) }}</p>
                        </div>
                        <div @click.stop="abrePopUp(equipe, 'engrenagem')">
                            <img class="imgIcon " src="../imagem-vetores/engrenagem.svg" alt="">
                        </div>
                    </div>
                    <div class="textArea">
                        <p class="descricao">{{ equipe.equipe.descricao }}</p>
                    </div>
                </div>
                <div class="maisEquipes" :class="'mao-clique'" @click="abrePopUp(equipe, 'criar')"
                    @mouseover="expandirCard" @mouseleave="reduzirCard">
                    <img class="flex w-[8vw] h-[6vh]" src="../imagem-vetores/maisIcon.svg" alt="">
                </div>
            </div>

            <editarEquipePopUp v-if="funcaoPopUp.variavelModal && variavelEngrenagem == true"></editarEquipePopUp>

            <criarEquipePopUp v-if="funcaoPopUp.variavelModal && variavelCria == true"></criarEquipePopUp>


        </div>
    </div>

</template>

<script setup>
import navBar from "../components/navBar.vue"
import VueCookies from "vue-cookies";
import { onMounted, ref, watch } from 'vue';
import { conexaoBD } from "../stores/conexaoBD.js";
import editarEquipePopUp from "../components/editarEquipePopUp.vue";
import { funcaoPopUpStore } from "../stores/funcaoPopUp";
import criarEquipePopUp from "../components/CriarEquipePopUp.vue";
import { useRouter } from 'vue-router'
import { webSocketStore } from '../stores/webSocket.js'


let equipesUsuario = ref([]);
const banco = conexaoBD();
const webSocket = webSocketStore();
const usuarioLogadoId = 1;
let usuarios;
const funcaoPopUp = funcaoPopUpStore();
funcaoPopUp.variavelModal = false;
let variavelCria = false;
let variavelEngrenagem = false;
const nomeCompleto = ref('');
const router = useRouter();

onMounted(() => {
    listaUsuarios();


})

const truncarNome = (nome, comprimentoMaximo) => (nome.length > comprimentoMaximo ? `${nome.slice(0, comprimentoMaximo)}...` : nome);
      
async function listaUsuarios() {
    usuarios = banco.procurar("/usuario");
    let listaUsuarios = await usuarios;
    console.log(listaUsuarios)
    listaUsuarios.forEach((usuario) => {
        if (usuarioLogadoId == usuario.id) {
            console.log(usuario.equipes)
            equipesUsuario.value = usuario.equipes;
        }
    })

}

function abrePaginaEquipe(equipe) {
    const equipeSelecionada = equipe;
    console.log(equipeSelecionada)
    VueCookies.set("equipeSelecionada", equipeSelecionada.equipe.id, 30000)
    router.push({ name: 'telaInicial' })

}

async function abrePopUp(equipe, tipo) {

    if (tipo == 'engrenagem') {
        variavelCria = false;
        variavelEngrenagem = true;
        const equipeSelecionada = equipe;
        VueCookies.set("equipeSelecionada", equipeSelecionada.equipe.id, 30000)
        funcaoPopUp.abrePopUp()
    } else {
        variavelEngrenagem = false;
        variavelCria = true;
        funcaoPopUp.abrePopUp()
    }

}

function larguraNomeEquipe() {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 768) {
        return 8;
    } else if (screenWidth > 768 && screenWidth <= 1024) {
        return 8;
    } else if (screenWidth > 1024 && screenWidth < 1920) {
        return 8;
    } else if (screenWidth >= 1920 && screenWidth < 2560) {
        return 11;
    } else if (screenWidth >= 2560) {
        return 16;
    }
}

function mostrarNomeCompleto(nome) {
    nomeCompleto.value = nome;
  }


function limparNomeCompleto() {
    nomeCompleto.value = '';

  }
 </script>

<style scoped>
.descricao {
    white-space: pre-wrap;
    word-break: break-word;
}

.criarEquipe:hover,
.criarEquipe[data-expanded="true"] {
    transform: scale(1.1);
}

.maisEquipes:hover,
.maisEquipes[data-expanded="true"] {
    transform: scale(1.1);
}

.mao-clique {
    cursor: pointer;
}

.textArea {
    @apply flex mr-4 items-start justify-start ml-5 mt-[2vh] 2xl:w-[18vw] xl:h-[10vh] xl:w-[21vw] lg:w-[28vw] md:w-[31vw] md:h-[10vh] w-full bg-[#D7D7D7] text-black text-lg text-left border-transparent border-b-roxo border-b-2 focus-within:border-roxo focus-within:border-4;
    border-bottom: 'solid 4px #620BA7';
}

.corDiv {
    @apply flex ml-10 h-20 w-[13vw] 2xl:w-[13vw] xl:w-[15vw] lg:w-[21vw] md:w-[25vw] border-transparent border-b-roxo border-b-2 items-center focus-within:border-roxo focus-within:border-4;

}

.maisEquipes {
    @apply flex flex-col 2xl:ml-[5vw] 2xl:mr-16 2xl:mt-[5vh] xl:ml-[4.5vw] xl:mr-0 xl:mt-[5vh] lg:ml-[5vw] lg:mt-[5vh] lg:mr-16 md:ml-[5vw] md:mt-[5vh] 2xl:w-[20vw] 2xl:h-[23vh] xl:w-[23.5vw] xl:h-[23vh] lg:w-[32.5vw] lg:h-[23vh] md:w-[37vw] md:h-[23vh] bg-[#f8f8f8] shadow-md shadow-gray-400 justify-center items-center;
}

.listaEquipes {
    @apply flex flex-wrap justify-start w-[88vw] h-[71vh] bg-[#f8f8f8] shadow-md shadow-gray-200;
    flex: 1 1 px;

}

::-webkit-scrollbar {
    @apply hidden;
}

.criarEquipe {
    @apply flex flex-col 2xl:ml-[5vw] 2xl:mr-16 2xl:mt-[5vh] xl:ml-[4.5vw] xl:mr-0 xl:mt-[5vh] lg:ml-[5vw] lg:mt-[5vh] lg:mr-16 md:ml-[5vw] md:mt-[5vh] 2xl:w-[20vw] 2xl:h-[23vh] xl:w-[23.5vw] xl:h-[23vh] lg:w-[32.5vw] lg:h-[23vh] md:w-[37vw] md:h-[23vh] bg-[#f8f8f8] shadow-md shadow-gray-400;
}

.imagemEquipe {
    @apply flex ml-2 mt-5 2xl:h-[4vh] 2xl:w-[2vw] xl:h-[4vh] xl:w-[3vw] lg:w-[4vw] lg:h-[4vh] md:w-[5vw] md:h-[4vh] rounded-full;
}

.imgIcon {
    @apply flex 2xl:ml-8 2xl:mt-2 lg:ml-4 lg:mt-2 md:ml-2 md:mt-0 2xl:h-[4vh] 2xl:w-[2vw] lg:h-[4vh] lg:w-[3vw] md:h-[6vh] md:w-[4vw];
}
</style>