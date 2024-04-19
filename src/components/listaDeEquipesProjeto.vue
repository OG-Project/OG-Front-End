<template>
    <fundoPopUp largura="" altura="95vh">
        <div class="divGeral mb-[65vh]">
            <div class="primeiraDiv">
                <h1 class="xl:mt-5 lg:mt-3 md:mt-3 text-4xl 2xl:mr-5 truncate">{{ projetoAtual.nome }}</h1>
            </div>
            <div class="div-membros flex flex-col items-center overflow-y-auto scrollbar-thin">
                <div class="flex justify-center w-full" v-for="equipe in projetoAtual.projetoEquipes">
                    <div class="corDiv">
                        <img v-if="equipe.equipe.foto != null" class="imgDePerfil" :src="'data:' +
                    equipe.equipe.foto.tipo +
                    ';base64,' +
                    equipe.equipe.foto.dados
                    " alt="">
                        <h1 class="flex mt-5 text-xl md:text-lg">{{ equipe.equipe.nome }}</h1>
                    </div>
                </div>

            </div>
        </div>
        <div class="adiciona-membro">
            <Input styleInput="input-transparente-claro" :largura="larguraInputConvidado()"
                icon="../src/imagem-vetores/adicionarPessoa.svg" conteudoInput="Adicionar Equipe"
                v-model="equipeConvidada" :modelValue="equipeConvidada" @updateModelValue="(e) => {
                    equipeConvidada = e
                }"></Input>
            <div class="flex mt-[1vh] ml-5">
                <Botao class="flex justify-center " preset="PadraoVazado" tamanhoDaBorda="2px" tamanhoPadrao="pequeno"
                    texto="convidar" tamanhoDaFonte="0.9rem" :funcaoClick="adicionarEquipe"></Botao>
            </div>
        </div>
        <div class="div-lista absolute bottom-[15vh] xl:mt-[20vh] lg:mt-[4vh] md:mt-[4vh] ">
            <ListaConvidados :margin-left="marginLeftConvidado()" margin-right="2vw" texto="Convites"
                mostrar-select="true" class="listaConvidados" altura="40vh"
                caminho-da-imagem-icon="../src/imagem-vetores/Sair.svg"
                caminho-da-imagem-perfil="../src/imagem-vetores/perfilPadrao.svg" :listaConvidados="equipesConvidadas">
            </ListaConvidados>
        </div>
        <div class="botao absolute bottom-0 right-0 mb-4 mr-4">
            <div>
                <div>
                    <Botao preset="PadraoRoxo" tamanhoPadrao="medio" texto="Confirmar" tamanhoDaFonte="0.9rem"
                        :funcaoClick="confirmarConvites"></Botao>
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
import { conexaoBD } from "../stores/conexaoBD.js";
import { ref, onMounted } from 'vue';
import VueCookies from "vue-cookies";
import { webSocketStore } from '../stores/webSocket.js';


let projetoAtual = ref(VueCookies.get('IdProjetoAtual'))
const banco = conexaoBD();
onMounted(async () => {
    projetoAtual.value = await banco.buscarUm(projetoAtual.value, "/projeto")
    listaUsuarios();
}
)

let listaEquipes = ref([]);
let usuariosRemover = ref([]);
let membrosEquipe = ref([]);
let equipesConvidadas = ref([]);
let equipeConvidada = ref('');
const screenWidth = window.innerWidth;
const opcoesSelect = ['Edit', 'View'];

let emit = defineEmits({
    boolean: Boolean
})

function larguraNomeEquipe() {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 768) {
        return 14;
    } else if (screenWidth > 768 && screenWidth <= 1024) {
        return 16;
    } else if (screenWidth > 1024 && screenWidth < 1920) {
        return 15;
    } else if (screenWidth >= 1920 && screenWidth < 2560) {
        return 15;
    } else if (screenWidth >= 2560) {
        return 20;
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


function larguraInputConvidado() {
    if (screenWidth <= 768) {
        return '24';
    } else if (screenWidth > 768 && screenWidth <= 1024) {
        return '22';
    } else if (screenWidth > 1024 && screenWidth < 1920) {
        return '19';
    } else if (screenWidth >= 1920 && screenWidth > 2560) {
        return '20';
    } else if (screenWidth >= 2560) {
        return '12';
    }
}

async function listaDeEquipes() {
    let equipes = projetoAtual.value.projetoEquipes
    let listaDeEquipes = await equipes;
    listaDeEquipes.forEach((equipe) => {
        if (equipeConvidada.value === equipe.nome) {
            equipesConvidadas.value.push(equipe);
        }
    })
}

async function adicionarEquipe() {
    const equipeDoProjeto = listaEquipes.value.find(equipe => equipe.nome === equipeConvidada.value);
    const equipes = await banco.procurar("/equipe")
    const equipe = equipes.find(equipe => equipe.nome === equipeConvidada.value)
    if (equipeDoProjeto) {
        console.log("Esse usuário já faz parte da equipe.");
        return;
    }

    // Verifica se o usuário já foi convidado
    const equipeJaConvidada = equipesConvidadas.value.some(equipe => equipe.nome === equipeConvidada.value);
    console.log(equipeConvidada.value)
    if (equipeJaConvidada) {
        console.log("Você já convidou essa pessoa.");
    } else {
        equipesConvidadas.value.push(equipe)
        setTimeout(await listaDeEquipes(), 100);
    }
}

async function listaUsuarios() {
    let convites = await banco.buscarUm(projetoAtual.value.id, "/notificacao/conviteProjeto");
    convites.forEach((convite) => {
        console.log(convite)
        for (const usuarioAceito of convite.conviteParaEquipe.usuarioAceito) {
            if (usuarioAceito.aceito == false) {
                equipesConvidadas.value.push(usuarioAceito.usuario);
            }
        }

    })
}




async function enviaParaWebSocket(projeto, membrosConvidados) {
    let equipeAux = {
        id: "",
        nome: "",
        descricao: "",
        membros: membrosConvidados
    }
    let teste = {
        equipes: [{ equipe: equipeAux }],
        notificao: {
            mensagem: "Te Convidou para o Projeto",
            conviteParaProjeto: {
                projeto: projeto
            }
        }

    }
    const webSocket = webSocketStore();
    webSocket.url = "ws://localhost:8082/og/webSocket/usuario/1"
    await webSocket.enviaMensagemWebSocket(JSON.stringify(teste))
}


async function confirmarConvites() {
    let membros = []
    
    for (const equipe of equipesConvidadas.value) {
        membros.push(await banco.buscarUm(equipe.id, "/equipe/criador"))
    }
    console.log(membros)
    enviaParaWebSocket(projetoAtual.value, membros);

}

</script>

<style scoped>
.styleSelectPadraoBranco {
    @apply border-4 mt-[1vh] flex justify-center border-transparent border-b-brancoNeve border-b-2 w-max items-center focus-within:border-white focus-within:border-4 focus-within:rounded-md truncate;

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
    @apply w-full
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
    @apply flex ml-10 h-20 w-[13vw] 2xl:w-[13vw] xl:w-[20vw] lg:w-[25vw] md:w-[30vw] border-transparent border-b-roxo border-b-2 items-center focus-within:border-roxo focus-within:border-4;

}

.primeiraDiv {
    @apply flex w-full 2xl:h-[8vh] border-transparent border-b-4 justify-center focus-within:border-4;
}

.imgEquipe {
    @apply justify-start;
}

.imgDePerfil {
    @apply rounded-full bg-cover bg-center flex flex-col mt-5 mr-5 2xl:w-[2vw] 2xl:h-[4vh] xl:w-[3vw] xl:h-[4vh] lg:w-[4vw] lg:h-[4vh] md:w-[6vw] md:h-[4vh];
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

    .adiciona-membro {
        @apply 2xl:ml-[2.5vw];
    }

    .botao {
        @apply 2xl:w-[52%] gap-8 2xl:mt-[2vh];
    }
}
</style>