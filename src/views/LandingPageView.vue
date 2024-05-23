<template>

    <body class="max-w-[100vw]">
        <div class="w-[100vw] h-[420vh] bg-[#F2F2F2]">
            <div class="w-[100vw] h-[100vh] flex items-center justify-around">
                <img class="absolute top-0 right-0 z-30" src="../assets/BackgroundlandingPage.svg">
                <div class="w-[30%] gap-6 flex flex-col z-50">
                    <img class="w-[50%]" src="../imagem-vetores/nome.svg" />
                    <p class="text-[var(--roxo)]">{{ $t('landingPage.organizacaoAoSeuAlcance') }}</p>
                    <p class="text-black text-xl">{{ $t('landingPage.facilGerenciar') }}</p>
                    <Botao :funcaoClick="irParaLogin" preset="PadraoRoxo" :texto="$t('landingPage.comeceAgora')"
                        tamanhoPadrao="medio"></Botao>
                </div>
                <div class="z-50">
                    <Logo class="tamanhoDaLogoLogin" />
                </div>
            </div>
            <div class="w-[100vw] h-[200vh] flex flex-col">
                <div class="h-[60%] flex items-center justify-center bg-[var(--roxoEscuro)]" style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; z-index: 5;" >
                    <div class="w-[50%] h-[60%] bg-[var(--roxoEscuro)]"
                        style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; z-index: 5;">
                        <img class="w-[100%] h-[100%]" src="../assets/TelaInicial.png" />
                    </div>
                    <p class=" text-white pl-20 text-2xl w-[40%]">
                        Nossa vida é baseada em tarefas. Seja no trabalho, em casa ou na escola, sempre temos algo a fazer, a OG veio para facilitar a sua vida. Com uma organização simples e intuitiva, você pode gerenciar suas tarefas de forma eficiente e sem complicações.
                    </p>
                </div>
                <div class="h-[50%] flex items-center justify-center" >
                    <div class="flex items-center justify-center">
                        <p class="text-black pr-20 text-2xl w-[40%]">
                            Simplificar sua rotina nunca foi tão fácil. Com o OG, você tem um sistema de gerenciamento
                            de tarefas projetado para ser direto, intuitivo e sem complicações. Organize, priorize e
                            conclua suas tarefas com facilidade.
                        </p>
                        <div class="w-[50%] h-[60%] bg-[var(--roxoEscuro)]"
                        style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; z-index: 5;">
                        <img class="w-[100%] h-[100%]" src="../assets/PaginaEquipe.png" />
                    </div>
                    </div>
                </div>
            </div>
            <div class="w-[100vw] h-[100vh] flex justify-around mt-32">
                <div class="w-[33%] h-[100%] flex flex-col items-center">
                    <div class="poligono h-[35%] w-[40vh] shadow-2xl flex justify-center flex-col"
                        style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; z-index: 5;">
                        <div class="flex items-center justify-center">
                            <img class="w-[40%]" src="../assets/Alvo.svg" />
                        </div>
                    </div>
                    <p class="w-[33%] pt-8 text-2xl text-center text-black">Objetivo</p>
                    <p class="w-[33%] text-md text-justify text-black pt-8">A OG Project tem o objetivo de facilitar a vida de
                        seus usuários, oferecendo uma plataforma de gerenciamento de tarefas simples e intuitiva.
                    </p>
                </div>
                <div class="w-[33%] h-[100%] flex flex-col items-center">
                    <div class="poligono h-[35%] w-[40vh] shadow-2xl flex justify-center flex-col"
                        style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; z-index: 5;">
                        <div class="flex items-center justify-center">
                            <img class="w-[40%]" src="../assets/SobreNos.svg" />
                        </div>
                    </div>
                    <p class="w-[33%] pt-8 text-2xl text-center text-black">Sobre nós</p>
                    <p class="w-[33%] text-md text-justify text-black pt-8">Nós somos um pequeno grupo de desenvolvedores
                        que acredita que a organização é a chave para o sucesso. Por isso, criamos a OG Project.
                    </p>
                </div>
                <div class="w-[33%] h-[100%] flex flex-col items-center">
                    <div class="poligono h-[35%] w-[40vh] shadow-2xl flex justify-center flex-col"
                        style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; z-index: 5;">
                        <div class="flex items-center justify-center">
                            <img class="w-[40%]" src="../assets/Historia.svg" />
                        </div>
                    </div>
                    <p class="w-[33%] pt-8 text-2xl text-center text-black">História</p>
                    <p class="w-[33%] text-md text-justify text-black pt-8">
                        A OG Project foi formada em 2023 por um grupo de amigos que acreditavam que a organização
                        é a chave para o sucesso.
                    </p>
                </div>
            </div>
        </div>
    </body>
</template>

<script setup>
import Botao from '../components/Botao.vue';
import router from '../router';
import Logo from "../imagem-vetores/logo.vue";

function irParaLogin() {
    router.push({ name: 'Login' })
}
</script>

<style scoped>
.tamanhoDaLogoLogin {
    @apply 2xl:w-[25vw] 2xl:h-[25vw] xl:w-[30vw] lg:w-[40vw] md:w-[50vw];
}

#poligono3 {
    clip-path: polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%);
    background-color: var(--roxoEscuro);
}

#poligono2 {
    clip-path: polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 50%);
    background-color: var(--roxoEscuro);
}

.poligono {
    clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
    background-color: var(--roxoEscuro);
}

#corpo {
    clip-path: polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%);
    background-color: #D3D3D3;
}

html,
body {
    overflow-x: hidden;
    width: 100vw;
    max-width: 100vw;
    margin: 0;
    padding: 0;
}
</style>
