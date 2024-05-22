<template>
    <fundoPopUp largura="" altura="60vh">
        <div class="divGeral">
            <div class="divTitulo">
                <h1 class="titulo">{{$t('paginaAdm.historico')}}</h1>
            </div>
            <div class="divHistorico overflow-y">
                <div  v-for="historico in historicos" :key="historico.id" class="div">
                   <img @click="router.push('/perfil/'+historico.criador.id)" v-if="historico.criador.foto != null" class="imgPerfil cursor-pointer" :src="`data:${historico.criador.foto.tipo};base64,${historico.criador.foto.dados}`" 
                   alt="">
                   <userTodoPreto v-else class="imgPerfil"></userTodoPreto>
                    <div class="historico">
                       <h1 class="mensagem 2xl:mr-14 xl:mr-14  w-[50%] xl:w-[80%] lg:w-[90%] md:w-[90%] ">{{ traducao(historico) }}</h1>
                       <h1 class="criador flex items-center 2xl:mr-[0vw] xl:mr-[-10vw] lg:mr-[-18vw] md:mr-[-20vw] 2xl:w-[0%] xl:w-[0%] lg:w-[0vw] md:w-[0vw]">{{ historico.criador.username}}</h1>
                       <h1 class="data w-[10%]">{{ formatarData( historico.dataDeEnvio) }}</h1>
                    </div>
                </div>
            </div>
        </div>
    </fundoPopUp>
</template>
<script setup>
import fundoPopUp from './fundoPopUp.vue';
import userTodoPreto from '../imagem-vetores/userTodoPreto.vue';
import { onMounted, ref, defineProps } from 'vue';
import { conexaoBD } from '../stores/conexaoBD';
import router from '../router';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
onMounted (async () =>{
    buscarHistorico();

});

const props = defineProps({
    textoRequisicao: String,
    id: Number
});

const banco = conexaoBD();
let historicos = ref([]);

async function buscarHistorico(){
    
    console.log()
    historicos.value = await banco.buscarHistorico(props.id, props.textoRequisicao)
    
    
    console.log(historicos.value)
}

function traducao(historico) {
    if (historico.mensagem.startsWith('Criou a tarefa')) {
        const tarefaNome = historico.mensagem.replace('Criou a tarefa', '').trim();
        return `${t('historicoTarefa.criaTarefa')} ${tarefaNome}`;
    }
    if (historico.mensagem.startsWith('Editou a tarefa')) {
        const tarefaNome = historico.mensagem.replace('Editou a tarefa', '').trim();
        return `${t('historicoTarefa.editou')} ${tarefaNome}`;
    }
    if (historico.mensagem.startsWith('Deletou a subTarefa')) {
        const subTarefaNome = historico.mensagem.replace('Deletou a subTarefa', '').trim();
        return `${t('historicoTarefa.deletarSubTarefa')} ${subTarefaNome}`;
    }
    if (historico.mensagem.startsWith('Criou a subTarefa')) {
        const subTarefaNome = historico.mensagem.replace('Criou a subTarefa', '').trim();
        return `${t('historicoTarefa.criaSubTarefa')} ${subTarefaNome}`;
    }
    if (historico.mensagem.startsWith('Mudou o status')) {
        const statusDetalhe = historico.mensagem.replace('Mudou o status', '').trim();
        return `${t('historicoTarefa.status')} ${statusDetalhe}`;
    }
    if (historico.mensagem.startsWith('Comentou na tarefa')) {
        const comentarioDetalhe = historico.mensagem.replace('Comentou na tarefa', '').trim();
        return `${t('historicoTarefa.criaComentario')} ${comentarioDetalhe}`;
    }
    if (historico.mensagem.startsWith('Deletou um comentario')) {
        const comentarioDetalhe = historico.mensagem.replace('Deletou um comentario', '').trim();
        return `${t('historicoTarefa.deletaComentario')} ${comentarioDetalhe}`;
    }
    if (historico.mensagem.startsWith('Concluiu a subTarefa')) {
        const subTarefaNome = historico.mensagem.replace('Concluiu a subTarefa', '').trim();
        return `${t('historicoTarefa.concluiu')} ${subTarefaNome}`;
    }
    if (historico.mensagem.startsWith('Criou o projeto')) {
        const projetoNome = historico.mensagem.replace('Criou o projeto', '').trim();
        return `${t('historicoProjeto.criou')} ${projetoNome}`;
    }
    if (historico.mensagem.startsWith('Editou o Projeto')) {
        const projetoNome = historico.mensagem.replace('Editou o Projeto', '').trim();
        return `${t('historicoProjeto.editou')} ${projetoNome}`;
    }
    if (historico.mensagem.startsWith('Adicionou um novo responsável')) {
        const responsavelNome = historico.mensagem.replace('Adicionou um novo responsável', '').trim();
        return `${t('historicoProjeto.addResponsavel')} ${responsavelNome}`;
    }
    if (historico.mensagem.startsWith('Convidou uma equipe')) {
        const equipeNome = historico.mensagem.replace('Convidou uma equipe', '').trim();
        return `${t('historicoProjeto.convidouEquipe')} ${equipeNome}`;
    }
    if (historico.mensagem.startsWith('Removeu uma equipe')) {
        const equipeNome = historico.mensagem.replace('Removeu uma equipe', '').trim();
        return `${t('historicoProjeto.removeEquipe')} ${equipeNome}`;
    }
    if (historico.mensagem.startsWith('Removeu o responsável')) {
        const responsavelNome = historico.mensagem.replace('Removeu o responsável', '').trim();
        return `${t('historicoProjeto.removeResponsavel')} ${responsavelNome}`;
    }
    if (historico.mensagem.startsWith('Criou um status novo')) {
        const statusNome = historico.mensagem.replace('Criou um status novo', '').trim();
        return `${t('historicoProjeto.status')} ${statusNome}`;
    }
    if (historico.mensagem.startsWith('Criou uma propriedade')) {
        const propriedadeNome = historico.mensagem.replace('Criou uma propriedade', '').trim();
        return `${t('historicoProjeto.propriedade')} ${propriedadeNome}`;
    }
    if (historico.mensagem.startsWith('Removeu a propriedade')) {
        const propriedadeNome = historico.mensagem.replace('Removeu a propriedade', '').trim();
        return `${t('historicoProjeto.removePropriedade')} ${propriedadeNome}`;
    }
    if (historico.mensagem.startsWith('Removeu o status')) {
        const statusNome = historico.mensagem.replace('Removeu o status', '').trim();
        return `${t('historicoProjeto.removeStatus')} ${statusNome}`;
    }
    if (historico.mensagem.startsWith('Comentou no projeto')) {
        const comentarioDetalhe = historico.mensagem.replace('Comentou no projeto', '').trim();
        return `${t('historicoProjeto.comentario')} ${comentarioDetalhe}`;
    }
    if (historico.mensagem.startsWith('Deletou a tarefa')) {
        const tarefaNome = historico.mensagem.replace('Deletou a tarefa', '').trim();
        return `${t('historicoProjeto.deletaTarefa')} ${tarefaNome}`;
    }
}


function formatarData(data){
    const dataFormatada = new Date(data);
        const dia = dataFormatada.getDate().toString().padStart(2, '0');
        const mes = (dataFormatada.getMonth() + 1).toString().padStart(2, '0');
        const ano = dataFormatada.getFullYear();
        return `${dia}/${mes}/${ano}`;
}



</script>
<style scoped>
.divGeral{
 @apply 2xl:w-[30vw] 2xl:h-[60vh] xl:w-[40vw] xl:h-[60vh] lg:w-[50vw] lg:h-[60vh] md:w-[63vw] md:h-[60vh]
}
.divTitulo{
    @apply w-full h-[6vh]
}
.titulo{
    @apply flex justify-center mt-10  text-3xl
}
.divHistorico{
    @apply flex-wrap w-full h-full justify-center;
    scrollbar-width: none;
}
.historico{
    @apply flex 2xl:w-[23vw] 2xl:h-[5vh] 2xl:mr-[1vw] xl:w-[30vw] xl:h-[5vh] xl:mr-[2vw] 
    lg:w-[40vw] lg:h-[5vh] lg:mr-[1vw] md:w-[50vw] md:h-[5vh] md:mr-[1vw] 
    bg-[var(--backgroundItemsClaros)]  rounded-md
}
.imgPerfil{
    @apply flex justify-start w-[40px] h-[40px] rounded-full mr-5 2xl:mt-1 xl:mt-2 lg:mt-2 md:mt-2 
}
.div{
    @apply flex w-full justify-end p-5;
}
.mensagem{
    @apply flex justify-start items-center ml-3 2xl:text-base xl:text-base lg:text-lg md:text-lg truncate;
}
.data{
    @apply flex justify-end bg-black mt-[5vh] 2xl:ml-[2vw] xl:ml-[12vw] lg:ml-[20vw] md:ml-[23vw] text-base
}

@media(min-width: 2560px){
  .historico{
    @apply flex w-[20vw] h-[5vh] mr-[3vw] bg-[var(--backgroundItemsClaros)] rounded-md
  }
  .imgPerfil{
    @apply mt-2
  }
  .mensagem{
    @apply text-xl 2xl:w-[20vw]
  }
}

@media(min-width: 2560px){
    .criador{
        @apply mr-[-1vw]
    }
}

@media(max-width: 320px) {
    .divGeral{
        @apply w-[98vw] h-[60vh];
       }
       .divTitulo{
           @apply w-full h-[6vh]
       }
       .titulo{
           @apply flex justify-center mt-10 text-3xl
       }
       .divHistorico{
           @apply flex flex-wrap w-full justify-center
       }
       .historico{
           @apply flex w-[75vw] h-[5vh] mr-[1vw]  
           bg-[var(--backgroundItemsClaros)] rounded-md
       }
       .imgPerfil{
           @apply flex justify-start w-[40px] h-[40px] rounded-full mr-2 mt-2;
       }
       .div{
           @apply flex w-full justify-end p-5;
       }
       .mensagem{
           @apply flex-wrap justify-start w-[75vw] items-center ml-3 mobile:text-sm
       }
       .data{
           @apply flex-wrap w-[20vw] justify-end items-center ml-[9vw] mt-[5vh] mobile:text-sm
       }
       .criador{
        @apply flex-wrap w-[0vw] mr-[-10vw] mobile:text-sm;
       }
}

@media(min-width: 330px) and (max-width: 375px) {
    .divGeral{
        @apply w-[98vw] h-[60vh];
       }
       .divTitulo{
           @apply w-full h-[6vh]
       }
       .titulo{
           @apply flex justify-center mt-10 text-3xl
       }
       .divHistorico{
           @apply flex flex-wrap w-full justify-center
       }
       .historico{
           @apply flex w-[75vw] h-[5vh] mr-[1vw]  
           bg-[var(--backgroundItemsClaros)] rounded-md
       }
       .imgPerfil{
           @apply flex justify-start w-[40px] h-[40px] rounded-full mr-3 ;
       }
       .div{
           @apply flex w-full justify-end p-5;
       }
       .mensagem{
           @apply flex-wrap w-[75vw] justify-start items-center ml-3 mobile:text-sm
       }
       .data{
           @apply flex-wrap w-[20vw] justify-end items-center ml-[8vw] mt-[5vh] mobile:text-sm
       }
       .criador{
        @apply flex-wrap w-[0vw] mr-[-12vw] mobile:text-sm;
       }
}

@media(min-width: 385px) and (max-width: 620px){
    .divGeral{
        @apply w-[98vw] h-[60vh];
       }
       .divTitulo{
           @apply w-full h-[6vh]
       }
       .titulo{
           @apply flex justify-center mt-10 text-3xl
       }
       .divHistorico{
           @apply flex flex-wrap w-full justify-center
       }
       .historico{
           @apply flex w-[75vw] h-[5vh] mr-[1vw]  
           bg-[var(--backgroundItemsClaros)] rounded-md
       }
       .imgPerfil{
           @apply flex justify-start w-[40px] h-[40px] rounded-full mr-5 mt-1;
       }
       .div{
           @apply flex w-[100vw] justify-end p-5;
       }
       .mensagem{
           @apply flex-wrap justify-start w-[90vw] items-center ml-3 mobile:text-base
       }
       .data{
           @apply flex-wrap w-[30vw] justify-end items-center ml-[9vw] mt-[5vh] mobile:text-base
       }
       .criador{
        @apply flex-wrap w-[0vw] mr-[-15vw] mobile:text-base;
       }
}
</style>
