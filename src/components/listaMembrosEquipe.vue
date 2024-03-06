<template>
      <fundoPopUp largura="" altura="95vh">
      <div class="divGeral mb-[65vh]" >
          <div class="primeiraDiv">
            <img class="imagemEquipe" src="" alt="">
             <h1 class="xl:mt-2 lg:mt-10 text-4xl 2xl:mr-5 ">{{ equipeSelecionada.equipe.nome }}</h1>
          </div>
          <div class="div-membros flex flex-col overflow-y-auto scrollbar-thin" >
             <div class="flex justify-center" v-for="membro in listaMembros" :key="membro.id">
                    <img  v-if="membro.id !== usuarioLogado.id"  class="imgIcon" src="../imagem-vetores/Sair.svg" alt="" @click="removerMembro(membro)"/>
                    <div v-else class="imgIcon"></div>
                    <div class="corDiv">
                      <img class="imgDePerfil" src="" alt="">
                      <h1 class="flex mt-5 text-xl md:text-lg">{{ membro.nome }}</h1>
                    </div>
                    <SelectPadrao class="styleSelectPadraoBranco md:mr-5" styleSelect="select-branco" fonteTamanho="1rem" :listaSelect="opcoesSelect" ></SelectPadrao>
             </div>
             
            </div>
        </div>  
            <div class="adiciona-membro">
                  <Input styleInput="input-transparente-claro" :largura="larguraInputConvidado()"   icon="../src/imagem-vetores/adicionarPessoa.svg"  conteudoInput="Adicionar Membro" v-model="usuarioConvidado"></Input>
               <div class="flex mt-[1vh] ml-5">
                <Botao class="flex justify-center " preset="PadraoVazado" tamanhoDaBorda="2px" tamanhoPadrao="pequeno" texto="convidar" tamanhoDaFonte="0.9rem" :funcaoClick="adicionarMembro" ></Botao>
               </div>
            </div>
            <div class="div-lista absolute bottom-[15vh] xl:mt-[20vh] lg:mt-[4vh] md:mt-[4vh] ">
                <ListaConvidados :margin-left="marginLeftConvidado()" margin-right="2vw" texto="Convites" mostrar-select="true" class="listaConvidados" altura="40vh" caminho-da-imagem-icon="../src/imagem-vetores/Sair.svg" caminho-da-imagem-perfil="../src/imagem-vetores/perfilPadrao.svg" :listaConvidados="membrosConvidados" ></ListaConvidados>
            </div>
             <div class="botao absolute bottom-0 right-0 mb-4 mr-4">
                <div class="gap-2">
                    <Botao preset="Sair" tamanhoPadrao="medio" tamanhoDaFonte="0.9rem"></Botao>
                </div>
                <div>
                    <div>
                    <Botao preset="PadraoRoxo" tamanhoPadrao="medio" texto="Confirmar" tamanhoDaFonte="0.9rem" :funcaoClick="confirmarConvites"></Botao>
                    </div>
                </div>
            </div>
       

      </fundoPopUp>
</template>

<script setup>
import fundoPopUp from './fundoPopUp.vue';
import SelectPadrao from './selectPadrao.vue'
import Input from './Input.vue';
import ListaConvidados from './ListaConvidados.vue';
import Botao from './Botao.vue';
import { conexaoBD} from "../stores/conexaoBD.js";
import { ref, onMounted} from 'vue';
import VueCookies from "vue-cookies";

onMounted(exibirMembrosNaLista)

const equipeSelecionada = VueCookies.get('equipeSelecionada')
const usuarioLogado = VueCookies.get('usuarioCookie')
const banco = conexaoBD();

let listaMembros = ref([]);
let membrosEquipe = ref ([]);
let membrosConvidados = ref([]);
let usuarioConvidado = ref('');
const screenWidth = window.innerWidth;
const opcoesSelect = ['Edit', 'View'];
let usuarios = banco.procurar('/usuario'); 

function removerMembro(membro){
    if (membro && membro.id) {
        if (membro.id === usuarioLogado.id) {
            console.error('Você não pode remover a si mesmo da equipe.');
            return; // Impede a remoção
        }
        banco.removerUsuarioDaEquipe(equipeSelecionada.equipe.id,membro.id,"/usuario/removerUsuarioEquipe")
        
    } else {
        console.error('O membro ou sua propriedade id não estão definidos.');
    }
}

 async function buscarMembrosEquipe(){
    console.log(await (banco.buscarMembrosEquipe(equipeSelecionada.equipe.id,"/usuario/buscarMembros")))
   return await (banco.buscarMembrosEquipe(equipeSelecionada.equipe.id,"/usuario/buscarMembros"));   
   
}

async function exibirMembrosNaLista() {
   membrosEquipe.value = await buscarMembrosEquipe();
   if (Array.isArray(membrosEquipe.value)) {
        // Filtrar espaços nulos (null) da lista de membros da equipe
        listaMembros.value = membrosEquipe.value.filter(membro => membro != null);
    } else {
        console.error("O retorno de buscarMembrosEquipe() não é um array válido.");
    }
}


function marginLeftConvidado(){
    if (screenWidth <= 768) {
        return '6vw';
    } else if (screenWidth > 768 && screenWidth <= 1024) {
        return '0vw';
    } else if (screenWidth > 1024 && screenWidth < 1920) {
        return '0vw';
    } else if( screenWidth > 1920 && screenWidth < 2560){
        return '6vw'
    }else if(screenWidth >= 2560){
        return '3vw';
    }
}


function larguraInputConvidado(){
    if (screenWidth <= 768) {
        return '24';
    } else if (screenWidth > 768 && screenWidth <= 1024) {
        return '22';
    } else if (screenWidth > 1024 && screenWidth < 1920) {
        return '19';
    } else if(screenWidth > 2560){
        return '18';
    }else if(screenWidth >= 2560){
        return '12';
    }
    }

    async function listaUsuarios(){
        let listaUsuarios = await usuarios;
        listaUsuarios.forEach((usuario)=>{
        if(usuarioConvidado.value === usuario.username || usuarioConvidado.value === usuario.email){
                membrosConvidados.value.push(usuario);
            }
        })
    }
    
    async function adicionarMembro(){
        const membroNaEquipe = listaMembros.value.find(membro => membro.username === usuarioConvidado.value || membro.email === usuarioConvidado.value);
    
    if (membroNaEquipe) {
        console.log("Esse usuário já faz parte da equipe.");
        return;
    }

    // Verifica se o usuário já foi convidado
    const usuarioJaConvidado = membrosConvidados.value.some(membro => membro.username === usuarioConvidado.value || membro.email === usuarioConvidado.value);
    
    if (usuarioJaConvidado) {
        console.log("Você já convidou essa pessoa.");
    } else {
        await listaUsuarios();
    }
    }

    function confirmarConvites(){
        const ids = membrosConvidados.value.map(m => {
                    return Number(m.id);
        })
       
        // Verifica se o membro a ser convidado foi removido anteriormente
        const membroRemovido = listaMembros.value.find(membro => membro.username === usuarioConvidado.value || membro.email === usuarioConvidado.value);
        
        if (membroRemovido) {
            if(membrosConvidados.value.some((membro) => membro.username == usuarioConvidado.value || membro.email == usuarioConvidado.value)){
             console.log("Esse membro ja faz parte da equipe")
            }else{
        // Se o membro foi removido, adicione-o novamente à equipe
            banco.adicionarUsuarios([membroRemovido.id], equipeSelecionada.equipe.id, "/usuario/add");
            console.log("Membro reconvidado com sucesso.");
            }
           
        } else {
            // Se o membro não foi removido anteriormente, convide-o normalmente
            banco.adicionarUsuarios(ids, equipeSelecionada.equipe.id, "/usuario/add");
        }
    }

</script>

<style scoped>

.styleSelectPadraoBranco{
        @apply border-4 mt-[1vh]
        flex justify-center
        border-transparent
        border-b-brancoNeve
        border-b-4
        w-max
        items-center  focus-within:border-white
        focus-within:border-4 focus-within:rounded-md truncate;
        
    }

.imagemEquipe {
   @apply  2xl:mr-5 xl:mt-2 xl:mr-2 lg:mt-1 lg:mr-3 md:mt-1 md:mr-4 2xl:h-[4vh] 2xl:w-[2vw] xl:h-[4vh] xl:w-[3vw] lg:w-[4vw] lg:h-[4vh] md:w-[6vw] md:h-[4vh];
}

.div-lista{
    @apply 2xl:w-[64vw] xl:w-[82vw] lg:w-[92vw] md:w-[108vw] p-2 2xl:ml-4 xl:ml-[5%] lg:ml-[5%] md:ml-[7%];
    
}

.botao{
 @apply flex justify-center 2xl:gap-20 xl:gap-16 lg:gap-12 md:gap-16 w-[60%] 
  p-10 2xl:mt-[50vh] xl:mt-[8vh] 2xl:mx-[6vw] xl:mx-[8vw] lg:mx-[9vw] md:mx-[11vw] lg:mt-[8vh] md:mt-[8vh];
}
.adiciona-membro{
 @apply flex justify-center absolute bottom-[58vh] 2xl:ml-[4vw] xl:ml-[6vw] lg:ml-[5vw] md:ml-[7vw];
}

.divGeral{
        @apply w-[30vw] 2xl:w-[30vw] xl:w-[40vw] lg:w-[45vw] md:w-[55vw];
    }

.listaConvidados{
        @apply w-full
    }

.div-membros::-webkit-scrollbar {
    display: none; /* Oculta a barra de rolagem no WebKit (Chrome, Safari, etc.) */
}

.div-membros {
    @apply w-[100%] h-[20vh];
    overflow-y: scroll; /* Adicione overflow-y: scroll para sempre mostrar a barra de rolagem */
    scrollbar-width: none; /* Oculta a barra de rolagem padrão do navegador */
}

.imgIcon {
        @apply bg-cover 
        bg-center flex mt-8 md:ml-10
        2xl:w-[1.5vw] 2xl:h-[4vh] xl:w-[2vw] xl:h-[4vh] lg:w-[3vw] lg:h-[4vh] md:w-[3.5vw] md:h-[4vh];
    }


.corDiv{
    @apply flex ml-10 h-20 w-[13vw] 2xl:w-[13vw] xl:w-[15vw] lg:w-[15vw] md:w-[20vw]
    border-transparent
    border-b-roxo    
    border-b-4
    items-center focus-within:border-roxo 
    focus-within:border-4;
    
 }

.primeiraDiv{  
    @apply flex w-full 2xl:h-[8vh]
    border-transparent 
    border-b-4
    justify-center
    focus-within:border-4;
}

.imgEquipe{
    @apply justify-start;
}

.imgDePerfil {
        @apply rounded-full bg-cover bg-center flex 
        flex-col mt-5 mr-5
       2xl:w-[2vw] 2xl:h-[4vh] xl:w-[3vw] xl:h-[4vh] lg:w-[4vw] lg:h-[4vh] md:w-[6vw] md:h-[4vh];
    }


    @media(min-width: 2560px){
        .divGeral{
            @apply w-[25vw];
        }
        .imgIcon {
            @apply w-[1vw]
        }
        .div-lista{
            @apply 2xl:w-[53vw];
        }
        .adiciona-membro{
            @apply 2xl:ml-[3.5vw];
        }
        .botao{
            @apply 2xl:w-[52%] gap-8 2xl:mt-[2vh];
        }
    }
    
</style>