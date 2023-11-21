<template>
    <div class="styleSelectPadrao " :style="estilizaDivSelect">
        <select>
            <option v-for="opcao of listaSelect" >{{ opcao }}</option>
        </select>
    </div>

</template>

<script setup>
    const props=defineProps({
        listaSelect:[],
        styleSelect: String,
        tamanho: String
    })



    const estilizaDivSelect={
        backgroundColor: verificaCorBack(),
        color: verificaCorTexto(),
        fontSize: props.tamanho+"vh",
        width: "100%",
        heigth: '100%'

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
        border-b-4 border-transparent 
        max-w-max 
        items-center focus-within:outline-roxo 
        focus-within:outline focus-within:outline-4 focus-within:border-none focus-within:rounded-sm;
    }

    select{
        @apply focus-visible:outline-0;
    }
}
</style>