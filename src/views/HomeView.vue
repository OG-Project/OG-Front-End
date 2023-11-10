<template>
    <div>
        <cardProjetos :name="um"></cardProjetos>
    </div>
    <CheckBox tipo="checkbox"></CheckBox>
    <CheckBox tipo="toggle"></CheckBox>
</template>

<script setup>
import {ref} from 'vue'
import cardProjetos from '/src/components/cardProjetos.vue'
import CheckBox from '../components/checkBox.vue';

let um=ref('um')

</script>

<style scoped>
@import url(../assets/main.css);
</style>