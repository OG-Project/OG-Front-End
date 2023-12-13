<template>
                <div class=" flex flex-col  gap-4 pl-[5%] mt-[3%]">
                    <div class="flex items-start justify-start font-semibold">
                        <Input styleInput="input-transparente-claro-grande" type="text" conteudoInput="Nome Projeto"  largura="40" altura="8"  fontSize="2.5rem" v-model="nomeProjeto"></Input>
                    </div>
                    <div class="h-[18%] w-max flex items-end">
                        <TextAreaPadrao placeholder="Descrição" resize="none" width="30vw " height="10vh" preset="transparente" tamanhoDaFonte="1.5rem"></TextAreaPadrao>
                    </div>
                    <div class="grid grid-cols-2">
                        <div class=" w-full h-[90%] flex flex-col gap-14">
                            <div class="h-[5%] flex items-start justify-start">
                                <Input styleInput="input-transparente-claro-pequeno" conteudoInput="Tipo Projeto" largura="18" altura="2" fontSize="1.0rem"></Input>
                            </div>
                            <div class="h-[5%] flex items-start justify-start ">
                                 <Input styleInput="input-transparente-claro-pequeno"  largura="18" v-model="dataInicioProjeto" tipo="date" conteudoInput="Data Inicio" altura="2"></Input>
                            </div>
                            <div class="h-[5%]">
                                <div class="w-[46%] grid grid-cols-2">
                                    <selectPadrao altura="4" largura="8" :listaSelect="listaSelecao" placeholder-select="Equipes" v-model="equipesRelacionadasProjeto" ></selectPadrao>
                                    <Botao preset="PadraoVazado" texto="Convidar" tamanho-da-borda="2px" tamanhoPadrao="pequeno"></Botao>
                                </div>
                            </div>
                            <div class="h-[5%] flex items-start justify-start ">
                                 <Input styleInput="input-transparente-claro-pequeno" conteudoInput="Responsavéis pelo gerenciamento" largura="18" altura="2" fontSize="1.0rem" v-model="responsaveisProjeto"></Input>
                                 <div v-if="responsaveisProjeto!=''">
                                       <div class="w-[10%] bg-black h-[5%]">
                                            <div>

                                            </div>
                                       </div> 
                                 </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class=" w-[50vw]">
                        <ListaConvidados altura="20vh" altDaImagemIcon="2vh" lagImagemIcon="4vw" ></ListaConvidados>
                    </div>
                    <div class="h-[2%] w-[97%] flex   justify-end ">
                        <Botao preset="PadraoVazado" texto="Criar Projeto" tamanho-da-borda="4px" tamanhoPadrao="personalizado" tamanhoDaFonte="3vh" sombras='nao' :funcaoClick="criarProjeto" width="5" heigth="1" ></Botao>
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
    let responsaveisProjeto= ref("")

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