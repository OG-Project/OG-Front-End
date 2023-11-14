<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Input from './components/Input.vue'
</script>

<template>
  <RouterView />

    <Input styleInput="input-transparente-claro" icon="../src/imagem-vetores/icon-lapis-preto.svg" width="23" height="5"></Input>
    <br>
    <Input styleInput="input-escuro" icon="../src/imagem-vetores/icon-lapis.svg" width="23" height="5"></Input>
    <br>
    <Input styleInput="input-transparente-escuro" icon="../src/imagem-vetores/icon-lapis-preto.svg" width="23" height="5"></Input>
    <br>
    <Input styleInput="input-claro-grande" icon="../src/imagem-vetores/icon-lapis-preto.svg" width="38" height="10"></Input>

</template>

<style scoped>

</style>
