<template>
        <div class="w-[1400px] h-[877px] flex flex-col  ">
                <div>
                        <h1 class="m-[5%] text-6xl border-b-4 border-[#CCC4CF] p-4 pr-32 w-max">Informações</h1>
                </div>
                <div class="flex justify-center gap-8">
                        <div class="flex flex-col gap-y-10">
                                <div class="flex items-center justify-between gap-5 ">
                                        <span class="text-xl">Nome</span>
                                        <Input 
                                        styleInput="input-transparente-claro-grande" 
                                        conteudoInput="Nome" 
                                        v-model="nome" 
                                        tipo="obrigatorio" />
                                </div>
                                <div class="flex items-center justify-between gap-5">
                                        <span class="text-xl">Cadastro</span>
                                        <Input 
                                        styleInput="input-transparente-claro-grande" 
                                        conteudoInput="Cadastro" 
                                        v-model="cadastro" 
                                        tipo="obrigatorio" />
                                </div>
                                <div class="flex items-center justify-between gap-5">
                                        <span class="text-xl">Cargo</span>
                                        <Input 
                                        styleInput="input-transparente-claro-grande" 
                                        conteudoInput="Cargo" 
                                        v-model="cargo" 
                                        tipo="obrigatorio" />
                                </div>
                                
                               
                        </div>
                        
                        <div class="flex flex-col gap-y-10">
                                <div class="flex justify-between items-center gap-5">
                                        <span class="text-xl">Data de Nascimento</span>
                                        <Input 
                                        styleInput="input-transparente-claro-grande" 
                                        conteudoInput="Data de Nascimento" 
                                        v-model="dataDeNascimento" 
                                        tipo="obrigatorio" />
                                </div>
                                <div class="flex justify-between items-center gap-5">
                                        <span class="text-xl">Setor</span>
                                        <Input 
                                        styleInput="input-transparente-claro-grande" 
                                        conteudoInput="Setor" 
                                        v-model="setor" 
                                        tipo="obrigatorio" />
                                </div>
                        </div>
                </div>

                <div class="flex justify-end mr-[15%] mt-80">
                        <Botao preset="PadraoRoxo" texto="Editar" tamanhoDaBorda="2px" tamanhoDaFonte="2.0vh" />
                </div>
            </div>
</template>

<script setup>
import Input from '../components/Input.vue'
import Botao from '../components/Botao.vue'
let nome
let cargo
let setor
let cadastro
let dataDeNascimento


</script>

<style scoped>

</style>