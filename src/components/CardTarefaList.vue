<template>
<div class='max-w-[1760px] w-max'>
    <div :style="distribuicao" class='h-[50px] items-center ml-9 grid'>
        <div v-for="propriedade in tarefas[0]" class='border-r-2 last:border-none border-black px-4 truncate'>
            {{propriedade.propriedade}}
        </div>
    </div>
    
    <div  @drag="drag(item)" v-for="item in tarefas" class='card mb-2 flex'>
        <div class="pl-4">
            <svg  width="19" height="33" viewBox="0 0 19 33" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect y="0.973022" width="7.42971" height="7.68505" rx="1" fill="#FEFBFF"/>
            <rect x="11.4297" y="0.9729" width="7.42971" height="7.68505" rx="1" fill="#FEFBFF"/>
            <rect y="12.658" width="7.42971" height="7.68505" rx="1" fill="#FEFBFF"/>
            <rect x="11.4297" y="12.658" width="7.42971" height="7.68505" rx="1" fill="#FEFBFF"/>
            <rect y="24.343" width="7.42971" height="7.68505" rx="1" fill="#FEFBFF"/>
            <rect x="11.4297" y="24.343" width="7.42971" height="7.68505" rx="1" fill="#FEFBFF"/>
            </svg>
        </div>
        <div :style="distribuicao" class='grid w-full '>
                <div v-for="propriedade in item" class=' border-r-2 text-center last:border-none border-white px-4 truncate'>
                    {{propriedade.valor}} 
                </div>
        </div>
    </div>
</div>
</template>

<script setup>
import {ref} from 'vue'
const props=defineProps({
    tarefas:[]

})

console.log(props.tarefas[0].length)

const distribuicao={
    gridTemplateColumns: "repeat("+props.tarefas[0].length+", minmax(0, 1fr))"
}
function drag(item) {
    console.log(item)
}
</script>

<style scoped>
@import url(../assets/main.css);
@layer components{
    .card{
        @apply
        /* w-[1760px]  */
        
        h-[50px] 
        /* flex 
        justify-around 
        */
        
        items-center  
        bg-[#CCC9CE] 
        hover:bg-[#CD98FD] 
        active:outline 
        active:outline-clickBorder 
        active:outline-2
        ;
    }
    
}
</style>
<!--
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String nome;
    private String descricao;

    private Boolean ativo;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date dataCriacao;

    private String cor;

    @ManyToOne
    private  Projeto projeto;

    @JoinColumn(name = "tarefa_id")
    @OneToMany(cascade = CascadeType.ALL)
    private List<ValorPropriedadeTarefa> valorPropriedadeTarefas;

    @ManyToOne
    private Status status;

    @PrePersist
    private void inserirData(){
        this.dataCriacao=new Date();
    }
 -->