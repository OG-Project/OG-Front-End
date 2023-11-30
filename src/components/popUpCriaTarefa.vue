<template>
        <div class="flex justify-center">
            <div class="convites-bg flex justify-center items-center flex-col    w-full h-full ">
                <div class="flex justify-center mt-[8%]">
                    <h1 class="flex justify-center font-semibold xl:text-xl sm:text-xs">CONVITES</h1>
                </div>
                <div class="">
                     <div class="flex justify-center  items-center mt-[8%] xl:w-[19vw] w-full mb-[2vh]">
                        <img class="imgDePerfil" src="img" alt="">
                        <h2 class="mt-[0%] xl:text-[1vw] sm:text-xs">{{ Usuario.nome }} </h2> 
                        <img class="imgIcon" src="img" alt="">
                    </div>
                </div>
            </div>
        </div>      
        
    </template>

<script setup>
import SelectPadrao from './selectPadrao.vue';
  

const Usuario = {
    nome: String,
    permissao: String,
    img: String
}
const opcoesSelect = ['Edit', 'View']
Usuario.nome = "EduardoCosta"
Usuario.img = ""

</script>

<style lang="scss">

@import url(../assets/main.css);

    
    .convites-bg {
        @apply xl:w-[24vw] xl:h-[24vh] 
        md:w-[36vw] md:h-[14vh] w-full 
        bg-[#FEFBFF] shadow-md shadow-gray-950 ;
        clip-path: polygon(20% 0, 80% 0, 100% 15%, 100% 100%, 0 100%, 0 15%);
    }

    .imgIcon {
        @apply bg-cover 
        bg-center flex flex-col justify-center 
        items-center mr-[-25px] ml-[10px] 
        xl:w-[2vw] xl:h-[4vh]  h-full;
    }

    .imgDePerfil {
        @apply rounded-full bg-cover bg-center flex flex-col mr-[5px] ml-[-25px] xl:w-[2vw] xl:h-[4vh] h-full;
    }

    .selectEdit {
        background-color: 787878;
        color: #ffff;
        margin-left: 35px;
        height: 4vh;
        width: 8vw ;
        margin-top: -3px;


    }


</style>
