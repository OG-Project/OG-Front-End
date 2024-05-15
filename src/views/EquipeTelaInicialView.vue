<template>
  <div>
    <div class="corDiv">
      <img class="imagemEquipe" v-if="equipeEditar.foto"
        :src="'data:' + equipeEditar.foto.tipo + ';base64,' + equipeEditar.foto.dados"
        @click="abrePopUp(equipeSelecionada.equipe, 'engrenagem')" @mouseover="expandirImagem"
        @mouseleave="reduzirImagem">
      <img class="imagemEquipe bg-[#d7d7d7]" v-else src="../imagem-vetores/imagemEquipePadrao.svg"
        @click="abrePopUp(equipeSelecionada.equipe, 'engrenagem')">
      <h1 class="tituloEquipe ">{{ equipeEditar.nome }}</h1>
    </div>
    <div class="divCel flex justify-end">
      <div id="step-10" class="botaoProjetos flex mt-[-3vh] mr-[1vw]">
        <Botao v-if="screenWidth >= 620" preset="PadraoVazado" tamanhoDaBorda="2px" sombreado="sim"
          corBordaHover="var(--roxo)" corBorda="var(--roxo)" tamanhoPadrao="pequeno"
          :texto="'+ ' + $t('equipes.projeto')" tamanhoDaFonte="1rem" :funcaoClick="criarProjeto">
        </Botao>
        <Botao v-else-if="screenWidth <= 320" preset="PadraoVazado" tamanhoDaBorda="2px" sombreado="sim"
          corBordaHover="var(--roxo)" corBorda="var(--roxo)" tamanhoPadrao="mobilemedio"
          :texto="'+ ' + $t('equipes.projeto')" tamanhoDaFonte="1rem" :funcaoClick="criarProjeto">
        </Botao>
        <Botao v-else preset="PadraoVazado" tamanhoDaBorda="2px" sombreado="sim" corBordaHover="var(--roxo)"
          corBorda="var(--roxo)" tamanhoPadrao="mobilepadrao" :texto="'+ ' + $t('equipes.projeto')"
          tamanhoDaFonte="2rem" :funcaoClick="criarProjeto">
        </Botao>
      </div>
      <div class="botaoIcone flex justify-center items-center mt-[-3vh] mr-[1vw] shadow-xl "
        @click="abrePopUp(equipeSelecionada.equipe, 'engrenagem')" @mouseover="hover = true"
        @mouseleave="hover = false">
        <engrenagem class="w-[20px] h-[20px]" :class="{ 'imagem-hover': hover }"></engrenagem>
      </div>
      <div class="botaoIcone flex mt-[-3vh] 2xl:mr-[2.5vw] xl:mr-[2.5vw] lg:mr-[2.5vw] md:mr-[2.5vw]  shadow-xl  "
        @click="abrePopUp(equipeSelecionada, 'membros')" @mouseover="hoverMembros = true"
        @mouseleave="hoverMembros = false">
        <membrosEquipeImagem
          class="membrosEquipeImagem w-[18px] h-[18px] 2xl:mt-[0vh] xl:mt-[0.2vh] lg:mt-[0.3vh] md:mt-[0.3vh]"
          :class="{ 'imagem-hover-membros': hoverMembros }"></membrosEquipeImagem>
        <p v-if="screenWidth >= 620"
          class="flex items-center 2xl:ml-2 2xl:mt-1 xl:ml-2 xl:mt-1 lg:ml-3 lg:mt-2 md:ml-3 md:mt-2 text-md"
          :class="{ 'imagem-hover-membros': hoverMembros }">{{ numeroMembrosLimitado() }}</p>
      </div>
      <editarEquipePopUp v-if="funcaoPopUp.variavelModal && variavelEngrenagem == true"></editarEquipePopUp>
      <ListaMembrosEquipe v-if="funcaoPopUp.variavelModal && variavelMembros == true"> </ListaMembrosEquipe>
    </div>
  </div>
  <div class="flex justify-center">
    <div class="listaProjetos overflow-auto">
      <div class="flex justify-center">
        <H1 class="text-4xl mt-5 text-[var(--fonteCor)] font-semibold">{{ $t('equipes.projetos') }}</H1>
      </div>
      <div class="projetos ">
        <div v-for="projeto of listaProjetos" :key="projeto.id">
          <div class="flex w-[100%]">
            <CardProjetos @click="entrarNoProjeto(projeto)" class="cardProjeto" :feito="calcularProgresso(projeto)"
              :name="projeto.nome" :descricao="projeto.descricao" :comeco="formatarData(projeto.dataCriacao)"
              :final="projeto.dataFinal ? formatarData(projeto.dataFinal) : 'Indefinido'"
              :responsavel="listaResponsaveis" :tempoAtuacao="projeto.tempoAtuacao">
            </CardProjetos>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import navBar from "../components/navBar.vue"
import Botao from '../components/Botao.vue';
import { ref, onMounted, watch, computed } from 'vue';
import VueCookies from "vue-cookies";
import editarEquipePopUp from "../components/editarEquipePopUp.vue";
import { funcaoPopUpStore } from "../stores/funcaoPopUp";
import ListaMembrosEquipe from "../components/listaMembrosEquipe.vue";
import { conexaoBD } from "../stores/conexaoBD.js";
import CardProjetos from "../components/cardProjetos.vue";
import { useRouter } from 'vue-router'
import engrenagem from "../imagem-vetores/engrenagem.vue";
import membrosEquipeImagem from "../imagem-vetores/membrosEquipeImagem.vue";

const equipeSelecionada = VueCookies.get('equipeSelecionada')
const funcaoPopUp = funcaoPopUpStore();
const quantidadeMembros = ref([]);
const listaProjetos = ref([]);
let membrosEquipe = ref([]);
funcaoPopUp.variavelModal = false;
let variavelEngrenagem = false;
let variavelMembros = false;
let listaResponsaveis = ref([])
const banco = conexaoBD();

onMounted(() => {
  buscaProjeto()
})

async function buscaProjeto() {
  let projeto = await banco.procurar("/projeto")
  projeto.forEach((projeto) => {
    obterNomesResponsaveis(projeto)
  })
}

let equipeEditar = ref({
  nome: '',
  descricao: ''
});
const screenWidth = window.innerWidth;
let projetosEquipe = ref([]);
const router = useRouter();

async function entrarNoProjeto(projeto) {
  VueCookies.set("idAuxEquipe", equipeSelecionada, 30000)
  VueCookies.set("IdProjetoAtual", projeto.id, 30000)
  router.push({ path: '/projeto' }).then(() => {
    window.location.reload()
  });
}

async function criarProjeto() {
  VueCookies.set("idAuxEquipe", Number(equipeSelecionada))
  router.push({ path: '/criaProjeto' }).then(() => {
    window.location.reload()
  });
  VueCookies.set("projetoCookie");
  VueCookies.set("IdProjetoAtual")
}


async function obterNomesResponsaveis(projeto) {
  if (projeto.responsaveis && Array.isArray(projeto.responsaveis) && projeto.responsaveis.length > 0) {
    let responsaveisComNome = []
    for (let responsavel of projeto.responsaveis) {
      let responsavelAtual = await buscaResponsaveis(responsavel)
      responsaveisComNome.push(responsavelAtual.username)
      listaResponsaveis.value = responsaveisComNome
      if (responsaveisComNome.length >= 0) {
        listaResponsaveis.value = responsaveisComNome.join(', ');
      }
    }
  } else {
    return "Não há responsáveis";
  }
}

async function buscaResponsaveis(responsavel) {
  return await banco.buscarUm(responsavel.idResponsavel, "/usuario")

}

function formatarData(data) {
  // Extrair dia, mês e ano
  const dia = data.slice(8, 10);
  const mes = data.slice(5, 7);
  const ano = data.slice(0, 4);
  // Retornar data formatada como "dd/mm/yyyy"
  return `${dia}/${mes}/${ano}`;
}

async function buscarProjetosEquipe() {
  // Chama a função do banco de dados para buscar os membros da equipe
  console.log(await (await banco.buscarProjetosEquipe(Number(equipeSelecionada), "/projeto/buscarProjetos")));
  projetosEquipe.value = await (banco.buscarProjetosEquipe(equipeSelecionada, "/projeto/buscarProjetos"));
  if (Array.isArray(projetosEquipe.value)) {
    // Filtrar espaços nulos (null) da lista de membros da equipe
    listaProjetos.value = projetosEquipe.value.filter(projeto => projeto != null);
    console.log(listaProjetos)
  } else {
    console.error("O retorno de buscarMembrosEquipe() não é um array válido.");
  }

}

function calcularProgresso(projeto) {
  if (!projeto.tarefas || projeto.tarefas.length == 0) {
    return 0; // se não houver tarefas, o progresso é 0%
  }

  const totalTarefas = projeto.tarefas.length;
  const tarefasConcluidas = projeto.tarefas.filter(tarefa => tarefa.concluida).length;

  return Math.round((tarefasConcluidas / totalTarefas) * 100);
}

async function filtrarEquipe() {
  console.log(await (banco.buscarUm(equipeSelecionada, "/equipe")))
  equipeEditar.value = await (banco.buscarUm(equipeSelecionada, "/equipe"))
}
filtrarEquipe();

async function buscarMembrosEquipe() {
  // Chama a função do banco de dados para buscar os membros da equipe
  membrosEquipe.value = await (banco.buscarMembrosEquipe(equipeSelecionada, "/usuario/buscarMembros"));
  if (Array.isArray(membrosEquipe.value)) {
    // Filtrar espaços nulos (null) da lista de membros da equipe
    quantidadeMembros.value = membrosEquipe.value.filter(membro => membro != null);
  } else {
    console.error("O retorno de buscarMembrosEquipe() não é um array válido.");
  }
}

// Chamada da função para buscar membros da equipe assim que o componente for montado
onMounted(() => {
  buscarMembrosEquipe();
  buscarProjetosEquipe();
});

watch(() => VueCookies.get('equipeSelecionada'), async (newValue, oldValue) => {
  if (newValue !== oldValue) {
    await filtrarEquipe();
    await buscarMembrosEquipe();
  }
});

function numeroMembrosLimitado() {
  return Math.min(quantidadeMembros.value.length, 99);
}

const hover = ref(false);
const hoverMembros = ref(false);

function abrePopUp(equipe, tipo) {

  if (tipo === 'membros') {
    variavelMembros = true;
    variavelEngrenagem = false;
  } else {
    variavelEngrenagem = true;
    variavelMembros = false;
  }

  const equipeEditada = equipe;
  console.log(equipeEditada)
  VueCookies.set("equipeEditada", equipeEditada, 30000)
  funcaoPopUp.abrePopUp()
}
</script>
<style scoped>
::-webkit-scrollbar {
  @apply hidden;
}

.pularLinhaTexto {
  white-space: pre-wrap;
  word-break: break-word;
}

.cardProjeto {
  @apply 2xl:w-[20vw] 2xl:m-[0.5vw] xl:m-[1.7vw] lg:m-[1.9vw] md:m-[1vw];
  max-width: calc(25% - 1px);
}

.projetos {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  justify-content: flex-start;
}

.corDiv {
  @apply flex 2xl:ml-[5vw] 2xl:mt-[5vh] xl:ml-[5vw] xl:mt-[5vh] lg:ml-[5vw] lg:mt-[1vh] md:ml-[5vw] md:mt-[-5vh] 2xl:h-[10vh] 2xl:w-[40vw] xl:h-[12vh] xl:w-[35vw] lg:h-[15vh] lg:w-[45vw] md:h-[20vh] md:w-[55vw] border-transparent border-b-[var(--roxo)] border-b-2 items-center focus-within:border-[var(--roxo)] focus-within:border-4;

}

.botaoIcone:hover {
  background-color: var(--roxo);

}

.imagem-hover {
  filter: brightness(0) invert(1);
  transition: filter 0.3s ease;
}

.imagem-hover-membros {
  filter: brightness(0) invert(1);
  transition: filter 0.3s ease;
}

.botaoIcone {
  @apply 2xl:w-[3.5vw] 2xl:h-[4vh] xl:w-[5vw] xl:h-[4vh] lg:w-[7vw] lg:h-[4vh] md:w-[9vw] md:h-[4vh];
  border: 2px solid var(--roxo);
  background-color: transparent;
  padding: 8px;
  cursor: pointer;
  transition: border-color 0.3s ease;
}


.tituloEquipe {
  @apply text-4xl ml-4 text-[var(--fonteCor)] 2xl:mt-5 xl:mt-10 lg:mt-24 md:mt-[12vh];
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.listaProjetos {
  @apply mt-[11vh] w-[95vw] h-[65vh] bg-[var(--backgroundItems)] shadow-md shadow-[var(--backgroundItems)];
  flex: 1 1 px;
}

.imagemEquipe {
  @apply flex ml-5 2xl:mt-2 xl:mt-5 lg:mt-20 md:mt-[12vh] 2xl:h-[80px] 2xl:w-[80px] xl:h-[80px] xl:w-[80px] lg:w-[80px] lg:h-[80px] md:h-[80px] md:w-[80px] rounded-full;
  transition: transform 0.3s ease;
}

.imagemEquipe:hover,
.imagemEquipe[data-expanded="true"] {
  transform: scale(1.1);
}

@media(min-width: 768px) {
  .cardProjeto {
    @apply ml-[20vw] mt-10;
    max-width: calc(100% - 1px);
  }

  .listaProjetos {
    @apply h-[57vh];
  }
}

@media(min-width:1024px) {
  .cardProjeto {
    @apply ml-[4.5vw];
    max-width: calc(100% - 1px);
  }

  .listaProjetos {
    @apply h-[65vh];
  }
}

@media (min-width: 1440px) {
  .cardProjeto {
    @apply ml-[2vw];
    max-width: calc(100% - 1px);
  }

  .listaProjetos {
    @apply h-[65vh];
  }
}

@media(min-width: 2560px) {
  .botaoIcone {
    @apply w-[3vw] h-[4vh]
  }

  .cardProjeto {
    max-width: calc(68% - 1px);
  }

  .projetos {
    @apply ml-16
  }

  .listaProjetos {
    @apply h-[65vh];
  }

  .membrosEquipeImagem {
    @apply mt-[0.3vh]
  }

}

@media(max-width: 620px) {
  .botaoIcone {
    @apply w-[50px] h-[50px] mt-[8vh] mr-4
  }

  .listaProjetos {
    @apply mt-0 h-[60vh];
  }

  .botaoProjetos {
    @apply flex mt-[8vh] mr-[14vw];
  }

  .tituloEquipe {
    @apply w-[60vw]
  }

  .corDiv {
    @apply w-[80vw] ml-[10vw] mt-[5vh]
  }

  .imagemEquipe {
    @apply w-[60px] h-[60px]
  }

  .divCel {
    @apply mt-0;
  }

  .cardProjeto {
    @apply mt-10 text-xl;
    max-width: calc(125% - 1px);
  }

  .membrosEquipeImagem {
    @apply mt-[0.6vh] ml-[1.25vw]
  }
}
</style>