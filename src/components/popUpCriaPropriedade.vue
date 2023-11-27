<template>
    <div>
        <FundoPopUp>
            <div class="w-full h-full flex flex-col justify-between items-center">
                <div class="flex justify-center h-[30%] items-end">
                    <Input width="55" height="50" styleInput="input-transparente-claro-grande" icon="../src/imagem-vetores/icon-lapis-preto.svg"
                     conteudoInput="Propriedade" direcao="direita"
                     v-model="nomePropriedade" tipo="obrigatorio"></Input>  
                     
                </div>
                <div class="grid-template">
                    <p class="text-[3vh]">Tipo de dado:</p>
                    <div class=" h-full flex items-start">
                        <selectPadrao :listaSelect="listaSelecao" fonteTamanho="2.5" largura="20vh" altura="6vh" v-model="tipo"></selectPadrao>
                    </div>
                </div>
                <div class="grid-template">
                     <p class="text-[3vh]">Visualização:</p>
                    <div class=" h-full flex items-start">
                        <selectPadrao :listaSelect="listaSelecao" fonteTamanho="2.5" largura="20vh" altura="6vh"></selectPadrao>
                    </div>
                </div>
                <div class="alinhaBotoes">
                    <div class="flex items-center justify-start" @click="limpaTudo()">
                        <Botao preset="Sair" width="20vh" height="6vh" tamanhoDaFonte="3vh" tamanhoPadrao="personalizado" :funcaoClick="funcaoPopUp.fechaPopUp" ></Botao>
                    </div>
                    <div class="flex items-center justify-end">
                        <Botao preset="PadraoVazado" texto="CRIAR" tamanho-da-borda="4px" tamanhoPadrao="personalizado" width="20vh" height="6vh" tamanhoDaFonte="3vh" sombras='nao' :funcaoClick="cria" ></Botao>
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
    
    if(tipo.value==''){
        tipo.value="Texto"
    }
    const cria = criaPropriedadeStore()
    cria.criaPropriedade(nomePropriedade.value,tipo.value)
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

@layer components{
    .grid-template{ 
        @apply w-[80%] h-[11%]  gap-4  items-center justify-items-center justify-center ; 
        display: grid;
        grid-template-columns: 40% 55%;
    }
    .alinhaBotoes{
        @apply grid grid-cols-2 justify-center items-center w-[80%] gap-16 p-4 ;
    }
}

</style>