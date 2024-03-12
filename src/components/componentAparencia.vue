<template>
    <div class="w-[75vw] h-[92vh] flex flex-col  ">
        <div>
            <h1 :style="{fontFamily:fonteTitulo}" class="m-[5%] text-6xl border-b-4 border-[#CCC4CF] p-4 pr-32 w-max">
                Aparência
            </h1>
        </div>
        <div :style="{fontFamily:fonteCorpo}" class="xl:pl-24 sm:flex-wrap sm:justify-center items-center flex gap-4">
            <div :style="{color:contraste(cor),backgroundColor:cor,fontFamily:fonteCorpo}" class="sm:w-[370px] sm:h-[210px] xl:w-[35vw] xl:h-[40vh]">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Placeat reiciendis excepturi aspernatur fuga esse itaque.
                Libero molestias, ipsum eaque inventore dolores veniam sed
                eligendi architecto minus non amet pariatur maxime!
            </div>

            <div class=" flex flex-col gap-3">
                <div class="flex gap-4">
                    <div class="w-full flex flex-col items-center">
                        <div class="pb-1 border-b-2 border-roxo w-max px-12">Titulo</div>
                        <!-- <div>Tamanho</div> -->
                        <selectPadrao></selectPadrao>
                        <selectPadrao @update:model-value="fontTituloEscolhida" :opcaoSelecionada="fonteTitulo" :listaSelect="fonts"></selectPadrao>
                    </div>
                    <div class="w-full flex flex-col items-center">
                        <div class="pb-1 border-b-2 border-roxo w-max px-12">Corpo de Texto</div>
                        <!-- <div>Tamanho</div> -->
                        <selectPadrao></selectPadrao>
                        <selectPadrao @update:model-value="fontCorpoEscolhida" :opcaoSelecionada="fonteCorpo" :listaSelect="fonts"></selectPadrao>
                    </div>
                </div>

                <div class="flex flex-col justify-center items-center gap-3">
                    <div class="pb-1 border-b-2 border-roxo w-max px-12">Cores</div>
                    <div class="flex flex-wrap justify-center w-96 gap-5">
                        <div @click="corEscolhida(cores[1])" :style="{ backgroundColor: '#' + cores[1] }" class="cursor-pointer w-10 h-10"></div>
                        <div @click="corEscolhida(cores[2])" :style="{ backgroundColor: '#' + cores[2] }" class="cursor-pointer w-10 h-10"></div>
                        <div @click="corEscolhida(cores[3])" :style="{ backgroundColor: '#' + cores[3] }" class="cursor-pointer w-10 h-10"></div>
                        <div @click="corEscolhida(cores[4])" :style="{ backgroundColor: '#' + cores[4] }" class="cursor-pointer w-10 h-10"></div>
                        <div @click="corEscolhida(cores[5])" :style="{ backgroundColor: '#' + cores[5] }" class="cursor-pointer w-10 h-10"></div>
                        <div @click="corEscolhida(cores[6])" :style="{ backgroundColor: '#' + cores[6] }" class="cursor-pointer w-10 h-10"></div>
                        <div @click="corEscolhida(cores[7])" :style="{ backgroundColor: '#' + cores[7] }" class="cursor-pointer w-10 h-10"></div>
                        <div @click="corEscolhida(cores[8])" :style="{ backgroundColor: '#' + cores[8] }" class="cursor-pointer w-10 h-10"></div>
                        <div @click="corEscolhida(cores[9])" :style="{ backgroundColor: '#' + cores[9] }" class="cursor-pointer w-10 h-10"></div>
                        <div @click="corEscolhida(cores[10])" :style="{ backgroundColor: '#' + cores[10] }" class="cursor-pointer w-10 h-10"></div>
                        <div @click="corEscolhida(cores[11])" :style="{ backgroundColor: '#' + cores[11] }" class="cursor-pointer w-10 h-10"></div>
                        <div @click="corEscolhida(cores[12])" :style="{ backgroundColor: '#' + cores[12] }" class="cursor-pointer w-10 h-10"></div>
                    </div>
                </div>
            </div>

        </div>
        <div class="flex justify-end pt-[8%] pr-[15%]">
            <Botao 
            :funcaoClick="salvarCor" 
            preset="PadraoRoxo" 
            texto="Confirmar" 
            tamanhoDaBorda="2px" 
            tamanhoDaFonte="2.0vh" />
        </div>
    </div>
</template>

<script setup>
import { onBeforeMount, onMounted, ref } from 'vue';
import selectPadrao from './selectPadrao.vue';
import convert from 'color-convert';
import Botao from './Botao.vue'
import VueCookies from 'vue-cookies';

import { storeToRefs } from 'pinia';
import { perfilStore } from '../stores/perfilStore'
const perfil = perfilStore()
const {fonteTitulo} = storeToRefs(perfil)
const {fonteCorpo} = storeToRefs(perfil)

const cores = ref({
    1: 'FA0808',
    2: 'ED5806',
    3: 'FF7A01',
    4: 'F5B102',
    5: 'F1F200',
    6: 'C6DF29',
    7: '01F300',
    8: 'F30000',
    9: '05BD4F',
    10: '0302F6',
    11: '3C029E',
    12: '7802EB'
})

let font=ref('Arial')
/* Cormorant+Garamond serif */
/* Merriweather serif */
/* Proza+Libre */
/* Quattrocento+Sans */
/* Quattrocento serif */
/* Work+Sans */
let fonts=['Poppins','Source Sans 3','Cormorant Garamond','Merriweather','Proza Libre', 'Quattrocento Sans', 'Quattrocento', 'work Sans']

const classesFonte=({
    1:"font-poppins",
    2:"font-sourceSans",
})

let cor = ref('#80A4ED')
const styleCor = ref({
    backgroundColor: cor,
    color: contraste(cor),
    fontFamily: 'Poppi'
})

function salvarCor(){

}
function corEscolhida(a){
    console.log('cor '+a)
    cor.value="#"+a

}
function fontCorpoEscolhida(f){
    perfil.fonteCorpo=f
    console.log(f)
    VueCookies.set('fonteCorpo',JSON.stringify(perfil.fonteCorpo))
}
function fontTituloEscolhida(f){
    perfil.fonteTitulo=f
    VueCookies.set('fonteTitulo',JSON.stringify(perfil.fonteTitulo))
}

function contraste(cor) {
    const r = parseInt(String(cor).substr(1, 2), 16)
    const g = parseInt(String(cor).substr(3, 2), 16)
    const b = parseInt(String(cor).substr(5, 2), 16)
    const luz = 0.2126 * r + 0.7152 * g + 0.0722 * b
    return luz > 128 ? '#000' : '#fff'
}

onBeforeMount(async ()=>{
    console.log()
    perfil.fonteCorpo= await JSON.parse(VueCookies.get('fonteCorpo'))
    perfil.fonteTitulo= await JSON.parse(VueCookies.get('fonteTitulo'))
    console.log(perfil.fonteCorpo)
    console.log(perfil.fonteTitulo)
})

onMounted(() => {
    console.log('fonts '+perfil.fonteCorpo+' '+perfil.fonteTitulo)
    console.log(convert.hsl.hex([314, 82, 56]))
    //  alert(cor.value)
    styleCor.value.color = contraste(cor.value)
    //  alert(contraste(cor.value))
    console.log(convert.hex.hsl(cor.value)[0])

})
// teria que atribuir as cores com hsl,
// pegar a cor do color pick em hex
// e

// criar um molde sem functions ativadas 
// e apenas mude variaveis auxuliares que
// trocam exemplares , ao confirmar mudar 
// as variaveis da store e mudar o site inteiro


</script>

<style scoped></style>