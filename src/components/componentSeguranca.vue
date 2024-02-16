<template>
    <div class="w-[1400px] h-[877px] flex flex-col">
        <div>
            <h1 class="m-[5%] text-6xl border-b-4 border-[#CCC4CF] p-4 pr-32 w-max">
                Segurança
            </h1>
        </div>
        <div class="pl-32 items-center">
            <div class="flex justify-start">
                <div class="flex flex-col gap-10">
                    <!-- tudo errado, arrumar -->
                    <div class="flex justify-between items-center gap-5">
                        <span class="text-xl">Alterar E-mail</span>
                        <Input styleInput="input-transparente-claro-grande" 
                        conteudoInput="Altera E-mail" 
                        v-model="email" 
                        tipo="obrigatorio" />
                    </div>
                    <div class="flex justify-between items-center gap-5">
                        <span class="text-xl">Celular</span>
                        <Input styleInput="input-transparente-claro-grande" 
                        conteudoInput="Celular" 
                        v-model="celular" 
                        tipo="obrigatorio" />
                    </div>
                    <div class="flex justify-between items-center gap-5">
                        <span class="text-xl">Senha</span>
                        <Input styleInput="input-transparente-claro-grande" 
                        conteudoInput="Senha" 
                        v-model="senha" 
                        tipo="obrigatorio" />
                    </div>
                    <div class="flex justify-between items-center gap-5">
                        <span class="text-xl">Confirmar Senha</span>
                        <Input styleInput="input-transparente-claro-grande" 
                        conteudoInput="Confirmar Senha" 
                        v-model="confirmarSenha" 
                        tipo="obrigatorio" />
                    </div>
                </div>
            </div>
        </div>
        <div class="flex items-center justify-between ml-[10%] mr-[15%] mt-[17%]">
            <span>Deseja deletar sua Conta?</span>
            <Botao
            :funcaoClick="alterarEmail" 
            preset="PadraoRoxo" 
            texto="Confirmar Edição" 
            tamanhoDaBorda="2px" 
            tamanhoDaFonte="2.0vh" />
            </div>
    </div>
</template>

<script setup>
import {perfilStore} from '../stores/perfilStore'
import Input from '../components/Input.vue'
import Botao from './Botao.vue';
const PerfilStore=perfilStore()

let senha;
let confirmarSenha;
let celular;
let email;

</script>

<style lang="scss" scoped>

</style>