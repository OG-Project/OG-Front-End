<template>
    <fundoPopUp largura="" altura="60vh">
        <div class="divGeral">
            <div class="divTitulo">
                <h1 class="titulo">Historico</h1>
            </div>
            <div class="divHistorico">
                <div class="div">
                   <userTodoPreto class="imgPerfil"></userTodoPreto>
                    <div class="historico">
                       <h1 class="mensagem">alteoru algo jose</h1>
                       <h1 class="data">23/04/2019 23:40</h1>
                    </div>
                </div>
            </div>
        </div>
    </fundoPopUp>
</template>
<script setup>
import fundoPopUp from './fundoPopUp.vue';
import userTodoPreto from '../imagem-vetores/userTodoPreto.vue';
</script>
<style scoped>
.divGeral{
 @apply 2xl:w-[30vw] 2xl:h-[60vh] xl:w-[40vw] xl:h-[60vh] lg:w-[50vw] lg:h-[60vh] md:w-[60vw] md:h-[60vh]
}
.divTitulo{
    @apply w-full h-[6vh]
}
.titulo{
    @apply flex justify-center mt-10  text-3xl
}
.divHistorico{
    @apply flex flex-wrap w-full justify-center
}
.historico{
    @apply flex 2xl:w-[23vw] 2xl:h-[5vh] 2xl:mr-[1vw] xl:w-[30vw] xl:h-[5vh] xl:mr-[2vw] 
    lg:w-[40vw] lg:h-[5vh] lg:mr-[1vw] md:w-[50vw] md:h-[5vh] md:mr-[1vw] 
    bg-[var(--backgroundItemsClaros)] rounded-md
}
.imgPerfil{
    @apply flex justify-start w-[40px] h-[40px] rounded-full mr-5 2xl:mt-1 xl:mt-2 lg:mt-2 md:mt-2
}
.div{
    @apply flex w-full justify-end p-5;
}
.mensagem{
    @apply flex justify-center items-center ml-3 2xl:text-base xl:text-base lg:text-lg md:text-sm
}
.data{
    @apply flex justify-end items-center 2xl:ml-[6vw] xl:ml-[7vw] lg:ml-[15vw] md:ml-[15vw] text-base
}

@media(min-width: 2560px){
  .historico{
    @apply flex w-[20vw] h-[5vh] mr-[3vw] bg-[var(--backgroundItemsClaros)] rounded-md
  }
  .imgPerfil{
    @apply mt-2
  }
  .mensagem{
    @apply text-xl
  }
}

@media(max-width: 320px) {
    .titulo{
        @apply text-4xl mb-2; 
    }
    .botao{
        @apply flex justify-end mt-10
    }
    .convidados-div {
        @apply h-full mt-10;
    }
    .imagem{
        @apply w-[60px] h-[60px]
    }
    
}

@media(max-width: 375px) {
    .titulo{
        @apply text-4xl mb-2; 
    }
    .botao{
        @apply flex justify-end mt-10
    }
    .convidados-div {
        @apply h-full mt-10;
    }
    .imagem{
        @apply w-[60px] h-[60px]
    }
    .alert{
        @apply mt-[-60vw] text-sm;
    }
}

@media(min-width: 425px) and (max-width: 620px){
    .titulo{
        @apply text-4xl mb-8; 
    }
    .botao{
        @apply flex justify-end mt-10
    }
    .convidados-div {
        @apply h-full mt-10;
    }
    .imagem{
        @apply w-[60px] h-[60px]
    }
    .alert{
        @apply mt-[-50vw]
    }
}
</style>
