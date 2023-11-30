
<template>
    <div>
        <fundoPopUp largura="40vw" altura="88vh">
            <div class=" divGeral">
                    <div class=" flex justify-center w-full">
                        <h1 class="flex font-semibold xl:text-3xl md:text-2xl sm:text-xs color-[#000]">Equipe</h1>
                    </div>
                    <div class=" flex justify-center p-5">
                    <Input styleInput="input-transparente-claro" width="70" height="10" icon="../src/imagem-vetores/Equipe.svg" conteudoInput="Nome da Equipe"></Input> 
                    </div>
                    <div class=" flex justify-center">
                        <Input  styleInput="input-transparente-claro"  width="70" height="10" icon="../src/imagem-vetores/adicionarPessoa.svg"  conteudoInput="Adicionar Pessoa"></Input>
                    </div>
                    <div class=" flex items-center justify-center p-10">
                        <TextAreaPadrao   class="flex xl:w-[18vw] xl:h-[10vh] md:w-[36vw] md:h-[8vh] w-full justify-center" height="10vh" resize="none" tamanho-da-fonte="1rem" placeholder="Descrição(opcional)"></TextAreaPadrao>
                    </div> 
                    <div class="flex justify-center ">
                        <ListaConvidados class="listaConvidados"></ListaConvidados>
                    </div>
                    <div class="alturaBotao flex  justify-end mt-[10%] mx-[3vw] w-[86%]  xl:w-[80%] ">
                        <Botao preset="PadraoRoxo" tamanhoPadrao="pequeno" texto="Criar Equipe" tamanhoDaFonte="0.9rem"  >
                        </Botao>
                    </div>
            </div>
           
        </fundoPopUp>
    </div>
</template>

<script setup>
import fundoPopUp from './fundoPopUp.vue';
import Input from './Input.vue';
import TextAreaPadrao from './textAreaPadrao.vue';
import Botao from './Botao.vue';
import ListaConvidados from './ListaConvidados.vue';
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
    .listaConvidados{
        @apply w-full
    }
    .divGeral{
        @apply w-full flex justify-center p-5 flex-col;
    }
    

}
</style>