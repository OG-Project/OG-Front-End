<template>
      <fundoPopUp :largura="larguraPopUp()" altura="95vh">
      <div class="divGeral mb-[65vh]" >
          <div class="primeiraDiv">
            <img class="imagemEquipe" v-if="equipeMembros.foto" :src="'data:' + equipeMembros.foto.tipo + ';base64,' + equipeMembros.foto.dados" >
            <equipe class="imagemEquipe" v-else></equipe>
             <h1 class="equipeNome xl:mt-5 lg:mt-3 md:mt-3 text-4xl 2xl:mr-5 truncate ">{{ equipeMembros.nome}}</h1>
          </div>
          <div class="div-membros flex flex-col overflow-y-auto scrollbar-thin" >
             <div class="divEquipe flex justify-center w-full" v-for="membro in listaMembros" :key="membro.id">
                    <sair v-if="membro.id != usuarioLogado && verificaCriador(membro)"  class="imgIcon"  @click="removerMembro(membro)"></sair>
                    <div v-else class="imgIcon"></div>
                    <div class="corDiv">
                        <img class="imgDePerfil" @click="router.push(`/perfil/${membro.id}`)" :src="'data:' + membro.foto.tipo + ';base64,' + membro.foto.dados" alt="">
                        <h1 class="flex mt-5 text-xl md:text-lg truncate">{{ membro.username }}</h1>
                    </div>
                    <SelectPadrao v-if="screenWidth >= 620" class="styleSelectPadraoBranco md:ml-5 2xl:ml-5" styleSelect="select-branco" fonteTamanho="1rem" :listaSelect="opcoesSelect" ></SelectPadrao>
                    <SelectPadrao v-else class="styleSelectPadraoBranco " styleSelect="select-branco" fonteTamanho="1rem" :listaSelect="opcoesSelect" ></SelectPadrao>
             </div>
            </div>
        </div>  
        <div class="adiciona-membro">
            <Input  styleInput="input-transparente-claro" :largura="larguraInputConvidado()"
                icon="../src/imagem-vetores/adicionarPessoa.svg" conteudoInput="Adicionar Membro"
                v-model="usuarioConvidado" :modelValue="usuarioConvidado"
                    @updateModelValue="(e) => {
                        usuarioConvidado = e
                    }"></Input>
            <div class="flex mt-[1vh] ml-5">
                <Botao v-if="screenWidth >= 620" class="flex justify-center " preset="PadraoVazado" tamanhoDaBorda="2px" tamanhoPadrao="pequeno"
                    texto="convidar" tamanhoDaFonte="0.9rem" :funcaoClick="adicionarMembro"></Botao>
                <Botao v-else class="flex justify-center " preset="PadraoVazado" tamanhoDaBorda="2px" tamanhoPadrao="mobilepequeno"
                texto="convidar" tamanhoDaFonte="0.9rem" :funcaoClick="adicionarMembro"></Botao>
            </div>
        </div>
        <div class="div-lista absolute bottom-[15vh] xl:mt-[20vh] lg:mt-[4vh] md:mt-[4vh] ">
            <ListaConvidados :margin-left="marginLeftConvidado()" :margin-right="marginRightConvidado()"
                texto="Convites" mostrar-select="true" class="listaConvidados" altura="40vh"
                 :listaConvidados="membrosConvidados" @foi-clicado="removeListaMembrosConvidados">
            </ListaConvidados>
        </div>
        <div class="botao absolute bottom-0 right-0 mb-4 mr-4">
            <div>
                <div>
                    <div v-if="screenWidth >= 620">
                        <Botao preset="PadraoRoxo" tamanhoPadrao="medio" texto="Confirmar" tamanhoDaFonte="0.9rem" :funcaoClick="confirmarConvites"></Botao>
                    </div>
                    <div v-else>
                        <Botao preset="PadraoRoxo" tamanhoPadrao="mobilegrande" texto="Confirmar" tamanhoDaFonte="0.9rem" :funcaoClick="confirmarConvites"></Botao>
                    </div>
                </div>
            </div>
        </div>

    </fundoPopUp>
    <div v-if="mensagem != ''"  class="alert">
        <alertTela   :mensagem="mensagem" :cor="mensagemCor" :key="mensagem" @acabou-o-tempo="limparMensagemErro"></alertTela>
    </div>
</template>

<script setup>
import fundoPopUp from './fundoPopUp.vue';
import SelectPadrao from './selectPadrao.vue'
import Input from './Input.vue';
import ListaConvidados from './ListaConvidados.vue';
import Botao from './Botao.vue';
import { conexaoBD } from "../stores/conexaoBD.js";
import { ref, onMounted } from 'vue';
import VueCookies from "vue-cookies";
import {webSocketStore} from "../stores/webSocket.js";
import alertTela from './alertTela.vue';
import sair from '../imagem-vetores/Sair.vue';
import equipe from '../imagem-vetores/equipe.vue';

onMounted(exibirMembrosNaLista)

const equipeSelecionada = VueCookies.get('equipeSelecionada')
const usuarioLogado = VueCookies.get('IdUsuarioCookie')
const banco = conexaoBD();

let listaMembros = ref([]);
let usuariosRemover = ref([]);
let membrosEquipe = ref([]);
let membrosConvidados = ref([]);
let usuarioConvidado = ref('');
let membroParaConvidar = ref([]);
const screenWidth = window.innerWidth;
const opcoesSelect = ['Edit', 'View'];
let usuarios = banco.procurar('/usuario');

let equipeMembros = ref({
    nome: '',
    descricao: ''
});

function limparMensagemErro() {
    mensagem.value = "";
}
    let mensagem = ref("");
    let mensagemCor = ref("");
    

listaUsuarios();

async function filtrarEquipe() {
    console.log(await (banco.buscarUm(equipeSelecionada, "/equipe")))
    equipeMembros.value = await (banco.buscarUm(equipeSelecionada, "/equipe"))
}

filtrarEquipe();

function verificaCriador(membro){
    let retorno = true;
    membro.equipes.forEach((equipeUsuario) =>{
        if(equipeUsuario.equipe.id == equipeSelecionada){
            if(equipeUsuario.criador == true){
                  console.error('Você não pode remover o criador'); 
                  retorno = false;
            }
        } 
    })
    return retorno;
    
}

async function removerMembro(membro) {

    if (membro && membro.id) {
        console.log(verificaCriador(membro))
        if(verificaCriador(membro) == true){
        if (membro.id === usuarioLogado.id) {
            console.error('Você não pode remover a si mesmo da equipe.');
            return; // Impede a remoção
        }else if(verificaCriador(membro) == true){
        // Adicione o usuário à lista de usuários a serem removidos
        usuariosRemover.value.push(membro);
        listaMembros.value = listaMembros.value.filter(m => m.id !== membro.id);
        }
    }
    } 
    else {
        console.error('O membro ou sua propriedade id não estão definidos.');
    }
    
}

async function removeListaMembrosConvidados(membroConvidado){
    const index = membrosConvidados.value.findIndex(convidado => convidado == membroConvidado);
    console.log(index)
      // Remova o convidado da lista de convidados se encontrado
      if (index != -1) {
        membrosConvidados.value.splice(index, 1);
      }
}

async function buscarMembrosEquipe() {
    console.log(await (banco.buscarMembrosEquipe(equipeSelecionada, "/usuario/buscarMembros")))
    return await (banco.buscarMembrosEquipe(equipeSelecionada, "/usuario/buscarMembros"));

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


function marginLeftConvidado() {
    if (screenWidth <= 768) {
        return '6vw';
    } else if (screenWidth > 768 && screenWidth <= 1024) {
        return '0vw';
    } else if (screenWidth > 1024 && screenWidth < 1920) {
        return '0vw';
    } else if (screenWidth > 1920 && screenWidth < 2560) {
        return '6vw'
    } else if (screenWidth >= 2560) {
        return '3vw';
    }
}

function marginRightConvidado() {
    if (screenWidth <= 768) {
        return '6vw';
    } else if (screenWidth > 768 && screenWidth <= 1024) {
        return '4vw';
    } else if (screenWidth > 1024 && screenWidth < 1920) {
        return '4vw';
    } else if (screenWidth > 1920 && screenWidth < 2560) {
        return '6vw';
    } else if (screenWidth == 1920) {
        return '2vw';
    }
    else if (screenWidth >= 2560) {
        return '4.5vw';
    }
}

function larguraPopUp(){
    if(screenWidth <= 620){
          return '90vw';
    }else{
        return '';
    }
}

function larguraInputConvidado(){
    if(screenWidth <= 620){
          return '40'
    }
    if (screenWidth <= 768) {
        return '24';
    }if (screenWidth > 768 && screenWidth <= 1024) {
        return '22';
    }if (screenWidth > 1024 && screenWidth < 1920) {
        return '20';
    }if (screenWidth >= 1920 && screenWidth < 2560) {
        return '16';
    } else if (screenWidth >= 2560) {
        return '12';
    }
}

async function listaUsuarios() {
    let convites = await banco.buscarUm(equipeSelecionada, "/notificacao/conviteEquipe");
    convites.forEach((convite) => {
        console.log(convite)
        for(const usuarioAceito of convite.conviteParaEquipe.usuarioAceito){
            if(usuarioAceito.aceito==false){
                membrosConvidados.value.push(usuarioAceito.usuario);
            }
        }

    })
}

async function adicionarMembro() {
    limparMensagemErro();
    const membroNaEquipe = listaMembros.value.find(membro => membro.username === usuarioConvidado.value || membro.email === usuarioConvidado.value);

    if (membroNaEquipe) {
        mensagem.value = ""
        mensagemCor.value = ""
        mensagem.value = "membro já esta na equipe.";
        mensagemCor.value = "#CD0000"
        return;
    }
    let lista = await banco.procurar('/usuario');
    const membroConvidado = lista.find(membro => membro.username === usuarioConvidado.value || membro.email === usuarioConvidado.value);
    // Verifica se o usuário já foi convidado
    const usuarioJaConvidado = membrosConvidados.value.some(membro => membro.username === usuarioConvidado.value || membro.email === usuarioConvidado.value);
    
    if (usuarioJaConvidado) {
        mensagem.value = ""
        mensagemCor.value = ""
        mensagem.value = "Você já convidou essa pessoa.";
        mensagemCor.value = "#CD0000"
    } else {
        membrosConvidados.value.push(membroConvidado);
        membroParaConvidar.value.push(membroConvidado);
        await listaUsuarios();
    }
}

async function enviaParaWebSocket(equipe,membrosConvidados) {
    let equipeAux = {
        id: equipe.id,
        nome: equipe.nome,
        descricao: equipe.descricao,
        membros: membrosConvidados
    }
    let teste = {
        equipes: [{ equipe: equipeAux }],
        notificao: {
            mensagem: "Te Convidou para a Equipe",
            conviteParaEquipe: {
                equipe: equipe
            }
        }

    }
    const webSocket = webSocketStore();
    webSocket.url = "ws://localhost:8082/og/webSocket/usuario/" +usuarioLogado
    await webSocket.enviaMensagemWebSocket(JSON.stringify(teste))
}

async function confirmarConvites() {

    for (const membro of usuariosRemover.value) {
        await banco.removerUsuarioDaEquipe(equipeSelecionada, membro.id, "/usuario/removerUsuarioEquipe");
    }
    // Limpe a lista de usuários a serem removidos após a remoção
    usuariosRemover.value = [];


    const ids = membrosConvidados.value.map(m => {
        return Number(m.id);
    })

    // Verifica se o membro a ser convidado foi removido anteriormente
    const membroRemovido = listaMembros.value.find(membro => membro.username === usuarioConvidado.value || membro.email === usuarioConvidado.value);

    if (membroRemovido) {
        if (membrosConvidados.value.some((membro) => membro.username == usuarioConvidado.value || membro.email == usuarioConvidado.value)) {
            mensagem.value = ""
            mensagemCor.value = ""
            mensagem.value = "membro já esta na equipe.";
            mensagemCor.value = "#CD0000"
        } else {
            // Se o membro foi removido, adicione-o novamente à equipe
            banco.adicionarUsuarios([membroRemovido.id], equipeSelecionada, "/usuario/add");
            mensagem.value = ""
            mensagemCor.value = ""
            mensagem.value = "Membro reconvidado com sucesso.";
            mensagemCor.value = "#29CD00"
        }

    } else {
        // Se o membro não foi removido anteriormente, convide-o normalmente
    }
    enviaParaWebSocket(equipeMembros.value, membroParaConvidar.value);

    window.location.reload();
}

</script>

<style scoped>
.styleSelectPadraoBranco{
        @apply border-4 mt-[1vh]
        flex justify-center
        border-transparent
        border-b-brancoNeve
        border-b-2
        w-[10]
        items-center  focus-within:border-white
        focus-within:border-4 focus-within:rounded-md truncate;
        
    }


.imagemEquipe {
    @apply 2xl:mr-5 xl:mt-3 xl:mr-2 lg:mt-1 lg:mr-3 md:mt-1 md:mr-4 2xl:h-[60px] 2xl:w-[60px] xl:h-[60px] xl:w-[60px] lg:w-[50px] lg:h-[50px] md:w-[50px] md:h-[50px] rounded-full;
}

.div-lista {
    @apply 2xl:w-[64vw] xl:w-[82vw] lg:w-[92vw] md:w-[108vw] p-2 2xl:ml-4 xl:ml-[5%] lg:ml-[5%] md:ml-[7%];

}

.botao {
    @apply flex justify-end w-[60%] p-10 2xl:mt-[50vh] xl:mt-[8vh] 2xl:ml-[15vw] xl:ml-[8vw] lg:ml-[9vw] md:ml-[11vw] lg:mt-[8vh] md:mt-[8vh];
}

.adiciona-membro {
    @apply flex justify-center absolute bottom-[58vh] 2xl:ml-[3vw] xl:ml-[4vw] lg:ml-[5vw] md:ml-[7vw];
}

.divGeral {
    @apply w-[30vw] 2xl:w-[30vw] xl:w-[40vw] lg:w-[45vw] md:w-[55vw];
}

.listaConvidados {
    @apply w-full;
}

.alert{
  @apply absolute flex items-start justify-start 2xl:mt-[-20vh] 2xl:mr-[3vw] xl:mr-[1vw] xl:mt-[-20vh]
    lg:mr-[4vw] lg:mt-[-15vh] md:mr-[3vw] md:mt-[-15vh]  z-[9999];
}

.div-membros::-webkit-scrollbar {
    display: none;
    /* Oculta a barra de rolagem no WebKit (Chrome, Safari, etc.) */
}

.div-membros {
    @apply w-[90%] h-[20vh];
    overflow-y: scroll;
    /* Adicione overflow-y: scroll para sempre mostrar a barra de rolagem */
    scrollbar-width: none;
    /* Oculta a barra de rolagem padrão do navegador */
}

.imgIcon {
    @apply bg-cover bg-center flex mt-8 md:ml-10 2xl:w-[1.5vw] 2xl:h-[4vh] xl:w-[2vw] xl:h-[4vh] lg:w-[3vw] lg:h-[4vh] md:w-[3.5vw] md:h-[4vh];
}


.corDiv {
    @apply flex ml-10 h-20 w-[13vw] 2xl:w-[13vw] xl:w-[20vw] lg:w-[25vw] md:w-[30vw] border-transparent
     border-b-[var(--roxo)] border-b-2 items-center focus-within:border-[var(--roxo)] focus-within:border-4;

}

.primeiraDiv {
    @apply flex w-full 2xl:h-[8vh] border-transparent border-b-4 justify-center focus-within:border-4;
}

.imgEquipe {
    @apply justify-start;
}

.imgDePerfil {
    @apply rounded-full bg-cover bg-center flex flex-col mt-5 mr-5 2xl:w-[55px] 2xl:h-[55px] xl:w-[50px] xl:h-[50px] lg:w-[45px] lg:h-[45px] md:w-[40px] md:h-[40px];
}


    @media(min-width: 2560px) {
    .divGeral {
        @apply w-[25vw];
    }

    .imgIcon {
        @apply w-[1vw]
    }

    .div-lista {
        @apply 2xl:w-[53vw];
        
     }
     .botaoIcone {
        @apply w-[3vw] h-[4vh]
      }
    }
    
     @media (min-width: 320px) and (max-width: 375px) {
        .divEquipe{
            @apply flex justify-center w-[100%]
         }
         .adiciona-membro{
             @apply flex justify-end ml-[-5vw];
         }
         .divGeral{
             @apply w-[65vw];
         }
         .corDiv{
             @apply flex ml-5 mr-5 h-20 w-[100vw] 
             border-transparent
             border-b-roxo    
             border-b-2
             items-center focus-within:border-roxo 
             focus-within:border-4;
             
         }
         .div-membros{
             @apply w-[100%];
         }
         .equipeNome{
              @apply flex text-2xl mt-6;
         }
         .styleSelectPadraoBranco{
             @apply border-4 mt-[1.5vh] ml-3 
             flex justify-center
             border-transparent
             border-b-brancoNeve
             border-b-2
             w-max
             items-center  focus-within:border-white
             focus-within:border-4 focus-within:rounded-md truncate;
         }
         .imgDePerfil{
             @apply w-[35px] h-[35px]
         }
         .imagemEquipe{
             @apply w-[40px] h-[40px] mt-5 mr-3;
         }
         .imgIcon{
             @apply w-[20px] h-[20px]  bg-center flex mt-8;
         }
         .div-lista{
             @apply w-[200vw] p-2 ml-[-12vw] ;
             
         }
         .botao{
             @apply flex justify-start mr-[41vw]
             p-[10vw] mt-[50vh] ;
         }
         .alert{
            @apply mr-[5vw] mt-[-15vh] ;
          }
    }

    @media(min-width: 425px) and (max-width: 620px){
        .divEquipe{
            @apply flex justify-center w-[100%]
         }
         .adiciona-membro{
             @apply flex justify-end ml-[-5vw];
         }
         .divGeral{
             @apply w-[65vw];
         }
         .corDiv{
             @apply flex ml-5 mr-5 h-20 w-[60vw] 
             border-transparent
             border-b-roxo    
             border-b-2
             items-center focus-within:border-roxo 
             focus-within:border-4;
             
         }
         .div-membros{
             @apply w-[100%];
         }
         .equipeNome{
              @apply flex text-3xl mt-5;
         }
         .styleSelectPadraoBranco{
             @apply border-4 mt-[1.5vh] ml-3 
             flex justify-center
             border-transparent
             border-b-brancoNeve
             border-b-2
             w-max
             items-center  focus-within:border-white
             focus-within:border-4 focus-within:rounded-md truncate;
         }
         .imgDePerfil{
             @apply w-[30px] h-[30px]
         }
         .imagemEquipe{
             @apply w-[40px] h-[40px] mt-5 mr-3;
         }
         .imgIcon{
             @apply w-[20px] h-[20px]  bg-center flex mt-8;
         }
         .div-lista{
             @apply w-[200vw] p-2 ml-[-12vw] ;
             
         }
         .botao{
             @apply flex justify-start mr-[41vw]
             p-[10vw] mt-[50vh] ;
         }
         .alert{
            @apply mr-[5vw] mt-[-15vh] ;
          }
    }
</style>