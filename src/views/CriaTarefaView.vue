<template>
  <navBar> </navBar>
  <div id="bgBranco" class="flex flex-row min-h-[96%] w-full">
    <div></div>
    <div class="w-[40vw] min-h-[96%] flex flex-col">
      <div class="flex flex-row pl-12 items-center pr-6 mt-4 h-[10%] w-[100%]">
        <Input
          largura="40"
          altura="6"
          fontSize="2rem"
          conteudoInput="Nome da tarefa"
          styleInput="input-transparente-claro-grande"
        ></Input>
      </div>
      <div class="flex flex-col pl-12 min-h-[16vh] mt-4 w-[90%] flex">
        <TextAreaPadrao
          width="80%"
          height="16vh"
          placeholder="Descrição da tarefa"
          tamanho-da-fonte="1rem"
          resize="none"
        ></TextAreaPadrao>
      </div>
      <div class="flex pl-12 items-center gap-16 mt-4 h-[5%] w-[100%]">
        <div class="flex flex-col justify-center w-[18%]">
          <p>Propriedades</p>
          <button
            class="flex flex-col justify-center h-[70%] w-[100%]"
            @click="abreFechaCriaPropriedades()"
          >
            + Criar
          </button>
        </div>
        <div class="flex flex-col justify-center w-[11%]">
          <p>Status</p>
          <button
            class="flex flex-col justify-center h-[70%] w-[100%]"
            @click="abreFechaCriaStatus()"
          >
            + Criar
          </button>
        </div>
        <div class="flex flex-col justify-center w-[18%]">
          <p>SubTarefas</p>
          <button
            class="flex flex-col justify-center h-[70%] w-[100%]"
            @click="abreFechaCriaSubTarefas()"
          >
            + Criar
          </button>
        </div>
      </div>

      <div v-if="statusSendoCriado">
        <div v-if="statusSendoCriado" class="h-full flex flex-row pl-12 pt-6 pb-6">
          <!-- fiz como um popUp, tem um botão que abre o popUp -->
          <div class="animation">
            <div class="flex justify-start">
              <img src="../imagem-vetores/trianguloStart.svg" />
            </div>
            <div class="flex flex-row justify-between">
              <div class="pl-2">
                <Input
                  largura="10"
                  conteudoInput="Nome Subtarefa"
                  fontSize="1rem"
                  altura="3.8"
                  v-model="nomeStatus"
                ></Input>
              </div>
              <div class="pr-2">
                <ColorPicker v-model="corStatus" class="border-2 rounded-lg" />
              </div>
            </div>
            <div class="flex felx-row justify-between">
              <div class="pl-2 pt-2 pb-2">
                <Botao
                  preset="Sair"
                  tamanhoPadrao="pequeno"
                  :funcaoClick="abreFechaCriaStatus"
                ></Botao>
              </div>
              <div class="pr-2 pt-2 pb-2">
                <Botao
                  preset="Confirmar"
                  tamanhoPadrao="pequeno"
                  :funcaoClick="criaStatus"
                ></Botao>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="propriedadeSendoCriada">
        <div v-if="propriedadeSendoCriada" class="h-full flex flex-row pl-12 pt-6 pb-6">
          <!-- fiz como um popUp, tem um botão que abre o popUp -->
          <div class="animation">
            <div class="flex justify-start">
              <img src="../imagem-vetores/trianguloStart.svg" />
            </div>
            <div class="flex flex-row justify-between">
              <div class="pl-2">
                <Input
                  largura="10"
                  conteudoInput="Nome Propriedade"
                  fontSize="1rem"
                  altura="3.8"
                  v-model="nomePropriedade"
                ></Input>
              </div>
              <div class="pr-2">
                <selectPadrao
                  placeholderSelect="Tipo"
                  :lista-select="['Texto', 'Data', 'Numero', 'Seleção']"
                  largura="5"
                  altura="3.8"
                  fonteTamanho="1rem"
                  v-model="tipoPropriedade"
                >
                </selectPadrao>
              </div>
            </div>
            <div class="flex felx-row justify-between">
              <div class="pl-2 pt-2 pb-2">
                <Botao
                  preset="Sair"
                  tamanhoPadrao="pequeno"
                  :funcaoClick="abreFechaCriaPropriedades"
                ></Botao>
              </div>
              <div class="pr-2 pt-2 pb-2">
                <Botao
                  preset="Confirmar"
                  tamanhoPadrao="pequeno"
                  :funcaoClick="criaPropriedade"
                ></Botao>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="subtarefaSendoCriada">
        <div v-if="subtarefaSendoCriada" class="h-full flex flex-row pl-12 pt-6 pb-6">
          <!-- fiz como um popUp, tem um botão que abre o popUp -->
          <div class="animation">
            <div class="flex justify-start">
              <img src="../imagem-vetores/trianguloStart.svg" />
            </div>
            <div class="flex flex-row justify-between">
              <div class="pl-2">
                <Input
                  largura="10"
                  conteudoInput="Nome Status"
                  fontSize="1rem"
                  altura="3.8"
                  v-model="nomeSubtarefa"
                ></Input>
              </div>
              <selectPadrao
                placeholderSelect="Status"
                :lista-select="['Em Progresso', 'Concluido']"
                largura="5"
                altura="3.8"
                fonteTamanho="1rem"
                v-model="statusSubtarefa"
              />
            </div>
            <div class="flex felx-row justify-between">
              <div class="pl-2 pt-2 pb-2">
                <Botao
                  preset="Sair"
                  tamanhoPadrao="pequeno"
                  :funcaoClick="abreFechaCriaSubTarefas"
                ></Botao>
              </div>
              <div class="pr-2 pt-2 pb-2">
                <Botao
                  preset="Confirmar"
                  tamanhoPadrao="pequeno"
                  :funcaoClick="criaSubtarefa"
                ></Botao>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p class="pl-12 mt-4">Arquivos({{ numeroDeArquivos }})...</p>
      <div
        id="exploradorDeArquivos"
        v-if="numeroDeArquivos != 0"
        class="flex gap-4 h-[18vh] w-[80%] bg-[#D7D7D7] ml-12 mt-4 overflow-auto"
      >
        <p></p>
        <!-- v-for com os arquivos -->
      </div>
      <div class="pl-12 mt-4">
        <Botao
          preset="PadraoVazadoIcon"
          :icon="iconAnexo"
          tamanhoDaBorda="2px"
          texto="Anexar"
          tamanhoPadrao="pequeno"
          inverterCorIcon="sim"
        ></Botao>
      </div>
      <div class="pl-12 mt-4">
        <h1>SubTarefas</h1>
        <div class="flex items-center">
          <div class="h-[1vh] w-[58%] bg-[#D7D7D7]">
            <div :style="barraPorcentagem"></div>
          </div>
          <p class="pl-4">Tarefas Concluidas {{ porcentagemDeTarefasConcluidas }}%</p>
        </div>
      </div>
      <!-- Sub Tarefa -->
      <div
        class="pl-12 max-h-[20vh] gap-8 w-[90%] flex flex-col mt-2 overflow-auto"
        id="subtarefaOverflow"
      >
        <div v-for="(subtarefa, index) of subtarefas" :key="subtarefa.id">
          <div class="flex h-[2vh] w-full justify-between items-center mt-2 mb-2">
            <div class="flex gap-2">
              <CheckBox
                class="flex justify-center"
                @click="trocaStatusDaSubTarefa(subtarefa, index)"
                :ativoProps="subtarefa.concluida"
              ></CheckBox>
              <p>{{ subtarefa.nome }}</p>
            </div>
            <div class="flex gap-2 justify-center">
              <p>Status:</p>
              <div v-if="subtarefa.concluida">
                <p class="flex items-center justify-center bg-[#7CC0E5]">Concluído</p>
              </div>
              <div v-else>
                <p class="flex items-center justify-center bg-[#C6B473]">Em Progresso</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Fazer um v-for de propriedades -->
      <div class="pl-12 mt-4">
        <div class="flex text-xl">
          <p>Comentarios</p>
          <button class="ml-2" @click="abreFechaComentario()">+</button>
        </div>
        <div v-if="abreFechaComentarioBoolean" class="w-[85%] flex flex-col">
          <div class="w-[100%] border-2 mt-4 mb-4 shadow-lg min-h-[10vh] flex">
            <img
              :src="usuario.fotoDoAutor"
              class="shadow-2xl h-[65px] mr-4 ml-4 pt-4 rounded-full"
            />
            <div class="pb-2 flex flex-col items-end">
              <TextAreaPadrao
                width="25vw"
                height="15vh"
                class="pt-6 pb-4"
                placeholder="Descrição da tarefa"
                tamanho-da-fonte="1rem"
                resize="vertical"
                v-model="comentarioSendoEnviado"
              ></TextAreaPadrao>
              <Botao
                texto="Enviar"
                preset="PadraoRoxo"
                tamanhoPadrao="pequeno"
                :funcaoClick="enviaComentario"
                :parametrosFuncao="[
                  comentarioSendoEnviado,
                  usuario.nome,
                  usuario.fotoDoAutor,
                ]"
              ></Botao>
            </div>
          </div>
        </div>
        <div class="w-[85%] flex flex-col">
          <div v-for="comentario of Comentarios">
            <div class="w-[100%] border-2 mt-4 mb-4 shadow-lg min-h-[10vh] flex">
              <img
                :src="comentario.fotoDoAutor"
                class="shadow-2xl h-[65px] mr-4 ml-4 pt-4 rounded-full"
              />
              <div class="pt-6">
                <p>
                  {{ comentario.autor }}
                </p>
                <p class="pt-4 pb-4 pr-4 break-all">
                  {{ comentario.comentario }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Propriedades e Status -->
    <div class="w-[40vw] items-center min-h-[96%] flex flex-col">
      <div class="w-[80%] h-[80vh] shadow-2xl border-2">
        <div class="flex justify-around h-[4%]">
          <button
            class="w-[33%]"
            @click="clicouOpcaoPropriedades()"
            :style="estiloBotaoPropriedades"
          >
            Propriedades
          </button>
          <button class="w-[33%]" @click="clicouOpcaoStatus()" :style="estiloBotaoStatus">
            Status
          </button>
          <select class="w-[33%] flex text-center">
            <option>Procurar Por</option>
          </select>
        </div>

        <div
          v-if="opcaoEstaClicadaPropriedades"
          class="h-[96%] w-[100%] pt-4 flex flex-col gap-4 overflow-y-auto"
        >
          <div
            v-for="(propriedade, index) in propriedades"
            :key="index"
            class="w-[100%] min-h-[3vh] gap-2 flex flex-col items-center justify-center"
          >
            <div
              class="w-[100%] min-h-[3vh] gap-2 pl-4 flex flex-row items-center justify-center"
            >
              <div class="flex gap-2 items-center w-[40%]">
                <CheckBox
                  @click="adicionaExcluiPropriedadeNaTarefa(propriedade, index)"
                  :ativoProps="propriedade.estaNaTarefa"
                ></CheckBox>
                <p class="break-all">{{ propriedade.nome }}</p>
              </div>
              <div class="w-[30%]">
                <p>Tipo: {{ propriedade.tipo }}</p>
              </div>
              <div class="w-[30%]">
                <button
                  @click="editarPropriedade(index, propriedade.valor)"
                  class="w-[85%] h-[100%] bg-[#DBB3FF] rounded-md"
                >
                  Valor
                </button>
              </div>
            </div>
            <div
              class="w-[100%] pl-4 min-h-[5vh] flex items-center"
              v-if="propriedade.sendoEditado"
            >
              <Input
                altura="2"
                largura="35"
                conteudoInput=" "
                v-model="propriedade.valor"
                width="80%"
                @input="editarPropriedade(index, propriedade.valor)"
              >
              </Input>
            </div>
          </div>
        </div>
        <div
          v-if="opcaoEstaClicadaStatus"
          class="h-[96%] w-[100%] pt-4 flex flex-col gap-4 overflow-y-auto"
        >
          <div
            v-for="(statsAdd, index) in status"
            :key="index"
            class="w-[100%] min-h-[3vh] gap-4 flex flex-col items-center justify-center"
          >
            <div
              class="w-[100%] min-h-[3vh] gap-16 flex flex-row items-center justify-center"
            >
              <div class="w-[35%] flex gap-2 items-center pl-4">
                <CheckBox @click="adicionaExcluiStatusNaTarefa(statsAdd)"></CheckBox>
                <p class="break-all">{{ statsAdd.nome }}</p>
              </div>
              <p class="w-[30%]">Cor: #{{ statsAdd.cor }}</p>
              <div class="w-[30%] flex justify-center">
                <ColorPicker v-model="statsAdd.cor" class="border-2 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-[80%] flex justify-end pt-8">
        <Botao
          preset="PadraoVazado"
          texto="Concluído"
          tamanhoDaBorda="2px"
          tamanhoDaFonte="1.5rem"
        ></Botao>
      </div>
    </div>

    <div id="propriedadesOverflow">
      <div class="min-h-[9%] pt-8 flex items-end justify-center">
        <h1 class="min-h-[9%] text-3xl font-semibold">Informações</h1>
      </div>
      <div class="gap-4 h-auto pt-4 w-[100%] flex flex-col">
        <div class="flex pl-8">
          <div class="w-[50%] justify-start flex-row">
            <p>Nome do projeto</p>
          </div>
          <div class="w-[40%] justify-end flex-row">
            <p class="w-[100%] text-[#620BA7] break-all">
              asdasd asdasddasdasdasdasdasd asdasdas asdasdasdasd asdasd
            </p>
          </div>
        </div>
        <div class="flex pl-8">
          <div class="w-[50%] justify-start flex-row">
            <p>Responsável</p>
          </div>
          <div class="w-[40%] justify-end flex-row">
            <p class="text-[#620BA7] break-all">Kanye West</p>
          </div>
        </div>
        <div class="flex pl-8">
          <div class="w-[50%] justify-start flex-row">
            <p>Data Inicial</p>
          </div>
          <div class="w-[40%] justify-end flex-row">
            <p class="text-[#620BA7]">13/02/2006</p>
          </div>
        </div>
      </div>
      <div class="min-h-[4%] flex items-center justify-center p-8">
        <h1 class="text-xl font-semibold">Status</h1>
      </div>
      <div
        v-for="status of statusDaTarefa"
        class="min-h-[4%] flex items-center justify-center gap-4"
      >
        <p
          :style="{ 'background-color': '#' + status.cor }"
          class="flex items-center justify-center"
        >
          {{ status.nome }}
        </p>
      </div>
      <div class="min-h-[4%] flex items-center justify-center p-8">
        <h1 class="text-xl font-semibold">Propriedades</h1>
      </div>
      <div
        v-if="propriedadesDaTarefa.length == 0"
        class="h-[35%] flex flex-col items-center justify-center p-8"
      >
        <img :src="NotePad" class="h-[200px] w-[200px]" />
        <p class="text-center">Esta tarefa não possui nenhuma propriedade</p>
      </div>
      <div
        v-if="propriedadesDaTarefa.length != 0"
        class="min-h-[35%] flex flex-col items-center"
      >
        <div
          v-for="propriedade of propriedadesDaTarefa"
          class="flex flex-col justify-around py-4 w-[80%]"
        >
          <p class="pb-4 break-all">Nome: {{ propriedade.nome }}</p>
          <p>Valor: {{ propriedade.valor }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import Input from "../components/Input.vue";
import NotePad from "../imagem-vetores/NotePad.svg";
import Botao from "../components/Botao.vue";
import CheckBox from "../components/checkBox.vue";
import iconAnexo from "../imagem-vetores/anexoIcon.svg";
import { funcaoPopUpStore } from "../stores/funcaoPopUp";
import TextAreaPadrao from "../components/textAreaPadrao.vue";
import ProgressBar from "primevue/progressbar";
import SelectPadrao from "../components/selectPadrao.vue";
import { ref, watch } from "vue";
import navBar from "../components/navBar.vue";
import ColorPicker from "primevue/colorpicker";

let nomePropriedade = ref("");
let tipoPropriedade = ref("");

let nomeStatus = ref("");
let corStatus = ref("");

let nomeSubtarefa = ref("");
let statusSubtarefa = ref("");

//Função que troca o valor da Subtarefa de concluido pra em progresso
function trocaStatusDaSubTarefa(subtarefa, index) {
  subtarefas.value[index].concluida = !subtarefas.value[index].concluida;
  numeroDeTarefasConcluidas.value = numeroDeSubTarefasConcluidas();
  porcentagemDeTarefasConcluidas.value = atualizaPorcentagemDeTarefasConcluidas();
  barraPorcentagem.value.width = porcentagemDeTarefasConcluidas.value + "%";
}

function criaStatus() {
  let statusNovo = {
    nome: nomeStatus.value,
    cor: corStatus.value,
    estaNaTarefa: ref(false),
  };
  status.value.push(statusNovo);
  statusSendoCriado.value = false;
}

function criaSubtarefa() {
  let booleanDaSubtarefa = ref();
  if (statusSubtarefa.value == "Em Progresso") {
    booleanDaSubtarefa.value = false;
  } else if (statusSubtarefa.value == "Concluido") {
    booleanDaSubtarefa.value = true;
  }
  let subtarefaNova = {
    nome: nomeSubtarefa.value,
    concluida: booleanDaSubtarefa.value,
    status: statusSubtarefa.value,
  };
  subtarefas.value.push(subtarefaNova);
  subtarefaSendoCriada.value = false;
  numeroDeTarefasConcluidas.value = numeroDeSubTarefasConcluidas();
  porcentagemDeTarefasConcluidas.value = atualizaPorcentagemDeTarefasConcluidas();
  barraPorcentagem.value.width = porcentagemDeTarefasConcluidas.value + "%";
  numeroDeTarefas.value = subtarefas.value.length;
}

function criaPropriedade() {
  let propriedade = {
    nome: nomePropriedade.value,
    tipo: tipoPropriedade.value,
    valor: "",
    estaNaTarefa: ref(),
  };
  propriedades.value.push(propriedade);
  propriedadeSendoCriada.value = false;
}

let comentarioSendoEnviado = ref("");

let propriedadeSendoCriada = ref(false);
let statusSendoCriado = ref(false);
let subtarefaSendoCriada = ref(false);

function abreFechaCriaStatus() {
  statusSendoCriado.value = !statusSendoCriado.value;
  propriedadeSendoCriada.value = false;
  subtarefaSendoCriada.value = false;
}

function abreFechaCriaPropriedades() {
  propriedadeSendoCriada.value = !propriedadeSendoCriada.value;
  statusSendoCriado.value = false;
  subtarefaSendoCriada.value = false;
}

function abreFechaCriaSubTarefas() {
  subtarefaSendoCriada.value = !subtarefaSendoCriada.value;
  propriedadeSendoCriada.value = false;
  statusSendoCriado.value = false;
}

let statusDaTarefa = ref([]);

function adicionaExcluiStatusNaTarefa(status) {
  status.estaNaTarefa = !status.estaNaTarefa;
  if (status.estaNaTarefa) {
    statusDaTarefa.value.push(status);
    console.log(statusDaTarefa.value);
  } else {
    statusDaTarefa.value.forEach((statusDeletar) => {
      if (statusDeletar === status) {
        statusDaTarefa.value.splice(statusDaTarefa.value.indexOf(statusDeletar), 1);
      }
      console.log(statusDaTarefa.value);
    });
  }
}

function adicionaExcluiPropriedadeNaTarefa(propriedade) {
  propriedade.estaNaTarefa = !propriedade.estaNaTarefa;
  if (propriedade.estaNaTarefa) {
    propriedadesDaTarefa.value.push(propriedade);
  } else {
    propriedadesDaTarefa.value.forEach((propriedadeDeletar) => {
      if (propriedadeDeletar === propriedade) {
        propriedadesDaTarefa.value.splice(
          propriedadesDaTarefa.value.indexOf(propriedadeDeletar),
          1
        );
      }
    });
  }
}

let usuario = {
  nome: "Kanye West",
  fotoDoAutor:
    "data:image/jpeg;base64,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",
};

function enviaComentario(comentario) {
  Comentarios.value.push({
    autor: comentario[1],
    comentario: comentario[0],
    fotoDoAutor: comentario[2],
  });
  comentarioSendoEnviado.value = "";
  abreFechaComentarioBoolean.value = !abreFechaComentarioBoolean.value;
}

const Comentarios = ref([]);

const propriedadesDaTarefa = ref([]);

let ativoPropriedades = ref(false);

const subtarefas = ref([]);

const propriedades = ref([]);

let abreFechaComentarioBoolean = ref(false);

function abreFechaComentario() {
  abreFechaComentarioBoolean.value = !abreFechaComentarioBoolean.value;
}

const status = ref([]);

function numeroDeSubTarefasConcluidas() {
  let numeroDeSubTarefasC = ref(0);
  subtarefas.value.forEach((subtarefa) => {
    if (subtarefa.concluida) {
      numeroDeSubTarefasC.value++;
    }
  });
  return numeroDeSubTarefasC.value;
}

const estaDivValorAberta = ref(false);
let numeroDeArquivos = ref(1);
let numeroDeTarefasConcluidas = ref(numeroDeSubTarefasConcluidas());
let numeroDeTarefas = ref(subtarefas.value.length);
let porcentagemDeTarefasConcluidas = ref(atualizaPorcentagemDeTarefasConcluidas());

let estiloBotaoPropriedades = ref({
  borderBottom: "solid 4px #620BA7",
});
let opcaoEstaClicadaPropriedades = ref(true);
let opcaoEstaClicadaStatus = ref(false);

function trocaSendoEditado(valor) {
  valor = !valor;
}
function editarPropriedade(index, valor) {
  propriedades.value[index].sendoEditado = !propriedades.value[index].sendoEditado;
  propriedades.value[index].valor = valor;
}
function clicouOpcaoPropriedades() {
  if (opcaoEstaClicadaPropriedades.value === false) {
    opcaoEstaClicadaPropriedades.value = true;
    opcaoEstaClicadaStatus.value = false;
    estiloBotaoPropriedades.value = estiloOpcaoClicadoPropriedades;
    estiloBotaoStatus.value = {
      borderBottom: "solid 4px transparent",
    };
  } else {
    opcaoEstaClicadaPropriedades.value = false;
    opcaoEstaClicadaStatus.value = true;
    estiloBotaoPropriedades.value = {
      borderBottom: "solid 4px transparent",
    };
    estiloBotaoStatus.value = estiloOpcaoClicadoStatus;
  }
}

let estiloOpcaoClicadoPropriedades = {
  borderBottom: "solid 4px #620BA7",
};

let estiloBotaoStatus = ref({
  borderBottom: "solid 4px transparent",
});

function clicouOpcaoStatus() {
  if (opcaoEstaClicadaStatus.value === false) {
    opcaoEstaClicadaStatus.value = true;
    opcaoEstaClicadaPropriedades.value = false;
    estiloBotaoPropriedades.value = {
      borderBottom: "solid 4px transparent",
    };
    estiloBotaoStatus.value = estiloOpcaoClicadoStatus;
  } else {
    opcaoEstaClicadaStatus.value = false;
    opcaoEstaClicadaPropriedades.value = true;
    estiloBotaoPropriedades.value = estiloOpcaoClicadoPropriedades;
    estiloBotaoStatus.value = {
      borderBottom: "solid 4px transparent",
    };
  }
}

let estiloOpcaoClicadoStatus = {
  borderBottom: "solid 4px #620BA7",
};

function atualizaPorcentagemDeTarefasConcluidas() {
  let porcentagem = (numeroDeTarefasConcluidas.value / numeroDeTarefas.value) * 100;
  if (numeroDeTarefas.value === 0) {
    porcentagem = 0;
  }
  return porcentagem;
}

watch(() => {
  clicouOpcaoStatus();
  clicouOpcaoPropriedades();
});

let barraPorcentagem = ref({
  width: porcentagemDeTarefasConcluidas.value + "%",
  height: "100%",
  borderRadius: "0px",
  backgroundColor: "#620BA7",
  border: "none",
  boxShadow: "none",
});

const funcaoPopUp = funcaoPopUpStore();
const props = defineProps({
  listaSelect: [],
  styleSelect: String,
});
</script>
<style scoped>
#fundoPopUp {
  background-color: #36213e;
  display: flex;
  justify-content: center;
  align-items: center;
}

#bgBranco {
  height: 96%;
  background-color: #ffffff;
}

#bordaCinza {
  height: 96%;
  width: 28%;
  background-color: #c4c4c4;
  clip-path: polygon(60% 0, 0 0, 0 100%, 58% 100%, 100% 82%, 100% 18%);
}
#propriedadesOverflow {
  width: 20vw;
  border: 2px solid;
  gap: 8px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  min-height: 88vh;
  max-height: 88vh;
  height: auto; /* Allow automatic height adjustment */
}
#botao-sair {
  width: 4%;
  height: 4%;
}
.blur-background {
  @apply fixed inset-0 w-full h-full bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg absolute;
}

.animation {
  @apply w-[60%] bg-brancoNeve shadow-md flex justify-around flex-col;
  animation: myAnim 0.15s ease 0s 1 normal none;
  /*isso é opcional */
}

@keyframes myAnim {
  0% {
    opacity: 0;
    transform: translateY(50px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

#exploradorDeArquivos::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.3);
  height: 6px;
  background-color: #f1f1f1;
}

#exploradorDeArquivos::-webkit-scrollbar {
  height: 8px;
  background-color: #f1f1f1;
}

#exploradorDeArquivos::-webkit-scrollbar-thumb {
  height: 6px;
  -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.3);
  background-color: #d8d8d8;
}

#bgBranco::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.3);
  width: 6px;
  background-color: #f1f1f1;
}

#bgBranco::-webkit-scrollbar {
  width: 8px;
  background-color: #f1f1f1;
}

#bgBranco::-webkit-scrollbar-thumb {
  width: 6px;
  -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.3);
  background-color: #d8d8d8;
}

#propriedadesOverflow::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.3);
  width: 6px;
  background-color: #f1f1f1;
}

#propriedadesOverflow::-webkit-scrollbar {
  width: 8px;
  background-color: #f1f1f1;
}

#propriedadesOverflow::-webkit-scrollbar-thumb {
  width: 6px;
  -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.3);
  background-color: #d8d8d8;
}

#subtarefaOverflow::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.3);
  width: 6px;
  background-color: #f1f1f1;
}

#subtarefaOverflow::-webkit-scrollbar {
  width: 8px;
  background-color: #f1f1f1;
}

#subtarefaOverflow::-webkit-scrollbar-thumb {
  width: 6px;
  -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.3);
  background-color: #d8d8d8;
}

#filtroDeSubTarefa {
  font-size: small;
}
option {
  font-size: small;
  border: 1px solid #cbcbcb;
}
</style>
