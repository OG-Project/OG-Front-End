<script setup>

import { RouterLink, RouterView } from 'vue-router'
import Tabelas from './components/Tabelas.vue';
import LoginView from './views/LoginView.vue';
import Input from './components/Input.vue'
import { funcaoPopUpStore } from './stores/funcaoPopUp'
import Navbar from '@/components/Navbar.vue';
const funcaoPopUpPropriedade = funcaoPopUpStore();
const funcaoPopUpProjeto= funcaoPopUpStore();

const url = window.location.href;

</script>

<template>

  <Navbar v-if="url!='http://localhost:5173/login'"></Navbar>

  <RouterView></RouterView>

</template>

<style scoped>

</style>

