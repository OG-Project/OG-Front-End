<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Input from './components/Input.vue'
</script>

<template>
  <RouterView />
  <Input styleInput="input-transparente-placeholder-claro" icon="../src/imagem-vetores/icon-lapis-preto.svg" width="80" height="80" ></Input>
  <br>
  <Input styleInput="input-escuro" icon="../src/imagem-vetores/icon-lapis.svg" width="80" height="80" ></Input>
  <br>
  <Input styleInput="input-transparente-placeholder-claro" icon="../src/imagem-vetores/icon-lapis-preto.svg" width="80" height="80" ></Input>
</template>

<style scoped>

</style>
