<template>
    <img :src=icon :class= direcao>
    <input :class=style>
</template>

<script setup>
import { onMounted } from 'vue';
import {Usuario} from '../models/usuario'
    defineProps({
        style: String,
        icon: String,
        direcao: String
    })
    onMounted(()=>{
            console.log(Usuario)
            const usuario= Usuario.id;
        }
    )

</script>

<style>
@import url(../assets/main.css);

@layer components{
    .default-transparente{
        @apply bg-transparent
        border-b-roxo
        border
    }
}
</style>