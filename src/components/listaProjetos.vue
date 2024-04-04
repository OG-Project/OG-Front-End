<template>
    <div :style="{ height: height, width: width }" class="flex justify-center">
      <div class="listaProjetos overflow-auto ">
        <div class="flex  w-[100%]">
          <div v-if="!kanbanAtivo" class="flex w-full">
            <button class="botaoStatus" :class="{ 'bordaRoxa': statusBotao === 'urgentes' }"
             @click="ativarBotao('urgentes')">URGENTES</button>
            <button class="botaoStatus" :class="{ 'bordaRoxa': statusBotao === 'prontos' }"
             @click="ativarBotao('prontos')">PRONTOS</button>
            <button class="botaoStatus" :class="{ 'bordaRoxa': statusBotao === 'nao-iniciados' }"
             @click="ativarBotao('nao-iniciados')">NÃO INICIADOS</button>
            <button class="botaoStatus" :class="{ 'bordaRoxa': statusBotao === 'meus-projetos' }"
             @click="ativarBotao('meus-projetos')">MEUS PROJETOS</button>

            
          </div>
          <div v-if="kanbanAtivo" >
            <div class="w-full">
              <div class="iconeCard" @click="toggleKanban()">
              <img  class="icone" src="../imagem-vetores/iconCard.svg">
            </div>
            </div>
            <div class="kanban-board w-full pl-2 2xl:mt-2 xl:mt-3 lg:mt-4 md:mt-5  flex justify-start">
              <div class="kanban-board w-full max-h-max min-h-[15vh] flex  flex-col"  @dragover.prevent @drop.prevent="event => onDrop(event, 'urgentes','#D27200')">
                <div class="urgentes">
                     <h1 class="text-xl text-white"> URGENTES</h1>
                </div>
                <div class="flex justify-center  mt-10 w-[100%]" v-for="projeto of agruparProjetosPorCategoria('urgentes')" :key="projeto.id"
                draggable="true" @dragstart="onDragStart($event, projeto)">
                  <KanbanProjetos :nome="projeto.nome" :cor="projeto.corTopico" :imagem="obterFotosResponsaveis(projeto)"  ></KanbanProjetos>
                </div>
              </div>
              <div class="kanban-board w-full max-h-max min-h-[15vh] flex flex-col" @dragover.prevent @drop.prevent="event => onDrop(event, 'nao-iniciados', '#0034BA')">
                <div class="naoIniciado">
                  <h1 class="text-xl text-white"> NÃO INICIADOS</h1>
               </div>
               <div class="flex justify-center  mt-10 w-[100%]" v-for="projeto of agruparProjetosPorCategoria('nao-iniciados')" :key="projeto.id" 
               draggable="true" @dragstart="onDragStart($event, projeto)">
                  <KanbanProjetos :nome="projeto.nome" :cor="projeto.corTopico" :imagem="obterFotosResponsaveis(projeto)" ></KanbanProjetos>
                </div>
              </div>
              <div class="kanban-board w-full max-h-max flex min-h-[15vh] flex-col"  @dragover.prevent @drop.prevent="event => onDrop(event, 'prontos', '#389300')">
                <div class="prontos">
                <h1 class="text-xl text-white"> PRONTOS</h1>
                </div>
                <div class="flex justify-center mt-10 w-[100%]" v-for="projeto of agruparProjetosPorCategoria('prontos')" :key="projeto.id" 
                draggable="true" @dragstart="onDragStart($event, projeto)">
                  <KanbanProjetos :nome="projeto.nome" :cor="projeto.corTopico" :imagem="obterFotosResponsaveis(projeto)" ></KanbanProjetos>
                </div>
              </div>
              <div class="kanban-board w-full max-h-max min-h-[15vh] flex flex-col"  @dragover.prevent @drop.prevent="event => onDrop(event, 'meus-projetos', '#8E00FF')">
                <div class="meusProjetos">
                  <h1 class="text-xl text-white"> MEUS PROJETOS</h1>
                </div>
                <div class="flex justify-center ml-5 mt-10 w-[100%]" v-for="projeto of agruparProjetosPorCategoria('meus-projetos')" :key="projeto.id" 
                draggable="true" @dragstart="onDragStart($event, projeto)">
                  <KanbanProjetos :nome="projeto.nome" :cor="projeto.corTopico" :imagem="obterFotosResponsaveis(projeto)" ></KanbanProjetos>
                </div>
              </div>
            </div>
            <div v-if=" projetos.length === 0">
            <div v-if="kanbanAtivo" class="mensagemKanban">
              NÃO HÁ NENHUM PROJETO
            </div>
            <div  v-if="kanbanAtivo" class="flex justify-center mt-10" >
              <img src="../imagem-vetores/pasta.svg" alt="">
            </div>
          </div>
          </div>
          <div  v-if="!kanbanAtivo" class="iconeKanban" @click="toggleKanban()">
            <img  class="icone" src="../imagem-vetores/iconKanban.svg">
          </div>
        </div>
        <div v-if="mostrarMensagem || projetosFiltrados.length === 0">
          <div v-if="!kanbanAtivo"  class="mensagem">
            NÃO HÁ NENHUM PROJETO
          </div>
          <div  v-if="!kanbanAtivo" class="flex justify-center mt-10" >
            <img src="../imagem-vetores/pasta.svg" alt="">
          </div>
        </div>
        <div v-else-if="!mostrarMensagem">
          <div v-if="!kanbanAtivo" class="projetos" >
            <div v-for="projeto of projetosFiltrados" :key="projeto.id">
              <cardProjetos class="cardProjetos" 
              :name="projeto.nome" 
              :descricao="projeto.descricao" 
              :comeco="formatarData(projeto.dataCriacao)" 
              :final="projeto.dataFinal ? formatarData(projeto.dataFinal) : 'Indefinido'" 
              :reponsavel="obterNomesResponsaveis(projeto)"
              :feito="calcularProgressoProjeto(projeto)"></cardProjetos>
            </div>
          </div>
        </div>
      </div>       
    </div>
  </template>
  
  <script setup>

  import { ref, onMounted, watch} from 'vue';
  import { conexaoBD } from '../stores/conexaoBD';
  import cardProjetos from './cardProjetos.vue';
  import KanbanProjetos from './kanbanProjetos.vue';
  import VueCookies from "vue-cookies";
  
  const props = defineProps({
    height: { type: String, required: true },
    width: { type: String, required: true }
  });
  
  const statusBotao = ref(null);
  const kanbanAtivo = ref(false);
  const banco = conexaoBD();
  let projetos = ref([]);
  const idUsuarioLogado = VueCookies.get('IdUsuarioCookie');
  let projetosUsuario = ref([]);
  let projetosEquipe = ref([]);
  const projetosFiltrados = ref([]);
  let mostrarMensagem = ref(false);
  let equipesUsuario = ref ([]);
  let usuarioLogado = ref();


  
  
  filtrarProjetos();
  
  const ativarBotao = (botao) => {
    if (statusBotao.value === botao) {
      statusBotao.value = null;
      mostrarMensagem = false; // Resetando a flag para esconder a mensagem
      filtrarProjetos(); // Desativa o botão se ele estiver ativado
    } else {
      statusBotao.value = botao; // Ativa o botão clicado
      filtrarProjetos(botao); // Filtra os projetos com base na categoria do botão clicado
    }
  }
  
  const toggleKanban = () => {
    kanbanAtivo.value = !kanbanAtivo.value;
  }

  async function buscarProjetos(){
    if(projetosSalvos != null){
       return ;
    }
    usuarioLogado.value = await banco.buscarUm(idUsuarioLogado, "/usuario");
    equipesUsuario.value = await usuarioLogado.value.equipes;

    let projetosEquipe = []; // Inicialize como um array vazio

    for (const equipeUsuario of equipesUsuario.value) {
        const projetosDaEquipe = await banco.buscarProjetosEquipe(equipeUsuario.equipe.id, "/projeto/buscarProjetos");
        projetosEquipe = projetosEquipe.concat(projetosDaEquipe);
    }

    console.log(projetosEquipe);

    projetosUsuario = projetosEquipe;
    console.log(projetosUsuario);

    if (Array.isArray(projetosUsuario)) {
      projetos.value =  projetosUsuario.filter(projeto => projeto != null);
      const dataAtual = new Date();
      projetos.value.forEach(projeto => {
        projeto.dataFinal = new Date(projeto.dataFinal);
        if (projeto.dataFinal.getTime() < dataAtual.getTime()) {
          projeto.categoria = "urgentes";
          projeto.corTopico = "#D27200";
        } else if (calcularProgressoProjeto(projeto) === 0) {
          projeto.categoria = "nao-iniciados";
          projeto.corTopico = "#0034BA";
        } else if (calcularProgressoProjeto(projeto) === 100) {
          projeto.categoria = "prontos";
          projeto.corTopico = "#389300";
        } else {
          projeto.categoria = "meus-projetos";
          projeto.corTopico = "#8E00FF";
        }
      });
    } else {
      console.error("O retorno de buscarMembrosEquipe() não é um array válido.");
    }
    filtrarProjetos();
  }
  

  async function filtrarProjetos(categoria) {
    const projetosDaCategoria = projetos.value.filter(projeto => projeto.categoria === categoria);
  
    if (!statusBotao.value && !categoria) {
      projetosFiltrados.value = projetos.value;
    } else if (!categoria) {
      projetosFiltrados.value =  projetos.value.filter(projeto => projeto.categoria === statusBotao.value);
    } else {
      projetosFiltrados.value = projetosDaCategoria;
      if (projetosDaCategoria.length === 0) {
        mostrarMensagem = true; // Exibe a mensagem quando nenhum projeto é encontrado na categoria selecionada
      } else {
        mostrarMensagem = false; // Esconde a mensagem se projetos forem encontrados na categoria selecionada
      }
    }
  }

  function agruparProjetosPorCategoria(categoria) {
    return projetos.value.filter(projeto => projeto.categoria === categoria);
  }
  
  function formatarData(data){
    if (typeof data === 'string' && data.length >= 10) {
      const dia = data.slice(8, 10);
      const mes = data.slice(5, 7);
      const ano = data.slice(0, 4);
      return `${dia}/${mes}/${ano}`;
    } else {
      return "Indefinido";
    } 
  }


  function calcularProgressoProjeto(projeto) {
    let totalTarefas = 0;
    let tarefasConcluidas = 0;

    if (projeto.categoria == "nao-iniciados") {
      projeto.tarefas.forEach(tarefa => {
      tarefa.subTarefas.forEach(subtarefa => {
        subtarefa.concluido = false;
      });
      });

      return 0; // Retorna 0% de progresso se o projeto estiver na categoria "Não Iniciados"    
      } else if (projeto.categoria == "prontos") {
        projeto.tarefas.forEach(tarefa => {
      tarefa.subTarefas.forEach(subtarefa => {
        subtarefa.concluido = true;
      });
      });

      return 100;// Retorna 100% de progresso se o projeto estiver na categoria "Prontos"
      }

    projeto.tarefas.forEach(tarefa => {
        totalTarefas++;
        let todasConcluidas = true;
        tarefa.subTarefas.forEach(subtarefa => {
            if (!subtarefa.concluido) {
                todasConcluidas = false;
            }
        });
        if (todasConcluidas) {
            tarefasConcluidas++;
        }
    });

    if (totalTarefas === 0) {
        return 0; // Retorna 0 se não houver tarefas no projeto
    } else {
            return Math.floor((tarefasConcluidas / totalTarefas) * 100); // Retorna a porcentagem de tarefas concluídas
    }
}

  function obterNomesResponsaveis(projeto) {
    if (projeto.responsaveis && Array.isArray(projeto.responsaveis) && projeto.responsaveis.length > 0) {
      let responsaveisComNome = []
      console.log(projeto.responsaveis)
      for(let responsavel of projeto.responsaveis){
        console.log(responsavel)
        responsaveisComNome.push(responsavel.responsavel.username)
      }
        if (responsaveisComNome.length >= 0) {
          return responsaveisComNome.join(', ');
        } else {
            return "Responsáveis encontrados, mas nenhum deles possui nome.";
        }
    } else {
        return "Não há responsáveis";
    }
}


function obterFotosResponsaveis(projeto) {
    if (projeto.responsaveis && Array.isArray(projeto.responsaveis) && projeto.responsaveis.length > 0) {
        const responsaveisComFoto = projeto.responsaveis
            .filter(responsavel => responsavel && responsavel.foto)
            .map(responsavel => responsavel.foto);

        if (responsaveisComFoto.length > 0) {
            return responsaveisComFoto;
        } else {
          console.log("Responsáveis encontrados, mas nenhum deles possui foto.")
            return "Responsáveis encontrados, mas nenhum deles possui foto.";
        }
    } else {
        console.log("Não há responsáveis")
        return "Não há responsáveis";
    }
}

const onDragStart = (event, projeto) => {
    event.dataTransfer.setData('projetoId', projeto.id);
};

const onDrop = (event, categoria, cor) => {
    console.log('onDrop acionado');
    // Verificar se event e event.dataTransfer estão definidos
    if (event && event.dataTransfer) {
        // Evitar comportamento padrão apenas se necessário
        event.preventDefault();

        // Obter o ID do projeto a partir dos dados de transferência
        const projetoId = event.dataTransfer.getData('projetoId');
        console.log('Projeto ID:', projetoId);

        // Encontrar o projeto na lista de projetos pelo ID
        const projeto = projetos.value.find(projeto => projeto.id == projetoId);
        console.log('Projeto:', projeto);

        if (projeto) {
            projeto.categoria = categoria;
            projeto.corTopico = cor;
            salvarEstadoDragAndDrop(); // Adicione esta linha para salvar o estado  

            // Atualiza os projetos filtrados após as mudanças
            filtrarProjetos();
        } else {
            console.error('Projeto não encontrado! ID:', projetoId);
        }
    } else {
        console.error('Evento ou event.dataTransfer não definidos.');
    }
};

const salvarEstadoDragAndDrop = () => {
    localStorage.setItem('estadoDragAndDrop', JSON.stringify(projetos.value,projetos.categoria));
};

function carregarEstadoProjetos(){
    let projetosSalvos = localStorage.getItem('estadoDragAndDrop');
    if (projetosSalvos) {
        projetos.value = JSON.parse(projetosSalvos);
    }
    buscarProjetos();
};
  
  onMounted(() => {
    carregarEstadoProjetos();
  });

  </script>
  
<style scoped>

kanban-board {
  width: 800px;
  height: 600px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  overflow: auto;
}

.mensagem{
  @apply flex justify-center mt-[15vh] font-semibold text-xl;
}

.mensagemKanban{
  @apply flex justify-center mt-[5vh] font-semibold text-xl;
}

.urgentes {
  @apply flex 2xl:w-[22.6vw] xl:w-[22.6vw] lg:w-[22.5vw] md:w-[21.5vw] h-[7vh] bg-[#D27200] justify-center items-center 2xl:mx-2 xl:mx-1 lg:mx-1 md:mx-2 shadow-md  shadow-gray-400;
}

.naoIniciado{
  @apply flex 2xl:w-[22.6vw] xl:w-[22.6vw] lg:w-[22.5vw] md:w-[21.5vw] h-[7vh] bg-[#0034BA] justify-center items-center 2xl:mx-2 xl:mx-1 lg:mx-1 md:mx-2 shadow-md  shadow-gray-400;
}
.prontos{
  @apply flex 2xl:w-[22.6vw] xl:w-[22.6vw] lg:w-[22.5vw] md:w-[21.5vw] h-[7vh] bg-[#389300] justify-center items-center 2xl:mx-2 xl:mx-1 lg:mx-1 md:mx-2  shadow-md  shadow-gray-400; 
}

.meusProjetos{
  @apply flex 2xl:w-[22.6vw] xl:w-[22.6vw] lg:w-[22.5vw] md:w-[21.5vw] h-[7vh] bg-[#8E00FF] justify-center items-center 2xl:mx-2 xl:mx-1 lg:mx-1 md:mx-2  shadow-md  shadow-gray-400;
}

.cardProjetos{
  @apply flex  2xl:m-[1.2vw] xl:m-[1.5vw] xl:ml-[1.2vw] lg:ml-[3.5vw] lg:m-[1.5vw] md:ml-[17vw] md:mt-[3vh];
  max-width: calc(100% - 1px); 
}

.projetos{
  display: flex;
  flex-wrap: wrap;
  padding: 30px; 
  justify-content:flex-start;
}
.iconeKanban{
  @apply w-[25px] h-[25px] flex justify-end xl:mr-[0.8vw] xl:mt-[1.2vh] lg:mr-[1.5vw] lg:mt-[1vh]  md:mr-[1.5vw] md:mt-[1vh];
}

.iconeCard{
  @apply  flex justify-end  2xl:mr-[0.5vw] xl:mr-[-0.5vw] xl:mt-[1.2vh] lg:mr-[0.0vw] lg:mt-[1vh] md:mr-[1vw] md:mt-[1vh];
}

.icone{
  @apply w-[25px] h-[25px];

}

::-webkit-scrollbar {
    display: none;
}

.botaoStatus {
  @apply bg-transparent font-semibold mt-3 px-5 text-xl rounded mr-2;
}

.bordaRoxa {
  border-bottom-width: 2px;
  border-bottom-color: #8a2be2; /* cor roxa */
}

.listaProjetos {
    @apply bg-[#f8f8f8] shadow-md shadow-gray-200;
    flex: 1 1px;
}


@media(min-width: 2560px){
  .iconeKanban{
  @apply flex justify-end ml-[1vw] mt-[1.2vh];
}

.iconeCard{
  @apply flex justify-end mr-[0.2vw] mt-[1.2vh];
}

.urgentes {
  @apply flex 2xl:w-[22.8vw];
}

.naoIniciado{
  @apply flex 2xl:w-[22.8vw];
}
.prontos{
  @apply flex 2xl:w-[22.8vw];
}

.meusProjetos{
  @apply flex 2xl:w-[22.8vw];
}
.cardProjetos{
  @apply flex  2xl:m-[1.5vw];
}
.mensagemKanban{
  @apply ml-[42%];
}
.nenhumProjeto{
  @apply ml-[42%] mt-[22vh];
}
    }
  </style>
  