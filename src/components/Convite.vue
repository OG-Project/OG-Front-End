
<template>
    <div>
        <FundoPopUp>
            <div class=" flex justify-center mt-[4%]">
                <h1 class="flex font-semibold xl:text-3xl md:text-2xl sm:text-xs color-[#000]">Equipe</h1>
            </div>
            <div class=" flex justify-center mt-[4%] ">
                <Input styleInput="input-transparente-claro" width="60" height="10" icon="../src/imagem-vetores/Equipe.svg" conteudoInput="Nome da Equipe"></Input> 
            </div>
            <div class=" flex justify-center mt-[4%] ">
                <Input  styleInput="input-transparente-claro"  width="60" height="10" icon="../src/imagem-vetores/adicionarPessoa.svg"  conteudoInput="Adicionar Pessoa"></Input>
            </div>
            <div class=" flex items-center justify-center mt-[4%]">
                <TextAreaPadrao   class="flex xl:w-[18vw] xl:h-[10vh] md:w-[36vw] md:h-[8vh] w-full justify-center" height="10vh" resize="none" tamanho-da-fonte="1rem" placeholder="Descrição(opcional)"></TextAreaPadrao>
            </div>  
            <div class="flex justify-center mt-[5%]">
                <div id="convites-bg" class="xl:w-[18vw] xl:h-[24vh] md:w-[36vw] md:h-[14vh] w-full bg-[#FEFBFF] shadow-md shadow-gray-950">
                        <h1 class="flex justify-center font-semibold xl:text-xl sm:text-xs mt-[5%]">CONVITES</h1>
                        <div class="">
                            <div class="flex justify-center  items-center mt-[8%] xl:w-[19vw] w-full mb-[2vh]">
                                <img class="imgDePerfil rounded-full xl:w-[2vw] xl:h-[4vh] h-full" src="img" alt="">
                                <h2 class="mt-[0%] xl:text-[1vw] sm:text-xs">{{ Usuario.nome }} </h2> 
                                <img class="imgIcon xl:w-[2vw] xl:h-[4vh]  h-full" src="img" alt="">
                                <SelectPadrao class="selectEdit" :listaSelect="opcoesSelect" styleSelect="select-claro">
                                </SelectPadrao>
                            </div>
                            <div class="flex justify-center items-center mt-[5%] xl:w-[19vw] w-full mb-[2vh]">
                                <img class="imgDePerfil rounded-full  xl:w-[2vw] xl:h-[4vh]  h-full" src="img" alt="">
                                <h2 class="mt-[0%] xl:text-[1vw] sm:text-xs">{{ Usuario.nome }} </h2> 
                                <img class="imgIcon xl:w-[2vw] xl:h-[4vh]  h-full" src="img" alt="">
                                <SelectPadrao class="selectEdit" :listaSelect="opcoesSelect" styleSelect="select-claro">
                                </SelectPadrao>
                            </div>
                        </div>
                   </div>
              </div>
                <div class="flex  justify-end mt-[1vh] mx-[3vw] w-[86%]  xl:w-[80%] ">
                    <Botao preset="PadraoRoxo" tamanhoPadrao="pequeno" texto="Criar Equipe" tamanhoDaFonte="0.9rem"  >
                    </Botao>
                </div>
        </FundoPopUp>
    </div>
</template>

<script setup>
import FundoPopUp from './fundoPopUp.vue';
import Input from './Input.vue';
import SelectPadrao from './selectPadrao.vue';
import TextAreaPadrao from './textAreaPadrao.vue';
import Botao from './Botao.vue';
const Usuario = {
    nome: String,
    permissao: String,
    img: String
}
const opcoesSelect = ['Edit', 'View']
Usuario.nome = "EduardoCosta"
Usuario.img = ""



</script>

<style scoped>
@import url(../assets/main.css);


@layer components {
    #convites-bg {
        clip-path: polygon(20% 0, 80% 0, 100% 15%, 100% 100%, 0 100%, 0 15%);
    }

    .imgIcon {
        background-size: cover;
        background-position: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-right: -25px;
        margin-left: 10px;
    }

    .imgDePerfil {
        background-size: cover;
        background-position: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-right: 5px;
        margin-left: -25px;
    }

    .selectEdit {
        background-color: 787878;
        color: #ffff;
        margin-left: 35px;
        height: 4vh;
        width: 8vw;
        margin-top: -3px;


    }


}
</style>