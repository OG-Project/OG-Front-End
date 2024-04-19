<template>
    <div class="fixed bottom-0 w-full flex justify-around items-center h-[8vh] bg-[#36213E]">
        <img class="h-[60%]" :src="IconHome" />
        <img class="h-[60%]" :src="IconProfile" />
        <img class="h-[60%]" :src="IconFolder" />
        <img class="h-[60%]" :src="IconNotification" />
        <img class="h-[60%]" :src="IconConfig" />
    </div>
</template>

<script setup>

import IconConfig from "../assets/ConfigIconMobile.svg"
import IconFolder from "../assets/FolderIconMobile.svg"
import IconHome from "../assets/HomeIconMobile.svg"
import IconNotification from "../assets/NotificacaoIconMobile.svg"
import IconProfile from "../assets/EquipeIconMobile.svg"
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
