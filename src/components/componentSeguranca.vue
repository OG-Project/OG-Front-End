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
                    <div class="flex items-center gap-8">
                        <div class="text-2xl w-[470px]">
                            Ao alterar a senha, a gente mantém você conectado
                            a este dispositivo, mas é possível que sua conta
                            seja desconectada de outros dispositivos.
                        </div>
                        <Botao :funcaoClick="alteraSenha" preset="PadraoRoxo" texto="Alterar Senha">
                        </Botao>
                    </div>
                    <div class="flex items-center gap-8">
                        <div class="gap-5">
                            <div class="text-2xl w-[470px]">
                                Seu endereço de e-mail atual é <span class="text-roxo">{{usuario.email}}</span>
                            </div>
                            <div v-if="isLogadoGoogle" class="text-2xl w-[470px]">
                                Login com a conta do Google ativado
                                Conta conectada
                                Sua conta está conectada a uma conta do Google. 
                                Alterar o endereço de e-mail aqui vai
                                desconectar a conta do Google.
                            </div>
                        </div>
                        <Botao :funcaoClick="alteraEmail" preset="PadraoRoxo" texto="Alterar E-mail">
                        </Botao>
                    </div>
                    <!-- tudo errado, arrumar -->
                    <!-- <div class="flex justify-between items-center gap-5">
                        <span class="text-xl">Alterar E-mail</span>
                        <Input styleInput="input-transparente-claro-grande" 
                        conteudoInput="Altera E-mail" 
                        v-model="email" 
                        tipo="obrigatorio" />
                    </div> -->
                </div>
            </div>
        </div>
        <div class="flex items-center justify-between ml-[10%] mr-[15%] mt-[17%]">
            <span>Deseja deletar sua Conta?</span>
            <Botao :funcaoClick="alterarEmail" preset="PadraoRoxo" texto="Confirmar Edição" tamanhoDaBorda="2px"
                tamanhoDaFonte="2.0vh" />
        </div>
        <alteraSenha></alteraSenha>
    </div>
</template>

<script setup>
import { funcaoPopUpStore } from '../stores/funcaoPopUp';
import { perfilStore } from '../stores/perfilStore'
import Input from '../components/Input.vue'
import Botao from './Botao.vue';
import VueCookies from "vue-cookies";
import alteraSenha from './alterarSenha.vue'

let funcaoPopUp=funcaoPopUpStore()
const PerfilStore = perfilStore()
let usuario=VueCookies.get('usuarioCookie')

let isLogadoGoogle=false
let senha;
let confirmarSenha;
let celular;
let email;

</script>

<style lang="scss" scoped></style>