<template>
    <div :class=styleSelect :style="estilizaDivSelect">
        <select :style="estilizaSelect"  @input="$emit('update:modelValue', $event.target.value)" class=" flex justify-center xl:text-xl sm:text-sm md:text-md">
            <option class="options" value="" disabled selected >{{ placeholderSelect }}</option>
            <option v-for="opcao of listaSelect" class="options" :value="opcaoSelecionada">{{ opcao }}</option>
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
        opcaoSelecionada:String,
        placeholderSelect:String,
        styleSelect:{
            type:String,
            default: 'styleSelectPadrao'
        },
    }
    )

    const hoverPadrao = {
        color : verificaCorHover()
    }

    const estilizaDivSelect={
        backgroundColor: verificaCorBack(),
        color: verificaCorTexto(),
        height: props.altura+"vh",
        width:props.largura+"vw"
    }

    const estilizaSelect={
        fontSize: props.fonteTamanho    

    }
    
    const selectButton = document.querySelector('.inline-flex button');
    const selectList = document.querySelector('.absolute');

      


    function verificaCorBack(){
         // só muda a cor de fundo da div do input de acordo com o style recebido
         console.log(props.altura)
        if(props.styleSelect=="select-escuro" || props.styleSelect=="select-grande-escuro" || 
        props.styleSelect=="select-escuro-grande" || props.styleSelect=="select-escuro-grande"){
            return "#484848"
        }else if(props.styleSelect=="select-claro" || props.styleSelect=="select-grande-claro" || 
        props.styleSelect=="select-claro-grande" || props.styleSelect=="select-claro-grande"){
            return "#D7D7D7"
        }
        else if (props.styleSelect=="select-cinza" || props.styleSelect=="select-grande-cinza" ||
        props.styleSelect=="select-cinza-grande"){
            return "#787878"
        }
        else if (props.styleSelect=="select-branco" || props.styleSelect=="select-grande-cinza" ||
        props.styleSelect=="select-branco-grande"){
            return "#FEFBFF"
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
        else if(props.styleSelect=="select-cinza" || props.styleSelect=="select-grande-cinza" ||
        props.styleSelect=="select-cinza-grande"){
            return "#FFFFFF"
        }
    }

    function verificaCorHover(){
        if(props.corHover=="escuro"){
            return "#484848"
        }
        return "#D7D7D7"
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
        h-[100%]
        flex items-center justify-center focus-within:border-roxo 
        focus-within:border-4 focus-within:rounded-[4px] truncate ;
    }
    .styleSelectSemBordaBaixo{
       @apply   border-4 
        border-transparent   
        pt-2
        pb-2
        px-4
        w-max
        h-[100%]
        flex items-center justify-center focus-within:border-roxo 
        focus-within:border-4 focus-within:rounded-[4px] truncate ;
    }
    .styleSelectPadrao:hover{
        background-color: v-bind('hoverPadrao.color');
    }
    select{
        @apply focus-visible:outline-0 bg-inherit truncate flex items-center;

    }

    select option:checked{
        background-color: rgba(220, 179, 255, 0.192)
    }

    option{
         
    }
   
}
</style>