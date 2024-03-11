<template>
  <navBar></navBar>
  <div id="bgBranco" class="flex flex-row min-h-[96%] w-full">
    <div class="w-[40vw] min-h-[96%] flex flex-col">
      <div class="flex flex-row pl-12 items-center pr-6 mt-4 h-[10%] w-[100%]">
        <Input
          largura="32"
          altura="6"
          fontSize="2rem"
          conteudoInput="Nome da tarefa"
          styleInput="input-transparente-claro-grande"
          v-model="tarefa.nome"
        ></Input>
      </div>
      <div class="flex flex-col pl-12 min-h-[16vh] mt-4 w-[90%] flex">
        <TextAreaPadrao
          width="80%"
          height="16vh"
          placeholder="Descrição da tarefa"
          tamanho-da-fonte="1rem"
          resize="none"
          v-model="tarefa.descricao"
        ></TextAreaPadrao>
      </div>
      <div class="flex pl-12 items-center justify-between mt-4 h-[5%] w-[72%]">
        <div class="flex flex-col justify-center w-[38%]">
          <p>Propriedades</p>
          <button
            class="flex flex-col justify-center h-[70%]"
            @click="abreFechaCriaPropriedades()"
          >
            + Criar
          </button>
        </div>
        <div class="flex flex-col justify-center w-[30%]">
          <p>Status</p>
          <button
            class="flex flex-col justify-center break-keep h-[70%]"
            @click="abreFechaCriaStatus()"
          >
            + Criar
          </button>
        </div>
        <div class="flex flex-col justify-center w-[30%]">
          <p>SubTarefas</p>
          <button
            class="flex flex-col justify-center h-[70%]"
            @click="abreFechaCriaSubTarefas()"
          >
            + Criar
          </button>
        </div>
      </div>
      <!-- Pop-Up utilizado para criar status -->
      <div v-if="statusSendoCriado">
        <div v-if="statusSendoCriado" class="h-full flex flex-row pl-12 pt-6 pb-6">
          <div class="animation">
            <div class="flex justify-start">
              <img src="../imagem-vetores/trianguloStart.svg" />
            </div>
            <div class="flex flex-row justify-between items-end">
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

      <!-- Pop-Up para criar uma propriedade -->

      <div v-if="propriedadeSendoCriada">
        <div v-if="propriedadeSendoCriada" class="h-full flex flex-row pl-12 pt-6 pb-6">
          <!-- fiz como um popUp, tem um botão que abre o popUp -->
          <div class="animation">
            <div class="flex justify-start">
              <img src="../imagem-vetores/trianguloStart.svg" />
            </div>
            <div class="flex flex-row justify-between items-end">
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
            <div class="flex felx-row justify-between items-end">
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
          <div class="animation">
            <div class="flex justify-start">
              <img src="../imagem-vetores/trianguloStart.svg" />
            </div>
            <div class="flex flex-row justify-between items-end">
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
                largura="8"
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
                :model-value="subtarefa.concluida"
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
            <img @click="deletaSubtarefa(subtarefa)" :src="BotaoX" class="h-full mr-8" />
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
              class="shadow-2xl max-h-[60px] min-w-[60px] mt-4 mr-4 ml-4 rounded-full"
              :src="
                'data:' +
                usuarioCookies.foto.tipo +
                ';base64,' +
                usuarioCookies.foto.dados
              "
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
                :parametrosFuncao="[comentarioSendoEnviado, usuarioCookies]"
              ></Botao>
            </div>
          </div>
        </div>
        <div class="w-[85%] flex flex-col">
          <div v-for="comentario of tarefa.comentarios">
            <div
              class="w-[100%] border-2 mt-2 mb-2 shadow-lg min-h-[10vh] items-end flex flex-col"
            >
              <div class="w-[15%] gap-4 flex justify-center">
                <div
                  v-if="comentario.autor === usuarioCookies.username"
                  class="w-[80%] mt-2 gap-4 flex justify-center"
                >
                  <img
                    class="w-[25%]"
                    :src="iconeLapisPreto"
                    @click="trocaComentarioSendoEditado"
                  />
                  <img
                    @click="deletaComentario(comentario)"
                    class="w-[25%]"
                    :src="BotaoX"
                  />
                </div>
                <div
                  v-if="comentario.autor != usuarioCookies.username"
                  class="w-[80%] mt-6 gap-4 flex justify-center"
                ></div>
              </div>
              <div class="flex w-[100%] mb-2">
                <img
                  :src="
                    'data:' + comentario.foto.tipo + ';base64,' + comentario.foto.dados
                  "
                  class="shadow-2xl max-h-[60px] min-h-[60px] min-w-[60px] max-w-[60px] mr-4 ml-4 rounded-full"
                />
                <div class="w-[80%]">
                  <p>
                    {{ comentario.autor }}
                  </p>

                  <div
                    v-if="
                      comentarioSendoEditado &&
                      comentario.autor === usuarioCookies.username
                    "
                  >
                    <TextAreaPadrao
                      width="25vw"
                      height="15vh"
                      class="pt-4 pb-4"
                      placeholder="Descrição da tarefa"
                      tamanho-da-fonte="1rem"
                      resize="vertical"
                      v-model="comentario.comentario"
                    ></TextAreaPadrao>
                  </div>
                  <div
                    v-if="
                      !comentarioSendoEditado ||
                      comentario.autor != usuarioCookies.username
                    "
                  >
                    <p class="pt-4 pb-4 pr-4 break-all">
                      {{ comentario.comentario }}
                    </p>
                  </div>
                  <div
                    v-if="
                      comentarioSendoEditado &&
                      comentario.autor === usuarioCookies.username
                    "
                  >
                    <Botao
                      texto="Editar"
                      preset="PadraoRoxo"
                      tamanhoPadrao="pequeno"
                      :funcaoClick="editarComentario"
                      :parametrosFuncao="comentario"
                    ></Botao>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Propriedades e Status -->
    <div class="w-[40vw] items-center min-h-[96%] flex flex-col">
      <div class="w-[80%] h-[80vh] shadow-xl border-2">
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
          <div
            v-if="opcaoEstaClicadaPropriedades"
            class="w-[33%] flex items-center justify-center"
          >
            <select
              class="flex text-center w-[100%]"
              v-model="parametroDoFiltroPropriedade"
            >
              <option selected="selected">Ordenar Por</option>
              <option>Texto</option>
              <option>Data</option>
              <option>Numero</option>
              <option>Seleção</option>
            </select>
          </div>
          <div
            v-if="opcaoEstaClicadaStatus"
            class="w-[33%] flex items-center justify-center"
          >
            <select class="flex text-center w-[100%]" v-model="parametroDoFiltroStatus">
              <option value="Ordenar Por">Ordenar Por</option>
              <option value="az">A - Z</option>
              <option value="za">Z - A</option>
            </select>
          </div>
        </div>

        <div
          v-if="opcaoEstaClicadaPropriedades"
          class="h-[96%] w-[100%] pt-4 flex flex-col gap-4 overflow-y-auto"
        >
          <div
            v-for="(propriedade, index) in listaFiltradaPropriedades"
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
              <div class="flex justify-center">
                <img
                  class="w-[100%] mr-4"
                  @click="deletaPropriedade(propriedade)"
                  :src="BotaoX"
                />
              </div>
            </div>
            <div
              class="w-[100%] min-h-[5vh] flex items-center justify-center"
              v-if="propriedade.sendoEditado"
            >
              <div v-if="propriedade.tipo === 'Texto'">
                <Input
                  altura="2"
                  largura="28"
                  conteudoInput=" "
                  v-model="propriedade.valor"
                  width="80%"
                  @input="editarPropriedade(index, propriedade.valor)"
                >
                </Input>
              </div>
              <div v-if="propriedade.tipo === 'Data'">
                <Calendar
                  class="border-2 rounded-lg border-[#620BA7]"
                  border
                  v-model="propriedade.valor"
                  dateFormat="dd/mm/yy"
                  showIcon
                  iconDisplay="input"
                />
              </div>
              <div v-if="propriedade.tipo === 'Numero'">
                <InputNumber
                  class="border-2 rounded-lg border-[#620BA7]"
                  showIcon
                  iconDisplay="input"
                  v-model="propriedade.valor"
                  inputId="minmaxfraction"
                  minFractionDigits="0"
                  maxFractionDigits="2"
                />
              </div>
              <div v-if="propriedade.tipo === 'Seleção'">
                <div v-for="(valor, index) in propriedade.valor" class="pt-4 flex">
                  <Input
                    altura="2"
                    largura="27"
                    conteudoInput=" "
                    v-model="propriedade.valor[index]"
                    width="60%"
                    @input="editarPropriedade(index, valor)"
                  >
                  </Input>
                  <img
                    class="w-[100%] ml-2"
                    @click="deletaValorSelect(propriedade.valor, index)"
                    :src="BotaoX"
                  />
                </div>
                <p class="pl-2 pt-2" @click="adicionaValorSelect(propriedade.valor)">
                  Adicionar +
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="opcaoEstaClicadaStatus"
          class="h-[96%] w-[100%] pt-4 flex flex-col gap-4 overflow-y-auto"
        >
          <div
            v-for="(statsAdd, index) in listaFiltradaStatus"
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
              <div class="w-[40%] flex justify-between">
                <ColorPicker v-model="statsAdd.cor" class="border-2 rounded-lg ml-16" />
                <div class="flex justify-center">
                  <img
                    class="w-[100%] mr-4"
                    @click="deletaStatus(statsAdd)"
                    :src="BotaoX"
                  />
                </div>
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

    <div id="propriedadesOverflow" class="shadow-xl border-2">
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
        v-for="status of tarefa.statusDaTarefa"
        class="min-h-[4%] flex items-center justify-center gap-4"
      >
        <p
          :style="{ 'background-color': '#' + status.cor, color: corDaFonte(status.cor) }"
          class="flex items-center border-2 shadow-md justify-center px-4"
        >
          {{ status.nome }}
        </p>
      </div>
      <div class="min-h-[4%] flex items-center justify-center p-8">
        <h1 class="text-xl font-semibold">Propriedades</h1>
      </div>
      <div
        v-if="tarefa.propriedades.length === 0"
        class="h-[35%] flex flex-col items-center justify-center p-8"
      >
        <img :src="NotePad" class="h-[200px] w-[200px]" />
        <p class="text-center">Esta tarefa não possui nenhuma propriedade</p>
      </div>
      <div
        v-if="tarefa.propriedades.length != 0"
        class="min-h-[35%] flex flex-col items-center"
      >
        <div
          v-for="propriedade of tarefa.propriedades"
          class="flex flex-col justify-around py-4 w-[80%]"
        >
          <p class="pb-4 break-all">Nome: {{ propriedade.nome }}</p>
          <div v-if="propriedade.tipo === 'Data'">
            <p>Valor: {{ format(new Date(propriedade.valor), "dd/MM/yyyy") }}</p>
          </div>
          <div v-if="propriedade.tipo === 'Seleção'" class="flex">
            <p>Valor:</p>
            <select class="flex text-center w-[80%]">
              <option v-for="valor in propriedade.valor">{{ valor }}</option>
            </select>
          </div>
          <div v-else>
            <p>Valor: {{ propriedade.valor }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { format } from "date-fns";
import Input from "../components/Input.vue";
import NotePad from "../imagem-vetores/NotePad.svg";
import Botao from "../components/Botao.vue";
import CheckBox from "../components/checkBox.vue";
import iconAnexo from "../imagem-vetores/anexoIcon.svg";
import TextAreaPadrao from "../components/textAreaPadrao.vue";
import { ref, watch } from "vue";
import selectPadrao from "../components/selectPadrao.vue";
import navBar from "../components/navBar.vue";
import ColorPicker from "primevue/colorpicker";
import BotaoX from "../imagem-vetores/XPreto.svg";
import InputNumber from "primevue/inputnumber";
import Calendar from "primevue/calendar";
import iconeLapisPreto from "../imagem-vetores/icon-lapis-preto.svg";
import { computed } from "vue";
import { onUpdated, onMounted } from "vue";
import VueCookies from "vue-cookies";
import tinycolor from "tinycolor2";
import { conexaoBD } from "../stores/conexaoBD.js";

const banco = conexaoBD();

const parametroDoFiltroStatus = ref("Ordenar Por");

const parametroDoFiltroPropriedade = ref("Ordenar Por");

//Variavel utilizada para armazenar os comentarios da tarefa

const Comentarios = ref([]);

//Variavel que armazena as Subtarefas atreladas a tarefa

const subtarefas = ref([]);

//Variavel que armazena as propriedades que podem ser atreladas a tarefa

const propriedades = ref([]);

//Variavel que armazena os status que podem ser atreladas a tarefa

const status = ref([]);

//Estilização usando Java Script

let estiloBotaoPropriedades = ref({
  borderBottom: "solid 4px #620BA7",
});

let estiloOpcaoClicadoPropriedades = {
  borderBottom: "solid 4px #620BA7",
};

let estiloBotaoStatus = ref({
  borderBottom: "solid 4px transparent",
});

let estiloOpcaoClicadoStatus = {
  borderBottom: "solid 4px #620BA7",
};

//Varaivel utilizada para armazenar quantos arquivos foram atrelados a tarefa
let numeroDeArquivos = ref(0);

//Variáveis usadas na hora de criar uma propriedade

let nomePropriedade = ref("");
let tipoPropriedade = ref("Texto");

//Variáveis utiliazadas na hora de criar um status

let nomeStatus = ref("");
let corStatus = ref("ff0000");

//Variaveis utilizadas na hora de criar uma subtarefa

let nomeSubtarefa = ref("");
let statusSubtarefa = ref("Em Progresso");

function corDaFonte(backgroundColor) {
  const isLight = tinycolor(backgroundColor).isLight();
  return isLight ? "#000" : "#fff";
}

//Função utilizada para criar um Status

function criaStatus() {
  if (nomeStatus.value != "") {
    let statusNovo = {
      nome: nomeStatus.value,
      cor: corStatus.value,
      estaNaTarefa: ref(false),
    };
    nomeStatus.value = "";
    status.value.push(statusNovo);
    statusSendoCriado.value = false;
  }
}

//Função que deleta status

function deletaStatus(stat) {
  status.value.forEach((statParaDeletar) => {
    if (stat === statParaDeletar) {
      status.value.splice(status.value.indexOf(stat), 1);
    }
  });
  tarefa.value.statusDaTarefa.forEach((statParaDeletar) => {
    if (stat === statParaDeletar) {
      tarefa.value.statusDaTarefa.splice(tarefa.value.statusDaTarefa.indexOf(stat), 1);
    }
  });
}

function adicionaValorSelect(listaSelect) {
  listaSelect.push("");
}

function deletaValorSelect(listaSelect, index) {
  listaSelect.splice(index, 1);
}

//Função utilizada para criar uma Subtarefa

function criaSubtarefa() {
  if (nomeSubtarefa.value != "") {
    if (statusSubtarefa.value === "") {
      nomeSubtarefa.value = "";
    }
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
    numeroDeTarefas.value = subtarefas.value.length;
    numeroDeTarefasConcluidas.value = numeroDeSubTarefasConcluidas();
    porcentagemDeTarefasConcluidas.value = atualizaPorcentagemDeTarefasConcluidas();
    barraPorcentagem.value.width = porcentagemDeTarefasConcluidas.value + "%";
  }
}

//Função utilizada para deletar uma Subtarefa

function deletaSubtarefa(subtarefa) {
  subtarefas.value.forEach((subtarefaParaDeletar) => {
    if (subtarefaParaDeletar === subtarefa) {
      subtarefas.value.splice(subtarefas.value.indexOf(subtarefa), 1);
    }
  });
  numeroDeTarefas.value = subtarefas.value.length;
  numeroDeTarefasConcluidas.value = numeroDeSubTarefasConcluidas();
  porcentagemDeTarefasConcluidas.value = atualizaPorcentagemDeTarefasConcluidas();
  barraPorcentagem.value.width = porcentagemDeTarefasConcluidas.value + "%";
}

//Função utilizada para criar uma Propriedade

function criaPropriedade() {
  if (
    tipoPropriedade.value != "Data" &&
    tipoPropriedade.value != "Numero" &&
    tipoPropriedade.value != "Seleção"
  ) {
    tipoPropriedade.value = "Texto";
  }
  if (
    tipoPropriedade.value != "Escolha o Tipo" &&
    tipoPropriedade.value != null &&
    tipoPropriedade.value != "" &&
    tipoPropriedade.value != " "
  ) {
    if (nomePropriedade.value != "") {
      let propriedade = {
        nome: nomePropriedade.value,
        tipo: tipoPropriedade.value,
        valor: "",
        estaNaTarefa: ref(),
      };
      if (tipoPropriedade.value === "Seleção") {
        propriedade.valor = ref([]);
      }
      nomePropriedade.value = "";
      tipoPropriedade.value = "";
      propriedades.value.push(propriedade);
      propriedadeSendoCriada.value = false;
    }
  }
}

//Função que deleta uma propriedade

function deletaPropriedade(propriedade) {
  propriedades.value.forEach((propriedadeParaDeletar) => {
    if (propriedadeParaDeletar === propriedade) {
      propriedades.value.splice(propriedades.value.indexOf(propriedade), 1);
    }
  });
  tarefa.value.propriedades.forEach((propriedadeParaDeletar) => {
    if (propriedadeParaDeletar === propriedade) {
      tarefa.value.propriedades.splice(
        tarefa.value.propriedades.indexOf(propriedade),
        1
      );
    }
  });
}

async function procuraPropriedadesDoBanco(){
  let projetos = banco.procurar("projeto")
  for(projeto in projetos){
    if(projeto.id == tarefa.projetoId){
      propriedades.value = tarefa.propriedades
    }
  }
}

//Variavel utilizada para armazenar um comentario ainda nao enviado
let comentarioSendoEnviado = ref("");

let tarefa = ref({
  nome: "",
  descricao: "",
  arquivos: [],
  comentarios: [],
  propriedades: [],
  statusDaTarefa: [],
  projetoId: VueCookies.get("IdProjetoAtual"),
});

onUpdated(() => {
  localStorage.setItem("TarefaNaoFinalizada", JSON.stringify(tarefa.value));
});

onMounted(() => {
  autenticaUsuarioCookies();
  autenticarUsuario();
  procuraPropriedadesDoBanco();
  VueCookies.set("IdProjetoAtual", 28, 100000000000)
  tarefa.value = {
    nome: "",
    descricao: "",
    arquivos: [],
    comentarios: [],
    propriedades: [],
    statusDaTarefa: [],
    projetoId: VueCookies.get("IdProjetoAtual"), 
  };
  const localStorageData = localStorage.getItem("TarefaNaoFinalizada");
  if (localStorageData) {
  tarefa.value = JSON.parse(localStorageData);
  localStorage.setItem("TarefaNaoFinalizada", JSON.stringify(tarefa.value));
  }
});
//Variaveis utilizadas para verificar se o popup abre ou fecha

let propriedadeSendoCriada = ref(false);

let statusSendoCriado = ref(false);

let subtarefaSendoCriada = ref(false);

//Funções que trocam os valores das variaveis instanciadas acima

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

//Funções que removem e adicionam os status e propriedades da tarefa

function adicionaExcluiStatusNaTarefa(status) {
  status.estaNaTarefa = !status.estaNaTarefa;
  if (status.estaNaTarefa) {
    tarefa.value.statusDaTarefa.push(status);
  } else {
    tarefa.value.statusDaTarefa.forEach((statusDeletar) => {
      if (statusDeletar === status) {
        tarefa.value.statusDaTarefa.splice(tarefa.value.statusDaTarefa.indexOf(statusDeletar), 1);
      }
    });
  }
}
function adicionaExcluiPropriedadeNaTarefa(propriedade) {
  propriedade.estaNaTarefa = !propriedade.estaNaTarefa;
  if (propriedade.estaNaTarefa) {
    tarefa.value.propriedades.push(propriedade);
  } else {
    tarefa.propriedades.forEach((propriedadeDeletar) => {
      if (propriedadeDeletar === propriedade) {
        tarefa.value.propriedades.splice(
          tarefa.value.propriedades.indexOf(propriedadeDeletar),
          1
        );
      }
    });
  }
}

//Usuario Logado

let usuarioId = VueCookies.get("IdUsuarioCookie");

let usuarioCookies;


async function autenticaUsuarioCookies() {
  usuarioCookies = await autenticarUsuario(usuarioId);
}

async function autenticarUsuario(id) {
  let usuarios = banco.procurar("/usuario");
  let listaUsuarios = await usuarios;
  return listaUsuarios.find((usuario) => usuario.id == id);
}

//Variavel utilizada para abrir e fechar os comentarios

let abreFechaComentarioBoolean = ref(false);

//Função utilizada para abrir e fechar os comentarios

function abreFechaComentario() {
  console.log(usuarioCookies);
  console.log(tarefa.propriedades);
  abreFechaComentarioBoolean.value = !abreFechaComentarioBoolean.value;
}

//Função que publica o comentario na tarefa

function enviaComentario(comentario) {
  tarefa.value.comentarios.push({
    autor: comentario[1].username,
    comentario: comentario[0],
    foto: comentario[1].foto,
  });
  comentarioSendoEnviado.value = "";
  abreFechaComentarioBoolean.value = !abreFechaComentarioBoolean.value;
}

//

function deletaComentario(comentario) {
  tarefa.value.comentarios.forEach((comentarioParaDeletar) => {
    if (comentarioParaDeletar === comentario) {
      tarefa.value.comentarios.splice(tarefa.value.comentarios.indexOf(comentario), 1);
    }
  });
}

//Função que troca o valor da variavel de comentario sendo editado

function trocaComentarioSendoEditado() {
  comentarioSendoEditado.value = !comentarioSendoEditado.value;
}

function editarComentario(comentario) {
  if (comentario.comentario === "") {
    deletaComentario(comentario);
  }
  trocaComentarioSendoEditado();
}

const listaFiltradaStatus = computed(() => {
  if (
    parametroDoFiltroStatus.value === "Ordenar Por" ||
    parametroDoFiltroStatus.value === ""
  ) {
    // Check for empty string
    return status.value;
  }
  switch (parametroDoFiltroStatus.value) {
    case "az":
      return status.value.sort((a, b) =>
        a.nome > b.nome ? 1 : b.nome > a.nome ? -1 : 0
      );
    case "za":
      return status.value.sort((a, b) =>
        a.nome < b.nome ? 1 : b.nome < a.nome ? -1 : 0
      );
  }
});

const listaFiltradaPropriedades = computed(() => {
  if (parametroDoFiltroPropriedade.value === "Ordenar Por") {
    // Check for empty string
    return propriedades.value;
  }

  return propriedades.value.filter(
    (propriedade) => propriedade.tipo === parametroDoFiltroPropriedade.value
  );
});
//Função utilizada para contabilizar quantas subtarefas da lista já estão com o status de concluida

function numeroDeSubTarefasConcluidas() {
  let numeroDeSubTarefasC = ref(0);
  subtarefas.value.forEach((subtarefa) => {
    if (subtarefa.concluida) {
      numeroDeSubTarefasC.value++;
    }
  });
  return numeroDeSubTarefasC.value;
}

//Função que faz a conta da porcentagem de tarefas concluidas

function atualizaPorcentagemDeTarefasConcluidas() {
  let porcentagem = (numeroDeTarefasConcluidas.value / numeroDeTarefas.value) * 100;
  if (numeroDeTarefas.value === 0) {
    porcentagem = 0;
  }
  return porcentagem;
}

//Armazena a informação da função de quantas tarefas foram concluidas

let numeroDeTarefasConcluidas = ref(numeroDeSubTarefasConcluidas());

//Armazena o tamanho da lista de subtarefas para que a conta de porcentagem possa ser feita

let numeroDeTarefas = ref(subtarefas.value.length);

//Armazena as informações da conta de porcentagem de quantas tarefas foram concluidas

let porcentagemDeTarefasConcluidas = ref(atualizaPorcentagemDeTarefasConcluidas());

//Armazena se o comentario já enviado está sendo editado ou não

let comentarioSendoEditado = ref(false);

//Função que troca o valor da Subtarefa de concluido pra em progresso

function trocaStatusDaSubTarefa(subtarefa, index) {
  subtarefas.value[index].concluida = !subtarefas.value[index].concluida;
  numeroDeTarefasConcluidas.value = numeroDeSubTarefasConcluidas();
  porcentagemDeTarefasConcluidas.value = atualizaPorcentagemDeTarefasConcluidas();
  barraPorcentagem.value.width = porcentagemDeTarefasConcluidas.value + "%";
}

//Estilo da barra de porcentagem

let barraPorcentagem = ref({
  width: porcentagemDeTarefasConcluidas.value + "%",
  height: "100%",
  borderRadius: "0px",
  backgroundColor: "#620BA7",
  border: "none",
  boxShadow: "none",
});

//Edita o valor ja presenta na proriedade
function editarPropriedade(index, valor) {
  propriedades.value[index].sendoEditado = !propriedades.value[index].sendoEditado;
  propriedades.value[index].valor = valor;
}

//Variavel utilizada para mostrar o display onde mostra os status e as propriedades que pode adicionar na tarefa

let opcaoEstaClicadaPropriedades = ref(true);
let opcaoEstaClicadaStatus = ref(false);

//Função que troca qual é o display onde mostra os status e as propriedades que pode adicionar na tarefa

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
</script>
<style scoped>
#fundoPopUp {
  background-color: #36213e;
  display: flex;
  justify-content: center;
  align-items: center;
}

#bgBranco {
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
