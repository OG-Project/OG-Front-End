<template>
    <div class="w-[1400px] h-[877px] flex flex-col  ">
        <div>
            <h1 :style="{fontFamily:fonteTitulo}" class="m-[5%] text-6xl border-b-4 border-[#CCC4CF] p-4 pr-32 w-max">
                Acessibilidade
            </h1>
        </div>
        <div class="pl-32 items-center">
            <div class="flex justify-start">
                <div :style="{fontFamily:fonteCorpo}" class="flex flex-col gap-10">
                    <div class="flex justify-between items-center gap-5">
                        <span class="text-xl ">Alterar Idioma</span>
                        <selectPadrao />
                    </div>
                    <div class="flex justify-between items-center gap-5">
                        <span class="text-xl">Digitar com a voz</span>
                        <CheckBox 
                        :checked="Boolean(gerarBooleano(VueCookies.get('isVoiceMaker')))" 
                        tipo="toggle" 
                        el-id="checkDigitarVoz" 
                        @envia-valor="digitarVoz($event)">
                        </CheckBox>                  
                        <!-- Boolean(1) -->
                    </div>
                    <div class="flex justify-between items-center gap-5">
                        <span class="text-xl">Libras</span>
                        <CheckBox 
                        :checked="Boolean(gerarBooleano(VueCookies.get('isVlibras')))" 
                        tipo="toggle" 
                        el-id="checkLibras" 
                        @envia-valor="libras($event)">
                        </CheckBox>
                        <!-- Boolean(1) -->
                    </div>
                    <div class="flex justify-between items-center gap-5">
                        <span class="text-xl">Teclado Virtual</span>
                        <CheckBox 
                        :checked="Boolean(gerarBooleano(VueCookies.get('isTecladovirtual')))" 
                        tipo="toggle" 
                        el-id="checkTecladoVirtual" 
                        @envia-valor="tecladoVirtual($event)">
                        </CheckBox>                                        
                        <!-- Boolean(0) -->
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script setup>
import { onBeforeMount, onMounted } from 'vue';
import CheckBox from '../components/checkBox.vue'
import { perfilStore } from '../stores/perfilStore';
import selectPadrao from './selectPadrao.vue';
import VueCookies from "vue-cookies";
import { storeToRefs } from 'pinia';
let perfil=perfilStore()
const {fonteTitulo} = storeToRefs(perfil)
const {fonteCorpo} = storeToRefs(perfil)

onBeforeMount(()=>{
})
// mexer com cookies
onMounted(()=>{
    VueCookies.config('30d')
})

function gerarBooleano(boolean){
    if(boolean=="true"){
        console.log('foi booleano '+ boolean)
        return 1
    }else if(boolean=="false"){
        console.log('foi booleano '+ boolean)
        return 0
    }
}

function digitarVoz(a){
    perfil.isVoiceMaker=a.valor
    VueCookies.set("isVoiceMaker", perfil.isVoiceMaker)
    console.log(a.valor+" digitar")
}
function libras(a){
    perfil.isVlibras=a.valor
    VueCookies.set("isVlibras", perfil.isVlibras)
    console.log(a.valor+" libras")
}
function tecladoVirtual(a){
    perfil.isTecladoVirtual=a.valor
    VueCookies.set("isTecladovirtual", perfil.isTecladoVirtual)
    console.log(a.valor+" teclado")
}
</script>

<style scoped>

</style>