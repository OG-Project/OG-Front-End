<template>
<div class='max-w-[1760px] w-max'>
    <div :style="distribuicao" class='h-[50px] items-center ml-9 grid'>
        <div v-for="propriedade in propriedades" class='border-r-2 last:border-none text-center border-black px-4 truncate'>
            {{propriedade}}
        </div>
    </div>
    
    <div draggable='true' 
    @dragstart="drag(tarefa,index)" 
    @drop="dropTarefa(index)" 
    @dragenter.prevent
    @dragover.prevent
    v-for="(tarefa,index) in tarefas" 
    class='dropZone card mb-2 flex'>
        <div handle class="pl-4">
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
                <div v-for="valor in tarefa.valores" class=' border-r-2 text-center last:border-none border-white px-4 truncate'>
                    {{valor}} 
                </div>
        </div>
    </div>
</div>
</template>

<script setup>
import {ref, onMounted} from 'vue'
const props=defineProps({
    tarefas:[]
})

onMounted(() => {
    propriedades.value=props.tarefas[0].propriedades
})

let propriedades=ref([])
let tarefaMovida=ref({})
let tarefaMovidaIndex=ref(0)


const distribuicao={
    gridTemplateColumns: "repeat("+props.tarefas[0].propriedades.length+", minmax(0, 1fr))"
}
function drag(tarefa,i) {
    
    // console.log(tarefa)
    tarefaMovida.value=tarefa
    // console.log(i)
    tarefaMovidaIndex.value=i
    console.log(tarefaMovida)
}
function dropTarefa(i){
//  e.preventDefault()

 console.log(i)
//  props.tarefas[tarefaMovidaIndex.value]=props.tarefas[i]
//  props.tarefas[i]=tarefaMovida.value
for (let i of props.tarefas) {
 if (i == tarefaMovida.value) {
   console.log(props.tarefas)
   props.tarefas.splice(props.tarefas.indexOf(i), 1)
   console.log(props.tarefas)
 }
}
 props.tarefas.splice(i,0,tarefaMovida.value)
 console.log(tarefaMovidaIndex.value)
 console.log(tarefaMovidaIndex)
 console.log(tarefaMovidaIndex.value)

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