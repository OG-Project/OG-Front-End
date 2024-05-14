<template>
  <div>
    <div v-if="loading == true" class="blur-background">
      <div class="w-screen h-screen flex absolute bg-[var(--backgroundItems)] opacity-80 justify-center items-center z-[9999]">
        <div class="logo-container">
          <logo class="fade"></logo>
        </div>
      </div>
    </div>
    <!-- Seu conteúdo principal aqui -->
  </div>
</template>

<script setup>
import logo from '../imagem-vetores/logo.vue';
import { conexaoBD } from '../stores/conexaoBD';
import { computed } from 'vue';

const conexao = conexaoBD();
const loading = computed(() => conexao.loading);
</script>

<style scoped>
.w-screen {
  width: 100%;
}
.h-screen {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.blur-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(8px);
  z-index: 9999;
}
.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.fade {
  animation: fadeAnimation 3s infinite alternate;
  width: 120px;
}
@keyframes fadeAnimation {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.2;
  }
  100% {
    opacity: 1;
  }
}
.logo-container logo {
  width: 60%;
  max-width: 200px;
  height: auto;
}
</style>
