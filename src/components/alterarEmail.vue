<template>
    <fundoPopUp largura="77vh" altura="54vh">
        <div class="flex flex-col justify-between  w-[740px] h-[655px]">
                <div class="flex pl-12 pt-12">
                    <div class="text-3xl text-roxo">
                        Alterar E-mail
                    </div>    
                </div>
                <div class="flex justify-center items-center">
                    <div class="flex flex-col gap-16">
                        
                        <div class="flex justify-between items-center gap-5">
                            <span class="text-xl font-semibold">Alterar E-mail</span>
                            <Input styleInput="input-transparente-claro-grande" 
                            conteudoInput="Altera E-mail" 
                            v-model="email" 
                            tipo="obrigatorio" />
                        </div>
                    </div>
                </div>
                <div class="flex justify-end pb-14 pr-14">
                    <Botao 
                    :funcaoClick="alterarEmail" 
                    preset="PadraoVazado" 
                    texto="Confirmar" 
                    tamanhoDaBorda="2px"
                    tamanhoDaFonte="2.0vh"    
                    />
                </div>
            </div>
    </fundoPopUp>
</template>

<script setup>
import Botao from './Botao.vue';
import fundoPopUp from './fundoPopUp.vue';
import Input from './Input.vue';
</script>

<style scoped>

</style>