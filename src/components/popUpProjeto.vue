<template>
    <div>
        <FundoPopUp largura="50vw" altura="90vh">
            <div class="w-full h-full flex items-center justify-center mt-[8%]">
                <div class="w-[85%] h-full flex flex-col gap-9 pl-[5%]">
                    <div class="h-[15%] w-[60%] flex items-start justify-start">
                        <Input styleInput="input-transparente-claro" icon="../src/imagem-vetores/icon-lapis-preto.svg" conteudoInput="Nome Projeto"  
                        direcao="direita" largura="15" fontSize="1.5rem" v-model="nomeProjeto"></Input>
                    </div>
                    <div class="grid grid-cols-2">
                        <div class=" w-full h-full flex flex-col gap-16">
                            <div>
                                <div style="display: grid; grid-template-columns: 30% 70%;" class="gap-4">
                                    <p class="text-[1.1rem] flex items-end h-full">Tipo Projeto: </p>
                                    <Input styleInput="input-transparente-claro-pequeno" largura="7" v-model="tipoProjeto"></Input>
                                </div>
                                
                            </div>
                            <div>
                                <div style="display: grid; grid-template-columns: 30% 70%;" class="gap-4">
                                    <p class="text-[1.1rem] flex items-end h-full font-Poppins">Data Inicio: </p>
                                    <Input styleInput="input-transparente-claro-pequeno"  largura="7" v-model="dataInicioProjeto" tipo="date"></Input>
                                </div>
                               
                            </div>
                            <div>
                                <div class="grid grid-cols-2">
                                    <selectPadrao altura="4" largura="8" :listaSelect="listaSelecao" placeholder-select="Equipes" v-model="equipesRelacionadasProjeto" ></selectPadrao>
                                    <Botao preset="PadraoVazado" texto="Criar" tamanho-da-borda="2px" tamanhoPadrao="pequeno"></Botao>
                                </div>
                            </div>
                        </div>
                        <div class="">
                            <ListaConvidados></ListaConvidados>
                        </div>
                    </div>
                    <div class="h-[5%] flex items-start justify-start ">
                        <Input styleInput="input-transparente-claro-pequeno" conteudoInput="Responsavéis pelo gerenciamento" largura="18"></Input>
                    </div>
                    <div class="h-[18%] w-full flex items-end">
                       <TextAreaPadrao placeholder="Descrição" width="30vw" height="10vh" tamanhoDaFonte="1.5rem" v-model="descricaoProjeto"></TextAreaPadrao>
                    </div>
                    <div class="h-[4%] w-full flex items-end justify-end">
                        <Botao preset="PadraoVazado" texto="Criar Projeto" tamanho-da-borda="4px" tamanhoPadrao="medio" tamanhoDaFonte="3vh" sombras='nao' :funcaoClick="criarProjeto" ></Botao>
                    </div>
                    
                </div>
            </div>
        </FundoPopUp>
    </div>
</template>

<script setup>
    import FundoPopUp from './fundoPopUp.vue';
    import Input from './Input.vue';
    import selectPadrao from './selectPadrao.vue';
    import Botao from './Botao.vue';
    import { conexaoBD } from '../stores/conexaoBD';
    import { onMounted, ref } from 'vue';
    import TextAreaPadrao from './textAreaPadrao.vue';
    import ListaConvidados from './ListaConvidados.vue';
    import {criaProjetoStore} from '../stores/criaProjeto'
    const conexao = conexaoBD();
    let listaSelecao=ref([])
    let nomeProjeto=ref("")
    let tipoProjeto=ref("")
    let dataInicioProjeto=ref("")
    let equipesRelacionadasProjeto=ref("")
    let descricaoProjeto = ref("")

    onMounted(() => { 
        console.log(conexao.procurar('/equipe'))
        defineSelect()
    })

    async function defineSelect(){
       let listaAux = (await conexao.procurar('/equipe'))
       let listaAux1=[]
        listaAux.forEach(equipeAtual => {
            listaAux1.push(equipeAtual.nome);
            listaSelecao.value=listaAux1
        });
    }
    
    function criarProjeto(){
        const criaProjeto = criaProjetoStore()
        criaProjeto.criaProjeto(nomeProjeto.value,descricaoProjeto.value)
        console.log(""+nomeProjeto.value+" "+descricaoProjeto.value)
    }
</script>

<style lang="scss">

</style>