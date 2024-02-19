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
                        <CheckBox tipo="toggle" el-id="checkDigitarVoz" @envia-valor="digitarVoz($event)"></CheckBox>                           
                    </div>
                    <div class="flex justify-between items-center gap-5">
                        <span class="text-xl">Libras</span>
                        <CheckBox tipo="toggle" el-id="checkLibras" @envia-valor="libras($event)"></CheckBox>
                    </div>
                    <div class="flex justify-between items-center gap-5">
                        <span class="text-xl">Teclado Virtual</span>
                        <CheckBox tipo="toggle" el-id="checkTecladoVirtual" @envia-valor="tecladoVirtual($event)"></CheckBox>                                        
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script setup>
import CheckBox from '../components/checkBox.vue'
import selectPadrao from './selectPadrao.vue';
function digitarVoz(a){
    console.log(a.valor+" digitar")
}
function libras(a){
    console.log(a.valor+" libras")
}
function tecladoVirtual(a){
    console.log(a.valor+" teclado")
}
</script>

<style scoped>

</style>