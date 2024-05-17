<template>
    <div :class=styleSelect :style="estilizaDivSelect">
        <select :style="estilizaSelect"  @input="$emit('update:modelValue', $event.target.value)" class=" flex items-center justify-center xl:text-xl sm:text-sm md:text-md truncate w-full">
            <option class="options" value="" disabled selected  v-if="placeholderSelect != null">{{ placeholderSelect }}</option>
            <option v-for="opcao of listaSelect" :disabled="disable" class="options" :value="opcao">{{ opcao }}</option>
        </select>   
    </div>

</template>

<script setup>
import { onMounted, onUpdated } from 'vue';


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
        disable:{
            type: Boolean,
            default: false
        }
    }

   
    )
    
    onMounted(() =>{
        console.log(props.placeholderSelect)
    })

    onUpdated(() => {
    
    })

    const hoverPadrao = {
        color : verificaCorHover()
    }

    const estilizaDivSelect={
        backgroundColor: verificaCorBack(),
        color: verificaCorTexto(),
        height: props.altura+"vh",
        width:props.largura+"vw",

    }

    const estilizaSelect={
        fontSize: 'var(--fonteCorpoTamanho)',
        backgroundColor: verificaCorBack()
    }
    
    const selectButton = document.querySelector('.inline-flex button');
    const selectList = document.querySelector('.absolute');

      


    function verificaCorBack(){
         // só muda a cor de fundo da div do input de acordo com o style recebido
         console.log(props.altura)
        if(props.styleSelect=="select-escuro" || props.styleSelect=="select-grande-escuro" || 
        props.styleSelect=="select-escuro-grande" || props.styleSelect=="select-escuro-grande"){
            return "var(--backgroundItems)"
        }else if(props.styleSelect=="select-claro" || props.styleSelect=="select-grande-claro" || 
        props.styleSelect=="select-claro-grande" || props.styleSelect=="select-claro-grande"){
            return "var(--backgroundItems)"
        }
        else if (props.styleSelect=="select-cinza" || props.styleSelect=="select-grande-cinza" ||
        props.styleSelect=="select-cinza-grande"){
            return "var(--backgroundItems)"
        }
        else if (props.styleSelect=="select-branco" || props.styleSelect=="select-grande-cinza" ||
        props.styleSelect=="select-branco-grande"){
            return "var(--backgroundPuro)"
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
            return "var(--fonteCor)"
        }
    }

    function verificaCorHover(){
        if(props.corHover=="escuro"){
            return "#484848"
        }
        return "var(--backgroundItems)"
    }
</script>

<style>
@import url(../assets/main.css);

@layer components{

    .styleSelectPadrao{
       @apply   border-4 
        border-transparent
        border-b-[var(--roxo)]    
        pt-2
        pb-2
        px-4
        border-b-4
        w-max
        h-[100%]
        flex items-center justify-center focus-within:border-[var(--roxo)] 
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
        flex items-center justify-center focus-within:border-[var(--roxo)] 
        focus-within:border-4 focus-within:rounded-[4px] truncate ;
    }
    .styleSelectPadrao:hover{
        background-color: v-bind('hoverPadrao.color');
    }
    select{
        @apply focus-visible:outline-0 bg-inherit truncate flex items-center;

    }

    select option:checked{
        background-color: var(--backgroundItems)
    }

    option{
        @apply flex justify-center items-center bg-[var(--backgroundItems)];
    }
   
}
</style>