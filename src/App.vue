<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Input from './components/Input.vue'

import fundoPopUp from './components/fundoPopUp.vue';
import {useCounterStore} from './stores/funcaoPopUp'

const funcaoPopUp = useCounterStore();
 
</script>

<template>
  <RouterView />
  <div class="w-full h-screen bg-red-50">
    <fundoPopUp>
      <Input width="10" height="18" styleInput="input-claro"></Input>
  </fundoPopUp>
  <Input width="80" height="40" styleInput="input-claro"></Input>
  <button @click="funcaoPopUp.abrePopUp()">
    teste
  </button>
  </div>

</template>

<style scoped>

  

</style>
