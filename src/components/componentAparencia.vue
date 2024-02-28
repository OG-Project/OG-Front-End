<template>
    <div class="font-sourceSans w-[1400px] h-[877px] flex flex-col  ">
        <div>
            <h1 class="m-[5%] text-6xl border-b-4 border-[#CCC4CF] p-4 pr-32 w-max">
                Aparência
            </h1>
        </div>
        <div class="pl-32 items-center">
            <div class="flex justify-start">
                <div class="flex">
                    <div class="flex flex-col gap-10">
                        <div :style="styleCor" class="w-20 h-20 ">
                            cor
                        </div>
                        <div :style="styleCor" class="w-20 h-20 bg-slate-600">
                            cor
                        </div>
                        <div :style="styleCor" class="w-20 h-20 bg-slate-500">
                            cor
                        </div>
                        <div :style="styleCor" class="w-20 h-20 bg-slate-400">
                            cor
                        </div>
                        <div :style="styleCor" class="w-20 h-20 bg-slate-300">
                            cor
                        </div>
                    </div>
                    <div class="flex flex-col gap-10">
                        <div class="font-extralight">
                            titulo
                        </div>
                        <div class="font-semibold">
                            TITULO
                        </div>
                        <div class="font-bold">
                            sub-titulo
                        </div>
                        <div class="font-extralight">
                            SUB-TITULO
                        </div>
                        <div class="font-extralight">
                            corpo de textoççlsdkj kljsçlkjdfs jkv
                        </div>
                        <div class="font-extralight">
                            corpo de textoççlsdkj kljsçlkjdfs jkv
                        </div>
                    </div>
                </div>

                <div>
                    <input type="color" v-model="cor" name="" @change="mudarcor()">
                    <div>
                        <div class="">Titulo</div>
                        <div class="flex gap-4">
                            <selectPadrao></selectPadrao>
                            <selectPadrao></selectPadrao>
                        </div>
                        <div>
                            <selectPadrao > </selectPadrao>
                        </div>
                    </div>
                    <div>
                        <div class="">Sub-Titulo</div>
                        <div class="flex gap-4">
                            <selectPadrao></selectPadrao>
                            <selectPadrao></selectPadrao>
                        </div>
                        <div>
                            <selectPadrao > </selectPadrao>
                        </div>
                    </div>
                    <div>
                        <div class="">Corpo</div>
                        <div class="flex gap-4">
                            <selectPadrao></selectPadrao>
                            <selectPadrao></selectPadrao>
                        </div>
                        <div>
                            <selectPadrao > </selectPadrao>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import selectPadrao from './selectPadrao.vue';


function contraste(cor){
    const r = parseInt(String(cor).substr(1, 2), 16);
    const g = parseInt(String(cor).substr(3, 2), 16);
    const b = parseInt(String(cor).substr(5, 2), 16);
    const luz = 0.2126 * r + 0.7152 * g + 0.0722 * b
    return luz > 128 ? '#000' : '#fff'
}

onMounted(()=>{
    

})

let cor=ref('#80A4ED')
const styleCor=ref({
    backgroundColor: cor,
    color:  contraste(cor),
    fontFamily: 'Poppi'
})

function mudarcor(){
//  alert(cor.value)
 styleCor.value.color=contraste(cor.value)
//  alert(contraste(cor.value))
}
// criar um molde sem functions ativadas 
// e apenas mude variaveis auxuliares que
// trocam exemplares , ao confirmar mudar 
// as variaveis da store e mudar o site inteiro


</script>

<style scoped>

</style>