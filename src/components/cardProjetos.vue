<template>
    <!-- div maior com os textos e o footer -->
    <div
        class="cardTotal hover:outline hover:outline-[var(--roxo)]  hover:outline-4 active:outline active:outline-4 active:outline-[var(--roxoClaro)] ">
        <!-- textos  -->
        <div class="flex flex-col items-center ">
            <div class="divInformacoes">
                <!-- falta colocar os tres pontos por linha -->
                <div class="flex flex-row">
                    <div class="h-[28px] truncate overflow-hidden w-[80%]">
                        <b>{{ name }}</b>
                    </div>
                    <div class="tempoAtuacao w-[20%] flex items-end justify-end" @mouseenter="tempoDeAtuacaoPopUp()">
                        <img src="../imagem-vetores/relogio.svg">
                    </div>
                    <div @mouseleave="somePopUp()" v-if="verTempoAtuacao" class="animation">
                        <div class="flex justify-end">
                            <img src="../imagem-vetores/triangulo.svg">
                        </div>
                        Tempo de Atuação: {{ tempoAtuacao }}
                    </div>
                </div>

                <!-- falta colocar os tres pontos por linha-->
                <div class="h-[28px] truncate line-clamp-3 overflow-hidden">
                    <b>Responsavel:</b> {{ responsavel }}
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

                <div class="barraRoxaGrafico" :style="{ width: feito + '%' }">
                    <div class='flex items-center justify-center text-white absolute inset-y-0 left-0 right-0'> {{ feito
                        }}% </div>
                </div>
            </div>
            <!-- Informações de começo e fim do projeto -->
            <div class="data text-white items-center w-3/5 flex justify-evenly" v-if="comeco != null && final != null" :style="{'margin-right': marginRight}">
                <div>{{ comeco }}</div>
                <!-- svg da flechinha -->
                <svg v-if="screenWidth >= 620" width="30" height="17" viewBox="0 0 30 17" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0.376953 1.15878H2.74332V15.357H0.376953V1.15878ZM5.10969 9.44106H25.4273L20.3479 14.5205L22.0209 16.1935L29.9565 8.25787L22.0209 0.322266L20.3479 1.99529L25.4273 7.07469H5.10969V9.44106Z"
                        fill="white" />
                </svg>
                <h1 v-else class="w-[10vw] h-[2vh] ml-2 mr-2"> - </h1>

                <div>{{ final }}</div>
            </div>
            <div class=" text-white items-center w-3/5 flex justify-evenly" v-else>
                <div class="w-[5vw] h-[3.4vh]">
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
const props = defineProps({
    name: {
        type: String,
    },
    descricao: {
        type: String,
    },
    responsavel: {
        type: String,
    },
    feito: {
        type: Number,
    },
    comeco: {
        type: String,
    },
    final: {
        type: String,
    },
    tempoAtuacao:{
        type: String,
    },
    marginRight:{
        type: String,
    }

})
let verTempoAtuacao = ref(false)
let alinhamento = ref(43)
const screenWidth = window.innerWidth;

// const truncarNome = (nome, comprimentoMaximo) => (nome.length > comprimentoMaximo ? `${nome.slice(0, comprimentoMaximo)}...` : nome);
onMounted(() =>{
    console.log(props.responsavel);
})

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
    backgroundColor: "var(--roxo)",
    border: "none",
    boxShadow: "none",
});

function tempoDeAtuacaoPopUp() {
    verTempoAtuacao.value = true;
}

function somePopUp() {
    verTempoAtuacao.value = false
}

// const truncarNome = (nome, comprimentoMaximo) => (nome.length > comprimentoMaximo ? `${nome.slice(0, comprimentoMaximo)}...` : nome);

</script>

<style scoped>
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
    .divInformacoes{
       @apply flex flex-col justify-evenly w-[18vw] h-[202px]
    }

    .barraRoxaGrafico {
        @apply h-4 bg-[var(--roxo)] justify-start;
    }

    .parteDeBaixoCard {
        @apply flex flex-col h-[76px] items-center justify-evenly bg-[var(--roxoEscuro)] w-full;
        clip-path: polygon(10% 0, 90% 0, 100% 34%, 100% 100%, 70% 100%, 30% 100%, 0 100%, 0 35%);
    }

    .cardTotal {
        @apply flex flex-col items-center justify-between relative w-[394px] h-[289px] bg-[var(--backgroundItemsClaros)] overflow-hidden;
        transition: transform 0.3s ease;

    }
    .divInformacoes{
        @apply flex flex-col justify-evenly 2xl:w-[18vw] xl:w-[25vw]  lg:w-[35vw] md:w-[45vw] h-[202px]
    }

    .cardTotal:hover {
        transform: scale(1.05);
        box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
    }

    .cardTotal.imagemFundo {
        @apply bg-gray-300;

    }
    @media(min-width: 2560px){
        .divInformacoes{
            @apply flex flex-col justify-evenly w-[13vw]
        }
       
    }

    @media (min-width: 320px) and (max-width: 375px) {
        .parteDeBaixoCard{
            @apply flex flex-col h-[76px] items-center  justify-evenly;
        }
        .cardTotal {
            @apply flex flex-col items-center justify-between relative w-[330px] h-[289px] bg-[var(--backgroundItemsClaros)] overflow-hidden mt-[3vh] ;
            transition: transform 0.3s ease;
        }
        .barraCinzaGrafico {
            @apply relative text-white flex w-[70vw] h-5 justify-start bg-gray-500;
        }
        .data{
            @apply mr-[14vw];
        }
        .divInformacoes{
            @apply flex flex-col justify-evenly w-[80vw] h-[202px] 
        }
        .tempoAtuacao{
            @apply flex justify-end ;
        }
    }

    @media(min-width: 395px) and (max-width: 425px){
            .parteDeBaixoCard{
                @apply flex flex-col h-[76px] items-center  justify-evenly;
            }
            .cardTotal {
                @apply flex flex-col items-center justify-between relative w-[350px] h-[289px] bg-[var(--backgroundItemsClaros)] overflow-hidden mt-[3vh] mobile:ml-4 miniMobile:ml-0; 
                transition: transform 0.3s ease;
            }
            .barraCinzaGrafico {
                @apply relative text-white flex w-[70vw] h-5 justify-start bg-gray-500;
            }
            .data{
                @apply mr-[14vw];
            }
            .divInformacoes{
                @apply flex flex-col justify-evenly w-[80vw] h-[202px] 
            }
            .tempoAtuacao{
                @apply flex justify-end ;
            }
        }
        .animation {
            @apply absolute left-16 top-1 w-[80%]  shadow-md flex justify-around flex-col max-miniMobile:w-[60%];
            animation: myAnim 0.15s ease 0s 1 normal none;
            background-color: var(--backgroundItems);
        }
    }

    @media(min-width: 426px) and (max-width: 620px){
        .parteDeBaixoCard{
            @apply flex flex-col h-[76px] items-center justify-evenly;
        }
        .cardTotal {
            @apply flex flex-col items-center justify-between relative w-[350px] h-[289px] bg-[var(--backgroundItemsClaros)] overflow-hidden mt-[3vh] ml-12; 
            transition: transform 0.3s ease;
        }
        .data{
            @apply mr-[14vw];
        }
        .divInformacoes{
            @apply flex flex-col justify-evenly w-[60vw] h-[202px] 
        }
        .tempoAtuacao{
            @apply flex justify-end ;
        }
    }

    @media(min-width: 380px) and (max-width: 390px){
        .parteDeBaixoCard{
            @apply flex flex-col h-[76px] items-center  justify-evenly;
        }
        .cardTotal {
            @apply flex flex-col items-center justify-between relative w-[350px] h-[289px] bg-[var(--backgroundItemsClaros)] overflow-hidden mt-[3vh] mobile:ml-0 miniMobile:ml-0; 
            transition: transform 0.3s ease;
        }
        .barraCinzaGrafico {
            @apply relative text-white flex w-[70vw] h-5 justify-start bg-gray-500;
        }
        .data{
            @apply mr-[14vw];
        }
        .divInformacoes{
            @apply flex flex-col justify-evenly w-[80vw] h-[202px] 
        }
        .tempoAtuacao{
            @apply flex justify-end ;
        }
        .animation {
            @apply absolute left-16 top-1 w-[80%]  shadow-md flex justify-around flex-col max-miniMobile:w-[60%];
            animation: myAnim 0.15s ease 0s 1 normal none;
            background-color: var(--backgroundItems);
        }   
    }

    @media(min-width: 621px) and (max-width: 767px){
      
        .divInformacoes{
           @apply flex flex-col justify-evenly w-[50vw] h-[202px]
        }
        
      }

</style>
