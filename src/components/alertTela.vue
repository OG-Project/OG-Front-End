<template>
    <div class="card" :class="{ 'fade-in': show, 'fade-out': !show }" id="messeger">
        <div class="flex justify-center">
            <div class="divCor" :style="{ backgroundColor: cor }"></div>
            <errorIcon class="flex justify-center items-center mt-[1vh] ml-2 2xl:mt-[0.5vh] xl:mt-[1vh] lg:mt-[1vh] md:mt-[1vh]
            2xl:mr-2 xl:mr-2 lg:mr-2 md:mr-2 2xl:ml-0 xl:ml-0 lg:ml-0 md:ml-0" v-if="cor == '#CD0000'"></errorIcon>
            <sucessIcon class="flex justify-center items-center mt-[1vh] ml-2 2xl:mt-[0.5vh] xl:mt-[1vh] lg:mt-[1vh] md:mt-[1vh] 
            2xl:mr-2 xl:mr-2 lg:mr-2 md:mr-2 2xl:ml-0 xl:ml-0 lg:ml-0 md:ml-0" v-if="cor == '#29CD00'"></sucessIcon>
            <h2 class="card-titulo" :style="{ 'mensagem': mensagem }">{{ mensagem }}</h2>
        </div>
    </div>
</template>

<script setup>
    import { defineProps, ref, onMounted } from 'vue';
    import { getCurrentInstance } from 'vue';
    import sucessIcon from '../assets/sucessIcon.vue';
    import errorIcon from '../assets/errorIcon.vue';
    const instance = getCurrentInstance();
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
            limparMensagem();
             instance.emit('acabouOTempo')
        }, 5000);
    });
</script>

<style scoped>
    .card {
        @apply flex flex-wrap justify-start 2xl:w-[17vw] 2xl:h-[6vh] xl:w-[22vw] xl:h-[6vh] lg:w-[26vw] lg:h-[6vh] md:w-[34vw] md:h-[6vh] bg-[var(--brancoNeve)] shadow-md;
        transition: all 0.6s ease-in; /* Adicionando a animação de easy-in-out */
    }

    .divCor {
        @apply w-[1vw] h-[6vh] bg-[var(--roxoAtencao)];
        clip-path: polygon(50% 0, 78% 13%, 79% 49%, 78% 87%, 50% 100%, 0 100%, 0 79%, 0% 43%, 0 0);
    }

    .card-titulo {
        @apply truncate flex 2xl:w-[13vw] xl:w-[18vw] lg:w-[18vw] md:w-[24vw] text-base font-semibold items-center justify-start mt-1 ml-3 mr-[3vw] md:text-sm md:ml-0;
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
            @apply flex-wrap ml-5 text-lg w-[80vw];
        }
        .card {
            @apply w-[90vw] mt-[-20vh];
            transition: all 0.6s ease-in; /* Adicionando a animação de easy-in-out */
        }
    }
</style>
