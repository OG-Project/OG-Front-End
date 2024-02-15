<template>
    <div class="w-[1400px] h-[877px] flex flex-col  ">
        <div>
            <h1 class="m-[5%] text-6xl border-b-4 border-[#CCC4CF] p-4 pr-32 w-max">
                Acessibilidade
            </h1>
        </div>
        <div class="flex justify-start">
            <div class="flex flex-col">
                <div class="flex justify-between items-center gap-5">
                    <span class="text-xl">Alterar Idioma</span>
                    <selectPadrao />
                </div>
                <div class="flex justify-between items-center gap-5">
                    <span class="text-xl">Digitar com a voz</span>
                    <CheckBox tipo="toggle" el-id="checkDigitarVoz" @envia-valor="digitarVoz($event)"></CheckBox>                           
                </div>
                <div class="flex justify-between items-center gap-5">
                    <span class="text-xl">Libras</span>
                    <CheckBox tipo="toggle" el-id="checkLibras"></CheckBox>
                </div>
                <div class="flex justify-between items-center gap-5">
                    <span class="text-xl">Teclado Virtual</span>
                    <CheckBox tipo="toggle" el-id="checkTecladoVirtual"></CheckBox>                                        
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Input from '../components/Input.vue'
import CheckBox from '../components/checkBox.vue'
import Botao from '../components/Botao.vue'
import selectPadrao from './selectPadrao.vue';
function digitarVoz(a){
    console.log(a.valor)
}
</script>

<style scoped>

</style>