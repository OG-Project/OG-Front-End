<template>
    <div>
        <datePick ></datePick>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import Input from '../components/Input.vue';
import datePick from '/src/components/datePick.vue'

let um=ref('um')

</script>

<style scoped>
@import url(../assets/main.css);
</style>