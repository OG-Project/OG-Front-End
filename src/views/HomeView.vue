<template>
    <div>
        <cardProjetos :name="um"></cardProjetos>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import cardProjetos from '/src/components/cardProjetos.vue'

let um=ref('um')

</script>

<style scoped>
@import url(../assets/main.css);
</style>