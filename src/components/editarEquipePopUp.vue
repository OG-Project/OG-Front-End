<template>
    <fundoPopUp v-if="!editando" largura="" :altura="tamanhoPopUp()">
        <div class="divGeral">
            <div class=" grid-template flex w-full">
                <h1 class="titulo flex font-semibold xl:text-3xl md:text-2xl sm:text-xs color-[#000]">Equipe Editar</h1>
            </div>

            <div class=" grid-template  flex w-full mt-[1vh] p-5">
                <img class="imagem" v-if="equipeEditar.foto"
                    :src="'data:' + equipeEditar.foto.tipo + ';base64,' + equipeEditar.foto.dados" alt="">
                <equipe class="imagem" v-else></equipe>
                <div class="styleH1Padrao">
                    <h1 class="nomeEquipe flex 2xl:h-[3vh] 2xl:w-[12vw] xl:w-[22vw] lg:w-[25vw] md:w-[21vw] text-xl text-[var(--fonteCor)] "
                        :title="equipeEditar.nome"> {{ truncarNome(equipeEditar.nome, larguraNomeEquipe()) }}</h1>
                </div>
            </div>
            <div class=" grid-template flex w-full mt-[1vh]">
                <div class="textArea">
                    <p class="descricao">{{ equipeEditar.descricao }}</p>
                </div>
            </div>
            <div>
                <div class="botao">
                    <div v-if="usuarioECriadorEquipe">
                        <div v-if="screenWidth >= 620"
                            class="flex justify-start xl:mt-[10vh] lg:mt-[15vh] md:mt-[15vh] 2xl:ml-5 xl:ml-[6vw] lg:ml-[6vw] md:ml-[5vw]">
                            <Botao preset="Deletar" tamanhoPadrao="medio" texto="Deletar" tamanhoDaFonte="1rem"
                                :funcaoClick="deletarEquipe">
                            </Botao>
                        </div>
                        <div v-else class="flex mt-20">
                            <Botao preset="Deletar" tamanhoPadrao="mobilemedio" texto="Deletar" tamanhoDaFonte="1rem"
                                :funcaoClick="deletarEquipe">
                            </Botao>
                        </div>
                    </div>
                    <div v-else-if="!usuarioECriadorEquipe">
                        <div v-if="screenWidth >= 620"
                            class="flex justify-start xl:mt-[10vh] lg:mt-[15vh] md:mt-[15vh] 2xl:ml-5 xl:ml-[6vw] lg:ml-[6vw] md:ml-[5vw]">
                            <Botao preset="Sair" tamanhoPadrao="medio" texto="Deletar" tamanhoDaFonte="1rem"
                                :funcaoClick="removesse">
                            </Botao>
                        </div>
                        <div v-else class="flex mt-20">
                            <Botao preset="Sair" tamanhoPadrao="mobilemedio" texto="Deletar" tamanhoDaFonte="1rem"
                                :funcaoClick="removesse">
                            </Botao>
                        </div>
                    </div>
                    <div v-if="screenWidth >= 620"
                        class=" flex justify-end xl:mt-[10vh] lg:mt-[15vh] md:mt-[15vh] 2xl:mr-5 xl:mr-[5vw] lg:mr-[5vw] md:mr-[4vw]">
                        <Botao preset="PadraoRoxo" tamanhoPadrao="medio" texto="Editar" tamanhoDaFonte="1rem"
                            :funcaoClick="editarEquipe">
                        </Botao>
                    </div>
                    <div v-else class="flex justify-end mt-20">
                        <Botao preset="PadraoRoxo" tamanhoPadrao="mobilemedio" texto="Editar" tamanhoDaFonte="1rem"
                            :funcaoClick="editarEquipe">
                        </Botao>
                    </div>
                </div>
            </div>
        </div>
    </fundoPopUp>

    <fundoPopUp v-if="editando" largura="" :altura="tamanhoPopUp()">
        <div class="divGeral">
            <div class=" grid-template flex w-full">
                <h1 class="tituloEditar flex font-semibold xl:text-3xl md:text-2xl sm:text-xs color-[#000]">Equipe</h1>
            </div>
            <div class=" grid-template  flex w-full mt-[1vh] p-5">
                <div class="relative">
                    <input type="file" @change="handleFileUpload" class=" h-16 opacity-0 w-full absolute">
                    <div class="rounded-full bg-[#D7D7D7] flex items-center justify-center 2xl:w-[70px] 2xl:h-[70px] xl:w-[70px] xl:h-[70px] lg:w-[65px] lg:h-[65px] md:w-[60px] md:h-[60px]">
                        <img class="imagem" :class="{ 'imagem-arredondada': imagemSelecionadaUrl }" :src="imagemExibicao"
                        alt="Imagem Selecionada">
                    </div>
                </div>
                <Input :class="{ 'computedClasses': someCondition }" styleInput="input-transparente-claro"
                    :largura="larguraInput()" conteudoInput="Nome da Equipe"  v-model="nome" @updateModelValue="(e)=> {nome=e}"></Input>
            </div>
            <div class=" grid-template flex w-full mt-[1vh]">
                <textAreaPadrao
                    class="flex 2xl:w-[18vw] xl:h-[10vh] xl:w-[35vw] lg:w-[36vw] md:w-[38vw] md:h-[8vh] w-full  justify-center"
                    height="20vh" resize="none" tamanho-da-fonte="1rem" placeholder="Descrição(opcional)"
                    v-model="descricao" @updateModelValue="(e)=> {descricao= e}"></textAreaPadrao>
            </div>
            <div
                class="botaoSalvar flex justify-end 2xl:mt-[22vh] xl:mt-[24vh] lg:mt-[27vh] md:mt-[28vh] 2xl:mx-[2vw] xl:mx-[3vw] lg:mx-[3vw] md:mx-[4vw]">
                <Botao v-if="screenWidth >= 620" preset="PadraoRoxo" tamanhoPadrao="medio" texto="Salvar alterações"
                    tamanhoDaFonte="1rem" :funcaoClick="atualizarEquipe">
                </Botao>
                <Botao v-else preset="PadraoRoxo" tamanhoPadrao="mobilepadrao" texto="Salvar alterações"
                    tamanhoDaFonte="1rem" :funcaoClick="atualizarEquipe">
                </Botao>
            </div>
        </div>

    </fundoPopUp>
    <div v-if="mensagem != ''" class="alert">
        <alertTela :mensagem="mensagem" :cor="mensagemCor" :key="mensagem" @acabou-o-tempo="limparMensagemErro">
        </alertTela>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import fundoPopUp from './fundoPopUp.vue';
import Input from './Input.vue';
import textAreaPadrao from './textAreaPadrao.vue';
import Botao from './Botao.vue';
import { conexaoBD } from "../stores/conexaoBD.js";
import VueCookies from "vue-cookies";
import { useRouter } from 'vue-router'
import equipe from '../imagem-vetores/equipe.vue';
import alertTela from './alertTela.vue';
const screenWidth = window.innerWidth;
const router = useRouter();
const banco = conexaoBD();
const equipeSelecionada = VueCookies.get('equipeSelecionada')
let idUsuarioLogado = VueCookies.get("IdUsuarioCookie")
let usuarioLogado = banco.buscarUm(idUsuarioLogado,"/usuario")
console.log(usuarioLogado)
let equipeEditar = ref({
    nome: '',
    descricao: '',
    foto: null
});
let nome = ref('');
let descricao = ref('');
let mensagemError = ref("");
let editando = ref(false);
let equipes = banco.procurar("/equipe");
let usuarios = banco.procurar("/usuario");
let usuarioFazParteEquipe = false;
let usuarioECriadorEquipe = false;
function limparMensagemErro() {
    mensagem.value = "";
}
let mensagem = ref("");
let mensagemCor = ref("");


function tamanhoPopUp() {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 620) {
        return '50vh'
    }
    else {
        return '60vh'
    }
}

onMounted(()=>{
   equipeDoUsuarioLogado();
})

watch(() => descricao.value, () => {
    verificaTamanho();
})

function verificaTamanho(){
 if(descricao.value.length > 255){
    mensagem.value = ""
    mensagemCor.value = ""
    mensagem.value = "Máximo de 255 caracteres";
    mensagemCor.value = "#CD0000"
 }
}

function larguraNomeEquipe() {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 768) {
        return 15;
    } else if (screenWidth > 768 && screenWidth <= 1024) {
        return 24;
    } else if (screenWidth > 1024 && screenWidth < 1920) {
        return 22;
    } else if (screenWidth >= 1920 && screenWidth < 2560) {
        return 18;
    } else if (screenWidth >= 2560) {
        return 20;
    }
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

async function equipeDoUsuarioLogado (){
    let listaUsuarios = await usuarios;
    const logadoId = Number(idUsuarioLogado);

    listaUsuarios.forEach((usuario) => {
        // Verifica se o usuário atual é o usuário logado
        if (logadoId == usuario.id) {
            // Itera sobre as equipes do usuário logado
            usuario.equipes.forEach((equipeUsuario) => {
                // Verifica se a equipe do usuário é a mesma que foi criada
                if (equipeUsuario.equipe.id == equipeSelecionada) {
                     console.log(1)
                     usuarioFazParteEquipe = true;
                    if(equipeUsuario.criador == true){
                     console.log(2)
                     usuarioECriadorEquipe = true;
                    }
                }
            });
        }
    });
};

async function filtrarEquipe(){
    equipeEditar.value = await(banco.buscarUm(equipeSelecionada, "/equipe"))

}
filtrarEquipe();


const truncarNome = (nome, comprimentoMaximo) => (nome.length > comprimentoMaximo ? `${nome.slice(0, comprimentoMaximo)}...` : nome);

async function editarEquipe() {
    editando.value = !editando.value;
}
function larguraInput() {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 620) {
        return '50'
    }
    if (screenWidth <= 768) {
        return '25';
    } if (screenWidth > 768 && screenWidth <= 1024) {
        return '28';
    } if (screenWidth > 1024 && screenWidth < 1920) {
        return '25';
    } if (screenWidth > 1440 && screenWidth < 1920) {
        return '20';
    } else {
        return '13';
    }
};

async function removesse() {
    await banco.removerUsuarioDaEquipe(equipeSelecionada,idUsuarioLogado, "/usuario/removerUsuarioEquipe").then(response => {
            if (router.currentRoute.value.path == '/equipe') {
                window.location.reload();
            } else {
                router.push({ path: '/equipe' });
            }
        }
    )
}

async function deletarEquipe() {

    let listaEquipes = await equipes;
    listaEquipes.forEach((equipe) => {
        if (equipeSelecionada == equipe.id) {

            banco.deletar(equipe.id, '/equipe').then(response => {
                if (router.currentRoute.value.path == '/equipe') {
                    window.location.reload();
                } else {
                    router.push({ path: '/equipe' });
                }
            }
            )
        }
        VueCookies.remove('equipeSelecionada');
    })
}

async function atualizarEquipe() {
    const equipeAtualizar = {
        id: '',
        nome: '',
        descricao: ''
    };

    let listaEquipes = await equipes;
    listaEquipes.forEach((equipe) => {
        if (equipeSelecionada == equipe.id) {
            equipeAtualizar.id = equipe.id;

            // Verificar se o nome foi alterado
            if (nome.value.trim() != '') {
                equipeAtualizar.nome = nome.value;
            } else {
                equipeAtualizar.nome = equipe.nome; // Mantém o nome original se não foi alterado
            }

            // Verificar se a descrição foi alterada
            if (descricao.value.trim() != '') {
                equipeAtualizar.descricao = descricao.value;
            } else {
                equipeAtualizar.descricao = equipe.descricao; // Mantém a descrição original se não foi alterada
            }

            mensagemError.value = "";

            // Verifica se houve alterações nos campos antes de atualizar
            if (equipeAtualizar.nome != equipe.nome || equipeAtualizar.descricao != equipe.descricao) {
                banco.atualizar(equipeAtualizar, "/equipe");
            } else {
                mensagem.value = ""
                mensagemCor.value = ""
                mensagem.value = "Nenhuma alteração detectada";
                mensagemCor.value = "#CD0000"
            }

            // Verificar se houve uma nova foto selecionada
            if (imagemSelecionada.value) {
                equipeAtualizar.foto = {
                    tipo: imagemSelecionada.value.type,
                    dados: toBase64(imagemSelecionada.value)
                };
            } else {
                // Caso contrário, manter a imagem da equipe anterior
                equipeAtualizar.foto = equipe.foto;
            }
        }
    });

    equipeEditar.value.nome = equipeAtualizar.nome;
    equipeEditar.value.descricao = equipeAtualizar.descricao;

    nome.value = "";
    descricao.value = "";
    editando.value = false;

    // Verificar se houve uma nova foto selecionada ou se a foto anterior foi mantida
    if (equipeAtualizar.foto) {
        // Envia a foto para o backend apenas se houver uma nova foto ou a foto anterior foi mantida
        enviarFotoParaBackend(equipeSelecionada);
    } else {
        mensagem.value = ""
        mensagemCor.value = ""
        mensagem.value = "Nenhuma imagem detectada";
        mensagemCor.value = "#CD0000"
    }

   window.location.reload();
}

// Função para converter o arquivo para base64
async function toBase64(file) {
    return await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = error => reject(error);
    });
}


async function enviarFotoParaBackend(id) {
    try {
        if (!imagemSelecionada.value) {
            // Verifica se uma imagem foi selecionada
            return;
        }

        const equipeId = id;
        await banco.cadastrarFoto(equipeId, imagemSelecionada.value);
    } catch (error) {
    }
}

</script>
<style scoped>
@import url(../assets/main.css);

@layer components {

    .alert {
        @apply absolute flex items-start justify-start 2xl:mt-[-20vh] mr-10 2xl:ml-[77vw] xl:ml-[75vw] xl:mt-[-20vh] lg:ml-[68vw] lg:mt-[-15vh] md:ml-[60vw] md:mt-[-15vh] z-[9999];
    }

    .descricao {
        white-space: pre-wrap;
        word-break: break-word;
    }

    .styleH1Padrao {
        @apply border-4 border-transparent border-b-[var(--roxo)] px-2 max-w-max w-min border-b-2 hover:rounded-[4px] hover:border-4 focus-within:border-[var(--roxo)] focus-within:border-4 focus-within:rounded-[4px];

    }

    .textArea {
        @apply truncate flex 2xl:w-[18vw] xl:h-[20vh] xl:w-[35vw] lg:w-[36vw] md:w-[38vw] md:h-[18vh] w-full bg-[#D7D7D7] text-black text-lg border-transparent border-b-[var(--roxo)] border-b-2 focus-within:border-[var(--roxo)] focus-within:border-4;
        border-bottom: 'solid 4px #620BA7';
    }

    .imagem {
        @apply xl:h-[6vh] xl:w-[3vw] rounded-full;
    }

    .mensagem-error {
        @apply flex justify-center text-red-600 mt-10;
    }

    .botaoSalvar {
        @apply w-[80%] h-[100%] gap-4 items-center;
        display: grid;
        grid-template-columns: 40% 55%;
    }

    .botao {
        @apply w-[100%] h-[100%] gap-4 items-center;
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
        .alert{
            @apply mr-4 mt-[-15vh]
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
            @apply text-4xl;
        }
        .alert{
            @apply mr-4
        }
        .textArea {
            @apply flex w-[70vw] h-[20vh] bg-[#D7D7D7] text-black text-lg border-transparent border-b-[var(--roxo)] border-b-2 focus-within:border-[var(--roxo)] focus-within:border-4;
            border-bottom: 'solid 4px #620BA7';
        }

        .nomeEquipe {
            @apply flex h-[3vh] w-[50vw] text-xl text-[#877E7E];
        }

        .imagem {
            @apply w-[40px] h-[40px]
        }

        .divGeral {
            @apply w-full flex justify-center p-5 flex-col;
        }

        .tituloEditar {
            @apply text-4xl;
        }

        .botaoSalvar {
            @apply flex justify-end ml-14 mt-20;
        }
    }

}
</style>