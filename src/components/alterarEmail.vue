<template>
    <fundoPopUp largura="77vh" altura="54vh">
        <div class="flex flex-col justify-between w-[740px] h-[515px]">
            <div class="flex pl-12 pt-12">
                <div class="text-3xl text-roxo">
                    Alterar E-mail
                </div>
            </div>
            <div class="flex justify-center items-center">
                <div class="flex flex-col gap-16">
                    <div class="flex justify-between items-center gap-5">
                        <span class="text-xl font-semibold">Novo E-mail</span>
                        <Input 
                        styleInput="input-transparente-claro-grande" 
                        conteudoInput="Novo E-mail" 
                        v-model="emailNovo"
                        tipo="obrigatorio" />
                    </div>
                </div>
            </div>
            <div class="flex justify-end pb-14 pr-14">
                <Botao 
                :funcaoClick="alteraEmail" 
                preset="PadraoVazado" 
                texto="Confirmar" 
                tamanhoDaBorda="2px"
                tamanhoDaFonte="2.0vh" />
            </div>
        </div>
    </fundoPopUp>
</template>

<script setup>
import { ref } from 'vue';
import { perfilStore } from '../stores/perfilStore';
import Botao from './Botao.vue';
import fundoPopUp from './fundoPopUp.vue';
import Input from './Input.vue';
const perfil=perfilStore()

let emailNovo=ref('')
function alteraEmail(){
    
}
</script>

<style scoped></style>