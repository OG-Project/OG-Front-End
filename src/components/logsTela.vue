<template>
    <div class="divGeral">
     <div class="divCor">  
     </div>
     <div>
      <h1 class="text-2xl sm:text-xl" :style="{'mensagem':mensagemError}">{{ mensagem }}</h1>
      <img src="" alt="">
     </div>
    </div>
</template>
<script setup>
const props = defineProps({
    mensagem: String
})

</script>
<style scoped>

.divGeral{
    @apply w-full h-[5vh] bg-[var(--brancoNeve)]
}
.divGeral{
    @apply w-5 h-[5vh] bg-[var(--roxoAtencao)]
}
</style>