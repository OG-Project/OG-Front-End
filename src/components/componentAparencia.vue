<template>
    <div id="id" class="w-[75vw] h-[92vh] flex flex-col justify-evenly  ">
        <!-- <Input conteudoInput="oi" direcao="direita" styleInput="input-claro" ></Input> -->
        <div>
            <h1 style="font-family: var(--fonteTitulo);" :style="{fontSize:tamanhoTitulo+'vh'}" class="m-[5%] text-4xl border-b-4 border-[#CCC4CF] p-4 pr-32 w-max">
                Aparência
            </h1>
        </div>
        <div style="font-family: var(--fonteCorpo);" :style="{fontSize:tamanhoCorpo+'vh'}" class=" sm:flex-wrap sm:justify-center flex-row-reverse items-center flex gap-4">
            <div class=" w-[300px] h-[300px]  relative" >
                <div class="hexagon shadow-xl right-[70px] absolute z-[10]  bg-[var(--roxo)] rotate-90 w-[166px] h-[152px]"></div>
                <div class="hexagon top-[135px] right-[15px] absolute z-[9] bg-[var(--roxoEscuro)] rotate-90 w-[133px] h-[123px]"></div>
                <div class="hexagon top-[150px] right-[150px] absolute z-[8] bg-[var(--brancoNeve)] rotate-90 w-[100px] h-[95px]"></div>
            </div>

            <div class=" flex flex-col gap-20">
                <div class="flex gap-4">
                    <div class="w-full flex flex-col gap-4  items-center">
                        <div 
                        class="pb-1 border-b-2 border-[var(--roxo)] w-max px-12">
                        Titulo
                        </div>
                        <!-- <div>Tamanho</div> -->
                        <selectPadrao 
                        class="w-max" 
                        @update:model-value="tamanhoFontTitulo"  
                        :listaSelect="tamanhos" >
                        </selectPadrao>
                        <selectPadrao 
                        class="w-max" 
                        @update:model-value="fontTituloEscolhida" 
                        :opcaoSelecionada="perfil.fonteTitulo" 
                        :listaSelect="fonts">
                        </selectPadrao>
                    </div>
                    <div class="w-full flex flex-col gap-4  items-center">
                        <div 
                        class="pb-1 border-b-2 border-[var(--roxo)] w-max px-12">
                        Corpo de Texto
                        </div>
                        <!-- <div>Tamanho</div> -->
                        <selectPadrao 
                        
                        class="w-max" 
                        @update:model-value="tamanhoFontCorpo"  
                        :listaSelect="tamanhos">
                        </selectPadrao>
                        
                        <selectPadrao 
                        class="w-max" 
                        @update:model-value="fontCorpoEscolhida" 
                        :opcaoSelecionada="styleGet.getPropertyValue('--fonteCorpo')" 
                        :listaSelect="fonts">
                        </selectPadrao>
                    </div>
                </div>

                <div class="flex flex-col justify-center items-center gap-3">
                    <div class="pb-1 border-b-2 border-[var(--roxo)] w-max px-12">Cores</div>
                    <div class="flex flex-wrap justify-center w-96 gap-5">
                        <div 
                        @click="corEscolhida(cores[1])" 
                        :style="{ backgroundColor: '#' + cores[1] }" 
                        class="cores cursor-pointer w-10 h-10">
                        </div>
                        <div 
                        @click="corEscolhida(cores[2])" 
                        :style="{ backgroundColor: '#' + cores[2] }" 
                        class="cores cursor-pointer w-10 h-10">
                        </div>
                        <div 
                        @click="corEscolhida(cores[3])" 
                        :style="{ backgroundColor: '#' + cores[3] }" 
                        class="cores cursor-pointer w-10 h-10">
                        </div>
                        <div 
                        @click="corEscolhida(cores[4])" 
                        :style="{ backgroundColor: '#' + cores[4] }" 
                        class="cores cursor-pointer w-10 h-10">
                        </div>
                        <div 
                        @click="corEscolhida(cores[5])" 
                        :style="{ backgroundColor: '#' + cores[5] }" 
                        class="cores cursor-pointer w-10 h-10">
                        </div>
                        <div 
                        @click="corEscolhida(cores[6])" 
                        :style="{ backgroundColor: '#' + cores[6] }" 
                        class="cores cursor-pointer w-10 h-10">
                        </div>
                        <div 
                        @click="corEscolhida(cores[7])" 
                        :style="{ backgroundColor: '#' + cores[7] }" 
                        class="cores cursor-pointer w-10 h-10">
                        </div>
                        <div 
                        @click="corEscolhida(cores[8])" 
                        :style="{ backgroundColor: '#' + cores[8] }" 
                        class="cores cursor-pointer w-10 h-10">
                        </div>
                        <div 
                        @click="corEscolhida(cores[9])" 
                        :style="{ backgroundColor: '#' + cores[9] }" 
                        class="cores cursor-pointer w-10 h-10">
                        </div>
                        <div 
                        @click="corEscolhida(cores[10])" 
                        :style="{ backgroundColor: '#' + cores[10] }" 
                        class="cores cursor-pointer w-10 h-10">
                        </div>
                        <div 
                        @click="corEscolhida(cores[11])" 
                        :style="{ backgroundColor: '#' + cores[11] }" 
                        class="cores cursor-pointer w-10 h-10">
                        </div>
                        <div 
                        @click="corEscolhida(cores[12])" 
                        :style="{ backgroundColor: '#' + cores[12] }" 
                        class="cores cursor-pointer w-10 h-10">
                        </div>
                    </div>
                </div>
                <div class="flex justify-between items-center gap-5">
                    <span class="text-[var(--fonteCorpoTamanho)]">Modo Claro</span>
                    <CheckBox 
                    tipo="toggle" 
                    el-id="checkDarkMode" 
                    @envia-valor="temaDoSite($event)">
                    </CheckBox>                  
                    <span class="text-[var(--fonteCorpoTamanho)]">Modo Escuro</span>
                </div>
            </div>

        </div>
        <!-- <div class="flex justify-end pt-[8%] pr-[15%]">
            <Botao 
            :funcaoClick="salvarCor"
            :roxo="styleGet.getPropertyValue('--roxo')" 
            preset="PadraoRoxo" 
            texto="Confirmar" 
            tamanhoDaBorda="2px" 
            tamanhoDaFonte="2.0vh" />
            
        </div> -->
    </div>
</template>

<script setup>
import { onBeforeMount, onMounted, onUpdated, ref } from 'vue';
import selectPadrao from './selectPadrao.vue';
import convert from 'color-convert';
import Botao from './Botao.vue'
import VueCookies from 'vue-cookies';

import { storeToRefs } from 'pinia';
import { perfilStore } from '../stores/perfilStore'
import CheckBox from './checkBox.vue';
const perfil = perfilStore()
const {hue} = storeToRefs(perfil)
const {fonteCorpo} = storeToRefs(perfil)
const {tamanhoCorpo} = storeToRefs(perfil)
const {tamanhoTitulo} = storeToRefs(perfil)

const cores = ref({
    1: '0277f5',
    2: 'f52f02',
    3: 'FF7A01',
    4: 'F5B102',
    5: 'F1F200',
    6: '02f5e9',
    7: '01F300',
    8: 'F30000',
    9: '05BD4F',
    10: '0302F6',
    11: 'f502e5',
    12: '620BA7'
})
let tamanhos=['Pequeno','Normal','Grande']

let fonts=['Poppins','Source Sans 3','Cormorant Garamond','Merriweather','Proza Libre', 'Quattrocento Sans', 'Quattrocento', 'work Sans']

let root=document.documentElement
let styleGet=getComputedStyle(root)

let cor = ref('#80A4ED')

function temaDoSite(e){
    console.log(e);
}

function salvarCor(){

}
function corEscolhida(a){
    // parte de conversão de cores e matiz apenas realizar a conversão total de tudo
    console.log('cor '+a)
    cor.value="#"+a
    let matizCor=convert.hex.hsl(cor.value)
    console.log('cor escolhida '+matizCor)
    root.style.setProperty('--hueRoxo',matizCor[0])
    perfil.hue=matizCor[0]
    VueCookies.set('matizCor',JSON.stringify(matizCor[0],'30d'))
    console.log(matizCor[0])

}
function fontCorpoEscolhida(f){
    perfil.fonteCorpo=f
    console.log(f)
    root.style.setProperty('--fonteCorpo',f)
    VueCookies.set('fonteCorpo',JSON.stringify(perfil.fonteCorpo))
}
function fontTituloEscolhida(f){
    perfil.fonteTitulo=f
    root.style.setProperty('--fonteTitulo',f)
    VueCookies.set('fonteTitulo',JSON.stringify(perfil.fonteTitulo))
}
function tamanhoFontTitulo(tamanho){
    if (tamanho=='Pequeno') {
        perfil.tamanhoTitulo=5    
    }
    else if(tamanho=='Normal'){
        perfil.tamanhoTitulo=6
    }
    else if(tamanho=='Grande'){
        perfil.tamanhoTitulo=7
    }
    VueCookies.set('fonteTituloTamanho',JSON.stringify(perfil.tamanhoTitulo+'vh'))
    console.log(perfil.tamanhoTitulo)
    console.log(tamanho)
}
function tamanhoFontCorpo(tamanho){
    if (tamanho=='Pequeno') {
        perfil.tamanhoCorpo=1.5    
    }
    else if(tamanho=='Normal'){
        perfil.tamanhoCorpo=2
    }
    else if(tamanho=='Grande'){
        perfil.tamanhoCorpo=2.5
    }
    VueCookies.set('fonteCorpoTamanho',JSON.stringify(perfil.tamanhoCorpo+'vh'))
    console.log(perfil.tamanhoCorpo)
    console.log(tamanho)
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
    let root =document.documentElement
    //  alert(cor.value)
    
    
    //  alert(contraste(cor.value))
    console.log(convert.hex.hsl(cor.value)[0])

})
onUpdated(()=>{
    console.log('update')
    console.log(styleGet.getPropertyValue('--roxo'));
})
</script>

<style scoped>
    .cores:hover {
    transform: scale(1.05);
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
    }
    .hexagon{
        clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
            
    }
</style>