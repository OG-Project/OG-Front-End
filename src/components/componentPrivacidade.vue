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
                        <span class="text-xl">Permitir que visualizem suas tarefas</span>
                        <CheckBox tipo="toggle" el-id="checkDigitarVoz" @envia-valor="visu($event)"></CheckBox>                           
                    </div>
                    <div class="flex justify-between items-center gap-5">
                        <span class="text-xl">Permitir que visualizem seu email</span>
                        <CheckBox tipo="toggle" el-id="checkLibras" @envia-valor="libras($event)"></CheckBox>
                    </div>
                    <div class="flex justify-between items-center gap-5">
                        <span class="text-xl">Permitir que visualizem a aparencia do seu site</span>
                        <CheckBox tipo="toggle" el-id="checkTecladoVirtual" @envia-valor="tecladoVirtual($event)"></CheckBox>                                        
                    </div>
                    <div class="flex justify-between items-center gap-5">
                        <span class="text-xl">Permitir que salvem suas tarefas ou projetos</span>
                        <CheckBox tipo="toggle" el-id="checkDigitarVoz" @envia-valor="digitarVoz($event)"></CheckBox>                           
                    </div>
                    <div class="flex justify-between items-center gap-5">
                        <span class="text-xl">Permitir que visualizem seus grupos</span>
                        <CheckBox tipo="toggle" el-id="checkLibras" @envia-valor="libras($event)"></CheckBox>
                    </div>
                    <div class="flex justify-between items-center gap-5">
                        <span class="text-xl">Permitir que outros usuarios conseguiam ver saus tarefas atrasadas</span>
                        <CheckBox tipo="toggle" el-id="checkTecladoVirtual" @envia-valor="tecladoVirtual($event)"></CheckBox>                                        
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script setup>
import CheckBox from '../components/checkBox.vue'



</script>

<style scoped>

</style>