<template>
    <div :style="{ height: height, width: width }" class="flex justify-center">
      <div class="listaProjetos overflow-auto ">
        <div class="divGeral sm:flex w-[100%] max-mobile:justify-center">
          <div v-if="!kanbanAtivo && screenWidth > 750" class="flex w-full">
            <button class="botaoStatus" :class="{ 'bordaRoxa': statusBotao === 'urgentes' }"
             @click="ativarBotao('urgentes')">{{$t('projeto.URGENTES')}}</button>
            <button class="botaoStatus" :class="{ 'bordaRoxa': statusBotao === 'prontos' }"
             @click="ativarBotao('prontos')">{{$t('projeto.PRONTOS')}}</button>
            <button class="botaoStatus" :class="{ 'bordaRoxa': statusBotao === 'nao-iniciados' }"
             @click="ativarBotao('nao-iniciados')">{{$t('projeto.NÃO INICIADOS')}}</button>
            <button class="botaoStatus" :class="{ 'bordaRoxa': statusBotao === 'meus-projetos' }"
             @click="ativarBotao('meus-projetos')">{{$t('projeto.MEUS PROJETOS')}}</button>
          </div>
          <div v-if="!kanbanAtivo && screenWidth <= 766" class="flex w-full mobile:w-[80vw]">
            <button class="botaoStatus" :class="{ 'bordaRoxa': statusBotao === 'urgentes' }"
             @click="ativarBotao('urgentes')">{{$t('projeto.URGENTES')}}</button>
            <button class="botaoStatus" :class="{ 'bordaRoxa': statusBotao === 'prontos' }"
             @click="ativarBotao('prontos')">{{$t('projeto.PRONTOS')}}</button>
            <button class="botaoStatus" :class="{ 'bordaRoxa': statusBotao === 'nao-iniciados' }"
             @click="ativarBotao('nao-iniciados')">{{$t('projeto.NÃO INICIADOS')}}</button>
            <button class="botaoStatus" :class="{ 'bordaRoxa': statusBotao === 'meus-projetos' }"
             @click="ativarBotao('meus-projetos')">{{$t('projeto.MEUS PROJETOS')}}</button>
          </div>
          <div v-if="kanbanAtivo" >
            <div class="w-full">
              <div class="iconeCard mobile:mt-3 mobile:ml-1 " @click="toggleKanban()">
                <iconCard></iconCard>
              </div>
            </div>
            <div class="kanban-board w-full pl-2 2xl:mt-2 xl:mt-3 lg:mt-4 md:mt-5 sm:flex sm:justify-start max-mobile:flex-row  ">

              <div class="kanban-board w-full max-h-max min-h-[15vh] flex flex-col mobile:mt-5"  @dragover.prevent @drop.prevent="event => onDrop(event, 'urgentes','#D27200')">
                <div class="urgentes">
                     <h1 class="xl:text-xl sm:text-sm text-white"> {{$t('projeto.URGENTES')}}</h1>
                </div>
                <div class="flex justify-center  mt-10 w-[100%]" v-for="projeto of filtrarPorCategoria('urgentes')" @compositionstart="agruparProjetosPorCategoria()"  :key="projeto.id"
                draggable="true" @dragstart="onDragStart($event, projeto)">
                  <KanbanProjetos @click="entrarNoProjeto(projeto)" :nome="projeto.nome" :cor="projeto.corTopico" :imagem="obterFotosResponsaveis(projeto)" @dragover="projetoEmBaixoId = projeto.id" ></KanbanProjetos>
                </div>
              </div>
              <div class="kanban-board w-full max-h-max min-h-[15vh] flex flex-col  mobile:mt-5" @dragover.prevent @drop.prevent="event => onDrop(event, 'nao-iniciados', '#0034BA')">
                <div class="naoIniciado">
                  <h1 class="xl:text-xl sm:text-sm text-white"> {{$t('projeto.NÃO INICIADOS')}}</h1>
               </div>
               <div class="flex justify-center  mt-10 w-[100%]" v-for="projeto of filtrarPorCategoria('nao-iniciados')" @compositionstart="agruparProjetosPorCategoria()"  :key="projeto.id" 
               draggable="true" @dragstart="onDragStart($event, projeto)" >
                  <KanbanProjetos @click="entrarNoProjeto(projeto)" :v-if="projeto.categoria === 'nao-iniciados'" :nome="projeto.nome" :cor="projeto.corTopico" :imagem="obterFotosResponsaveis(projeto)" @dragover="projetoEmBaixoId = projeto.id" ></KanbanProjetos>
                </div>
              </div>
              <div class="kanban-board w-full max-h-max flex min-h-[15vh] flex-col  mobile:mt-5"  @dragover.prevent @drop.prevent="event => onDrop(event, 'prontos', '#389300')">
                <div class="prontos">
                <h1 class="xl:text-xl sm:text-sm text-white"> {{$t('projeto.PRONTOS')}}</h1>
                </div>
                <div class="flex justify-center mt-10 w-[100%]" v-for="projeto of filtrarPorCategoria('prontos')" @compositionstart="agruparProjetosPorCategoria()"  :key="projeto.id" 
                draggable="true" @dragstart="onDragStart($event, projeto)" >
                  <KanbanProjetos @click="entrarNoProjeto(projeto)" :v-if="projeto.categoria === 'prontos'"  :nome="projeto.nome" :cor="projeto.corTopico" :imagem="obterFotosResponsaveis(projeto)" @dragover="projetoEmBaixoId = projeto.id" ></KanbanProjetos>
                </div>
              </div>
              <div class="kanban-board w-full max-h-max min-h-[15vh] flex flex-col  mobile:mt-5"  @dragover.prevent @drop.prevent="event => onDrop(event, 'meus-projetos', '#8E00FF')">
                <div class="meusProjetos">
                  <h1 class="xl:text-xl sm:text-sm text-white"> {{$t('projeto.MEUS PROJETOS')}}</h1>
                </div>
                <div class="flex justify-center mt-10 w-[100%]" v-for="projeto of filtrarPorCategoria('meus-projetos')" @compositionstart="agruparProjetosPorCategoria()"  :key="projeto.id" 
                draggable="true" @dragstart="onDragStart($event, projeto)" >
                  <KanbanProjetos @click="entrarNoProjeto(projeto)" :v-if="projeto.categoria === 'meus-projetos'" :nome="projeto.nome" :cor="projeto.corTopico" :imagem="obterFotosResponsaveis(projeto)" @dragover="projetoEmBaixoId = projeto.id" ></KanbanProjetos>
                </div>
              </div>
            </div>
            <div v-if=" projetos.length === 0">
            <div v-if="kanbanAtivo" class="mensagemKanban">
              {{$t('projeto.NENHUM PROJETO')}}
            </div>
            <div  v-if="kanbanAtivo" class="flex justify-center mt-10" >
              <img src="../imagemVetores/pasta.svg" alt="">
            </div>
          </div>
          </div>
         
          <div  v-if="!kanbanAtivo && screenWidth <= 750" class="iconeKanban sm:ml-[5vw] mobile:ml-[88vw] mobile:mt-[-2.8vh] miniMobile:ml-[87vw] miniMobile:mt-[-3vh]" @click="toggleKanban()">
            <iconKanban class="icone"></iconKanban>
          </div>
          <div  v-if="!kanbanAtivo && screenWidth > 766 " class="iconeKanban mobile:mt-[-2.8vh]" @click="toggleKanban()">
            <iconKanban class="icone"></iconKanban>
          </div>
        </div>
        <div v-if="mostrarMensagem || !filtrarPorCategoria(statusBotao).length && statusBotao !== null || projetos.length === 0">
          <div v-if="!kanbanAtivo"  class="mensagem">
            {{$t('projeto.NENHUM PROJETO')}}
          </div>
          <div v-if="!kanbanAtivo" class="flex justify-center mt-10" >
            <img src="../imagemVetores/pasta.svg" alt="">
          </div>
        </div>
        <div v-else-if="!mostrarMensagem">
          <div v-if="!kanbanAtivo" class="projetos" >
            <div v-for="projeto of filtrarPorCategoria(statusBotao).length ? filtrarPorCategoria(statusBotao) : projetos" :key="projeto.id" >
              <cardProjetos v-if="screenWidth >=  766" class="cardProjetos" 
              :name="projeto.nome" 
              :descricao="projeto.descricao" 
              :comeco="formatarData(projeto.dataCriacao)" 
              :final="projeto.dataFinal ? formatarData(projeto.dataFinal) : 'Indefinido'" 
              :responsaveisIds="projeto.responsaveis.map(responsavel => responsavel.idResponsavel)"
              :feito="calcularProgressoProjeto(projeto)"
              :tempo-atuacao="projeto.tempoAtuacao"
              @click="entrarNoProjeto(projeto)"></cardProjetos>
              <cardProjetos v-else class="cardProjetos" 
                :name="projeto.nome" 
                :descricao="projeto.descricao" 
                :comeco="formatarData(projeto.dataCriacao)" 
                :final="projeto.dataFinal ? formatarData(projeto.dataFinal) : 'Indefinido'" 
                :responsaveisIds="projeto.responsaveis.map(responsavel => responsavel.idResponsavel)"
                :feito="calcularProgressoProjeto(projeto)"
                :tempo-atuacao="projeto.tempoAtuacao"
                @click="entrarNoProjeto(projeto)" marginRight="8vw"></cardProjetos>
            </div>
          </div>
        </div>
      </div>       
    </div>
  </template>
  
  <script setup>

  import { ref, onMounted} from 'vue';
  import { conexaoBD } from '../stores/conexaoBD';
  import cardProjetos from './cardProjetos.vue';
  import KanbanProjetos from './kanbanProjetos.vue';
  import VueCookies from "vue-cookies";
  import { useRouter } from 'vue-router'
  import iconCard from '../imagemVetores/iconCard.vue';
  import iconKanban from '../imagemVetores/iconKanban.vue';
  const props = defineProps({
    height: { type: String, required: true },
    width: { type: String, required: true }
  });

  const screenWidth = window.innerWidth;
  const statusBotao = ref(null);
  const kanbanAtivo = ref(false);
  const projetoEmBaixoId = ref()
  const banco = conexaoBD();
  let projetos = ref([]);
  const idUsuarioLogado = VueCookies.get("IdUsuarioCookie")
  let mostrarMensagem = ref(false);
  let equipesUsuario = ref ([]);
  let usuarioLogado = ref();
  const router = useRouter();

  const filtrarPorCategoria = (categoria) => {
    return projetos.value.filter(p => {
      return p.categoria === categoria;
    })
  }

  
onMounted(() => {
  buscarProjetos();
})

  const ativarBotao = (botao) => {

    if (statusBotao.value === botao) {
      statusBotao.value = null;
      mostrarMensagem = false; // Resetando a flag para esconder a mensagem
      console.log(botao);; // Desativa o botão se ele estiver ativado
    } else {
      statusBotao.value = botao; // Ativa o botão clicado
    }
  }
  
  const toggleKanban = () => {
    kanbanAtivo.value = !kanbanAtivo.value;
  }

  async function buscarProjetos(){

    usuarioLogado.value = await banco.buscarUm(idUsuarioLogado, "/usuario");
    equipesUsuario.value = await usuarioLogado.value.equipes;
  
    const projetosEquipe = [];

    for (const equipeUsuario of equipesUsuario.value) {
        console.log(equipeUsuario.equipe.id);
        const projetosDaEquipe = await banco.buscarProjetosEquipe(equipeUsuario.equipe.id, "/projeto/buscarProjetos");
        projetosEquipe.push(...projetosDaEquipe); 
      }
    console.log(projetosEquipe)
    if (Array.isArray(projetosEquipe)) {
        projetos.value = projetosEquipe;
        projetos.value.forEach(projeto => {
         
            
        });

        setarCoresPorCategoria();
    } else {
        console.error("O retorno de buscarMembrosEquipe() não é um array válido.");
    }

   
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
  let totalSubTarefas = 0;
  let tarefasConcluidas = 0;

  if (projeto.categoria == "nao-iniciados") {
    projeto.tarefas.forEach(tarefa => {
      tarefa.subTarefas.forEach(subtarefa => {
        subtarefa.concluido = false;
      });
    });

    return 0;
  } else if (projeto.categoria == "prontos") {
    projeto.tarefas.forEach(tarefa => {
      tarefa.subTarefas.forEach(subtarefa => {
        subtarefa.concluido = true;
      });
    });

    return 100;
  }

  let quantidadeTarefasConcluidas =0;
  projeto.tarefas.forEach(tarefa => {
    let todasConcluidas = true;
    tarefa.subTarefas.forEach(subtarefa => {
      totalSubTarefas++;
      tarefasConcluidas = true;
      if (!subtarefa.concluido) { 
        todasConcluidas = false;
      }else{
        quantidadeTarefasConcluidas++;
      }
    }); 
  });

  if (totalSubTarefas === 0) {
    return 0; // Retorna 0 se não houver tarefas no projeto
  } else {
    return Math.floor((quantidadeTarefasConcluidas / totalSubTarefas) * 100); // Retorna a porcentagem de tarefas concluídas
  }
}

async function buscaResponsaveis(responsavel) {
  if(responsavel.idResponsavel!=null){
    return await banco.buscarUm(responsavel.idResponsavel, "/usuario")
  }
  return null;

}


async function obterFotosResponsaveis(projeto) {
        // Percorre os responsáveis do projeto
      if (projeto.responsaveis && Array.isArray(projeto.responsaveis) && projeto.responsaveis.length > 0) {
      let responsaveisComFoto = []
      for(let responsavel of projeto.responsaveis){
        let usuario = await buscaResponsaveis(responsavel)
        console.log(usuario)
        responsaveisComFoto.push(usuario.foto)
      }
        if (responsaveisComFoto.length >= 0) {
          console.log(responsaveisComFoto)
          console.log(`data:${responsaveisComFoto[0].tipo};base64,${responsaveisComFoto[0].dados}`)
          return `data:${responsaveisComFoto[0].tipo};base64,${responsaveisComFoto[0].dados}`;
        } else {
            return ''
        }
    } else {
        return '';
    }
}

const onDragStart = (event, projeto) => {
  console.log(projeto);
    event.dataTransfer.setData('projetoId', projeto.id);
};

const onDrop = (event, categoria) => {
  const projetoId = event.dataTransfer.getData('projetoId');
  const projeto = projetos.value.find(projeto => projeto.id == parseInt(projetoId));
  const projetoEmBaixo = projetos.value.find(projeto => projeto.id == projetoEmBaixoId.value)
  const index = projetos.value.indexOf(projeto);
  const indexEmBaixo = projetos.value.indexOf(projetoEmBaixo);
  if(index != -1 && indexEmBaixo != -1){
    projetos.value.splice(index, 1)
    projetos.value.splice(indexEmBaixo, 0, projeto)
  }

  projeto.indexLista = index;
  projeto.categoria = categoria;
  
  atualizarIndexes();
  banco.atualizar(projeto, `/projeto`);
};

const setarCoresPorCategoria = () => {
  projetos.value.forEach(p => {
    p.corTopico = buscarCorPorCategoria(p.categoria);
  })
}

const atualizarIndexes = () => {
  projetos.value.forEach(p => {
    p.corTopico = buscarCorPorCategoria(p.categoria);
    p.indexLista = projetos.value.indexOf(p);
    banco.atualizar(p, `/projeto`)
  })
}

const buscarCorPorCategoria = (categoria) => {
    const cores = {
      'nao-iniciados': '#0034BA',
      'urgentes': '#D27200',
      'meus-projetos': '#8E00FF',
      'prontos': '#389300'
    }

    return cores[categoria];
  }
  async function entrarNoProjeto(projeto) {
  console.log(projeto)
  VueCookies.set("IdProjetoAtual", projeto.id, 30000)
  VueCookies.set('idReloadProjeto', '0');
  router.push({ path: '/projeto' }).then(() => {
        window.location.reload()
    });
}
</script>
<style scoped>

kanban-board {
  width: 800px;
  height: 600px;
  margin: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  overflow: auto;
}

.mensagem{
  @apply flex justify-center mt-[15vh] font-semibold text-xl;
}

.mensagemKanban{
  @apply flex justify-center  font-semibold text-xl;
}

.urgentes {
  @apply flex 2xl:w-[22.6vw] xl:w-[22.6vw] lg:w-[22.5vw] md:w-[21.5vw] h-[7vh] bg-[#D27200] justify-center
  items-center 2xl:mx-2 xl:mx-1 lg:mx-1 md:mx-2 shadow-md  shadow-[var(--backgroundItems)];
}

.naoIniciado{
  @apply flex 2xl:w-[22.6vw] xl:w-[22.6vw] lg:w-[22.5vw] md:w-[21.5vw] h-[7vh] bg-[#0034BA] justify-center 
  items-center 2xl:mx-2 xl:mx-1 lg:mx-1 md:mx-2 shadow-md  shadow-[var(--backgroundItems)];
}
.prontos{
  @apply flex 2xl:w-[22.6vw] xl:w-[22.6vw] lg:w-[22.5vw] md:w-[21.5vw] h-[7vh] bg-[#389300] justify-center 
  items-center 2xl:mx-2 xl:mx-1 lg:mx-1 md:mx-2  shadow-md  shadow-[var(--backgroundItems)]; 
}

.meusProjetos{
  @apply flex 2xl:w-[22.6vw] xl:w-[22.6vw] lg:w-[22.5vw] md:w-[21.5vw] h-[7vh] bg-[#8E00FF] justify-center 
  items-center 2xl:mx-2 xl:mx-1 lg:mx-1 md:mx-2  shadow-md  shadow-[var(--backgroundItems)];
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
  margin-left: -15px;
  font-size: large;
}
.iconeKanban{
  @apply w-[25px] h-[25px] flex justify-end xl:mr-[0.8vw] xl:mt-[1.2vh] lg:mr-[1.5vw] lg:mt-[1vh]  md:mr-[1.5vw] md:mt-[1vh];
}

.iconeCard{
  @apply  flex justify-end  2xl:mr-[0.5vw] xl:mr-[-0.5vw] xl:mt-[1.2vh] lg:mr-[0.0vw] lg:mt-[1vh] md:mr-[1vw] md:mt-[1vh];
}

.icone{
  @apply w-[45px] h-[45px] mt-[-1vh] ;

}

::-webkit-scrollbar {
    display: none;
}

.botaoStatus {
  @apply bg-transparent font-semibold mt-3 px-5 text-xl rounded mr-2 truncate  mobile:text-lg;
}

.bordaRoxa {
  @apply border-b-2 border-b-[var(--roxo)]; /* cor roxa */
}

.listaProjetos {
    @apply bg-[var(--backgroundItems)] shadow-md shadow-[var(--backgroundItems)];
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
  