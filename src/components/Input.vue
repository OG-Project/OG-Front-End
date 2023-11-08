<template>
    <img :src=icon :class= direcao>
    <input :class=style>
</template>

<script setup>

    defineProps({
        style: String,
        icon: String,
        direcao: String
    })

</script>

<style>
@import url(../index.css);

@layer components{
    .default-transparente{
        @apply bg-transparent
        border-b-roxo
        border
    }
}
</style>