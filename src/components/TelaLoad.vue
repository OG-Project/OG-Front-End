<template>
        <div class="blur-background">
            <div class="w-screen h-screen flex absolute  bg-black opacity-80 justify-center items-center z-[9999]">
                <div class="logo-container">
                    <logo class="fade"></logo>
                </div>
            </div>
        </div>
  </template>
  
  <script setup>
  import logo from '../imagem-vetores/logo.vue';
  import { conexaoBD } from '../stores/conexaoBD';

//   const conexaoBD = useStore('conexaoBD');
//   const loading = conexaoBD.loading;
  </script>
  
  <style scoped>
  /* Estilo para centralizar o conteúdo */
  .w-screen {
    width: 100%; /* Define a largura como 100% da largura da tela */
  }
  
  .h-screen {
    height: 100%; /* Define a altura como 100% da altura da tela */
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .blur-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw; /* Largura igual à largura da viewport */
    height: 100vh; /* Altura igual à altura da viewport */
    backdrop-filter: blur(10px); /* Ajuste o valor de desfoque conforme desejado */
    z-index: 9999; /* Deve ser maior do que o z-index do conteúdo que está por trás */
  }
  
  .logo-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  /* Estilo da animação */
  .fade {
    animation: fadeAnimation 3s infinite alternate;
    width: 120px; /* Define a animação */
  }
  
  @keyframes fadeAnimation {
    0% {
      opacity: 1; /* Opacidade inicial */
    }
    50% {
      opacity: 0.2; /* Opacidade no meio da animação */
    }
    100% {
      opacity: 1; /* Opacidade final */
    }
  }
  
  /* Redimensionamento da logo */
  .logo-container logo {
    width: 60%; /* Ajuste o tamanho da logo conforme desejado */
    max-width: 200px; /* Defina um tamanho máximo para a logo */
    height: auto; /* Mantém a proporção */
  }
  </style>
  