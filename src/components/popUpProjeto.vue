<template>
    <div>
        <FundoPopUp largura="50vw" altura="90vh">
            <div class="w-full h-full flex items-center justify-center mt-[8%]">
                <div class="w-[70%] h-full flex flex-col gap-7">
                    <div class="h-[15%] w-[60%] flex items-start justify-start">
                        <Input styleInput="input-transparente-claro" icon="../src/imagem-vetores/icon-lapis-preto.svg" conteudoInput="Nome Projeto"  
                        direcao="direita" largura="15" fontSize="1.5rem" v-model="nomeProjeto"></Input>
                    </div>
                    <div class="h-[5%] w-full flex items-start justify-start">
                        <Input styleInput="input-transparente-claro-pequeno" conteudoInput="Tipo Projeto" largura="8"></Input>
                    </div>
                    <div class="h-[5%] marker:w-full flex items-start justify-start">
                        <Input styleInput="input-transparente-claro-pequeno" conteudoInput="Data Inicio" largura="8"></Input>
                    </div>
                    <div class="h-[5%] w-full flex items-start justify-start">
                        <selectPadrao altura="4" largura="8" :listaSelect="listaSelecao" ></selectPadrao>
                    </div>
                    <div class="h-[5%] flex items-start justify-start">
                        <Input styleInput="input-transparente-claro-pequeno" conteudoInput="Responsavéis pelo gerenciamento" largura="50"></Input>
                    </div>
                    <div class="h-[10%] w-full flex items-center">
                       <TextAreaPadrao placeholder="Descrição" width="30vw" height="10vh" tamanhoDaFonte="1.5rem" ></TextAreaPadrao>
                    </div>
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
    import { conexaoBD } from '../stores/conexaoBD';
    import { onMounted, ref } from 'vue';
import TextAreaPadrao from './textAreaPadrao.vue';
    const conexao = conexaoBD();
    let listaSelecao=[]
    let teste=[];
    let nomeProjeto=ref("")
    onMounted(() => { 
        console.log(conexao.procurar('/equipe'))
        defineSelect()
        teste=['Meu saco', 'treterrte']
    })

    async function defineSelect(){
       let listaAux = (await conexao.procurar('/equipe'))
       let listaAux1=[]
        listaAux.forEach(equipeAtual => {
            listaAux1.push(equipeAtual.nome);
            listaSelecao=listaAux1
        });
    }
</script>

<style lang="scss">

</style>