<template>
                <div class="w-full h-full flex flex-col gap-10 pl-[5%] mt-[3%]">
                    <div class="flex items-start justify-start font-semibold">
                        <Input styleInput="input-transparente-claro-grande"  conteudoInput="Nome Projeto"  largura="35" altura="3" fontSize="2.5rem" v-model="nomeProjeto"></Input>
                    </div>
                    <div class="h-[18%] w-max flex items-end">
                        <TextAreaPadrao placeholder="Descrição" resize="none" width="30vw" height="5vh" preset="transparente" tamanhoDaFonte="1.5rem"></TextAreaPadrao>
                    </div>
                    <div class="grid grid-cols-2">
                        <div class=" w-full h-full flex flex-col gap-16">
                            <div>
                                <div class=" w-[50%] grid grid-cols-2 gap-2">
                                    <p class="text-[1.1rem] flex items-end h-full">Tipo Projeto: </p>
                                    <Input styleInput="input-transparente-claro-pequeno" largura="7" v-model="tipoProjeto"></Input>
                                </div>
                                
                            </div>
                            <div>
                                <div class="w-[50%] grid grid-cols-2 gap-2">
                                    <p class="text-[1.1rem] flex items-end h-full font-Poppins">Data Inicio: </p>
                                    <Input styleInput="input-transparente-claro-pequeno"  largura="7" v-model="dataInicioProjeto" tipo="date"></Input>
                                </div>
                               
                            </div>
                            <div>
                                <div class="w-[40%] grid grid-cols-2">
                                    <selectPadrao altura="4" largura="8" :listaSelect="listaSelecao" placeholder-select="Equipes" v-model="equipesRelacionadasProjeto" ></selectPadrao>
                                    <Botao preset="PadraoVazado" texto="Criar" tamanho-da-borda="2px" tamanhoPadrao="pequeno"></Botao>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="h-[5%] flex items-start justify-start ">
                        <Input styleInput="input-transparente-claro-pequeno" conteudoInput="Responsavéis pelo gerenciamento" largura="18"></Input>
                    </div>
                    <div class="">
                            <ListaConvidados></ListaConvidados>
                    </div>
                    <div class="h-[4%] w-full flex items-end justify-end">
                        <Botao preset="PadraoVazado" texto="Criar Projeto" tamanho-da-borda="4px" tamanhoPadrao="medio" tamanhoDaFonte="3vh" sombras='nao' :funcaoClick="criarProjeto" ></Botao>
                    </div>
                </div>
            
</template>

<script setup>
    import FundoPopUp from '../components/fundoPopUp.vue';
    import Input from '../components/Input.vue';
    import selectPadrao from '../components/selectPadrao.vue';
    import Botao from '../components/Botao.vue';
    import { conexaoBD } from '../stores/conexaoBD';
    import { onMounted, ref } from 'vue';
    import TextAreaPadrao from '../components/textAreaPadrao.vue';
    import ListaConvidados from '../components/ListaConvidados.vue';
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