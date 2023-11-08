<template>
    <div>
        <cardProjetos :name="um" :reponsavel="dois" :descricao="tres" :tipo="quatro" />
    </div>
</template>

<script setup>
import {ref} from 'vue'
import cardProjetos from '/src/components/cardProjetos.vue'

let um=ref('Juninho')
let dois=ref('Juninho')
let tres=ref('Juninho vai lavar na tentativa de ser limpo porque eu não sei esse negocios é diferente de mais da ligado e por aií vai e vamo tentando colocar muito texto até agora hoje tenho tentativas')
let quatro=ref('Juninho')

</script>

<style scoped>
@import url(../assets/main.css);
</style>