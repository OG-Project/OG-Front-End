<template>
    <div class="fixed bottom-0 w-full flex justify-around items-center h-[8vh] bg-[#36213E] z-[9999999999]">
        <img class="h-[40%]" @click="redireciona('/home')" :src="IconHome" />
        <img class="h-[40%]" @click="redireciona('/equipe')" :src="IconProfile" />
        <img class="h-[40%]" @click="redireciona('/projetos')" :src="IconFolder" />
        <img class="h-[40%]" :src="IconNotification" />
        <img class="h-[40%]" @click="redireciona('/perfil/informacoes')" :src="IconConfig" />
    </div>
</template>

<script setup>
import IconConfig from "../assets/ConfigIconMobile.svg"
import IconFolder from "../assets/FolderIconMobile.svg"
import IconHome from "../assets/HomeIconMobile.svg"
import IconNotification from "../assets/NotificacaoIconMobile.svg"
import IconProfile from "../assets/EquipeIconMobile.svg"
import router from "@/router";

function redireciona(caminho){
    router.push(caminho)
}

</script>

<style scoped>
h1 {
    font-size: 24px;
    margin-bottom: 10px;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    margin-bottom: 5px;
}
</style>
