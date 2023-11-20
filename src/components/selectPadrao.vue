<template>
    <select class="styleSelectPadrao" :style="estilizaDivSelect" >
        <option v-for="opcao of listaSelect" >{{ opcao }}</option>
    </select>

</template>

<script setup>
    const props=defineProps({
        listaSelect:[],
        styleSelect: String
    })



    const estilizaDivSelect={
        backgroundColor: verificaCorBack(),
        color: verificaCorTexto()
    }

    function verificaCorBack(){
         // só muda a cor de fundo da div do input de acordo com o style recebido
        if(props.styleSelect=="select-escuro" || props.styleSelect=="select-grande-escuro" || 
        props.styleSelect=="select-escuro-grande" || props.styleSelect=="select-escuro-grande"){
            return "#484848"
        }else if(props.styleSelect=="select-claro" || props.styleSelect=="select-grande-claro" || 
        props.styleSelect=="select-claro-grande" || props.styleSelect=="select-claro-grande"){
            return "#D7D7D7"
        }
    }

    function verificaCorTexto(){
        if(props.styleSelect=="select-escuro" || props.styleSelect=="select-grande-escuro" || 
        props.styleSelect=="select-escuro-grande" || props.styleSelect=="select-escuro-grande"){
            return "white"
        }else if(props.styleSelect=="select-claro" || props.styleSelect=="select-grande-claro" || 
        props.styleSelect=="select-claro-grande" || props.styleSelect=="select-claro-grande"){
            return "black"
        }
    }
</script>

<style>
@import url(../assets/main.css);

@layer components{
    .styleSelectPadrao{
       @apply bg-transparent
        border-b-roxo
        border-b-2 border-transparent 
        max-w-max 
        items-center focus-within:border-roxo 
        focus-within:rounded-sm focus-within:border-2;
    }

    select{
        @apply focus-visible:outline-0;
    }
}
</style>