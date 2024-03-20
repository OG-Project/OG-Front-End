
<template>
    <div >
        <FundoPopUp largura="40vw" altura="80vh">
            <div class="w-full h-full flex flex-col justify-between items-center">
                <div class="flex justify-center h-[30%] items-end">

                    <Input styleInput="input-transparente-claro-grande" icon="../src/imagem-vetores/icon-lapis-preto.svg"
                     conteudoInput="Propriedade" direcao="direita"
                     v-model="nomePropriedade" tipo="obrigatorio"></Input>  
                     
                </div>
                <div class="grid-template">
                    <p class=" xl:text-2xl sm:text-sm md:text-md">Tipo de dado:</p>
                    <div class=" h-full flex items-start">
                        <selectPadrao :listaSelect="listaSelecao" fonteTamanho="2.5" largura="12" altura="6" v-model="tipo"></selectPadrao>
                    </div>
                </div>
                <div class="grid-template">
                     <p class=" xl:text-2xl sm:text-sm md:text-md">Visualização:</p>
                    <div class=" h-full flex items-start">
                        <selectPadrao :listaSelect="listaSelecao" fonteTamanho="2.5" largura="12" altura="6"></selectPadrao>
                    </div>
                </div>
                <div class="alinhaBotoes">
                    <div class="flex items-center justify-start" @click="limpaTudo()">
                        <Botao preset="Sair"  tamanhoDaFonte="3vh"  tamanhoPadrao="medio" :funcaoClick="funcaoPopUp.fechaPopUp" ></Botao>
                    </div>
                    <div class="flex items-center justify-end">
                        <Botao preset="PadraoVazado" texto="Criar" tamanho-da-borda="4px" tamanhoPadrao="medio" tamanhoDaFonte="3vh" sombras='nao' :funcaoClick="cria" ></Botao>
                    </div>
                </div>
            </div>
        </FundoPopUp>
        <!-- VERIFICAR TIPO DE VIZUALIZAÇÃOES PARA CADA TIPO DE PROPRIEDADE -->
    </div>
</template>

<script setup>
import FundoPopUp from './fundoPopUp.vue';
import Input from './Input.vue';
import selectPadrao from './selectPadrao.vue';
import Botao from './Botao.vue';
import { criaPropriedadeStore } from '../stores/criaPropriedade';
import { onMounted, ref } from 'vue';
import {funcaoPopUpStore} from '../stores/funcaoPopUp'
let listaSelecao;
let nomePropriedade=ref("");
let tipo=ref("");
const funcaoPopUp= funcaoPopUpStore();

function cria(){
    
    if(tipo.value==''|| tipo.value=='Texto'){
        tipo.value="TEXTO"
    }else if(tipo.value=='Numero'){
        tipo.value="NUMERO"
    }else if(tipo.value=="Data"){
        tipo.value="DATA"
    }else if(tipo.value=="Seleção"){
        tipo.value="SELECAO"
    }
    const cria = criaPropriedadeStore()
    cria.criaPropriedade(nomePropriedade.value, tipo.value)
}


onMounted(()=>{
           listaSelecao = ['Texto','Data', 'Numero', 'Seleção']
        }
        
    )
   function limpaTudo(){
     nomePropriedade=""
     tipo=""
   }
</script>

<style >
@import url(../assets/main.css);

@layer components {
    .grid-template {
        @apply w-[80%] h-[11%] gap-4 items-center justify-items-center justify-center;
        display: grid;
        grid-template-columns: 40% 55%;
    }
    .alinhaBotoes{
        @apply flex  justify-between items-center w-[80%] gap-16 p-4 max-[1290px]:flex-wrap  max-[1290px]:justify-center ;
    }
}
</style>