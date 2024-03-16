<template>
    <div>
        <fundoPopUp largura="77vh" altura="68vh">
            <div class="flex flex-col justify-between  w-[740px] h-[655px]">
                <div class="flex pl-12 pt-12">
                    <div class="text-3xl text-roxo">
                        Alterar Senha
                    </div>    
                </div>
                <div class="flex justify-center items-center">
                    <div class="flex flex-col gap-16">
                        <div class="flex justify-between items-center gap-5">
                            <span class="text-xl font-semibold">Insira a senha antiga</span>
                            <Input styleInput="input-transparente-claro-grande" 
                            conteudoInput="Senha Antiga" 
                            v-model="senhaAntiga" 
                            tipo="obrigatorio" />
                        </div>
                        <div class="flex justify-between items-center gap-5">
                            <span class="text-xl font-semibold">Insira uma senha nova</span>
                            <Input styleInput="input-transparente-claro-grande" 
                            conteudoInput="Senha Nova" 
                            v-model="senhaNova" 
                            tipo="obrigatorio" />
                        </div>
                        <div class="flex justify-between items-center gap-5">
                            <span class="text-xl font-semibold">Confirme a nova senha</span>
                            <Input styleInput="input-transparente-claro-grande" 
                            conteudoInput="Confirmar Senha" 
                            v-model="senhaConfirmada" 
                            tipo="obrigatorio" />
                        </div>
                    </div>
                </div>
                <div class="flex justify-end pb-14 pr-14">
                    <Botao 
                    :funcaoClick="alteraSenha" 
                    preset="PadraoVazado" 
                    texto="Confirmar" 
                    tamanhoDaBorda="2px"
                    tamanhoDaFonte="2.0vh"    
                    />
                </div>
            </div>
        </fundoPopUp>
    </div>
</template>

<script setup>
import fundoPopUp from './fundoPopUp.vue';
import Input from './Input.vue';
import Botao from './Botao.vue';
import { ref } from 'vue';
import { perfilStore } from '../stores/perfilStore';
let perfil=perfilStore()

let senhaNova=ref('')
let senhaConfirmada=ref('')

function alteraSenha(){
    if(senhaNova.value==senhaConfirmada.value){
        alert('igual')
    }else{
        alert('insira de novo')
    }
    console.log('oi')
}

</script>

<style scoped>

</style>