<template>
    <div>
        <FundoPopUp largura="50vw" altura="90vh">
            <div class="w-full h-full flex flex-col">
                <div class="h-[30%] w-[60%] flex items-center justify-center">
                    <Input styleInput="input-transparente-claro" icon="../src/imagem-vetores/icon-lapis-preto.svg" conteudoInput="Nome Projeto"  direcao="direita" largura="15vw" fontSize="1.5rem"></Input>
                </div>
                <div class="h-[5%] w-[50%] flex items-center justify-center">
                    <Input styleInput="input-transparente-claro-pequeno" conteudoInput="Tipo Projeto"  ></Input>
                </div>
            </div>
        </FundoPopUp>
    </div>
</template>

<script setup>
    import {funcaoPopUpStore} from '../stores/funcaoPopUp'
    import FundoPopUp from './fundoPopUp.vue';
    import Input from './Input.vue';
    import selectPadrao from './selectPadrao.vue';
    import Botao from './Botao.vue';
    
</script>

<style lang="scss">

</style>