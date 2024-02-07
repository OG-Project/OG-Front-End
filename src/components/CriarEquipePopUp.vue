    <template>
        <div>
            <fundoPopUp  largura="" altura="100%">
                <div class="divGeral">
                    <div class=" grid-template flex w-full">
                            <h1 class="flex font-semibold xl:text-3xl md:text-2xl sm:text-xs color-[#000]">Equipe</h1>
                    </div>
                    <div class=" grid-template  flex w-full mt-[1vh] p-5">
                            <img class="imagem" src=".../src/imagem-vetores/adicionarPessoa.svg" alt="">
                        <Input class="computedClasses" styleInput="input-transparente-claro" :largura="larguraInput()"  conteudoInput="Nome da Equipe" v-model="nome"  ></Input> 
                    </div>
                        <div class=" grid-template  flex w-full">
                            <Input  styleInput="input-transparente-claro" :largura="larguraInputConvidado()" icon="../src/imagem-vetores/adicionarPessoa.svg"  conteudoInput="Adicionar Membro" v-model="usuarioConvidado"></Input>
                    </div>
                    <div class="grid-template flex w-full mt-[1vh]">
                        <Botao class="flex justify-center " preset="PadraoVazado" tamanhoPadrao="pequeno" texto="convidar" tamanhoDaFonte="0.9rem" :funcaoClick="adicionarMembro"></Botao>
                    </div>
                    <div class=" grid-template flex w-full mt-[1vh]">
                        <textAreaPadrao class="flex 2xl:w-[18vw] xl:h-[10vh] xl:w-[35vw] lg:w-[36vw] md:w-[38vw] md:h-[8vh] w-full  justify-center" height="10vh" resize="none" tamanho-da-fonte="1rem" placeholder="Descrição(opcional)" v-model="descricao"></textAreaPadrao>
                    </div> 
                    <div class="convidados-div flex justify-center xl:mt-[2vh] lg:mt-[4vh] md:mt-[4vh]">
                        <ListaConvidados  texto="Convites" mostrar-select="true" class="listaConvidados" altura="40vh" caminho-da-imagem-icon="../src/imagem-vetores/Sair.svg" caminho-da-imagem-perfil="../src/imagem-vetores/perfilPadrao.svg" :listaConvidados="membrosEquipe" ></ListaConvidados>
                    </div>
                    <div class="botao flex justify-end xl:mt-[8vh] md:mt-[10vh] xl:mx-[3vw] lg:mx-[5vw] md:mx-[5vw]">
                            <Botao preset="PadraoRoxo" tamanhoPadrao="medio" texto="Criar Equipe" tamanhoDaFonte="1rem" :funcaoClick="cadastrarEquipe">
                            </Botao>
                    </div>
                </div>
                    
            </fundoPopUp>
        </div>
    </template>

    <script setup>
    import { ref } from 'vue';
    import fundoPopUp from './fundoPopUp.vue';
    import Input from './Input.vue';
    import textAreaPadrao from './textAreaPadrao.vue';
    import Botao from './Botao.vue';
    import ListaConvidados from './ListaConvidados.vue';
    import { conexaoBD } from "../stores/conexaoBD.js";
    import { criaEquipeStore } from "../stores/criarEquipe";
    import {  computed } from 'vue';

    const banco = conexaoBD();
    let nome = ref('');
    let descricao = ref('');
    let usuarioConvidado = ref('');
    let mensagemError = ref("");
    let membrosEquipe = ref([]);
    let usuarios = banco.procurar("/usuario");

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

    function larguraInputConvidado(){
        const screenWidth = window.innerWidth;
    if (screenWidth <= 768) {
        return '30';
    } else if (screenWidth > 768 && screenWidth <= 1024) {
        return '35';
    } else if (screenWidth > 1024 && screenWidth < 1920) {
        return '35';
    } else {
        return '18';
    }
    }

    async function listaUsuarios(){
        let listaUsuarios = await usuarios;
        listaUsuarios.forEach((usuario)=>{
        if(usuarioConvidado.value === usuario.username || usuarioConvidado.value === usuario.nome 
        || usuarioConvidado.value === usuario.email){
            membrosEquipe.value.push(usuario);
        }
        })
    }
    
    async function adicionarMembro(){
        listaUsuarios();
    }
    
    function cadastrarEquipe() { 
    const cria = criaEquipeStore();
                
    if (!nome.value.trim()) {
        console.log("O nome da equipe é obrigatório.");
        return;
    }

    mensagemError.value = "";

    cria.criaEquipe(
            nome.value,
            descricao.value,
            membrosEquipe.value
        
    )

    const equipeCriada={
        nome : nome.value,
        descricao : descricao.value,
        membros: membrosEquipe.value

    };

    banco.cadastrar(equipeCriada, '/equipe');

    membrosEquipe.value.forEach(membro =>{
        if(!membro.equipes) {
            membro.equipes = [];
        }

        membro.equipes.push({
            nome: nome.value,
            descricao: descricao.value
        })

        banco.atualizar(membro, '/usuario');
    });

    console.log('Equipe cadastrada:', cria);

    nome.value = '';
    descricao.value = '';
    membrosEquipe.value = '';


    };


    </script>
    <style scoped>
        @import url(../assets/main.css);

        @layer components {
        
        .imagem {
            @apply xl:h-[6vh] xl:w-[3vw];
        }

        .mensagem-error {
            @apply flex justify-center text-red-600 mt-10;
        }
        .botao{
            @apply w-[80%] h-[100%] gap-4  items-center; 
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