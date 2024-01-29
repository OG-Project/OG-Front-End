<template class="w-full h-full">
    <div class="w-full h-full grid grid-cols-2">
            <div class=" flex flex-col  gap-6 pl-[5%] mt-[3%]">
                 <div class="flex items-start justify-start font-semibold">
                    <Input styleInput="input-transparente-claro-grande" type="text" conteudoInput="Nome Projeto"  largura="40" altura="8"  fontSize="2.5rem" v-model="nomeProjeto"></Input>
                </div>
                <div class="h-[18%] w-max flex items-center ">
                    <TextAreaPadrao placeholder="Descrição" resize="none" width="30vw " height="10vh" preset="transparente" tamanhoDaFonte="1.5rem"></TextAreaPadrao>
                </div>
                <div class="grid grid-cols-2">
                    <div class=" w-full h-[90%] flex flex-col gap-16">
                    
                        <div class="h-[5%] flex items-start justify-start mt-2">
                                 <Input styleInput="input-transparente-claro-pequeno"  largura="19" v-model="dataInicioProjeto" tipo="date" conteudoInput="Data Inicio" altura="2"></Input>
                        </div>
                        <div>
                            <div class="w-full grid grid-cols-2">
                                    <selectPadrao altura="4" largura="8" :listaSelect="listaSelecao" placeholder-select="Equipes" v-model="equipesRelacionadasProjeto" fonte-tamanho="1rem" ></selectPadrao>
                                    <Botao preset="PadraoVazado" texto="Convidar" tamanho-da-borda="2px" tamanhoPadrao="pequeno"></Botao>
                            </div>
                        </div>
                        <div  class="h-[5%] flex  items-start justify-start gap-3">
                            <Input styleInput="input-transparente-claro-pequeno" conteudoInput="Responsavéis pelo gerenciamento" largura="18" altura="2" fontSize="1.0rem" v-model="responsaveisProjeto" tipo="float"></Input>
                            <div v-if="responsaveisProjeto!=''">
                                <div class="w-full bg-brancoNeve h-full rounded-sm border-transparent shadow-md  ">
                                    <div>
                                        aaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                                    </div>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
                    
                <div class=" w-[50vw]">
                    <ListaConvidados altura="20vh" altDaImagemIcon="2vh" lagImagemIcon="4vw" ></ListaConvidados>
                </div>
                
            </div>
            <div class=" w-[60%] h-full flex-row">
                <div class="bg-brancoNeve shadow  w-[80%]  max-h-[80vh] flex flex-col  pt-6 justify-end p-[4%] m-[3%] gap-10">
                    <div class="flex flex-row justify-between items-center">
                        <p>Propriedades</p>
                        <p>Status</p>
                        <selectPadrao placeholder-select="Buscar por" v-model="buscarPor"></selectPadrao>
                    </div>
                        <div class="scrollBar">
                            <div class="flex  flex-row items-center gap-4 h-[8vh]" v-for="propriedade of listaPropriedades">
                                    <p class="w-[33%]">{{ propriedade.nome }}</p>
                                    <p class="w-[33%]">Tipo: {{ propriedade.tipo }}</p>
                                    <div class="bg-roxo-claro rounded-md p-1 w-[50%]">
                                        Tarefas Atribuidas
                                    </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
        
        <div class="h-[1%] w-[76%] flex items-end justify-end pr-4 ">
            <Botao preset="PadraoVazado" texto="Criar Projeto" tamanho-da-borda="4px" tamanhoPadrao="medio" tamanhoDaFonte="2.5 vh" sombras='nao' :funcaoClick="criarProjeto" width="5" heigth="1" ></Botao>
         </div>
</template>

<script setup>
    import FundoPopUp from '../components/fundoPopUp.vue';
    import Input from '../components/Input.vue';
    import selectPadrao from '../components/selectPadrao.vue';
    import Botao from '../components/Botao.vue';
    import { conexaoBD } from '../stores/conexaoBD';
    import { onMounted, ref,watch } from 'vue';
    import TextAreaPadrao from '../components/textAreaPadrao.vue';
    import ListaConvidados from '../components/ListaConvidados.vue';
    import {criaProjetoStore} from '../stores/criaProjeto'
    
    const conexao = conexaoBD();
    var listaSelecao=ref([]);
    let nomeProjeto=ref("");
    let tipoProjeto=ref("");
    let dataInicioProjeto=ref("");
    let equipesRelacionadasProjeto=ref("");
    let descricaoProjeto = ref("");
    let responsaveisProjeto= ref("");
    var listaPropriedades=ref([]);
    let buscarPor = ref("");
    watch(responsaveisProjeto,async ()=>{
        pesquisaBancoUserName();
    })
    onMounted(() => { 
        console.log(conexao.procurar('/equipe'))
        defineSelect()
        propriedadesDoProjeto();
        buscandoPor();
    })

    async function defineSelect(){
       let listaAux = (await conexao.procurar('/equipe'))
       let listaAux1=[]
        listaAux.forEach(equipeAtual => {
            listaAux1.push(equipeAtual.nome);
            listaSelecao.value=listaAux1
        });
    }

    async function pesquisaBancoUserName(){
        console.log(responsaveisProjeto)
        console.log(conexao.procurar("/usuario/username?username="+responsaveisProjeto.value))
    }

    async function propriedadesDoProjeto(){
    var listaAux = (await conexao.procurar('/propriedade'))
       var listaAux1=[]
        listaAux.forEach(equipeAtual => {
            listaAux1.push(equipeAtual);
            listaPropriedades.value=listaAux1
            
        });
        
        return listaPropriedades;
    }
    
    function criarProjeto(){
        const criaProjeto = criaProjetoStore()
        criaProjeto.criaProjeto(nomeProjeto.value,descricaoProjeto.value)
        console.log(""+nomeProjeto.value+" "+descricaoProjeto.value)
    }

    
    async function buscandoPor(){
        console.log(listaPropriedades.value.sort())

    }
</script>

<style lang="scss">
  .scrollBar::-webkit-scrollbar {
  width: 0.7vw; /* Largura da barra de rolagem */
}

.scrollBar::-webkit-scrollbar-thumb {
  @apply bg-gray-200; 
  border-radius: 10px; 
  
}

.scrollBar::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-300; 
  border-radius: 10px;
  
}

.scrollBar::-webkit-scrollbar-track {
 display: none;
}
.scrollBar::-webkit-scrollbar-button {
  display: none;
}

.scrollBar{
    position: relative;
    overflow: hidden;
    transition: overflow-y 0.3s ease;
    @apply  p-2 overflow-y-auto w-full;
}
</style>