<template>
    <div class='w-full h-[94.5vh]'>
        <div class=' flex justify-between items-center'>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="purple" class="w-8 h-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </div>
            <Input width="80" height="5" />
            <div>
                tarefa
            </div>
        </div>
        
        <div class='h-full flex flex-col justify-around items-center'>
                <div class='text-3xl flex justify-start border-b-2 border-purple-400'>
                    Segurança
                </div>
            <div class=' flex w-full justify-around items-center'>
                <label>teste</label>
                <Input width="80" height="5" />
            </div>
            <div class=' flex w-full justify-around items-center'>
                <label>teste</label>
                <Input width="80" height="5" />
            </div>
            <div class=' flex w-full justify-around items-center'>
                <label>teste</label>
                <Input width="80" height="5" />
            </div>
            <div class='flex w-full justify-around items-center'>
                <label>teste</label>
                <Input />
            </div>
            <Botao preset='PadraoRoxo' texto='Salvar Alterações' />
        </div>
    </div>
</template>

<script setup>
import Input  from "../components/Input.vue";
import Botao  from "../components/Botao.vue";
</script>

<style lang="scss" scoped>

</style>