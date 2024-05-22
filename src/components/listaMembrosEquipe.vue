<template>
      <fundoPopUp :largura="larguraPopUp()" :altura="tamanhoPopUp()">
      <div class="divGeral mb-[65vh]" >
          <div class="primeiraDiv">
            <img class="imagemEquipe" v-if="equipeMembros.foto" :src="'data:' + equipeMembros.foto.tipo + ';base64,' + equipeMembros.foto.dados" >
            <equipe class="imagemEquipe" v-else></equipe>
             <h1 class="equipeNome xl:mt-5 lg:mt-3 md:mt-3 text-4xl 2xl:mr-5 truncate ">{{ equipeMembros.nome}}</h1>
          </div>
          <div class="div-membros flex flex-col overflow-y-auto scrollbar-thin" >
             <div class="divEquipe flex justify-center w-full" v-for="membro in listaMembros" :key="membro.id">
                    <sair v-if="membro.id != usuarioLogado && verificaCriador(membro) && retornoPermissao "  class="imgIcon"  @click="removerMembro(membro)"></sair>
                    <div v-else class="imgIcon"></div>
                    <div class="corDiv">
                        <img class="imgDePerfil" @click="router.push(`/perfil/${membro.id}`)" :src="'data:' + membro.foto.tipo + ';base64,' + membro.foto.dados" alt="">
                        <h1 class="flex mt-5 text-xl md:text-lg truncate">{{ membro.username }}</h1>
                    </div>
                    <div v-if="verificaCriador(membro) && retornoPermissao && membro.id != usuarioLogado ">
                         <SelectPadrao v-if="screenWidth >= 620" class="styleSelectPadraoBranco md:ml-5 2xl:ml-5" styleSelect="select-branco" fonteTamanho="1rem" v-model="opcaoEscolhida"
                         :listaSelect="opcoesSelect(membro)" @change="editaSelect(opcaoEscolhida, membro)" ></SelectPadrao>
                         <SelectPadrao v-else class="styleSelectPadraoBrancoMobile mt-[3vh]" styleSelect="select-branco" fonteTamanho="1rem" v-model="opcaoEscolhida" 
                         :listaSelect="opcoesSelect(membro)" @change="editaSelect(opcaoEscolhida, membro)"></SelectPadrao>
                    </div>
                    <div v-else >
                        <SelectPadrao v-if="screenWidth >= 620" class="styleSelectPadraoBranco md:ml-5 2xl:ml-5" styleSelect="select-branco" fonteTamanho="1rem" v-model="opcaoEscolhida"
                            @change="editaSelect(opcaoEscolhida, membro)" :placeholderSelect="opcoesSelectPlaceholder(membro)"  :disable="true" ></SelectPadrao>
                            <SelectPadrao v-else class="styleSelectPadraoBrancoMobile" styleSelect="select-branco" fonteTamanho="1rem" v-model="opcaoEscolhida" 
                            :placeholderSelect="opcoesSelectPlaceholder(membro)" @change="editaSelect(opcaoEscolhida, membro)" :disable="true"></SelectPadrao>
                    </div> 
             </div>
            </div>
        </div>  
        <div class="adiciona-membro" v-if="retornoPermissao">
            <inputDePesquisa v-if="screenWidth >= 620" :class="{ 'computedClasses': someCondition }" 
                    styleInput="input-transparente-claro" :largura="larguraInputConvidado()" 
                    :place-holder-pesquisa="$t('criaEquipePopUp.adicionarMembro')"  :zera-input="zerarInput"
                     icon="../src/imagem-vetores/adicionarPessoa.svg" ref="inputPesquisa"
                      :lista-da-pesquisa=listaDeUsuariosParaBusca @item-selecionado="pegaValorSelecionadoPesquisa" >
                </inputDePesquisa>
                <inputDePesquisa v-else :class="{ 'computedClasses': someCondition }" 
                    styleInput="input-transparente-claro" :largura="larguraInputConvidadoMobile()" 
                    :place-holder-pesquisa="$t('criaEquipePopUp.adicionarMembro')"  :zera-input="zerarInput"
                     icon="../src/imagem-vetores/adicionarPessoa.svg" ref="inputPesquisa"
                      :lista-da-pesquisa=listaDeUsuariosParaBusca @item-selecionado="pegaValorSelecionadoPesquisa" >
                </inputDePesquisa>
            <div class="adicionaMembroMobile flex mt-[1vh] ml-5">
                <Botao v-if="screenWidth >= 620" class="flex justify-center " preset="PadraoVazado" tamanhoDaBorda="2px" tamanhoPadrao="pequeno"
                    :texto="$t('criaEquipePopUp.convidar')" tamanhoDaFonte="0.9rem" :funcaoClick="adicionarMembro"></Botao>
                <Botao v-else class="botaoMobile flex justify-start mt-16" preset="PadraoVazado" tamanhoDaBorda="2px" tamanhoPadrao="mobilegrande"
                texto="+" tamanhoDaFonte="0.9rem" :funcaoClick="adicionarMembro"></Botao>
            </div>
        </div>
        <div v-else class="adiciona-membro">
        </div>
        <div class="div-lista absolute bottom-[15vh] xl:mt-[20vh] lg:mt-[4vh] md:mt-[4vh] ">
            <ListaConvidados :margin-left="marginLeftConvidado()" :margin-right="marginRightConvidado()"
                :texto="$t('criaEquipePopUp.convites')" mostrar-select="true" @opcaoSelecionada="valorSelect" class="listaConvidados" altura="40vh"
                 :listaConvidados="membrosConvidados" @foi-clicado="removeListaMembrosConvidados">
            </ListaConvidados>
        </div>
        <div class="botao absolute bottom-0 right-0 2xl:mb-4 xl:mb-4 lg:mb-4 md:mb-4 mobile:mb-14 miniMobile:mb-16 mr-4">
            <div >
                <div>
                    <div v-if="screenWidth >= 621">
                        <Botao preset="PadraoRoxo" tamanhoPadrao="medio" :texto="$t('editarEquipePopUp.confirmar') " tamanhoDaFonte="0.9rem" :funcaoClick="confirmarConvites"></Botao>
                    </div>
                    <div v-else>
                        <Botao preset="PadraoRoxo" tamanhoPadrao="mobilegrande" :texto="$t('editarEquipePopUp.confirmar') " tamanhoDaFonte="0.9rem" :funcaoClick="confirmarConvites"></Botao>
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
import sair from '../imagemVetores/Sair.vue';
import equipe from '../imagemVetores/equipe.vue';
import { useI18n } from 'vue-i18n';

import inputDePesquisa from './inputDePesquisa.vue';

const { t } = useI18n()
let listaDeUsuariosParaBusca = ref([]);
let zerarInput = ref(false)

import { criaNotificacao } from '../stores/criaNotificacao';
const criaNotificacaoStore = criaNotificacao();


onMounted (() =>{
    exibirMembrosNaLista();
    verificaMembroPermissao();
    pesquisaBancoUserName()
}) 

async function pesquisaBancoUserName() {
    let listaAux = (await banco.procurar('/usuario'))
    listaAux.forEach(usuarioAtual => {
        listaDeUsuariosParaBusca.value.push(usuarioAtual.username);
    });
    return listaDeUsuariosParaBusca;
}

async function pegaValorSelecionadoPesquisa(valorPesquisa) {
   usuarioConvidado.value = valorPesquisa
}

function tamanhoPopUp() {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 620) {
        return '100vh'
    }
    else {
        return '95vh'
    }
}

const equipeSelecionada = VueCookies.get('equipeSelecionada')
const usuarioLogado = VueCookies.get('IdUsuarioCookie')
const banco = conexaoBD();

let listaMembros = ref([]);
let usuariosRemover = ref([]);
let membrosEquipe = ref([]);
let valorSelectSelecionado = ref(t('selectComponent.view'))
let valorSelectEdita = ref(t('selectComponent.view'))
let membrosConvidados = ref([]);
let usuarioConvidado = ref('');
let membroParaConvidar = ref([]);
let opcaoEscolhida = ref("");
let listaMembrosEditados = ref ([]);
let retornoPermissao = ref(false);
const screenWidth = window.innerWidth;
let select = [];
let selectDisable = '';
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

function opcoesSelect(membro){
    membro.equipes.forEach((equipeUsuario)=>{
        if(equipeUsuario.equipe.id == equipeSelecionada){
            if(equipeUsuario.permissao == 'VER'){
                select = [t('selectComponent.view'), t('selectComponent.edit')]  
            }else if(equipeUsuario.permissao == 'VER','EDITAR',"CRIAR","PATCH"){
                select = [ t('selectComponent.edit'),t('selectComponent.view')]
            }
        }
    })
    return select;
}

function opcoesSelectPlaceholder(membro){
    membro.equipes.forEach((equipeUsuario)=>{
        if(equipeUsuario.equipe.id == equipeSelecionada){
            if(equipeUsuario.permissao == 'VER'){
                selectDisable = t('selectComponent.view');  
            }else if(equipeUsuario.permissao == 'VER','EDITAR',"CRIAR","PATCH"){
                selectDisable = t('selectComponent.edit');
            }
        }
    })
    return selectDisable;
}

function editaSelect(valor, membro) {
    console.log(membro)
    console.log(valor)
    valorSelectEdita.value = valor
    mudaPermissaoMembroEquipe(membro);
}

function mudaPermissaoMembroEquipe(usuario) {
    listaMembros.value.some((membro) => {
        if (membro.username === usuario.username) {
            if (valorSelectEdita.value == t('selectComponent.view')) {
                membro.permissao = 2
            } else {
                membro.permissao = 1
            }
            let membroPermissao = {
                        "usuario": membro,
                        "permissao": membro.permissao,
        }
        listaMembrosEditados.value.push(membroPermissao);
        }
        
    })
}

async function filtrarEquipe() {
    console.log(await (banco.buscarUm(equipeSelecionada, "/equipe")))
    equipeMembros.value = await (banco.buscarUm(equipeSelecionada, "/equipe"))
}

function valorSelect(valor, convidado) {
    valorSelectSelecionado.value = valor
    usuarioConvidado.value = convidado.username
    mudaPermissaoUsuario(convidado);
}

function mudaPermissaoUsuario(usuario) {
    membrosConvidados.value.some((membro) => {
        if (membro.username === usuario.username) {
            if (valorSelectSelecionado.value == t('selectComponent.view')) {
                membro.permissao = 2
            } else {
                membro.permissao = 1
            }
        }
    })
}

filtrarEquipe();

function verificaCriador(membro){
    let retorno = true;
    membro.equipes.forEach((equipeUsuario) =>{
        if(equipeUsuario.equipe.id == equipeSelecionada){
            if(equipeUsuario.criador == true){
                  retorno = false;
            }
        } 
    })
    return retorno;
    
}

async function verificaMembroPermissao(){
     
     const usuario = await banco.buscarUm(usuarioLogado,"/usuario")
     console.log(usuario.equipes)
     usuario.equipes.forEach((equipeUsuario) =>{
        if(equipeUsuario.equipe.id == equipeSelecionada){
            console.log(usuario);
            if(equipeUsuario.criador){
                retornoPermissao.value = true;
                  return;
            }
            else if(equipeUsuario.permissao.length > 1){
                  retornoPermissao.value = true;
                  return;
            }
        } 
    })
    
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
          return '100vw';
    }else{
        return '';
    }
}

function larguraInputConvidado(){
    if(screenWidth <= 620){
          return '40'
    }
    if(screenWidth <= 680){
        return '45'
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

function larguraInputConvidadoMobile(){
    if(screenWidth <= 620){
          return '70'
    }
    if(screenWidth <= 425){
        return '60'
    }
    if(screenWidth <= 375){
        return '35'
    }
    else if(screenWidth <= 320){
        return '35'
    }
    
}

async function listaUsuarios() {
    let convites = await banco.buscarUm(equipeSelecionada, "/notificacao/conviteEquipe");
    convites.forEach((convite) => {
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
    zerarInput.value = true
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
                equipe: equipe,
                permissoes: funcaoPermissao(membrosConvidados)
            }
            
        }

    }
    console.log("teste")
    criaNotificacaoStore.mandarNotificacao(teste);
}

function funcaoPermissao(convidados){
    let permissoes = []
    convidados.forEach((convidado) =>{
        if(convidado.permissao == 1){
            permissoes.push({usuarioId: convidado.id, permissao: 1})
        }else{
            permissoes.push({usuarioId: convidado.id, permissao: 2})
        }
    })
    return permissoes;
}

async function confirmarConvites() {

    for (const membro of usuariosRemover.value) {
        await banco.removerUsuarioDaEquipe(equipeSelecionada, membro.id, "/usuario/removerUsuarioEquipe");
    }
    // Limpe a lista de usuários a serem removidos após a remoção
    usuariosRemover.value = [];

    for (const membroEquipeEditado of listaMembrosEditados.value){
        console.log(listaMembrosEditados.value)
        await banco.removerUsuarioDaEquipe(equipeSelecionada, membroEquipeEditado.usuario.id, "/usuario/removerUsuarioEquipe");
        banco.adicionarUsuarios(membroEquipeEditado.usuario.id, equipeSelecionada, membroEquipeEditado.permissao, "/usuario/add");
    }


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
    window.location.reload()
}

</script>

<style scoped>
.styleSelectPadraoBranco{
        @apply border-4 2xl:mt-[4vh] xl:mt-[3.5vh] lg:mt-[2vh] md:mt-[2.5vh]
        flex justify-center
        border-transparent
        border-b-brancoNeve
        border-b-2
        w-[10]
        items-center  focus-within:border-white
        focus-within:border-4 focus-within:rounded-md truncate;
        
    }

    .styleSelectPadraoBrancoMobile{
        @apply border-4 
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
    @apply bg-cover bg-center flex 2xl:mt-8 xl:mt-8 lg:mt-6 md:mt-[2.2vh] sm:mt-[5vh] md:ml-10 2xl:w-[1.5vw] 2xl:h-[4vh]
     xl:w-[2vw] xl:h-[4vh] lg:w-[3vw] lg:h-[4vh] md:w-[3.5vw] md:h-[4vh];
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

@media(min-width: 621px) and (max-width: 767px){
      
            .divEquipe{
                @apply flex justify-start w-[80vw]
            }
            .adiciona-membro{
                @apply flex justify-center absolute bottom-[58vh] ml-[10vw]  ;
            }
            .divGeral{
                @apply w-[85vw];
            }
            .corDiv{
                @apply flex ml-1 mr-5 h-20 w-[40vw] 
                border-transparent
                border-b-roxo    
                border-b-2
                items-center focus-within:border-roxo 
                focus-within:border-4;
                
            }
            .styleSelectPadraoBranco{
                @apply border-4 mt-[2vh]
                flex justify-center
                border-transparent
                border-b-brancoNeve
                border-b-2
                w-[10]
                items-center  focus-within:border-white
                focus-within:border-4 focus-within:rounded-md truncate;
                
            }
            .div-membros{
                @apply w-[90%] h-[20vh] mt-10 ml-[10vw];
            }
            .equipeNome{
                @apply flex text-4xl 2xl:mr-5 truncate mt-5;
            }
           
            .imgDePerfil{
                @apply w-[30px] h-[30px]
            }
            .imagemEquipe{
                @apply w-[40px] h-[40px] mt-2 mr-3;
            }
            .imgIcon{
                @apply flex w-[30px] h-[30px] mt-8 mr-10;
            }
            .div-lista {
                @apply w-[180vw] p-2 ml-5;
            }
            .botao {
                @apply flex justify-end w-[60%] p-10 ml-[11vw] ;
            }
            .alert{
                @apply mr-[5vw] mt-[-15vh] ;
    
            }
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

    @media(max-width: 320px){
        .botaoMobile{
            @apply ml-[-86vw]
        }
        .divEquipe{
            @apply flex justify-start w-[80vw]
         }
         .adiciona-membro{
             @apply flex justify-end ml-[-5vw];
         }
         .divGeral{
             @apply w-[65vw];
         }
         .corDiv{
             @apply flex ml-1 h-20 w-[60vw] 
             border-transparent
             border-b-roxo    
             border-b-2
             items-center focus-within:border-roxo 
             focus-within:border-4;
             
         }
         .div-membros{
             @apply w-[100vw] ml-[-5vw];
         }
         .equipeNome{
              @apply flex text-2xl mt-6;
         }
         .styleSelectPadraoBrancoMobile{
             @apply border-4 mt-[3vh] w-[15vw] ml-5
             flex justify-center
             border-transparent
             border-b-brancoNeve
             border-b-2
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
             @apply w-[30px] h-[40px] bg-center flex mt-8 mr-[5vw];
         }
         .div-lista{
             @apply w-[212vw] p-2 ml-[-12vw] ;
             
         }
         .botao{
            @apply flex justify-end mb-[6vh] mr-[-4.4vw] ;
        }
         .alert{
            @apply mr-[5vw] mt-[-15vh] ;
          }
    }

    

    @media(min-width: 321px) and (max-width: 344px){
        .botaoMobile{
            @apply ml-[-86vw]
        }
        .divEquipe{
            @apply flex justify-start w-[80vw]
         }
         .adiciona-membro{
             @apply flex justify-end ml-[-8vw] mb-[-1.5vh];
         }
         .divGeral{
             @apply w-[65vw];
         }
         .corDiv{
             @apply flex ml-1 h-20 w-[80vw] 
             border-transparent
             border-b-roxo    
             border-b-2
             items-center focus-within:border-roxo 
             focus-within:border-4;
             
         }
         .div-membros{
             @apply w-[100vw] ml-[-5vw];
         }
         .equipeNome{
              @apply flex text-2xl mt-6;
         }
         .styleSelectPadraoBrancoMobile{
             @apply border-4 mt-[3vh] w-[15vw] ml-5
             flex justify-center
             border-transparent
             border-b-brancoNeve
             border-b-2
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
             @apply flex w-[30px] h-[40px] bg-center  mt-8 mr-[5vw];
         }
         .div-lista{
             @apply w-[200vw] p-2 ml-[-12vw] ;
             
         }
         .botao{
            @apply flex justify-end mb-[5vh] mr-[-1.5vw] ;
        }
         .alert{
            @apply mr-[5vw] mt-[-15vh] ;
          }
    }

    @media(min-width: 345px) and (max-width: 375px){
        .botaoMobile{
            @apply ml-[-85vw]
        }
        .divEquipe{
            @apply flex justify-start w-[80vw]
         }
         .adiciona-membro{
             @apply flex justify-end ml-[-5vw] mb-[-1.5vh];
         }
         .adicionaMembroMobile{
            @apply flex ml-[5vw] mt-[1vh]
         }
         .divGeral{
             @apply w-[65vw];
         }
         .corDiv{
             @apply flex ml-1 h-20 w-[60vw] 
             border-transparent
             border-b-roxo    
             border-b-2
             items-center focus-within:border-roxo 
             focus-within:border-4;
             
         }
         .div-membros{
             @apply w-[100vw] ml-[-6vw];
         }
         .equipeNome{
              @apply flex text-2xl mt-6;
         }
         .styleSelectPadraoBrancoMobile{
             @apply border-4 mt-[3vh] w-[20vw] ml-5
             flex justify-center
             border-transparent
             border-b-brancoNeve
             border-b-2
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
             @apply flex w-[30px] h-[40px] bg-center  mt-8 mr-[5vw] ;
         }
         .div-lista{
             @apply w-[200vw] p-2 ml-[-12vw] ;
             
         }
         .botao{
            @apply flex justify-end mb-[5vh] mr-[-1vw] ;
        }
         .alert{
            @apply mr-[5vw] mt-[-15vh] ;
          }
    }
    
     @media (min-width: 376px) and (max-width: 424px) {
        .botaoMobile{
            @apply ml-[-85vw]
        }
        .divEquipe{
            @apply flex justify-start w-[80vw]
         }
         .adiciona-membro{
             @apply flex justify-end ml-[-5vw] mb-[-1.5vh];
         }
         .adicionaMembroMobile{
            @apply flex mt-[-1vh]
         }
         .divGeral{
             @apply w-[65vw];
         }
         .corDiv{
             @apply flex ml-1 h-20 w-[60vw] 
             border-transparent
             border-b-roxo    
             border-b-2
             items-center focus-within:border-roxo 
             focus-within:border-4;
             
         }
         .div-membros{
             @apply w-[100vw] ml-[-5vw];
         }
         .equipeNome{
              @apply flex text-2xl mt-6;
         }
         .styleSelectPadraoBrancoMobile{
             @apply border-4 mt-[3vh] w-[20vw] ml-5
             flex justify-center
             border-transparent
             border-b-brancoNeve
             border-b-2
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
             @apply flex w-[30px] h-[40px]  bg-center  mt-8 mr-[5vw];
         }
         .div-lista{
             @apply w-[200vw] p-2 ml-[-12vw] ;
             
         }
         .botao{
             @apply flex justify-end mb-[5vh] mr-[0.5vw] ;
         }
         .alert{
            @apply mr-[5vw] mt-[-15vh] ;
          }
    }

        @media(min-width: 425px) and (max-width: 620px){
            .botaoMobile{
                @apply ml-[-83vw]
            }
            .divEquipe{
                @apply flex justify-start w-[80vw]
            }
            .adiciona-membro{
                @apply flex justify-end ml-[-5vw] mb-[-1.5vh];
            }
            .adicionaMembroMobile{
                @apply flex ml-[5vw] mt-[-0.5vh]
            }
            .divGeral{
                @apply w-[65vw];
            }
            .corDiv{
                @apply flex ml-1 mr-5 h-20 w-[40vw] 
                border-transparent
                border-b-roxo    
                border-b-2
                items-center focus-within:border-roxo 
                focus-within:border-4;
                
            }
            .div-membros{
                @apply w-[100vw] ml-[-5vw];
            }
            .equipeNome{
                @apply flex text-3xl mt-5;
            }
            .styleSelectPadraoBrancoMobile{
                @apply border-4 mt-[3vh] 
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
                @apply flex w-[40px] h-[40px] mt-8 mr-[5vw];
            }
            .div-lista{
                @apply w-[200vw] p-2 ml-[-12vw] ;
            }
            .botao{
                @apply flex justify-start mr-[41vw]
                p-[10vw] mt-[60vh] ;
            }
            .alert{
                @apply mr-[5vw] mt-[-15vh] ;
            }
        }
</style>