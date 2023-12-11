<script setup>
import {RouterView} from 'vue-router'
import Input from './components/Input.vue'
import { funcaoPopUpStore } from './stores/funcaoPopUp'
import Navbar from '@/components/Navbar.vue';
const funcaoPopUpPropriedade = funcaoPopUpStore();
const funcaoPopUpProjeto= funcaoPopUpStore();

</script>
<template>
  <Navbar></Navbar>
    <RouterView />
</template>
<style scoped></style>



