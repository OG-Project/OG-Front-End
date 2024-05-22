<template>
    <div>
        <div class="flex justify-center mt-20 p-6 text-5xl">
            <h1>
                {{ $t('equipes.equipes') }}
            </h1>
        </div>
        <div class="flex justify-center ">
            <div class="listaEquipes overflow-auto">
                <div class="criarEquipe " @click="abrePaginaEquipe(equipe)" href="#/equipe/telaInicial"
                    :class="'mao-clique'" @mouseover="mostrarNomeCompleto(equipe.equipe.nome)"
                    @mouseleave="limparNomeCompleto()" :title="nomeCompleto" v-for="equipe in equipesUsuario">
                    <div :id="temId(equipe)">
                        <div class="flex justify-center">
                            <div class="corDiv">
                                <img class="imagemEquipe" v-if="equipe.equipe.foto"
                                    :src="equipe.equipe.foto?.tipo ? 'data:' + equipe.equipe.foto.tipo + ';base64,' + equipe.equipe.foto.dados : ''">
                                <equipe class="imagemEquipe" v-else></equipe>
                                <p class=" truncate text-2xl mt-5 ml-4 text-[var(--fonteCor)] ">{{
                                     equipe.equipe.nome }}
                                </p>
                            </div>
                            <div @click.stop="abrePopUp(equipe, 'engrenagem')">
                                <engrenagem class="imgIcon"></engrenagem>
                            </div>
                        </div>
                        <div class="textArea">
                            <p class="descricao">{{ equipe.equipe.descricao }}</p>
                        </div>
                    </div>
                </div>
                <div id="step-5" class="maisEquipes" :class="'mao-clique'" @click="abrePopUp(equipe, 'criar')"
                    @mouseover="expandirCard" @mouseleave="reduzirCard">
                    <maisIcon class="flex w-[8vw] h-[6vh] ">
                    </maisIcon>
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
import maisIcon from "../imagem-vetores/maisIcon.vue";
import engrenagem from "../imagem-vetores/engrenagem.vue";
import equipe from "../imagem-vetores/equipe.vue";
import TelaLoad from "../components/TelaLoad.vue";

import { inject } from "vue";
const tour = inject('tour')
function temId(a) {
    return equipesUsuario.value.indexOf(a) == equipesUsuario.value.length - 1 ? 'step-8' : ''
}

let equipesUsuario = ref([]);
const banco = conexaoBD();
const webSocket = webSocketStore();
const usuarioLogadoId = VueCookies.get("IdUsuarioCookie");
let usuarios;
const funcaoPopUp = funcaoPopUpStore();
funcaoPopUp.variavelModal = false;
let variavelCria = ref(false);
let variavelEngrenagem = false;
const nomeCompleto = ref('');
const router = useRouter();

onMounted(() => {
    listaUsuarios();
})

webSocket.url = "ws://localhost:8085/og/webSocket/usuario/1"


const truncarNome = (nome, comprimentoMaximo) => (nome.length > comprimentoMaximo ? `${nome.slice(0, comprimentoMaximo)}...` : nome);

async function listaUsuarios() {
    usuarios = banco.procurar("/usuario");
    let listaUsuarios = await usuarios;
    banco.loading = true
    let totalUsuarios = listaUsuarios.length;
    let usuariosProcessados = 0;
    listaUsuarios.forEach((usuario) => {
        if (usuarioLogadoId == usuario.id) {
            equipesUsuario.value = usuario.equipes;
            usuariosProcessados++;
            console.log(equipesUsuario.value.length)
            if (equipesUsuario.value.length != 0) {
                if (usuariosProcessados === 1 && equipesUsuario.value[0].id == usuario.equipes[0].id) {
                    banco.loading = false
                }
            }
        }
    });

    banco.loading= false

}

function abrePaginaEquipe(equipe) {
    const equipeSelecionada = equipe;
    console.log(equipeSelecionada)
    VueCookies.set("equipeSelecionada", equipeSelecionada.equipe.id, 30000)
    router.push({ name: 'telaInicial' }).then(() => {
        // windowtion.reload()
        ///aqui
    });

}

async function abrePopUp(equipe, tipo) {
    if (tipo == 'engrenagem') {
        variavelCria.value = false;
        variavelEngrenagem = true;
        const equipeSelecionada = equipe;
        VueCookies.set("equipeSelecionada", equipeSelecionada.equipe.id, 30000)
        funcaoPopUp.abrePopUp()
    } else {
        variavelEngrenagem = false;
        variavelCria.value = true;
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
    @apply truncate flex mr-4 items-start justify-start ml-5 mt-[2vh] 2xl:w-[18vw] xl:h-[10vh] xl:w-[21vw] lg:w-[28vw] 
    md:w-[31vw] md:h-[10vh] w-full bg-[#D7D7D7] text-black text-lg text-left border-transparent border-b-[var(--roxo)] border-b-2 
    focus-within:border-[var(--roxo)] focus-within:border-4;
    border-bottom: 'solid 4px var(--roxo)';
}

.corDiv {
    @apply flex ml-10 h-20 w-[13vw] 2xl:w-[13vw] xl:w-[15vw] lg:w-[21vw] md:w-[25vw] border-transparent 
    border-b-[var(--roxo)] border-b-2 items-center focus-within:border-[var(--roxo)] focus-within:border-4;

}

.maisEquipes {

    @apply flex flex-col 2xl:ml-[5vw] 2xl:mr-16 2xl:mt-[5vh] xl:ml-[4.5vw] xl:mr-0 xl:mt-[5vh] lg:ml-[5vw] lg:mt-[5vh] 
    lg:mr-16 md:ml-[5vw] md:mt-[5vh] 2xl:w-[20vw] 2xl:h-[25vh] xl:w-[23.5vw] xl:h-[25vh] lg:w-[32.5vw] lg:h-[23vh] md:w-[37vw] md:h-[23vh]
     bg-[var(--backgroundItemsClaros)] shadow-md shadow-[var(--backgroundItemsClaros)] justify-center items-center;
}

.listaEquipes {
    @apply flex flex-wrap justify-start w-[88vw] h-[71.2vh] bg-[var(--backgroundItems)] shadow-md shadow-[var(--backgroundItems)];
    flex: 1 1 px;
}

::-webkit-scrollbar {
    @apply hidden;
}

.criarEquipe {
    @apply flex flex-col 2xl:ml-[5vw] 2xl:mr-16 2xl:mt-[5vh] xl:ml-[4.5vw] xl:mr-0 xl:mt-[5vh] lg:ml-[5vw] lg:mt-[5vh] lg:mr-16 md:ml-[5vw]
     md:mt-[5vh] 2xl:w-[20vw] 2xl:h-[25vh] xl:w-[23.5vw] xl:h-[25vh] lg:w-[32.5vw] lg:h-[23vh] md:w-[37vw] md:h-[23vh] bg-[var(--backgroundItemsClaros)] 
     shadow-md shadow-[var(--backgroundItemsClaros)];
}

.imagemEquipe {
    @apply flex ml-2 mt-5 2xl:h-[4vh] 2xl:w-[2vw] xl:h-[4vh] xl:w-[3vw] lg:w-[4vw] lg:h-[4vh] md:w-[5vw] 
    md:h-[4vh] rounded-full;
}

.imgIcon {
    @apply flex 2xl:ml-8 2xl:mt-2 lg:ml-4 lg:mt-2 md:ml-2 md:mt-0 2xl:h-[4vh] 2xl:w-[2vw] lg:h-[4vh] lg:w-[3vw]
     md:h-[6vh] md:w-[4vw];
}

@media(min-width: 621px) and (max-width: 767px){
    .maisEquipes {
        @apply flex flex-col ml-[6vw] mt-[5vh] w-[77vw] h-[25vh] bg-[var(--backgroundItemsClaros)] shadow-md 
        shadow-[var(--backgroundItemsClaros)] justify-center items-center;
    }

    .criarEquipe {
        @apply flex flex-col ml-[6vw] mr-12 mt-[5vh] w-[100%] h-[25vh] bg-[var(--backgroundItemsClaros)] shadow-md shadow-[var(--backgroundItemsClaros)];
    }

    .imagemEquipe {
        @apply flex ml-2 mt-5 h-[30px] w-[30px] rounded-full;
    }

    .imgIcon {
        @apply flex ml-[3vw] mt-4 h-[25px] w-[25px];
    }

    .corDiv {
        @apply flex ml-[5vw] h-20 w-[55vw] border-transparent border-b-[var(--roxo)] border-b-2 items-center focus-within:border-[var(--roxo)] focus-within:border-4;
    }

    .textArea {
        @apply flex mr-4 items-start justify-start ml-5 mt-[2vh] w-[72vw] h-[10vh] bg-[#D7D7D7] text-black text-lg text-left border-transparent border-b-[var(--roxo)] border-b-2 focus-within:border-[var(--roxo)] focus-within:border-4;
        border-bottom: 'solid 4px var(--roxo)';
    }

    .listaEquipes {
        @apply flex flex-wrap justify-start w-[88vw] h-[71vh] bg-[var(--backgroundItems)] shadow-md shadow-[var(--backgroundItems)];
        flex: 1 1 px;
    }

}

@media(max-width: 620px) {
    .maisEquipes {
        @apply flex flex-col ml-[8vw] mt-[5vh] w-[70vw] h-[25vh] bg-[var(--backgroundItemsClaros)] shadow-md shadow-[var(--backgroundItemsClaros)] justify-center items-center;
    }

    .criarEquipe {
        @apply flex flex-col ml-[9vw] mr-12 mt-[5vh] w-[100%] h-[25vh] bg-[var(--backgroundItemsClaros)] shadow-md shadow-[var(--backgroundItemsClaros)];
    }

    .imagemEquipe {
        @apply flex ml-2 mt-5 h-[30px] w-[30px] rounded-full;
    }

    .imgIcon {
        @apply flex ml-[3vw] mt-4 h-[25px] w-[25px];
    }

    .corDiv {
        @apply flex ml-[5vw] h-20 w-[50vw] border-transparent border-b-[var(--roxo)] border-b-2 items-center focus-within:border-[var(--roxo)] focus-within:border-4;
    }

    .textArea {
        @apply flex mr-4 items-start justify-start ml-5 mt-[2vh] w-[60vw] h-[10vh] bg-[#D7D7D7] text-black text-lg text-left border-transparent border-b-[var(--roxo)] border-b-2 focus-within:border-[var(--roxo)] focus-within:border-4;
        border-bottom: 'solid 4px var(--roxo)';
    }

    .listaEquipes {
        @apply flex flex-wrap justify-start w-[88vw] h-[71vh] bg-[var(--backgroundItems)] shadow-md shadow-[var(--backgroundItems)];
        flex: 1 1 px;
    }

}
</style>
