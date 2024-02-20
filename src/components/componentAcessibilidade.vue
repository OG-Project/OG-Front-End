<template>
    <div class="w-[1400px] h-[877px] flex flex-col  ">
        <div>
            <h1 class="m-[5%] text-6xl border-b-4 border-[#CCC4CF] p-4 pr-32 w-max">
                Acessibilidade
            </h1>
        </div>
        <div class="pl-32 items-center">
            <div class="flex justify-start">
                <div class="flex flex-col gap-10">
                    <div class="flex justify-between items-center gap-5">
                        <span class="text-xl ">Alterar Idioma</span>
                        <selectPadrao />
                    </div>
                    <div class="flex justify-between items-center gap-5">
                        <span class="text-xl">Digitar com a voz</span>
                        <CheckBox :checked=perfil.acessibilidade().voiceMaker tipo="toggle" el-id="checkDigitarVoz" @envia-valor="digitarVoz($event)"></CheckBox>                           
                    </div>
                    <div class="flex justify-between items-center gap-5">
                        <span class="text-xl">Libras</span>
                        <CheckBox :checked=perfil.acessibilidade().vlibras tipo="toggle" el-id="checkLibras" @envia-valor="libras($event)"></CheckBox>
                    </div>
                    <div class="flex justify-between items-center gap-5">
                        <span class="text-xl">Teclado Virtual</span>
                        <CheckBox :checked=perfil.acessibilidade().tecladoVirtual tipo="toggle" el-id="checkTecladoVirtual" @envia-valor="tecladoVirtual($event)"></CheckBox>                                        
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import CheckBox from '../components/checkBox.vue'
import { perfilStore } from '../stores/perfilStore';
import selectPadrao from './selectPadrao.vue';
import VueCookies from "vue-cookies";
let perfil=perfilStore()


VueCookies.set("isVlibras", JSON.stringify(false))
VueCookies.set("isVoiceMaker", JSON.stringify(true))
VueCookies.set("isTecladovirtual", JSON.stringify(false))

// mexer com cookies
onMounted(()=>{
    perfilStore.isVlibras=VueCookies.get("isVlibras")
    perfilStore.isVoiceMaker=VueCookies.get("isVoiceMaker")
    perfilStore.isTecladoVirtual=VueCookies.get("isTecladovirtual")
   
})

function digitarVoz(a){
    perfil.isVoiceMaker=a.valor
    VueCookies.set("isVoiceMaker", JSON.stringify(perfil.isVoiceMaker))
    console.log(a.valor+" digitar")
}
function libras(a){
    perfil.isVlibras=a.valor
    VueCookies.set("isVlibras", JSON.stringify(perfil.isVlibras))
    console.log(a.valor+" libras")
}
function tecladoVirtual(a){
    perfil.isTecladoVirtual=a.valor
    VueCookies.set("isTecladovirtual", JSON.stringify(perfil.isTecladoVirtual))
    console.log(a.valor+" teclado")
}
</script>

<style scoped>

</style>