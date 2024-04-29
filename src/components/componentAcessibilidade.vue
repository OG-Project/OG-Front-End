<template>
    <div class="w-[75vw] h-[92vh] flex flex-col  ">
        <div>
            <h1 :style="{fontFamily:fonteTitulo}" class="m-[5%] text-6xl border-b-4 border-[#CCC4CF] p-4 pr-32 w-max">
                Acessibilidade
                <!-- {{ configuracao }} -->
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
                        :key="isDigitarVoz.valueOf()"
                        tipo="toggle" 
                        el-id="checkDigitarVoz" 
                        :checked="gerarBooleano('checkDigitarVoz')" 
                        @envia-valor="digitarVoz($event)">
                        </CheckBox>                  
                        <!-- Boolean(1) -->
                    </div>
                    <div class="flex justify-between items-center gap-5">
                        <span class="text-xl">Libras</span>
                        <CheckBox 
                        :key="isVlibra.valueOf()"
                        tipo="toggle" 
                        el-id="checkLibras" 
                        :checked="gerarBooleano('checkLibras')" 
                        @envia-valor="libras($event)">
                        </CheckBox>
                        <!-- Boolean(1) -->
                    </div>
                    <div class="flex justify-between items-center gap-5">
                        <span class="text-xl">Teclado Virtual</span>
                        <CheckBox 
                        :key="isTecladoVirtual.valueOf()"
                        tipo="toggle" 
                        el-id="checkTecladoVirtual" 
                        :checked="gerarBooleano('checkTecladoVirtual')" 
                        @envia-valor="tecladoVirtual($event)">
                        </CheckBox>                                        
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script setup>
import { onBeforeMount,ref, onMounted, computed } from 'vue';
import CheckBox from '../components/checkBox.vue'
import { perfilStore } from '../stores/perfilStore';
import selectPadrao from './selectPadrao.vue';
import VueCookies from "vue-cookies";
import { storeToRefs } from 'pinia';
import { conexaoBD } from '../stores/conexaoBD';
let perfil=perfilStore()
let conexao=conexaoBD()
const {fonteTitulo} = storeToRefs(perfil)
const {fonteCorpo} = storeToRefs(perfil)

let isVlibra=ref(false)
let isTecladoVirtual=ref(false)
let isDigitarVoz=ref(false)
let usuario=ref({})

onBeforeMount(async()=>{
})
// mexer com cookies
onMounted(async()=>{
    usuario.value=await
        conexao.buscarUm(
            JSON.parse(
                VueCookies.get('IdUsuarioCookie')),'/usuario')
    // console.log(usuario.value);
    // console.log(usuario.value);
    isVlibra.value=usuario.value.configuracao.isLibras 
    isTecladoVirtual.value=usuario.value.configuracao.isTecladoVirtual
    isDigitarVoz.value=usuario.value.configuracao.isDigitarVoz
    // console.log(isDigitarVoz.value);
    // console.log(isDigitarVoz.value);
    // console.log(isVlibra.value);
    // console.log(isVlibra.value);
    // console.log(isTecladoVirtual.value);
    // console.log(isTecladoVirtual.value);
    VueCookies.config('30d')
})

function gerarBooleano(id){
    console.log(id);
    if(id=='checkDigitarVoz'){
        return isDigitarVoz.value? true:false
    }else if(id=='checkLibras'){
        return isVlibra.value? true:false
    }else if(id=='checkTecladoVirtual'){
        return isTecladoVirtual.value? true:false
    }
    
}

function digitarVoz(a){
    perfil.isVoiceMaker=a.valor
    usuario.value.configuracao.isDigitarVoz=a.valor
    conexao.atualizar(usuario.value,'/usuario')
    console.log(a.valor+" digitar")
}
function libras(a){
    perfil.isVlibras=a.valor
    usuario.value.configuracao.isLibras=a.valor
    conexao.atualizar(usuario.value,'/usuario')
    
    console.log(a.valor+" libras")
}
function tecladoVirtual(a){
    perfil.isTecladoVirtual=a.valor
    usuario.value.configuracao.isTecladoVirtual=a.valor
    conexao.atualizar(usuario.value,'/usuario')
    console.log(a.valor+" teclado")
}
</script>

<style scoped>

</style>