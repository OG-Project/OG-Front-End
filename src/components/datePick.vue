<template>
    <div>
        <Calendar v-model="date" selectionMode="range" :manualInput="false" showButtonBar showIcon />
       <h1>{{date}}</h1>
    </div>
</template>

<script setup>
import {ref} from 'vue'
let date=ref('');

</script>

<style lang="scss" scoped>

</style>