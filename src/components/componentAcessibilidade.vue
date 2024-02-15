<template>
    <div class="w-[1400px] h-[877px] flex flex-col  ">
        <div>

        </div>
        <div>
            <div class="flex justify-between items-center gap-5">
                <span class="text-xl">Alterar Idioma</span>
                <selectPadrao />
            </div>
            <div class="flex justify-between items-center gap-5">
                <span class="text-xl">Digitar com a voz</span>
                <CheckBox tipo="toggle"></CheckBox>                           
            </div>
            <div class="flex justify-between items-center gap-5">
                <span class="text-xl">Libras</span>
                <CheckBox tipo="toggle"></CheckBox>
            </div>
            <div class="flex justify-between items-center gap-5">
                <span class="text-xl">Teclado Virtual</span>
                <CheckBox tipo="toggle"></CheckBox>                                        
            </div>

        </div>
    </div>
</template>

<script setup>
import Input from '../components/Input.vue'
import CheckBox from '../components/checkBox.vue'
import Botao from '../components/Botao.vue'
import selectPadrao from './selectPadrao.vue';

</script>

<style scoped>

</style>