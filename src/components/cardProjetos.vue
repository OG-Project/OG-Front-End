<template>
    <!-- div maior com os textos e o footer -->
    <div class="flex flex-col items-center justify-between relative w-[394px] h-[289px] bg-[#F6F6F6] overflow-hidden">
        <!-- textos  -->
        <div class="flex flex-col items-center">
                <div class="flex flex-col justify-evenly w-[313px] h-[202px]">
                    <!-- falta colocar os tres pontos -->
                    <div class="h-[28px] w-full overflow-hidden text-ellipsis">
                        <b>{{name}}</b>
                    </div>
                    <!-- falta colocar os tres pontos -->
                    <div class="h-[28px] w-full overflow-hidden text-ellipsis">
                        <b>Tipo:</b> {{tipo}}
                    </div>
                    <!-- falta colocar os tres pontos -->
                    <div class="h-[28px] w-full overflow-hidden text-ellipsis">
                        <b>Responsavel:</b> {{reponsavel}}
                    </div>
                    <!-- falta colocar os tres pontos -->
                    <div class=" h-[75px] w-full overflow-hidden text-ellipsis">
                        <b>Descrição:</b> {{descricao}}
                    </div>
                </div>
        </div>
            
            <!-- footer um svg poligono -->
            
                <!-- depois colocar esse svg num arquivo -->
                    <div class="flex flex-col h-[76px] items-center justify-evenly bg-[url(../assets/Polygon126footer.png)] w-full">
                        <!-- colocando a barra de progreço -->
                        <div class="text-white relative flex w-3/5 justify-start bg-gray-500">

                            <div :style="grafico" class="bg-purple-600">
                                {{feito}}%
                            </div>
                            
                        </div>
                        <!-- Informações de começo e fim do projeto -->
                        <div class="text-white items-center w-3/5 flex justify-evenly">
                            <div>{{comeco}}</div>
                            <svg width="30" height="17" viewBox="0 0 30 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.376953 1.15878H2.74332V15.357H0.376953V1.15878ZM5.10969 9.44106H25.4273L20.3479 14.5205L22.0209 16.1935L29.9565 8.25787L22.0209 0.322266L20.3479 1.99529L25.4273 7.07469H5.10969V9.44106Z" fill="white"/>
</svg>
                            <div>{{final}}</div></div>
                    </div>

    </div>
</template>

<script setup>
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
 /* .textoTresPontos{
    display: -webkit-box;
  -webkit-line-clamp: 3;
  overflow: hidden;
  -webkit-box-orient: vertical; 
 }
     */
}
</style>