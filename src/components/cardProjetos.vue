<template>
    <!-- div maior com os textos e o footer -->
    <div class="relative w-[394px] h-[289px] bg-[#F6F6F6]">
        <!-- textos  -->
        <div class="flex flex-col items-center">
                <div class="flex flex-col justify-evenly w-[313px] h-[202px]">
                    <div>
                        Nome Projeto: {{name}}
                    </div>
                    <div>
                        Tipo:{{tipo}}
                    </div>
                    <div>
                        Responsavel: {{reponsavel}}
                    </div>
                    <div class="text-sm h-[75px] text-ellipsis w-full overflow-hidden">
                        Descrição: {{descricao}}
                    </div>
            </div>
        </div>
        <!-- footer um svg poligono -->
        <div class="absolute bottom-0">
            <!-- depois colocar esse svg num arquivo -->
            <svg width="394" height="76" viewBox="0 0 394 76" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M394 23.2673L394 76L9.0299e-07 75.9991L2.7417e-07 23.2673L42.2143 0.2759L352.724 0.275879L394 23.2673Z" fill="#36213E"/>
            </svg>
            
        </div>
    </div>
</template>

<script setup>
defineProps({
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
    }
})
</script>

<style  scoped>
@import url(../assets/main.css);
/* @aply usa o tailwind para para de usar colocar ";" */
@layer components{
 /* .textoTresPontos{
    display: -webkit-box;
  -webkit-line-clamp: 3;
  overflow: hidden;
  -webkit-box-orient: vertical; 
 }
     */
}
</style>