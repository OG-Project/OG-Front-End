<template>
  <div class="bg-[var(--backgroundPuro)]  flex flex-row min-h-[92vh] w-full">
    <div class="w-[40vw] min-h-[96%] flex flex-col">
      <div class="flex flex-row pl-12 items-center pr-6 mt-4 h-[10%] w-[100%]">
        <Input largura="32" altura="6" fontSize="2rem" :conteudoInput="$t('criaTarefa.task_name')"
          styleInput="input-transparente-claro-grande" v-model="tarefa.nome"
          @updateModelValue="(e) => { tarefa.nome = e }"></Input>
      </div>
      <div class="flex flex-col pl-12 min-h-[16vh] mt-4 w-[90%] flex">
        <TextAreaPadrao width="80%" height="16vh" :placeholder="$t('criaTarefa.task_description')"
          tamanho-da-fonte="1rem" resize="none" v-model="tarefa.descricao"></TextAreaPadrao>
      </div>
      <div class="flex pl-12 items-center justify-between mt-4 h-[5%] w-[72%]">
        <div class="flex flex-col justify-center w-[30%]">
          <p>{{ $t('criaTarefa.properties') }}</p>
          <button class="flex flex-col justify-center h-[70%]" @click="abreFechaCriaPropriedades()">
            {{ $t('criaTarefa.create') }}
          </button>
        </div>
        <div class="flex flex-col justify-center w-[30%]">
          <p> {{ $t('criaTarefa.task_color') }}</p>
          <button class="flex flex-col justify-center break-keep h-[70%]" @click="abreFechaMudaCor()">
            {{ $t('criaTarefa.create') }}
          </button>
        </div>

        <div class="flex flex-col justify-center w-[30%]">
          <p>{{ $t('criaTarefa.subtasks') }}</p>
          <button class="flex flex-col justify-center h-[70%]" @click="abreFechaCriaSubTarefas()">
            {{ $t('criaTarefa.create') }}
          </button>
        </div>
      </div>
      <!-- Pop-Up utilizado para criar status -->
      <div v-if="corSendoMudada">
        <div v-if="corSendoMudada" class="h-full flex flex-row pl-12 pt-6 pb-6">
          <div class="animation bg-[(var(--backgorundItems)]">
            <div class="flex justify-start">
              <TrianguloStart></TrianguloStart>
            </div>

            <div class="flex flex-row justify-between items-end">
              <div class="pl-2">
                <p>{{ $t('criaTarefa.task_color_question') }}</p>
              </div>
              <div class="pr-2">
                <ColorPicker v-model="tarefa.corDaTarefa" class="border-2 rounded-lg" />
              </div>
            </div>
            <div class="flex felx-row justify-end">
              <div class="pr-2 pt-2 pb-2">
                <Botao preset="Confirmar" tamanhoPadrao="pequeno" :funcaoClick="abreFechaMudaCor"></Botao>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pop-araaaaa criar uma propriedade -->

      <div v-if="propriedadeSendoCriada">
        <div v-if="propriedadeSendoCriada" class="h-full  flex flex-row pl-12 pt-6 pb-6 bg-[var(--backgorundItems)]">

          <!-- fiz como um popUp, tem um botão que abre o popUp -->
          <div class="animation">
            <div class="flex justify-start">
              <TrianguloStart></TrianguloStart>
            </div>

            <div class="flex flex-row justify-between items-end">
              <div class="pl-2">
                <Input largura="10" :conteudoInput="$t('criaTarefa.property_name')" fontSize="1rem" altura="3.8"
                  v-model="nomePropriedade" @updateModelValue="(e) => { nomePropriedade = e; }"></Input>
              </div>
              <div class="pr-2">
                <selectPadrao :placeholderSelect="$t('criaTarefa.type')"
                  :lista-select="[$t('criaTarefa.Texto'), $t('criaTarefa.Data'), $t('criaTarefa.Numero'), $t('criaTarefa.Seleção')]"
                  largura="8" altura="3.8" fonteTamanho="0.8rem" v-model="tipoPropriedade">
                </selectPadrao>
              </div>
            </div>

            <div class="flex felx-row justify-between items-end">
              <div class="pl-2 pt-2 pb-2">
                <Botao preset="Sair" tamanhoPadrao="pequeno" :funcaoClick="abreFechaCriaPropriedades"></Botao>
              </div>
              <div class="pr-2 pt-2 pb-2">
                <Botao preset="Confirmar" tamanhoPadrao="pequeno" :funcaoClick="criaPropriedade"></Botao>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="subtarefaSendoCriada">
        <div v-if="subtarefaSendoCriada" class="h-full  flex flex-row pl-12 pt-6 pb-6">
          <div class="animation bg-[(var(--backgorundItems)]">
            <div class="flex justify-start">
              <TrianguloStart></TrianguloStart>
            </div>

            <div class="flex flex-row justify-between items-end">
              <div class="pl-2">
                <Input largura="10" :conteudoInput="$t('criaTarefa.subtask_name')" fontSize="1rem" altura="3.8"
                  v-model="nomeSubtarefa" @updateModelValue="(e) => { nomeSubtarefa = e; }"></Input>
              </div>
              <selectPadrao :placeholderSelect="$t('criaTarefa.status')"
                :lista-select="[$t('criaTarefa.in_progress'), $t('criaTarefa.completed')]" largura="8" altura="3.8"
                fonteTamanho="0.8rem" v-model="statusSubtarefa" />
            </div>
            <div class="flex felx-row justify-between">
              <div class="pl-2 pt-2 pb-2">
                <Botao preset="Sair" tamanhoPadrao="pequeno" :funcaoClick="abreFechaCriaSubTarefas"></Botao>
              </div>
              <div class="pr-2 pt-2 pb-2">
                <Botao preset="Confirmar" tamanhoPadrao="pequeno" :funcaoClick="criaSubtarefa"></Botao>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p class="pl-12 mt-4">{{ $t('criaTarefa.files', { arquivos: tarefa.arquivos.length }) }}...</p>
      <div id="exploradorDeArquivos" v-if="tarefa.arquivos.length != 0"
        class="flex h-[18vh] w-[80%] bg-[#D7D7D7] ml-12 mt-4 overflow-auto">
        <div class="relative w-[18%] mx-4 h-[100%] flex items-center justify-center flex-col"
          v-for="arquivo in tarefa.arquivos">
          <a :href="arquivo.dados" download="" class="h-[65%] w-[100%] flex items-center justify-center">
            <img
              v-if="arquivo.tipo == 'image/jpeg' || arquivo.tipo == 'image/png' || arquivo.tipo == 'image/gif' || arquivo.tipo == 'image/svg+xml' || arquivo.tipo == 'image/tiff' || arquivo.tipo == 'image/bmp'"
              class="h-[100%] w-[100%]" :src="arquivo.dados">
            <div v-else>
              <img class="h-[65%]" :src='getIconSrc(arquivo)' />
            </div>
          </a>
          <div class="bg-[#F6F6F6] w-[100%] h-[15%] items-center flex justify-around">
            <p class="truncate w-[100px] text-xs">{{ arquivo.nome }}</p>
            <img @click="deletaArquivo(arquivo)" :src="BotaoX">
          </div>
        </div>
      </div>
      <div class="pl-12 mt-4">
        <div class="w-min h-min relative">
          <Botao preset="PadraoVazadoIcon" :icon="iconAnexo" tamanhoDaBorda="2px" :texto="$t('criaTarefa.attach')"
            tamanhoPadrao="pequeno" inverterCorIcon="sim"></Botao>
          <input type="file" class="absolute top-0 left-0 h-full w-full opacity-0" @change="e => gerarArquivo(e)">
        </div>

      </div>
      <div class="pl-12 mt-4">
        <h1>{{ $t('criaTarefa.subtasks') }}</h1>
        <div class="flex items-center">
          <div class="h-[1vh] w-[58%] bg-[#D7D7D7]">
            <div :style="barraPorcentagem" class="corDaBarraDeProgresso"></div>
          </div>
          <p class="pl-4">{{ $t('criaTarefa.completed_tasks', {
          porcentagem: porcentagemDeTarefasConcluidas.toFixed(2)
        }) }}%</p>
        </div>
      </div>
      <!-- Sub Tarefa -->
      <div class="pl-12 max-h-[20vh] gap-8 w-[90%] flex flex-col mt-2 overflow-auto" id="subtarefaOverflow">
        <div v-for="(subtarefa, index) of tarefa.subtarefas" :key="subtarefa.id">
          <div class="flex h-[2vh] w-full justify-between items-center mt-2 mb-2">
            <div class="flex gap-2 items-center">
              <CheckBox :checked="subtarefa.concluido" tipo="checkbox"
                @click="trocaStatusDaSubTarefa(subtarefa, index)" />
              <p>{{ subtarefa.nome }}</p>
            </div>
            <div class="flex gap-2 justify-center">
              <p>{{ $t('criaTarefa.status') }}:</p>
              <div v-if="subtarefa.concluido">
                <p class="flex items-center justify-center bg-[#7CC0E5]">{{ $t('criaTarefa.completed') }}</p>
              </div>
              <div v-else>
                <p class="flex items-center justify-center bg-[#C6B473]">{{ $t('criaTarefa.in_progress') }}</p>
              </div>
            </div>
            <img @click="deletaSubtarefa(subtarefa)" :src="BotaoX" class="h-full mr-8" />
          </div>
        </div>
      </div>
      <!-- Fazer um v-for de propriedades -->
      <div class="pl-12 mt-8">
        <div class="flex text-xl">
          <p>{{ $t('criaTarefa.comments') }}</p>
          <button class="ml-2" @click="abreFechaComentario()">+</button>
        </div>
        <div v-if="abreFechaComentarioBoolean" class="w-[85%] flex flex-col">
          <div class="w-[100%] border-2 border-[var(--backgroundItems)] mt-4 mb-4 shadow-lg min-h-[10vh] flex">

            <img v-if="usuarioCookies.foto.tipo != null"
              class="shadow-2xl h-[60px] w-[60px] mt-4 mr-4 ml-4 rounded-full" :src="'data:' +
          usuarioCookies.foto.tipo +
          ';base64,' +
          usuarioCookies.foto.dados
          " />
            <div class="pb-2 flex flex-col items-end">
              <TextAreaPadrao width="25vw" height="15vh" class="pt-6 pb-4"
                :placeholder="$t('criaTarefa.task_description')" tamanho-da-fonte="1rem" resize="vertical"
                v-model="comentarioSendoEnviado"></TextAreaPadrao>
              <Botao :texto="$t('criaTarefa.send')" preset="PadraoRoxo" tamanhoPadrao="pequeno"
                :funcaoClick="enviaComentario" :parametrosFuncao="[comentarioSendoEnviado, usuarioCookies]"></Botao>
            </div>
          </div>
        </div>
        <div class="w-[85%] flex flex-col">
          <div v-for="comentario of tarefa.comentarios">
            <div
              class="w-[100%] border-2 border-[var(--backgroundItems)] mt-2 mb-2 shadow-lg min-h-[10vh] items-end flex flex-col">
              <div class="w-[15%] gap-4 flex justify-center">
                <div v-if="comentario.autor.username === usuarioCookies.username"
                  class="w-[80%] mt-2 gap-4 flex justify-center">
                  <img class="w-[25%]" :src="iconeLapisPreto" @click="trocaComentarioSendoEditado" />
                  <img @click="deletaComentario(comentario)" class="w-[25%]" :src="BotaoX" />
                </div>
                <div v-if="comentario.autor.username != usuarioCookies.username"
                  class="w-[80%] mt-6 gap-4 flex justify-center">
                </div>
              </div>
              <div class="flex w-[100%] mb-2">
                <img :src="'data:' + comentario.autor.foto.tipo + ';base64,' + comentario.autor.foto.dados
          " class="shadow-2xl max-h-[60px] min-h-[60px] min-w-[60px] max-w-[60px] mr-4 ml-4 rounded-full" />
                <div class="w-[80%]">
                  <p>
                    {{ comentario.autor.username }}
                  </p>

                  <div v-if="comentarioSendoEditado &&
          comentario.autor.username === usuarioCookies.username
          ">
                    <TextAreaPadrao width="25vw" height="15vh" class="pt-4 pb-4" tamanho-da-fonte="1rem"
                      resize="vertical" v-model="comentario.conteudo"></TextAreaPadrao>
                  </div>
                  <div v-if="!comentarioSendoEditado ||
          comentario.autor.username != usuarioCookies.username
          ">
                    <p class="pt-4 pb-4 pr-4 break-all">
                      {{ comentario.conteudo }}
                    </p>
                  </div>

                  <div v-if="comentarioSendoEditado &&
          comentario.autor.username === usuarioCookies.username
          ">
                    <Botao :texto="$t('criaTarefa.edit')" preset="PadraoRoxo" tamanhoPadrao="pequeno"
                      :funcaoClick="editarComentario" :parametrosFuncao="comentario"></Botao>
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
      <div class="w-[80%] h-[80vh] shadow-xl border-2 border-[var(--backgroundItems)]">
        <div class="flex justify-around h-[4%]">
          <button class="opcaoClicada" @click="clicouOpcaoPropriedades()" id="opcaoPropriedades" style="width: 33%;">
            {{ $t('criaTarefa.properties') }}
          </button>
          <button class="opcaoNaoClicada" @click="clicouOpcaoStatus()" id="opcaoStatus" style="width: 33%;">
            {{ $t('criaTarefa.status') }}
          </button>
          <div v-if="opcaoEstaClicadaPropriedades" class="w-[33%] flex items-center justify-center">
            <select class="flex text-center w-[100%]" v-model="parametroDoFiltroPropriedade">
              <option selected="selected">{{ $t('criaTarefa.sort_by') }}</option>
              <option>{{ $t('criaTarefa.Texto') }}</option>
              <option>{{ $t('criaTarefa.Data') }}</option>
              <option>{{ $t('criaTarefa.Numero') }}</option>
              <option>{{ $t('criaTarefa.Seleção') }}</option>
            </select>
          </div>
          <div v-if="opcaoEstaClicadaStatus" class="w-[33%] flex items-center justify-center">
            <select class="flex text-center w-[100%]" v-model="parametroDoFiltroStatus">
              <option :value="$t('criaTarefa.sort_by')">{{ $t('criaTarefa.sort_by') }}</option>
              <option value="az">{{ $t('criaTarefa.a_to_z') }}</option>
              <option value="za">{{ $t('criaTarefa.z_to_a') }}</option>
            </select>
          </div>
        </div>

        <div v-if="opcaoEstaClicadaPropriedades" class="h-[96%] w-[100%] pt-4 flex flex-col gap-4 overflow-y-auto">
          <div v-for="propriedade in listaFiltradaPropriedades"
            class="w-[100%] min-h-[8vh] gap-2 flex flex-col items-center justify-center">
            <div v-if="propriedade" class="w-[100%] min-h-[3vh] gap-2 pl-4 flex flex-row items-center justify-between">
              <div class="flex gap-2 items-center w-[40%]">
                <CheckBox
                  @click="adicionaExcluiPropriedadeNaTarefa(propriedade, veSeAPropriedadeTaNaTarefa(propriedade))"
                  :checked="veSeAPropriedadeTaNaTarefa(propriedade)"></CheckBox>
                <p class="break-all">{{ propriedade.propriedade.nome }}</p>
              </div>
              <div class="w-[30%]">
                <p v-if="propriedade.propriedade.tipo == 'TEXTO'">{{ $t('criaTarefa.type') }}: {{ $t('criaTarefa.Texto')
                  }}</p>
                <p v-if="propriedade.propriedade.tipo == 'DATA'">{{ $t('criaTarefa.type') }}: {{ $t('criaTarefa.Data')
                  }}
                </p>
                <p v-if="propriedade.propriedade.tipo == 'NUMERO'">{{ $t('criaTarefa.type') }}: {{
          $t('criaTarefa.Numero')
        }}</p>
                <p v-if="propriedade.propriedade.tipo == 'SELECAO'">{{ $t('criaTarefa.type') }}: {{
          $t('criaTarefa.Seleção') }}</p>
              </div>
              <!-- <div class="flex justify-center">
                <img class="w-[100%] mr-4" @click="deletaPropriedade(propriedade)" :src="BotaoX" />
              </div> -->
            </div>
            <div class="w-[100%] h-[5vh] flex items-center justify-center ">
              <div v-if="propriedade.propriedade.tipo === 'TEXTO'">
                <div v-for="propriedadeForTarefa of tarefa.propriedades">
                  <Input v-if="propriedadeForTarefa.propriedade.id == propriedade.propriedade.id"
                    styleInput="input-transparente-claro-pequeno" v-model="propriedadeForTarefa.valor.valor"
                    @updateModelValue="(e) => { propriedadeForTarefa.valor.valor = e }">
                  </Input>
                </div>
              </div>
              <div v-for="propriedadeForTarefa of tarefa.propriedades">
                <div v-if="propriedade.propriedade.tipo === 'DATA'">
                  <input @input="patchDaListaDePropriedades()"
                    v-if="propriedadeForTarefa.propriedade.id == propriedade.propriedade.id"
                    class="border-2 w-[100%] border-t-0 rounded-none border-x-0 rounded-lg border-b-[var(--roxo)] bg-transparent"
                    type="datetime-local" v-model="propriedadeForTarefa.valor.valor" />
                </div>
              </div>
              <div v-for="propriedadeForTarefa of tarefa.propriedades">
                <div v-if="propriedade.propriedade.tipo === 'NUMERO'">
                  <Input v-if="propriedadeForTarefa.propriedade.id == propriedade.propriedade.id"
                    styleInput="input-transparente-claro-pequeno" v-model="propriedadeForTarefa.valor.valor"
                    @updateModelValue="(e) => { propriedadeForTarefa.valor.valor = e }">
                  </Input>
                  <!-- <InputNumber v-if="propriedadeForTarefa.propriedade.id == propriedade.propriedade.id"
                    class="border-2 rounded-lg border-[var(--roxo)]" showIcon iconDisplay="input"
                    v-model="propriedadeForTarefa.valor.valor" inputId="minmaxfraction" minFractionDigits="0"
                    maxFractionDigits="2" @input="patchDaListaDePropriedades()" /> -->
                </div>
              </div>
              <div v-for="propriedadeForTarefa of tarefa.propriedades">
                <div v-if="propriedade.propriedade.tipo === 'SELECAO'">
                  <div v-if="propriedadeForTarefa.propriedade.id == propriedade.propriedade.id"
                    v-for="(valor, index) in propriedade.valor.valor" class="pt-4 flex">
                    <Input altura="2" largura="27" conteudoInput=" " v-model="propriedadeForTarefa.valor.valor[index]"
                      width="60%" @input="patchDaListaDePropriedades()">
                    </Input>
                    <img class="w-[100%] ml-2" @click="deletaValorSelect(propriedade.valor.valor, index)"
                      :src="BotaoX" />
                  </div>
                  <p class="pl-2 pt-2" @click="adicionaValorSelect(propriedade.valor.valor)">
                    {{ $t('criaTarefa.add') }}
                  </p>
                  {{ console.log(propriedade.valor) }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="opcaoEstaClicadaStatus" class="h-[96%] w-[100%] pt-4 flex flex-col gap-4 overflow-y-auto">
          <div v-for="(statsAdd, index) in listaFiltradaStatus" :key="index"
            class="w-[100%] min-h-[3vh] gap-4 flex flex-col items-center justify-center">
            <div class="w-[100%] min-h-[3vh] gap-16 flex flex-row items-center justify-center">
              <div class="w-[35%] flex gap-2 items-center pl-4">
                <CheckBox @click="adicionaExcluiStatusNaTarefa(statsAdd)" :checked="veSeOStatusTaNaTarefa(statsAdd)"
                  tipo="radio">
                </CheckBox>
                <p class="break-all">{{ statsAdd.nome }}</p>
              </div>
              <p class="w-[40%]">{{ $t('criaTarefa.color') }}: #{{ statsAdd.cor.toUpperCase() }}</p>
              <div class="w-[30%] flex justify-between">
                <ColorPicker disabled v-model="statsAdd.cor"
                  class="border-2 border-[var(--backgroundItems)] rounded-lg ml-16" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-[80%] flex justify-between pt-8">
        <Botao preset="Deletar" :funcaoClick="deletaTarefa" tamanhoDaBorda="2px" tamanhoDaFonte="1.5rem"></Botao>
        <Botao :funcaoClick="criaTarefaNoConcluido" preset="PadraoVazado" :texto="$t('criaTarefa.completed')"
          tamanhoDaBorda="2px" tamanhoDaFonte="1.5rem"></Botao>
      </div>
    </div>

    <div id="propriedadesOverflow" class="shadow-xl border-2 border-[var(--backgroundItems)]">
      <div class="min-h-[9%] pt-8 flex items-end justify-center">
        <h1 class="min-h-[9%] text-3xl font-semibold">{{ $t('criaTarefa.information') }}</h1>
      </div>
      <div class="gap-4 h-auto pt-4 w-[100%] flex flex-col">
        <div class="flex pl-8">
          <div class="w-[50%] justify-start flex-row">
            <p>{{ $t('criaTarefa.project_name') }}</p>
          </div>
          <div class="w-[40%] justify-end flex-row">
            <p class="w-[100%] text-[var(--roxo)] break-all" v-if="projetoDaTarefa">
              {{ projetoDaTarefa.nome }}
            </p>
          </div>
        </div>
        <div class="flex pl-8">
          <div class="w-[50%] justify-start flex-row">
            <p>{{ $t('criaTarefa.project_participants') }}</p>
          </div>
          <div class="w-[40%] ml-2 justify-end flex-row" v-if="projetoDaTarefa">
            <p class="truncate text-[var(--roxo)] break-all" v-for="responsavel of projetoDaTarefa.responsaveis">

            </p>

          </div>
        </div>
        <div class="flex pl-8" v-if="projetoDaTarefa">
          <div class="w-[50%] justify-start flex-row">
            <p>{{ $t('criaTarefa.project_start_date') }}</p>
          </div>
          <div class="w-[40%] justify-end flex-row">
            <p class="text-[var(--roxo)]"> {{ format(new Date(projetoDaTarefa.dataCriacao), "dd/MM/yyyy") }} </p>
          </div>
        </div>
      </div>
      <div class="min-h-[4%] flex items-center justify-center p-8">
        <h1 class="text-xl font-semibold">{{ $t('criaTarefa.status') }}</h1>
      </div>
      <div v-if="tarefa.status != null">
        <div v-if="tarefa.status.length == 0" class="flex items-center justify-center">
          <p>{{ $t('criaTarefa.no_status_message') }}</p>
        </div>
        <div class="min-h-[4%] flex items-center justify-center gap-4">
          <p :style="{ 'background-color': '#' + tarefa.status.cor, color: corDaFonte(tarefa.status.cor) }"
            class="flex items-center border-2 border-[var(--backgroundItems)] shadow-md justify-center px-4">
            {{ tarefa.status.nome }}
          </p>
        </div>
      </div>
      <div class="min-h-[4%] flex items-center justify-center p-8">
        <h1 class="text-xl font-semibold">{{ $t('criaTarefa.properties') }}</h1>
      </div>
      <div v-if="tarefa.propriedades.length === 0" class="h-[35%] flex flex-col items-center justify-center p-8">
        <NotePad></NotePad>
        <p class="text-center">{{ $t('criaTarefa.this_taks_has_no_properties') }}</p>
      </div>
      <div v-if="tarefa.propriedades.length != 0" class="min-h-[35%] flex flex-col items-center">
        <div v-for="propriedade of tarefa.propriedades" class="flex flex-col justify-around py-4 w-[80%]">
          <p class="pb-4 break-all">Nome: {{ propriedade.propriedade.nome }}</p>
          <div v-if="propriedade.propriedade.tipo === 'DATA'">
            <p>{{ $t('criaTarefa.value') }} {{ formatarData(propriedade.valor.valor) }}</p>
          </div>
          <div v-if="propriedade.propriedade.tipo === 'SELEÇÃO'" class="flex">
            <p>{{ $t('criaTarefa.value') }}</p>
            <select class="flex text-center w-[80%]">
              <option v-for="valor of propriedade.valor.valor">{{ valor }}</option>
            </select>
          </div>
          <div v-if="propriedade.propriedade.tipo === 'NUMERO'">
            <p>{{ $t('criaTarefa.value') }} {{ propriedade.valor.valor }}</p>
          </div>
          <div v-if="propriedade.propriedade.tipo === 'TEXTO'">
            <p>{{ $t('criaTarefa.value') }} {{ propriedade.valor.valor }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { format } from "date-fns";
import Input from "../../components/Input.vue";
import NotePad from "../../imagem-vetores/NotePad.vue";
import Botao from "../../components/Botao.vue";
import CheckBox from "../../components/checkBox.vue";
import iconAnexo from "../../imagem-vetores/anexoIcon.svg";
import TextAreaPadrao from "../../components/textAreaPadrao.vue";
import { onUnmounted, ref, watch } from "vue";
import selectPadrao from "../../components/selectPadrao.vue";
import ColorPicker from "primevue/colorpicker";
import BotaoX from "../../imagem-vetores/XPreto.svg";
import InputNumber from "primevue/inputnumber";
import iconeLapisPreto from "../../imagem-vetores/icon-lapis-preto.svg";
import { computed } from "vue";
import { onUpdated, onMounted } from "vue";
import VueCookies from "vue-cookies";
import tinycolor from "tinycolor2";
import { conexaoBD } from "../../stores/conexaoBD.js";
import { criaPropriedadeTarefaStore } from "../../stores/criaPropriedadeTarefa";
import router from "../../router";
import TrianguloStart from "../../imagem-vetores/trianguloStart.vue";
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const banco = conexaoBD();

function veSeAPropriedadeTaNaTarefa(propriedade) {
  for (const propriedadeFor of tarefa.value.propriedades) {
    if (propriedadeFor.id == propriedade.id) {
      return true
    }
  }
  return false
}

let tempoAtuado;
let horaEntrada;
let horaSaida;

//Variavel utilizada para armazenar os comentarios da tarefa

const Comentarios = ref([]);

//Variavel que armazena as Subtarefas atreladas a tarefa

//Variavel que armazena as propriedades que podem ser atreladas a tarefa

const propriedades = ref([]);

//Variavel que armazena os status que podem ser atreladas a tarefa

const status = ref([]);

let projetoDaTarefa = ref();

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

function deletaTarefa() {
  banco.deletarTarefa("/tarefa", VueCookies.get("IdTarefaCookies"));
  router.push("/projeto").then(() => {
    window.location.reload();
    VueCookies.remove("IdTarefaCookies");
  });
}

let nomePropriedade = ref("");
let tipoPropriedade = computed(() => {
  if (tipoPropriedade.value == t('criaTarefa.Texto')) {
    return "Texto"
  }
  else if (tipoPropriedade.value == t('criaTarefa.Data')) {
    return "Data"
  }
  else if (tipoPropriedade.value == t('criaTarefa.Numero')) {
    return "Numero"
  }
  else if (tipoPropriedade.value == t('criaTarefa.Seleção')) {
    return "Seleção"
  }
});

//Variáveis utiliazadas na hora de criar um status

let nomeStatus = ref("");
let corStatus = ref("ff0000");

//Variaveis utilizadas na hora de criar uma subtarefa

let nomeSubtarefa = ref("");
let statusSubtarefa = ref(t('criaTarefa.in_progress'));

function corDaFonte(backgroundColor) {
  const isLight = tinycolor(backgroundColor).isLight();
  return isLight ? "#000" : "#fff";
}
//Função utilizada para criar um Status

function getIconSrc(arquivo) {
  const fileTypeIcons = {
    'application/pdf': 'https://cdn-icons-png.flaticon.com/512/337/337946.png',
    'text/plain': 'https://cdn-icons-png.freepik.com/512/8243/8243060.png',
    'video/mp4': 'https://cdn-icons-png.freepik.com/512/8243/8243015.png',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'https://cdn-icons-png.freepik.com/512/8361/8361467.png',
    'application/vnd.ms-excel': 'https://cdn-icons-png.freepik.com/512/8361/8361467.png',
    'text/csv': 'https://cdn-icons-png.freepik.com/512/8242/8242984.png'
    // Adicione mais tipos de arquivo conforme necessário
  };
  const iconSrc = fileTypeIcons[arquivo.tipo];
  if (iconSrc) return iconSrc;
  return `data:image/jpg;base64, ${arquivo.dados}`;
}

function timerTempoAtuacao() {
  horaEntrada = new Date().getTime()
  console.log(horaEntrada);
}

async function patchDaListaDePropriedades() {
  let tarefa2 = await banco.buscarUm(VueCookies.get("IdTarefaCookies"), "/tarefa")
  for (const props of tarefa2.valorPropriedadeTarefas) {
    for (const propsComValor of tarefa.value.propriedades) {
      if (propsComValor.propriedade.id == props.propriedade.id) {
        if (props.propriedade.tipo == "TEXTO") {
          let valor = {
            id: props.valor.id,
            texto: propsComValor.valor.valor
          }
          props.valor = valor
        }
        else if (props.propriedade.tipo == "NUMERO") {
          let valor = {
            id: props.valor.id,
            numero: propsComValor.valor.valor
          }
          props.valor = valor
        }
        else if (props.propriedade.tipo == "SELECAO") {
          let valor = {
            id: props.valor.id,
            selecao: propsComValor.valor.valor
          }
          props.valor = valor
        }
        else if (props.propriedade.tipo == "DATA") {
          let valor = {
            id: props.valor.id,
            data: propsComValor.valor.valor
          }
          console.log(valor.data);
          props.valor = valor
        }
      }
    }
  }
  console.log(tarefa2);
  banco.atualizar(tarefa2, "/tarefa")
}

function veSeOStatusTaNaTarefa(status) {
  if (tarefa.value.status) {
    if (tarefa.value.status.id == status.id) {
      console.log(true);
      return true
    }
    return false
  }
}

async function criaTarefaNoConcluido() {
  let tarefa2 = await banco.buscarUm(VueCookies.get("IdTarefaCookies"), "/tarefa")
  let tarefaCriando = {
    id: JSON.parse(VueCookies.get("IdTarefaCookies")),
    responsaveis: [],
    status: [],
    subTarefas: [],
    comentarios: [],
    valorPropriedadeTarefas: [],
    cor: "FFFFFF",
    descricao: null,
    nome: null,
    valorPropriedadeTarefas: [],
    dataCriacao: null,
    indice: [],
    tempoAtuacao: "00:00:00"
  }
  tarefaCriando.nome = tarefa.value.nome;
  tarefaCriando.descricao = tarefa.value.descricao;
  for (const props of tarefa2.valorPropriedadeTarefas) {
    for (const propsComValor of tarefa.value.propriedades) {
      if (propsComValor.propriedade.id == props.propriedade.id) {
        if (props.propriedade.tipo == "TEXTO") {
          let valor = {
            id: props.valor.id,
            texto: propsComValor.valor.valor
          }
          props.valor = valor

        }
        else if (props.propriedade.tipo == "NUMERO") {
          let valor = {
            id: props.valor.id,
            numero: propsComValor.valor.valor
          }
          props.valor = valor

        }
        else if (props.propriedade.tipo == "SELECAO") {
          let valor = {
            id: props.valor.id,
            selecao: propsComValor.valor.valor
          }
          props.valor = valor

        }
        else if (props.propriedade.tipo == "DATA") {
          let valor = {
            id: props.valor.id,
            data: propsComValor.valor.valor
          }
          props.valor = valor

        }
      }
    }
  }
  let comentario = [];
  tarefa.value.comentarios.forEach((comentarioFor) => {

    comentario.push(comentarioFor);
  });
  tarefaCriando.valorPropriedadeTarefas = tarefa2.valorPropriedadeTarefas
  tarefaCriando.comentarios = comentario;
  tarefaCriando.cor = tarefa.value.corDaTarefa;
  tarefaCriando.indice = tarefa2.indice;
  // tarefaCriando.responsaveis = tarefa.value.responsaveis;
  tarefaCriando.status = tarefa.value.status;
  tarefaCriando.subTarefas = tarefa.value.subtarefas;
  tarefaCriando.tempoAtuacao = tarefa.value.tempoAtuacao;
  console.log(tarefaCriando)
  banco.atualizar(tarefaCriando, "/tarefa").then((response) => {
    console.log(response)
    if (tarefa.value.arquivos.length != 0) {
      banco.patchDeArquivosNaTarefa(tarefa.value.arquivos, VueCookies.get("IdTarefaCookies"))
    }
      router.push("/projeto").then(() => {
        window.location.reload();
      });
  });

}

//Função que deleta status

function deletaStatus(stat) {
  status.value.forEach((statParaDeletar) => {
    if (stat === statParaDeletar) {
      status.value.splice(status.value.indexOf(stat), 1);
    }
  });
  tarefa.value.status.forEach((statParaDeletar) => {
    if (stat === statParaDeletar) {
      tarefa.value.status.splice(tarefa.value.status.indexOf(stat), 1);
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
    if (statusSubtarefa.value == t('criaTarefa.in_progress')) {
      booleanDaSubtarefa.value = false;
    } else if (statusSubtarefa.value == t('criaTarefa.completed')) {
      booleanDaSubtarefa.value = true;
    }
    let subtarefaNova = {
      nome: nomeSubtarefa.value,
      concluido: booleanDaSubtarefa.value,
      status: statusSubtarefa.value,
    };
    tarefa.value.subtarefas.push(subtarefaNova);
    subtarefaSendoCriada.value = false;
    numeroDeTarefas.value = tarefa.value.subtarefas.length;
    numeroDeTarefasConcluidas.value = numeroDeSubTarefasConcluidas();
    porcentagemDeTarefasConcluidas.value = atualizaPorcentagemDeTarefasConcluidas();
    barraPorcentagem.value.width = porcentagemDeTarefasConcluidas.value + "%";
  }
}

function reloadSubTarefas() {
  numeroDeTarefas.value = tarefa.value.subtarefas.length;
  numeroDeTarefasConcluidas.value = numeroDeSubTarefasConcluidas();
  porcentagemDeTarefasConcluidas.value = atualizaPorcentagemDeTarefasConcluidas();
  barraPorcentagem.value.width = porcentagemDeTarefasConcluidas.value + "%";
}

//Função utilizada para deletar uma Subtarefa

function deletaSubtarefa(subtarefa) {
  tarefa.value.subtarefas.forEach((subtarefaParaDeletar) => {
    if (subtarefaParaDeletar === subtarefa) {
      tarefa.value.subtarefas.splice(tarefa.value.subtarefas.indexOf(subtarefa), 1);
    }
  });
  numeroDeTarefas.value = tarefa.value.subtarefas.length;
  numeroDeTarefasConcluidas.value = numeroDeSubTarefasConcluidas();
  porcentagemDeTarefasConcluidas.value = atualizaPorcentagemDeTarefasConcluidas();
  barraPorcentagem.value.width = porcentagemDeTarefasConcluidas.value + "%";
}

//Função utilizada para criar uma Propriedade

async function criaPropriedade() {
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
      const cria = criaPropriedadeTarefaStore();
      tipoPropriedade.value = tipoPropriedade.value.toUpperCase();
      console.log(tipoPropriedade.value);
      console.log(nomePropriedade.value);

      cria.criaPropriedade(
        nomePropriedade.value,
        tipoPropriedade.value,
        VueCookies.get("IdProjetoAtual")
      );
    }
  }
  await new Promise(r => setTimeout(r, 60));
  await procuraProjetosDoBanco();
  projetoDaTarefa.value = await procuraProjetosDoBanco();
  nomePropriedade.value = "";
  tipoPropriedade.value = "";
  console.log(projetoDaTarefa.value.propriedades);
  let tarefaAtual = await banco.buscarUm(VueCookies.get("IdTarefaCookies"), "/tarefa");
  propriedades.value = tarefaAtual.valorPropriedadeTarefas;
  console.log(propriedades.value);
  propriedadeSendoCriada.value = false;
}
async function calculaTempoAtuacao() {
  let segundos
  let minutos
  let horas
  let segundosSoma = 0
  let minutosSoma = 0
  let horasSoma = 0
  if (tarefa.value.tempoAtuacao != null && tarefa.value.tempoAtuacao != undefined && tarefa.value.tempoAtuacao != 0 && tarefa.value.tempoAtuacao != "") {
    [horasSoma, minutosSoma, segundosSoma] = tarefa.value.tempoAtuacao.split(":").map(Number);
    console.log(horasSoma)
  }
  const horaSaida = new Date().getTime();
  const diferenca = horaSaida - horaEntrada;
  segundos = Math.floor((diferenca / 1000) % 60);
  minutos = Math.floor((diferenca / (1000 * 60)) % 60);
  horas = Math.floor(diferenca / (1000 * 60 * 60));

  segundos += segundosSoma;
  minutos += minutosSoma;
  horas += horasSoma;
  console.log(horasSoma)
  minutos += Math.floor(segundos / 60);
  segundos = segundos % 60;

  horas += Math.floor(minutos / 60);
  minutos = minutos % 60;

  segundos = segundos < 10 ? `0${segundos}` : segundos;
  minutos = minutos < 10 ? `0${minutos}` : minutos;
  horas = horas < 10 ? `0${horas}` : horas;

  tempoAtuado = `${horas}:${minutos}:${segundos}`;
  console.log(tempoAtuado)
  tarefa.value.tempoAtuacao = tempoAtuado;
  criaTarefaNoConcluido();
}


function deletaPropriedade(propriedade) {
  const deleta = criaPropriedadeTarefaStore();
  propriedades.value.forEach(async (propriedadeParaDeletar) => {
    if (propriedadeParaDeletar === propriedade) {
      deleta.deletaPropriedade(propriedade.id, parseInt(VueCookies.get("IdProjetoAtual")))

      await new Promise(r => setTimeout(r, 60));
      await procuraProjetosDoBanco();
      projetoDaTarefa.value = await procuraProjetosDoBanco();
      propriedades.value = projetoDaTarefa.value.propriedades;
    }
  });
}

async function procuraProjetosDoBanco() {
  const projetos = await banco.procurar("/projeto");
  let projetoId = VueCookies.get("IdProjetoAtual");
  for (const projeto of projetos) {
    if (projeto.id == projetoId) {
      return projeto;
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
  status: [],
  subtarefas: [],
  corDaTarefa: "ffffff",
  tempoAtuacao: "00:00:00"
});

async function puxaTarefaDaEdicao() {

  let IdTarefaCookies = VueCookies.get("IdTarefaCookies");
  let tarefaAux = await banco.buscarUm(IdTarefaCookies, "/tarefa");
  console.log(tarefaAux);
  tarefa.value.nome = tarefaAux.nome;
  tarefa.value.descricao = tarefaAux.descricao;
  for (const comentarioId of tarefaAux.comentarios) {
    let comentario = await banco.buscarUm(comentarioId, "/comentario");
    tarefa.value.comentarios.push(comentario);
  }
  tarefa.value.corDaTarefa = tarefaAux.cor;
  tarefa.value.arquivos = tarefaAux.arquivos;
  tarefa.value.comentarios = tarefaAux.comentarios;
  tarefa.value.status = tarefaAux.status;
  tarefa.value.subtarefas = tarefaAux.subTarefas;
  tarefa.value.tempoAtuacao = tarefaAux.tempoAtuacao;
  for (const propriedade of tarefaAux.valorPropriedadeTarefas) {
    if (veSeAPropriedadeTaNaTarefa(propriedade.propriedade)) {
      tarefa.value.propriedades.push(propriedade);
    }
  }
}

async function atualizaPropriedadesEStatus() {
  let IdTarefaCookies = VueCookies.get("IdTarefaCookies");
  console.log(IdTarefaCookies);
  let tarefaAux = await banco.buscarUm(IdTarefaCookies, "/tarefa");
  status.value = projetoDaTarefa.value.statusList;
  propriedades.value = tarefaAux.valorPropriedadeTarefas;
}

onUpdated(() => {
  update();
});

function update() {
  reloadSubTarefas();
  localStorage.setItem("TarefaNaoFinalizada", JSON.stringify(tarefa.value));
  autenticaUsuarioCookies();
}

onMounted(async () => {
  timerTempoAtuacao();
  puxaTarefaDaEdicao();
  const { t } = useI18n();
  projetoDaTarefa.value = await procuraProjetosDoBanco();
  procuraProjetosDoBanco();
  reloadSubTarefas();
  autenticarUsuario();
  tarefa.value = {
    nome: "",
    descricao: "",
    arquivos: [],
    comentarios: [],
    propriedades: [],
    status: [],
    subtarefas: [],
    corDaTarefa: "ffffff",
    tempoAtuacao: "00:00:00"
  };
  const localStorageData = localStorage.getItem("TarefaNaoFinalizada");
  if (localStorageData) {
    tarefa.value = JSON.parse(localStorageData);
    localStorage.setItem("TarefaNaoFinalizada", JSON.stringify(tarefa.value));
  }
  exibirComentarios();
  autenticaUsuarioCookies();
  atualizaPropriedadesEStatus();
  parametroDoFiltroStatus.value = t('criaTarefa.sort_by');
  parametroDoFiltroPropriedade.value = t('criaTarefa.sort_by');
});
onUnmounted(() => {
  calculaTempoAtuacao()
})
//Variaveis utilizadas para verificar se o popup abre ou fecha

// Supondo que você tenha um array chamado comentarios no seu componente
function exibirComentarios() {
  localStorage.setItem("TarefaNaoFinalizada", JSON.stringify(tarefa.value));
}

function gerarArquivo(e) {
  let arquivo = e.target.files[0];
  let reader = new FileReader();
  reader.readAsDataURL(arquivo);
  reader.onload = function () {
    let arquivoBase64 = reader.result;
    let arquivoParaOBanco = {
      nome: arquivo.name,
      tipo: arquivo.type,
      dados: arquivoBase64,
    };
    tarefa.value.arquivos.push(arquivoParaOBanco);
    update()
  }

}

function deletaArquivo(arquivo) {
  tarefa.value.arquivos.forEach((arquivoParaDeletar) => {
    if (arquivoParaDeletar === arquivo) {
      tarefa.value.arquivos.splice(tarefa.value.arquivos.indexOf(arquivo), 1);
    }
  });
  update()
}


let propriedadeSendoCriada = ref(false);

let corSendoMudada = ref(false);

let subtarefaSendoCriada = ref(false);

//Funções que trocam os valores das variaveis instanciadas acima

function abreFechaMudaCor() {
  corSendoMudada.value = !corSendoMudada.value;
  propriedadeSendoCriada.value = false;
  subtarefaSendoCriada.value = false;
}

function abreFechaCriaPropriedades() {
  propriedadeSendoCriada.value = !propriedadeSendoCriada.value;
  corSendoMudada.value = false;
  subtarefaSendoCriada.value = false;
}

function abreFechaCriaSubTarefas() {
  subtarefaSendoCriada.value = !subtarefaSendoCriada.value;
  propriedadeSendoCriada.value = false;
  corSendoMudada.value = false;
}

//Funções que removem e adicionam os status e propriedades da tarefa

function adicionaExcluiStatusNaTarefa(status) {
  if (tarefa.value.status) {
    if (tarefa.value.status.id == status.id) {
      tarefa.value.status = null;
    } else {
      tarefa.value.status = status;
    }
  }
  else {
    tarefa.value.status = status;
  }
  veSeOStatusTaNaTarefa(status)
}

function adicionaExcluiPropriedadeNaTarefa(propriedade, estaNaTarefa) {
  console.log("Entrou na função");
  if (!estaNaTarefa) {
    console.log("push");
    tarefa.value.propriedades.push(propriedade)
  }
  else {
    console.log("antes de começar o for");
    for (let propriedadeForTarefa of tarefa.value.propriedades) {
      console.log("começou o for");
      if (propriedadeForTarefa.id == propriedade.id) {
        console.log("entrou pra deletar a propriedade ", propriedade);
        propriedade.valor.valor = propriedadeForTarefa.valor.valor
        tarefa.value.propriedades.splice(tarefa.value.propriedades.indexOf(propriedadeForTarefa), 1);
      }
    }

  }
}


//Usuario Logado

let usuarioId = VueCookies.get("IdUsuarioCookie");

let usuarioCookies = ref();

async function autenticaUsuarioCookies() {
  usuarioCookies.value = await autenticarUsuario(usuarioId);
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
  abreFechaComentarioBoolean.value = !abreFechaComentarioBoolean.value;
}

//Função que publica o comentario na tarefa

function enviaComentario(comentario) {
  tarefa.value.comentarios.push({
    autor: comentario[1],
    conteudo: comentario[0]
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
  if (comentario.conteudo === "") {
    deletaComentario(comentario);
  }
  trocaComentarioSendoEditado();
}

const listaFiltradaStatus = computed(() => {
  if (
    parametroDoFiltroStatus.value === t('criaTarefa.sort_by') ||
    parametroDoFiltroStatus.value === ""
  ) {
    // Check for empty string
    return projetoDaTarefa.value.statusList;
  }
  switch (parametroDoFiltroStatus.value) {
    case "az":
      return projetoDaTarefa.value.statusList.sort((a, b) =>
        a.nome > b.nome ? 1 : b.nome > a.nome ? -1 : 0
      );
    case "za":
      return projetoDaTarefa.value.statusList.sort((a, b) =>
        a.nome < b.nome ? 1 : b.nome < a.nome ? -1 : 0
      );
  }
});


const parametroDoFiltroStatus = ref('Ordenar Por'); // Definindo parametroDoFiltroStatus como uma variável reativa com o valor de $t('criaTarefa.sort_by')

const parametroDoFiltroPropriedade = ref(t('criaTarefa.sort_by')); // Definindo parametroDoFiltroPropriedade como uma variável reativa com o valor de $t('criaTarefa.sort_by')
//Função utilizada para contabilizar quantas subtarefas da lista já estão com o status de concluida

const listaFiltradaPropriedades = computed(() => {
  console.log(parametroDoFiltroPropriedade.value);
  console.log(t('criaTarefa.sort_by'));
  if (parametroDoFiltroPropriedade.value === t('criaTarefa.sort_by')) {
    return propriedades.value;
  }
  const filtro = parametroDoFiltroPropriedade.value;
  const tipoFiltroTexto = t('criaTarefa.Texto');
  const tipoFiltroNumero = t('criaTarefa.Numero');
  const tipoFiltroSelecao = t('criaTarefa.Seleção');
  const tipoFiltroData = t('criaTarefa.Data');

  return propriedades.value.filter((propriedade) => {
    switch (filtro) {
      case tipoFiltroTexto:
        return propriedade.propriedade.tipo.toUpperCase() === "TEXTO";
      case tipoFiltroNumero:
        return propriedade.propriedade.tipo.toUpperCase() === "NUMERO";
      case tipoFiltroSelecao:
        return propriedade.propriedade.tipo.toUpperCase() === "SELECAO";
      case tipoFiltroData:
        return propriedade.propriedade.tipo.toUpperCase() === "DATA";
      default:
        return true;
    }
  });
});


function numeroDeSubTarefasConcluidas() {
  let numeroDeSubTarefasC = ref(0);
  tarefa.value.subtarefas.forEach((subtarefa) => {
    if (subtarefa.concluido) {
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

let numeroDeTarefas = ref(tarefa.value.subtarefas.length);

//Armazena as informações da conta de porcentagem de quantas tarefas foram concluidas

let porcentagemDeTarefasConcluidas = ref(atualizaPorcentagemDeTarefasConcluidas());

//Armazena se o comentario já enviado está sendo editado ou não

let comentarioSendoEditado = ref(false);

//Função que troca o valor da Subtarefa de concluido pra em progresso

function trocaStatusDaSubTarefa(subtarefa, index) {
  tarefa.value.subtarefas[index].concluido = !tarefa.value.subtarefas[index].concluido;
  numeroDeTarefasConcluidas.value = numeroDeSubTarefasConcluidas();
  porcentagemDeTarefasConcluidas.value = atualizaPorcentagemDeTarefasConcluidas();
  barraPorcentagem.value.width = porcentagemDeTarefasConcluidas.value + "%";
}

//Estilo da barra de porcentagem

let barraPorcentagem = ref({
  width: porcentagemDeTarefasConcluidas.value + "%",
  height: "100%",
  borderRadius: "0px",
  border: "none",
  boxShadow: "none",
});

//Variavel utilizada para mostrar o display onde mostra os status e as propriedades que pode adicionar na tarefa

let opcaoEstaClicadaPropriedades = ref(true);
let opcaoEstaClicadaStatus = ref(false);

//Função que troca qual é o display onde mostra os status e as propriedades que pode adicionar na tarefa

function formatarData(data) {
  console.log(data);
  const dataObj = new Date(data);
  if (dataObj.getDate()) {
    const dia = String(dataObj.getDate()).padStart(2, '0');
    const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
    const ano = dataObj.getFullYear();
    const horas = String(dataObj.getHours()).padStart(2, '0');
    const minutos = String(dataObj.getMinutes()).padStart(2, '0');
    return `${dia}/${mes}/${ano} - ${horas}:${minutos}`;
  }
  else {
    return "Data não especificada"
  }

}

function clicouOpcaoPropriedades() {
  const opcaoPropriedades = document.getElementById('opcaoPropriedades');
  const opcaoStatus = document.getElementById('opcaoStatus');

  if (!opcaoEstaClicadaPropriedades.value) {
    opcaoEstaClicadaPropriedades.value = true;
    opcaoEstaClicadaStatus.value = false;

    opcaoPropriedades.classList.add('opcaoClicada');
    opcaoPropriedades.classList.remove('opcaoNaoClicada');
    opcaoStatus.classList.add('opcaoNaoClicada');
    opcaoStatus.classList.remove('opcaoClicada');
  }
}

function clicouOpcaoStatus() {
  const opcaoPropriedades = document.getElementById('opcaoPropriedades');
  const opcaoStatus = document.getElementById('opcaoStatus');

  if (!opcaoEstaClicadaStatus.value) {
    opcaoEstaClicadaStatus.value = true;
    opcaoEstaClicadaPropriedades.value = false;

    opcaoStatus.classList.add('opcaoClicada');
    opcaoStatus.classList.remove('opcaoNaoClicada');
    opcaoPropriedades.classList.add('opcaoNaoClicada');
    opcaoPropriedades.classList.remove('opcaoClicada');
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

.opcaoClicada {
  border-bottom: solid 4px var(--roxo);
  width: 33%;
}

.opcaoNaoClicada {
  border-bottom: solid 4px transparent;
  width: 33%;
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
  height: auto;
  /* Allow automatic height adjustment */
}

#botao-sair {
  width: 4%;
  height: 4%;
}

.blur-background {
  @apply fixed inset-0 w-full h-full bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg absolute;
}

.animation {
  @apply w-[60%] bg-[var(--backgorundItems)] shadow-md flex justify-around flex-col;
  animation: myAnim 0.15s ease 0s 1 normal none;
  /*isso é opcional */
}

.corDaBarraDeProgresso {
  background-color: var(--roxo);
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