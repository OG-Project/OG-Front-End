<template>
    <div class="styleSelectPadrao " :style="estilizaDivSelect">
        <select :style="estilizaSelect" @input="$emit('update:modelValue', $event.target.value)">
            <option v-for="opcao of listaSelect" class="flex items-center justify-center" :value="opcaoSelecionada">{{ opcao }}</option>
        </select>
    </div>

</template>

<script setup>
defineEmits(['update:modelValue'])
    const props=defineProps({
        listaSelect:[],
        styleSelect: String,
        fonteTamanho: String,
        largura:{
            type: String,
            default: "100%"
        },
        altura:{
            type: String,
            default: "100%"
        },
        opcaoSelecionada:String
    })



    const estilizaDivSelect={
        backgroundColor: verificaCorBack(),
        color: verificaCorTexto(),
        fontSize: props.fonteTamanho+"vh",
        }

    const estilizaSelect={
        width:props.largura,
        heigth: props.altura,
        maxWidth: props.largura,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
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
       @apply   border-4 
        border-transparent
        border-b-roxo    
        pt-2
        pb-2
        px-4
        border-b-4
        w-max
        items-center justify-center focus-within:border-roxo 
        focus-within:border-4 focus-within:rounded-md truncate;
    }

    select{
        @apply focus-visible:outline-0 bg-inherit truncate max-w-[100%];
    }
}
</style>