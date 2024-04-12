<template >
    <!-- div maior com os textos e o footer -->
    <div
        class="cardTotal hover:outline hover:outline-purple-600  hover:outline-4 active:outline active:outline-4 active:outline-purple-200 ">
        <!-- textos  -->
        <div class="flex flex-col items-center ">
            <div class="flex flex-col justify-evenly w-[18vw] h-[202px]">
                <!-- falta colocar os tres pontos por linha -->
                <div class=" flex flex-row">
                    <div class="h-[28px] truncate overflow-hidden w-[80%]">
                        <b>{{ name }}</b>
                    </div>
                    <div class="w-[20%] flex items-end justify-end" @click="tempoDeAtuacaoPopUp()">
                        <img src="../imagem-vetores/relogio.svg">
                    </div>
                    <div @mouseleave="somePopUp()" v-if="funcaoPopUp.variavelModal" class="animation">
                        <div class="flex justify-end">
                            <img src="../imagem-vetores/triangulo.svg">
                        </div>
                        Tempo de Atuação: 1hr e 10 min
                    </div>
                </div>
               
                <!-- falta colocar os tres pontos por linha-->
                <div class="h-[28px] truncate line-clamp-3 overflow-hidden">
                    <b>Responsavel:</b> {{ reponsavel }}
                </div>
                <!-- falta colocar os tres pontos por paragrafo-->
                <p class=" h-[75px] tresPontosCSS">
                    <b>Descrição:</b> {{ descricao }}
                </p>
            </div>
        </div>
        <!-- depois colocar esse svg num arquivo -->
        <!-- imagem de fundo com o poligono de bacground -->
        <div class="parteDeBaixoCard">
            <!-- colocando a barra de progreço -->
            <div class="barraCinzaGrafico">

                <div class="barraRoxaGrafico" :style="{width: feito + '%'}">
                    <div class='flex items-center justify-center text-white absolute inset-y-0 left-0 right-0'> {{ feito }}% </div>
                </div>
            </div>
            <!-- Informações de começo e fim do projeto -->
            <div class="text-white items-center w-3/5 flex justify-evenly" v-if="comeco != null && final != null">
                <div>{{ comeco }}</div>
                <!-- svg da flechinha -->
                <svg width="30" height="17" viewBox="0 0 30 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0.376953 1.15878H2.74332V15.357H0.376953V1.15878ZM5.10969 9.44106H25.4273L20.3479 14.5205L22.0209 16.1935L29.9565 8.25787L22.0209 0.322266L20.3479 1.99529L25.4273 7.07469H5.10969V9.44106Z"
                        fill="white" />
                </svg>

                <div>{{ final }}</div>
            </div>
            <div class="text-white items-center w-3/5 flex justify-evenly" v-else>
                <div class="w-[5vw] h-[3.4vh]">
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref } from 'vue';
import { funcaoPopUpStore } from '../stores/funcaoPopUp';
const props = defineProps({
    name: {
        type: String,
        required: false
    },
    descricao: {
        type: String,
        required: false
    },
    reponsavel: {
        type: String,
        required: false
    },
    feito: {
        type: Number,
        required: false
    },
    comeco: {
        type: String,
        required: false
    },
    final: {
        type: String,
        required: false
    }

})
let alinhamento=ref(43)
const funcaoPopUp= funcaoPopUpStore();
// const truncarNome = (nome, comprimentoMaximo) => (nome.length > comprimentoMaximo ? `${nome.slice(0, comprimentoMaximo)}...` : nome);


const grafico = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: props.feito + "%",
}

let barraPorcentagem = ref({
  width: props.feito + "%",
  height: "100%",
  borderRadius: "0px",
  backgroundColor: "#620BA7",
  border: "none",
  boxShadow: "none",
});

function tempoDeAtuacaoPopUp(){
    funcaoPopUp.abrePopUp();
}

function somePopUp(){
    funcaoPopUp.fechaPopUp()
}

// const truncarNome = (nome, comprimentoMaximo) => (nome.length > comprimentoMaximo ? `${nome.slice(0, comprimentoMaximo)}...` : nome);

</script>

<style  scoped>
@import url(../assets/main.css);

/* @aply usa o tailwind para para de usar colocar ";" */
@layer components {

    

    /* css para criar um paragrafo com quebra de texto 
        com tres pontos/reticências */
    .tresPontosCSS {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .barraCinzaGrafico {
        @apply relative text-white flex w-72 justify-start bg-gray-500;
    }

    .barraRoxaGrafico {
        @apply h-4 bg-purple-600 justify-start;
    }

    .parteDeBaixoCard {
        @apply flex flex-col h-[76px] items-center justify-evenly bg-[url(../assets/Polygon126footer.png)] w-full;
    }

    .cardTotal {
        @apply flex flex-col items-center justify-between relative w-[394px] h-[289px] bg-white overflow-hidden;
        transition: transform 0.3s ease;

    }

    .cardTotal:hover {
    transform: scale(1.05);
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
    }

    .cardTotal.imagemFundo {
    @apply bg-gray-300;

    }

    .animation {
        @apply absolute left-16 top-1 w-[80%] bg-brancoNeve shadow-md flex justify-around flex-col max-miniMobile:w-[60%] ;
        animation: myAnim 0.15s ease 0s 1 normal none;
    }
    
    @keyframes myAnim {
        0% {
            opacity: 0;
            transform: translateX(50px);
        }
    
        100% {
            opacity: 1;
            transform: translateX(0);
        }
    }

}</style>
