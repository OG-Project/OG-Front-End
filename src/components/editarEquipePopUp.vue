<template>

    <fundoPopUp v-if="!editando" largura="" altura="60%" >
            <div class="divGeral">
                <div class=" grid-template flex w-full">
                        <h1 class="flex font-semibold xl:text-3xl md:text-2xl sm:text-xs color-[#000]">Equipe Editar</h1>
                </div>
                <div class=" grid-template  flex w-full mt-[1vh] p-5">
                        <img class="imagem" src="../imagem-vetores/adicionarPessoa.svg" alt="">
                        <div class="styleH1Padrao">
                            <h1 class=" flex 2xl:h-[4vh]  2xl:w-[12vw] xl:w-[22vw] lg:w-[25vw] md:w-[21vw] text-xl text-[#877E7E] " :title="equipeSelecionada.equipe.nome"> {{ truncarNome(equipeSelecionada.equipe.nome , 20)  }}</h1>
                        </div>
                </div>
                <div class=" grid-template flex w-full mt-[1vh]">
                    <div class="textArea">
                        <p>{{ equipeSelecionada.equipe.descricao }}</p>
                    </div>
                </div> 
                <div>
                    <div class="botao">
                    <div class="flex justify-start xl:mt-[10vh] lg:mt-[15vh] md:mt-[15vh] 2xl:ml-5 xl:ml-[6vw] lg:ml-[6vw] md:ml-[5vw]">
                        <Botao preset="Deletar" tamanhoPadrao="medio" texto="Deletar" tamanhoDaFonte="1rem" :funcaoClick="deletarEquipe">
                        </Botao>
                    </div>
                    <div class=" flex justify-end xl:mt-[10vh] lg:mt-[15vh] md:mt-[15vh] 2xl:mr-5 xl:mr-[5vw] lg:mr-[5vw] md:mr-[4vw]">
                        <Botao preset="PadraoRoxo" tamanhoPadrao="medio" texto="Editar" tamanhoDaFonte="1rem" :funcaoClick="editarEquipe">
                        </Botao>
                    </div>
                    
                </div>
                </div>
            </div>
                
        </fundoPopUp>

        <fundoPopUp v-if="editando" largura="" altura="60%">
            <div class="divGeral">
                <div class=" grid-template flex w-full">
                        <h1 class="flex font-semibold xl:text-3xl md:text-2xl sm:text-xs color-[#000]">Equipe</h1>
                </div>
                <div class=" grid-template  flex w-full mt-[1vh] p-5">
                        <img class="imagem" src="../imagem-vetores/adicionarPessoa.svg" alt="">
                    <Input :class="{ 'computedClasses': someCondition }"  styleInput="input-transparente-claro" :largura="larguraInput()"  conteudoInput="Nome da Equipe" v-model="nome"  ></Input> 
                </div>
                <div class=" grid-template flex w-full mt-[1vh]">
                    <textAreaPadrao class="flex 2xl:w-[18vw] xl:h-[10vh] xl:w-[35vw] lg:w-[36vw] md:w-[38vw] md:h-[8vh] w-full  justify-center" height="20vh" resize="none" tamanho-da-fonte="1rem" placeholder="Descrição(opcional)" v-model="descricao"></textAreaPadrao>
                </div> 
                <div class="botaoSalvar flex justify-end 2xl:mt-[22vh] xl:mt-[24vh] lg:mt-[27vh] md:mt-[28vh] 2xl:mx-[2vw] xl:mx-[3vw] lg:mx-[3vw] md:mx-[4vw]">
                        <Botao preset="PadraoRoxo" tamanhoPadrao="medio" texto="Salvar alterações" tamanhoDaFonte="1rem" :funcaoClick="atualizarEquipe">
                        </Botao>
                </div>
            </div>
                
        </fundoPopUp>

</template>

<script setup>
import { ref } from 'vue';
import fundoPopUp from './fundoPopUp.vue';
import Input from './Input.vue';
import textAreaPadrao from './textAreaPadrao.vue';
import Botao from './Botao.vue';
import { conexaoBD } from "../stores/conexaoBD.js";
import VueCookies from "vue-cookies";


const banco = conexaoBD();
const equipeSelecionada = VueCookies.get('equipeSelecionada')
let nome = ref('');
let descricao = ref('');
let mensagemError = ref("");
const usuarioLogado = VueCookies.get('usuarioCookie');
let editando = ref(false);
let equipes = banco.procurar("/equipe");

console.log(usuarioLogado)
console.log(equipeSelecionada)

const truncarNome = (nome, comprimentoMaximo) => (nome.length > comprimentoMaximo ? `${nome.slice(0, comprimentoMaximo)}...` : nome);

async function editarEquipe(){
    editando.value = !editando.value;
}
function larguraInput(){
const screenWidth = window.innerWidth;
if (screenWidth <= 768) {
    return '25';
} else if (screenWidth > 768 && screenWidth <= 1024) {
    return '28';
} else if (screenWidth > 1024 && screenWidth < 1920) {
    return '25';
} else {
    return '13';
}
};

async function deletarEquipe(){

    let listaEquipes = await equipes;
    listaEquipes.forEach((equipe) =>{
        if(equipeSelecionada.equipe.id == equipe.id){
        
            banco.deletarEquipe(equipe.id,'/equipe')
            window.location.reload();
        }
    })

}

 async function atualizarEquipe() { 
    const equipeAtualizar ={
        id: '',
        nome: '',
        descricao: ''
    };

            if (!nome.value.trim()) {
                console.log("É obrigatorio o nome da equipe");
                return ;
                
            }


        let listaEquipes = await equipes;
        listaEquipes.forEach((equipe)=>{
        if(equipeSelecionada.equipe.id == equipe.id){
            
            equipeAtualizar.id = equipe.id
            equipeAtualizar.nome = nome.value
            equipeAtualizar.descricao = descricao.value
            mensagemError.value = "";
        
            console.log(equipeAtualizar.nome)
            console.log(equipeAtualizar.descricao)

            banco.atualizar(equipeAtualizar, "/equipe");
        }
        })

            nome.value = ""
            descricao.value = ""

            editando.value = false;


            window.location.reload();
}

</script>
<style scoped>
    @import url(../assets/main.css);

    @layer components {

    .styleH1Padrao{
       @apply 
       border-4 
        border-transparent
        border-b-roxo    
        px-2
        max-w-max
        w-min
        border-b-4
        hover:rounded-[4px] hover:border-4
         focus-within:border-roxo 
        focus-within:border-4 focus-within:rounded-[4px]  ;
        
    }

    .textArea{
     @apply flex  2xl:w-[18vw] xl:h-[20vh] xl:w-[35vw] lg:w-[36vw] md:w-[38vw] md:h-[18vh] w-full bg-[#D7D7D7] text-black text-lg
     border-transparent border-b-roxo border-b-4  focus-within:border-roxo focus-within:border-4;
     border-bottom: 'solid 4px #620BA7' ;
 }
    
    .imagem {
        @apply xl:h-[6vh] xl:w-[3vw];
    }

    .mensagem-error {
        @apply flex justify-center text-red-600 mt-10;
    }

    .botaoSalvar{
        @apply w-[80%] h-[100%] gap-4  items-center; 
        display: grid;
        grid-template-columns: 40% 55%;
    }
    .botao{
        @apply w-[100%] h-[100%] gap-4  items-center; 
        display: grid;
        grid-template-columns: 40% 55%;
    }

    .convidados-div{
        @apply h-full;
    }

    .grid-template{ 
        @apply w-[80%] h-[11%] gap-4  items-center justify-items-center justify-center; 
        display: grid;
        grid-template-columns: 40% 55%;
    }

    #convites-bg {
        clip-path: polygon(20% 0, 80% 0, 100% 15%, 100% 100%, 0 100%, 0 15%);
    }

    .listaConvidados{
        @apply w-full h-full 2xl:w-[100%] 2xl:h-[20%] xl:w-[60%] xl:h-[30%] lg:w-[50%] lg:h-[20%];
    }
    .divGeral{
        @apply w-full flex justify-center p-5 flex-col;
    }

    @media(min-width: 2560px){
        .divGeral{
        @apply w-[55vw];
        }
        .imagem{
            @apply h-[6vh] w-[3vw];
        }

    }
    
    @media(min-width: 1024px){
        .divGeral{
            @apply w-[50vw];
        }
        .listaConvidados{
            @apply w-[40vw];
        }

    }

    @media (max-width: 1024px) {
        .imagem{
            @apply lg:h-[5vh] lg:w-[5vw] md:h-[4vh] md:w-[4vh];
        }
    }

    @media(min-width: 768px){
        .divGeral{
            @apply md:w-[55VW];
        }
        .listaConvidados{
            @apply w-[40vw];
        }
        .botao{
            @apply md:mt-[5%];  
        }
    }

    @media(min-width: 1280px){
        .divGeral{
            @apply w-[25VW];
        }
        .listaConvidados{
            @apply w-[20vw];
        }
    }

    @media(min-width: 1280px ) and ( max-width: 1440px){
        .divGeral{
            @apply w-[50vw];
        }
        .listaConvidados{
            @apply w-[35vw];           
        }
        .imagem{
            @apply h-[5vh] w-[4vw];
        }
    }

}
</style>