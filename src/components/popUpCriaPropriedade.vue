<template>
    <div>
        <FundoPopUp>
            <div class=" flex justify-center mt-[16%]">
                <Input width="100" height="80" styleInput="input-transparente-claro-grande" icon="../src/imagem-vetores/icon-lapis-preto.svg" conteudoInput="Propriedade" direcao="direita"></Input>  
            </div>
            <div class="grid-template">
                <p>Tipo de dado:</p>
                <selectPadrao :listaSelect="['Placeholder']" tamanho="3"></selectPadrao>
            </div>
        </FundoPopUp>

    </div>
</template>

<script setup>
import FundoPopUp from './fundoPopUp.vue';
import Input from './Input.vue';
import selectPadrao from './selectPadrao.vue';

    
</script>

<style >
@import url(../assets/main.css);

@layer components{
    .grid-template{ 
        @apply w-[85%] h-[20%];
        display: grid;
        grid-template-columns: 20% 80%;
    }
}

</style>