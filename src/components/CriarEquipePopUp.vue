<template>
    <fundoPopUp largura="" altura="95vh">
        <div class="divGeral" id="step-6">
            <div class=" grid-template flex w-full">
                <h1 class="titulo flex font-semibold xl:text-3xl md:text-2xl absolute sm:text-xs color-[#000]">Equipe
                </h1>
            </div>
            <div class=" grid-template  flex w-full mt-[1vh]  p-5">
                <div class="relative">
                    <input type="file" @change="handleFileUpload" class=" h-16 opacity-0 w-full absolute">
                    <div class="rounded-full bg-[#D7D7D7] flex items-center justify-center 2xl:w-[70px] 2xl:h-[70px] xl:w-[70px] xl:h-[70px] 
                    lg:w-[65px] lg:h-[65px] md:w-[60px] md:h-[60px]">
                        <img class="imagem" :class="{ 'imagem-arredondada': imagemSelecionadaUrl }" :src="imagemExibicao"
                            alt="Imagem Selecionada">
                    </div>
                </div>
                <Input :class="{ 'computedClasses': someCondition }" styleInput="input-transparente-claro"
                    :largura="larguraInput()" conteudoInput="Nome da Equipe" v-model="nome"
                    @updateModelValue="(e) => { nome = e }"></Input>
            </div>
            <div class=" grid-template  flex w-full">
                <Input :class="{ 'computedClasses': someCondition }" @updateModelValue="(e) => { usuarioConvidado = e }"
                    styleInput="input-transparente-claro" :largura="larguraInputConvidado()"
                    icon="../src/imagem-vetores/adicionarPessoa.svg" conteudoInput="Adicionar Membro"
                    v-model="usuarioConvidado"></Input>
            </div>
            <div v-if="screenWidth >= 620" class="grid-template flex w-full mt-[1vh]">
                <Botao class="flex justify-center " preset="PadraoVazado" tamanhoDaBorda="2px" tamanhoPadrao="pequeno"
                    texto="convidar" tamanhoDaFonte="0.9rem" :funcaoClick="adicionarMembro"></Botao>
            </div>
            <div v-else class="grid-template flex w-full mt-[1vh]">
                <Botao class="flex justify-center " preset="PadraoVazado" tamanhoDaBorda="2px"
                    tamanhoPadrao="mobilegrande" texto="convidar" tamanhoDaFonte="0.9rem"
                    :funcaoClick="adicionarMembro"></Botao>
            </div>
            <div class=" grid-template flex w-full mt-[1vh]">
                <textAreaPadrao
                    class="flex 2xl:w-[18vw] xl:h-[10vh] xl:w-[35vw] lg:w-[36vw] md:w-[38vw] md:h-[8vh] w-full  justify-center"
                    height="10vh" resize="none" tamanho-da-fonte="1rem" placeholder="Descrição(opcional)"
                    v-model="descricao"></textAreaPadrao>
            </div>
            <div class="convidados-div flex justify-center xl:mt-[2vh] lg:mt-[4vh] md:mt-[4vh]">
                <ListaConvidados @opcaoSelecionada="valorSelect" texto="Convites" mostrar-select="true"
                    class="listaConvidados" altura="40vh" :listaConvidados="listaUsuariosConvidados"
                    @foi-clicado="removeListaMembrosConvidados"></ListaConvidados>
            </div>
            <div id="step-7">
                <div v-if="screenWidth >= 620"
                    class="botao flex justify-end xl:mt-[8vh] md:mt-[10vh] xl:mx-[3vw] lg:mx-[5vw] md:mx-[5vw]">
                    <Botao preset="PadraoRoxo" tamanhoPadrao="medio" texto="Criar Equipe" tamanhoDaFonte="1rem"
                        :funcaoClick="cadastrarEquipe">
                    </Botao>
                </div>
                <div v-else class="mt-10 ml-2">
                    <Botao preset="PadraoRoxo" tamanhoPadrao="mobilegrande" texto="Criar Equipe" tamanhoDaFonte="1rem"
                        :funcaoClick="cadastrarEquipe">
                    </Botao>
                </div>
            </div>
        </div>
    </fundoPopUp>
    <div v-if="mensagem != ''" class="alert">
        <alertTela :mensagem="mensagem" :cor="mensagemCor" :key="mensagem" @acabou-o-tempo="limparMensagemErro">
        </alertTela>
    </div>

</template>
<script setup>
import { ref, computed, onMounted } from 'vue';
import fundoPopUp from './fundoPopUp.vue';
import Input from './Input.vue';
import textAreaPadrao from './textAreaPadrao.vue';
import Botao from './Botao.vue';
import ListaConvidados from './ListaConvidados.vue';
import { conexaoBD } from '../stores/conexaoBD';
import { criaEquipeStore } from "../stores/criarEquipe";
import VueCookies from "vue-cookies";
import alertTela from './alertTela.vue';



const banco = conexaoBD();
let nome = ref('');
let descricao = ref('');
let usuarioConvidado = ref('');
let usuarioLogado = VueCookies.get("IdUsuarioCookie")
let valorSelectSelecionado = ref("Edit")
let membrosEquipe = ref([]);
let listaUsuariosConvidados = ref([])
let conexaoWeb = webSocketStore()
const screenWidth = window.innerWidth;
let usuarios = banco.procurar("/usuario");
import { webSocketStore } from '../stores/webSocket.js'
import { apple } from 'color-convert/conversions';

function limparMensagemErro() {
    mensagem.value = "";
}
let mensagem = ref("");
let mensagemCor = ref("");

onMounted(() => {
    conexaoWeb.url = "ws://localhost:8082/og/webSocket/usuario/1";
    conexaoWeb.criaConexaoWebSocket()
})

async function removeListaMembrosConvidados(usuarioConvidado) {
    const index = listaUsuariosConvidados.value.findIndex(convidado => convidado == usuarioConvidado);
    // Remova o convidado da lista de convidados se encontrado
    if (index != -1) {
        listaUsuariosConvidados.value.splice(index, 1);
        membrosEquipe.value.splice(index,1);
    }
}

function marginRightConvidado() {
    if (screenWidth <= 620) {
        return '7vw'
    }
    if (screenWidth <= 768) {
        return '1vw';
    } else if (screenWidth > 768 && screenWidth <= 1024) {
        return '4vw';
    } else if (screenWidth > 1024 && screenWidth < 1920) {
        return '5vw';
    } else if (screenWidth > 1920 && screenWidth < 2560) {
        return '4vw';
    } else if (screenWidth == 1920) {
        return '2vw';
    }
    else if (screenWidth >= 2560) {
        return '1.5vw';
    }

}

function valorSelect(valor, convidado) {
    valorSelectSelecionado.value = valor
    usuarioConvidado.value = convidado.username
    mudaPermissaoUsuario(convidado);
}

function mudaPermissaoUsuario(usuario) {
    membrosEquipe.value.some((membro) => {
        if (membro.usuario.username === usuario.username) {
            if (valorSelectSelecionado.value == "View") {
                membro.permissao = 2
            } else {
                membro.permissao = 1
            }
        }
    })
}

const imagemSelecionada = ref(null);

// Função para lidar com o upload de arquivos
function handleFileUpload(event) {
    const file = event.target.files[0];

    // Extrair o nome do arquivo
    const fileName = file.name;

    // Extrair o tipo do arquivo
    const fileType = file.type;

    // Criar um blob do arquivo
    const fileBlob = new Blob([file]);

    // Agora você pode usar o fileName, fileType e fileBlob conforme necessário
    console.log('Nome do arquivo:', fileName);
    console.log('Tipo do arquivo:', fileType);
    console.log('Blob do arquivo:', fileBlob);
    // Armazena o arquivo na variável reativa
    imagemSelecionada.value = file;
}

// Computed property para retornar a URL da imagem selecionada
const imagemSelecionadaUrl = computed(() => {
    // Se não houver imagem selecionada, retorna null
    if (!imagemSelecionada.value) return null;

    // Cria uma URL temporária para a imagem selecionada
    return URL.createObjectURL(imagemSelecionada.value);
});

// URL da imagem padrão
const imagemPadraoUrl = '../src/imagem-vetores/imagemEquipePadrao.svg';

// Computed property para determinar qual URL de imagem exibir
const imagemExibicao = computed(() => {
    // Se houver uma imagem selecionada, retorna sua URL
    if (imagemSelecionadaUrl.value) {
        return imagemSelecionadaUrl.value;
    } else {
        // Caso contrário, retorna a URL da imagem padrão
        return imagemPadraoUrl;
    }
});


const equipeCadastrada = {
    nome: "",
    descricao: ""
}

console.log(usuarioLogado)
function larguraInput() {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 620) {
        return '45'
    }
    if (screenWidth <= 768) {
        return '25';
    } if (screenWidth > 768 && screenWidth <= 1024) {
        return '28';
    } if (screenWidth > 1024 && screenWidth <= 1440) {
        return '25';
    } if (screenWidth > 1440 && screenWidth < 1920) {
        return '10';
    }
    else {
        return '13';
    }
};

function larguraInputConvidado() {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 620) {
        return '70';
    }
    if (screenWidth <= 768) {
        return '34';
    } if (screenWidth > 768 && screenWidth <= 1024) {
        return '33';
    } if (screenWidth > 1024 && screenWidth <= 1440) {
        return '33';
    } if (screenWidth > 1440 && screenWidth < 1920) {
        return '10';
    } else {
        return '16';
    }
}


async function listaUsuarios() {
    let listaUsuarios = await usuarios;
    let usuarioCriador = await banco.buscarUm(usuarioLogado, "/usuario")
    listaUsuarios.forEach((usuario) => {

        if (usuarioConvidado.value === usuario.username || usuarioConvidado.value === usuario.email) {
            let teste = membrosEquipe.value.some((membro) => (membro.usuario.username == usuario.username))
            if (usuarioConvidado.value != usuarioCriador.username) {
                if (!membrosEquipe.value.some((membro) => membro.usuario.username == usuario.username || membro.usuario.email == usuario.email)) {
                    let usuarioPermissao = {
                        "usuario": usuario,
                        "permissao": 1
                    }
                    membrosEquipe.value.push(usuarioPermissao);
                    listaUsuariosConvidados.value.push(usuario)
                } else {
                    mensagem.value = ""
                    mensagemCor.value = ""
                    mensagem.value = "membro já pertence à equipe.";
                    mensagemCor.value = "#CD0000"
                }
            } else {
                mensagem.value = ""
                mensagemCor.value = ""
                mensagem.value = "Você já pertence à equipe.";
                mensagemCor.value = "#CD0000"
            }
        }
    });
}

async function adicionarMembro() {
    await listaUsuarios();
}

async function cadastrarEquipe() {
    const cria = criaEquipeStore();
    limparMensagemErro();
    if (!nome.value.trim()) {
        mensagem.value = ""
        mensagemCor.value = ""
        mensagem.value = "É obrigatório o nome da equipe";
        mensagemCor.value = "#CD0000";
        return;
    }

    equipeCadastrada.nome = nome.value;
    equipeCadastrada.descricao = descricao.value;
    mensagem.value = "";
    let equipe;
    cria.criaEquipe(equipeCadastrada).then(response => {
        equipe = response.data
        enviarFotoParaBackend(equipe);
        adicionaUsuarioLogado(equipe)
        enviaParaWebSocket(equipe, membrosEquipe.value);
    });
};


async function colocaMembrosEquipe(equipe,idUsuarioLogado) {
    console.log(membrosEquipe.value)
    banco.adicionarUsuarios(idUsuarioLogado, equipe.id, "2", "/usuario/add");
    await enviarFotoParaBackend(equipe);
}

function adicionaUsuarioLogado(equipe) {
    const usuarioLogadoId = Number(usuarioLogado);
    banco.adicionarCriador(usuarioLogadoId, equipe.id).then(() => {
        colocaMembrosEquipe(equipe).then(res => {
            //    fechar popUp e envia um instance.emit para a 
            // tela de equipe e na tela de equipe quando eu recebo esse emit atualiza a tela
        })
    })
}

async function enviaParaWebSocket(equipe, membrosConvidados) {
    console.log(membrosConvidados)
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
    await conexaoWeb.enviaMensagemWebSocket(JSON.stringify(teste))
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

async function enviarFotoParaBackend(equipe) {
    try {
        if (!imagemSelecionada.value) {
            // Verifica se uma imagem foi selecionada
            console.error('Nenhuma imagem selecionada.');
            return;
        }
        const equipeId = equipe.id;
        await banco.cadastrarFoto(equipeId, imagemSelecionada.value);
        console.log('Foto enviada com sucesso para o backend.');
    } catch (error) {
        console.error('Erro ao enviar a foto para o backend:', error);
    }
}
</script>
<style scoped>
@import url(../assets/main.css);

@layer components {

    .alert {
        @apply absolute flex items-start justify-start 2xl:mt-[-25vh] 2xl:ml-[77vw] xl:ml-[75vw] xl:mt-[-20vh] lg:ml-[68vw] lg:mt-[-15vh] md:ml-[60vw] md:mt-[-15vh] z-[9999];
    }

    .imagem-arredondada {
        border-radius: 50%;
    }

    .imagem {
        @apply xl:h-[6vh] xl:w-[3vw];
    }

    .mensagem-error {
        @apply flex justify-center text-red-600 mt-10;
    }

    .botao {
        @apply w-[80%] h-[100%] gap-4 items-center;
        display: grid;
        grid-template-columns: 40% 55%;
    }

    .convidados-div {
        @apply h-full;
    }

    .grid-template {
        @apply w-[80%] h-[11%] gap-4 items-center justify-items-center justify-center;
        display: grid;
        grid-template-columns: 40% 55%;
    }

    #convites-bg {
        clip-path: polygon(20% 0, 80% 0, 100% 15%, 100% 100%, 0 100%, 0 15%);
    }

    .listaConvidados {
        @apply w-full h-full 2xl:w-[100%] 2xl:h-[20%] xl:w-[60%] xl:h-[30%] lg:w-[50%] lg:h-[20%];
    }

    .divGeral {
        @apply w-full flex justify-center p-5 flex-col;
    }

    @media(min-width: 2560px) {
        .divGeral {
            @apply w-[55vw];
        }

        .imagem {
            @apply h-[6vh] w-[3vw];
        }

    }

    @media(min-width: 1024px) {
        .divGeral {
            @apply w-[50vw];
        }

        .listaConvidados {
            @apply w-[40vw];
        }

    }

    @media (max-width: 1024px) {
        .imagem {
            @apply lg:h-[5vh] lg:w-[5vw] md:h-[4vh] md:w-[4vh];
        }
    }

    @media(min-width: 768px) {
        .divGeral {
            @apply md:w-[55VW];
        }

        .listaConvidados {
            @apply w-[40vw];
        }

        .botao {
            @apply md:mt-[5%];
        }
    }

    @media(min-width: 1280px) {
        .divGeral {
            @apply w-[25VW];
        }

        .listaConvidados {
            @apply w-[20vw];
        }
    }

    @media(min-width: 1280px) and (max-width: 1440px) {
        .divGeral {
            @apply w-[50vw];
        }

        .listaConvidados {
            @apply w-[35vw];
        }

        .imagem {
            @apply h-[5vh] w-[4vw];
        }
    }

    @media(max-width: 620px) {
        .titulo {
            @apply text-4xl mb-2;
        }

        .botao {
            @apply flex justify-end mt-10
        }

        .convidados-div {
            @apply h-full mt-10;
        }

        .imagem {
            @apply w-[60px] h-[60px]
        }
    }

}
</style>