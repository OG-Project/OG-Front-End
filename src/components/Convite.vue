
import FundoPopUp from './fundoPopUp.vue';


<template>
    <div>
        <FundoPopUp class="">
            <div class=" flex justify-center mt-[4%]">
                <h1 class="flex font-semibold text-3xl color-[#000]">Equipe</h1>
            </div>
            <div class=" flex justify-center mt-[4%] ">
                <Input width="100" height="80" styleInput="input-transparente-claro-grande" icon="../src/imagem-vetores/Equipe.svg" conteudoInput="Nome da Equipe"></Input> 
            </div>
            <div class=" flex justify-center mt-[4%] ">
                <Input width="100" height="80" styleInput="input-transparente-claro-grande" icon="../src/imagem-vetores/adicionarPessoa.svg" conteudoInput="Adicionar Pessoa"></Input>
            </div>
            <div class="flex justify-center mt-[5%]">
                <div id="convites-bg" class="w-[350px] h-[250px] bg-[#FEFBFF] shadow-md shadow-gray-950">
                        <h1 class="flex justify-center font-semibold text-xl mt-[5%]">CONVITES</h1>
                        <div class="flex justify-center items-center mt-[5%]">
                            <img class="imgDePerfil rounded-full" src="img" alt="">
                            <h2 class="mt-[3px] text-lg">{{ Usuario.nome }}</h2> 
                            <SelectPadrao class="selectEdit" :listaSelect="opcoesSelect" styleSelect="select-claro">

                            </SelectPadrao>
                        </div>
                </div>
            </div>
        </FundoPopUp>
    </div>
</template>

<script setup>
import FundoPopUp from './fundoPopUp.vue';
import Input from './Input.vue';
import SelectPadrao from './selectPadrao.vue';
const Usuario = {
    nome:String,
    permissao:String,
    img:String
}
const opcoesSelect = ['Edit', 'View']
Usuario.nome="EduardoCosta"
Usuario.img=""

</script>

<style scoped>
@import url(../assets/main.css);


@layer components{
    #convites-bg{
        clip-path: polygon(20% 0, 80% 0, 100% 15%, 100% 100%, 0 100%, 0 15%);
    }
    .imgDePerfil{
        background-size: cover;
        background-position: center;
        width: 30px;
        height: 30px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-right: 5px;
        margin-left:-25px;
    }
    .selectEdit{
        background-color: 787878;
        color: #ffff;
        margin-left: 35px;
        height: 30px;
        margin-top: -3px;
        
        
    }
}


</style>