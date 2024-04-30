<template>
    <div class="card" :class="{ 'fade-in': show, 'fade-out': !show }" id="messeger">
        <div class="flex justify-center">
            <div class="divCor" :style="{ backgroundColor: cor }"></div>
            <img src="" alt="">
            <h2 class="card-titulo" :style="{ 'mensagem': mensagem }">{{ mensagem }}</h2>
        </div>
    </div>
</template>

<script setup>
    import { defineProps, ref, onMounted } from 'vue';

    const props = defineProps({
        mensagem: String,
        cor: String // Adicionei a propriedade "cor"
    });

    function limparMensagem() {
        props.mensagem = '';
    }
    const show = ref(false);

    onMounted(() => {
        // Exibe o componente ao ser montado
        show.value = true;
        // Define um timeout para esconder o componente após 5 segundos
        setTimeout(() => {
            show.value = false;
        }, 5000);
    });
</script>

<style scoped>
    .card {
        @apply flex flex-wrap justify-start 2xl:w-[15vw] 2xl:h-[6vh] xl:w-[17vw] xl:h-[6vh] lg:w-[18vw] lg:h-[6vh] md:w-[20vw] md:h-[6vh] bg-[var(--brancoNeve)] shadow-md;
        transition: all 0.6s ease-in; /* Adicionando a animação de easy-in-out */
    }

    .divCor {
        @apply w-[1vw] h-[6vh] bg-[var(--roxoAtencao)];
        clip-path: polygon(50% 0, 78% 13%, 79% 49%, 78% 87%, 50% 100%, 0 100%, 0 79%, 0% 43%, 0 0);
    }

    .card-titulo {
        @apply truncate flex 2xl:w-[13vw] xl:w-[13vw] lg:w-[14vw] md:w-[14vw] text-base font-semibold items-center justify-start ml-3 mr-[3vw] md:text-sm md:ml-0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .fade-in {
        animation: fadeIn 0.5s ease-in forwards;
    }

    .fade-out {
        animation: fadeOut 0.5s ease-out forwards 4.5s; /* Inicia após 4.5 segundos para totalizar 5 segundos */
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }

        to {
            opacity: 1;
        }
    }

    @keyframes fadeOut {
        from {
            opacity: 1;
        }

        to {
            opacity: 0;
        }
    }

    @media(max-width: 620px) {
        .card-titulo {
            @apply ml-5 text-xl w-[60vw];
        }
    }
</style>
