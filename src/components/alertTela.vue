<template>
    <div class="fixed w-full z-[9999] top-8 flex justify-end right-4">
        <div class="card" :class="{ 'fade-in': show, 'fade-out': !show }" id="messeger">
            <div class="flex justify-center items-center">
                <div class="divCor" :style="{ backgroundColor: cor }"></div>
                <div class="gap-[1%] flex flex-row">
                    <div class="icon">
                        <errorIcon  v-if="cor == '#CD0000'"></errorIcon>
                    </div>
                    <div>
                        <alert v-if="cor == '#8E00FF'"></alert>
                    </div>
                    <div class=" icon">
                        <sucessIcon  v-if="cor == '#29CD00'"></sucessIcon>
                    </div>
                    <div class="card-titulo" :style="{ width: largura }" >
                        <h2 class="text-black" :style="{ 'mensagem': mensagem }">{{ mensagem }}</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { defineProps, ref, onMounted } from 'vue';
    import { getCurrentInstance } from 'vue';
    import sucessIcon from '../assets/sucessIcon.vue';
    import errorIcon from '../assets/errorIcon.vue';
    import alert from '../assets/alert.vue';
    const instance = getCurrentInstance();
    const props = defineProps({
        mensagem: String,
        cor: String,
        largura: String
        // Adicionei a propriedade "cor"
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
        @apply flex flex-wrap justify-start max-w-max 2xl:h-[6vh] xl:h-[6vh] lg:h-[6vh]  md:h-[6vh] bg-[var(--brancoNeve)] shadow-md;
        transition: all 0.6s ease-in; /* Adicionando a animação de easy-in-out */
    }

    .icon{
        @apply flex justify-center items-center h-full;
    }

    .divCor {
        @apply w-[1vw] h-[6vh] bg-[var(--roxoAtencao)];
        clip-path: polygon(50% 0, 78% 13%, 79% 49%, 78% 87%, 50% 100%, 0 100%, 0 79%, 0% 43%, 0 0);
    }

    .card-titulo {
        @apply truncate  flex 2xl:w-[15vw] xl:w-[18vw] lg:w-[18vw] md:w-[24vw] text-base text-[var(--fonteCor)] font-semibold items-center justify-start md:text-sm  md:ml-0;
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

    @media(max-width: 320px) {
        .card-titulo {
            @apply truncate flex-wrap ml-0 text-sm w-[70vw];
        }
        .card {
            @apply w-[92vw] h-[6vh];
            transition: all 0.6s ease-in; /* Adicionando a animação de easy-in-out */
        }
    }

    @media(min-width:330px) and (max-width: 350px){
        .card-titulo {
            @apply truncate flex-wrap ml-0 text-lg w-[82vw];
        }
        .card {
            @apply mr-[-3.5vw] w-[98vw] h-[6vh];
            transition: all 0.6s ease-in; /* Adicionando a animação de easy-in-out */
        }
    }

    @media(min-width:355px) and(max-width: 375px) {
        .card-titulo {
            @apply truncate flex-wrap ml-0 text-lg w-[70vw];
        }
        .card {
            @apply mr-[-3.5vw] w-[98vw] h-[6vh];
            transition: all 0.6s ease-in; /* Adicionando a animação de easy-in-out */
        }
    }

    @media(min-width: 425px) and (max-width: 620px){
        .card-titulo {
            @apply flex-wrap ml-5 text-lg w-[80vw];
        }
        .card {
            @apply w-[90vw] h-[6vh];
            transition: all 0.6s ease-in; /* Adicionando a animação de easy-in-out */
        }
    }

    @media(min-width: 2560px){
        .card-titulo {
            @apply flex-wrap ml-0 text-2xl 2xl:w-[17vw] 2xl:h-[6vh];
        }
        .card {
            @apply w-[20vw];
            transition: all 0.6s ease-in; /* Adicionando a animação de easy-in-out */
        }
        .icon{
            @apply flex justify-center items-center ml-2 2xl:mt-[0vh];
        }
    }
</style>
