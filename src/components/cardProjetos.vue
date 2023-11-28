<template >
    <!-- div maior com os textos e o footer -->
    <div class="cardTotal hover:outline hover:outline-purple-600  hover:outline-4 active:outline active:outline-4 active:outline-purple-200 ">
        <!-- textos  -->
        <div class="flex flex-col items-center ">
                <div class="corpoDeInformacoes">
                    <!-- falta colocar os tres pontos por linha -->
                    <div class="min-[320px]:h-[18px] md:h-[28px] md:text-xl min-[320px]:text-base truncate overflow-hidden" >
                        <b>{{name}}</b>
                    </div>
                    <!-- falta colocar os tres pontos por linha-->
                    <div class="min-[320px]:h-[18px] md:h-[28px] min-[320px]:text-xs md:text-base truncate overflow-hidden" >
                        <b>Tipo:</b> {{tipo}}
                    </div>
                    <!-- falta colocar os tres pontos por linha-->
                    <div class="min-[320px]:h-[18px] md:h-[28px] min-[320px]:text-xs md:text-base truncate overflow-hidden" >
                        <b>Responsavel:</b> {{reponsavel}}
                    </div>
                    <!-- falta colocar os tres pontos por paragrafo-->
                    <p class="min-[320px]:h-[51px] md:h-[75px] min-[320px]:text-xs md:text-base tresPontosCSS" >
                        <b>Descrição:</b> {{descricao}}
                    </p>
                </div>
        </div>
                <!-- depois colocar esse svg num arquivo -->
                <!-- imagem de fundo com o poligono de bacground -->
                    <div class="parteDeBaixoCard">
                        <!-- colocando a barra de progreço -->
                        <div class="barraCinzaGrafico">
                            
                            <div :style="grafico" class="barraRoxaGrafico">
                                <div class='min-[320px]:text-xs md:text-base absolute right-[44%]'> {{feito}}% </div>
                            </div>
                            
                        </div>
                        <!-- Informações de começo e fim do projeto -->
                        <div class="text-white min-[320px]:text-xs md:text-base items-center w-3/5 flex justify-between">
                            <div>{{comeco}}</div>
                            <!-- svg da flechinha -->
                            <svg class='md:w-7 md:h-4 min-[320px]:w-5 min-[320px]:h-3 ' viewBox="0 0 30 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.376953 1.15878H2.74332V15.357H0.376953V1.15878ZM5.10969 9.44106H25.4273L20.3479 14.5205L22.0209 16.1935L29.9565 8.25787L22.0209 0.322266L20.3479 1.99529L25.4273 7.07469H5.10969V9.44106Z" fill="white" />
                            </svg>

                            <div class='' >{{final}}</div>
                        </div>
                    </div>
    </div>
</template>

<script setup>
import {ref,onMounted} from "vue"
const props=defineProps({
    name:{
        type:String,
        required:false
    },
    descricao:{
        type:String,
        required:false
    },
    reponsavel:{
        type:String,
        required:false
    },
    tipo:{
        type:String,
        required:false
    },
    feito:{
        type:Number,
        required:false
    },
    comeco:{
        type:String,
        required:false
    },
    final:{
        type:String,
        required:false
    }
    
})
let alinhamento=ref(43)
onMounted(() => {

})


const grafico={
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: props.feito+"%",
}


</script>

<style  scoped>
@import url(../assets/main.css);
/* @aply usa o tailwind para para de usar colocar ";" */
@layer components{
 
    /* css para criar um paragrafo com quebra de texto 
        com tres pontos/reticências */
     .tresPontosCSS{
        display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;  
    overflow: hidden;
    text-overflow: ellipsis;
     }
     .barraCinzaGrafico{
        @apply 
        relative 
        text-white 
        flex 
        min-[320px]:w-52
        md:w-72 
        justify-start 
        bg-gray-500
        ;
     }
     .barraRoxaGrafico{
        @apply md:h-5
        min-[320px]:h-4
         bg-purple-600;
     }

     .parteDeBaixoCard{
        @apply flex flex-col 
        min-[320px]:h-[53px]
        md:h-[76px] 
        md:w-full
        min-[320px]:w-full
        items-center 
        justify-evenly
        bg-cover 
        bg-[url(../assets/Polygon126footer.png)]
         ;
     }
    
     .corpoDeInformacoes{
        @apply flex
        flex-col 
        justify-evenly 
        min-[320px]:w-[190px] 
        md:w-[313px] 
        md:h-[202px]
        /* revisar tamanhos */
        min-[320px]:h-[150px]
        ;
     }

     .cardTotal{
        @apply flex flex-col items-center justify-between relative 
        /* responsividade entre muitas """""" */
        min-[320px]:w-[280px] 
        min-[320px]:h-[205px]
        md:h-[289px]
        md:w-[394px] 
        bg-[#F6F6F6] ;
    }
     
}
</style>