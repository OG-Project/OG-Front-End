<template>
    <CheckBox tipo="checkbox"></CheckBox>
    <CheckBox tipo="toggle"></CheckBox>
    <div>
        <datePick ></datePick>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import cardProjetos from '/src/components/cardProjetos.vue'
import CheckBox from '../components/checkBox.vue';

import Input from '../components/Input.vue';
import datePick from '/src/components/datePick.vue'

let um=ref('um')

</script>

<style scoped>
@import url(../assets/main.css);
</style>