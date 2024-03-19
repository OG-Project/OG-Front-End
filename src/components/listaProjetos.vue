<template>
    <div :style="{ height: height, width: width }" class="flex justify-center">
      <div class="listaProjetos overflow-auto">
        <div class="flex justify-center">
          <!-- Conteúdo do componente aqui -->
        </div>
      </div>       
    </div>
  </template>
  
  <script>
  export default {
    props: {
      height: {
        type: String,
        required: true
      },
      width: {
        type: String,
        required: true
      }
    }
  }
  </script>
  
  <style scoped>
  ::-webkit-scrollbar {
    display: none;
  }
  
  .listaProjetos {
    @apply bg-[#f8f8f8] shadow-md shadow-gray-200;
    flex: 1 1px;
  }
  </style>
  