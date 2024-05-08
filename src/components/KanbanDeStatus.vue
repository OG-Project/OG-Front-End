<template>
    <div class="w-min h-[40%] justify-start flex  gap-[5vw]">
        <div v-for="propriedade of lista" class="w-auto flex h-full" @dragover="(()=>{
            statusNovo = propriedade.propriedade})">
            <div :style="propriedade.style">

                <div class="w-[80%] p-[1%] flex bg-[var(--backgroundPuro)] justify-center font-Poppins font-medium text-[1vw] rounded-md">
                    <div class="w-[90%] flex justify-center">
                        {{ propriedade.propriedade.nome }}
                    </div>
                    <div class="w-[10%]">
                        <img src="../assets/image 3.png">
                    </div>
                </div>
                <draggable class="min-h-[15px] min-w-full flex flex-col items-center justify-center"
                    v-model="propriedade.tarefas" :animation="300" group="tarefa" @start="drag = true" @end="()=> mudaStatus(propriedade)"
                    item-key="tarefa.indice">
                    <template #item="{ element: tarefa }">
                        <div class="w-full h-full flex items-center justify-center" @dragstart="(()=> {
                            tarefaDrag = tarefa
                        })">
                            <div class="w-[80%] pt-[2vh]" v-if="tarefa != null">
                                <CardTarefas :tarefa=tarefa preset="1"></cardTarefas>
                            </div>
                        </div>
                    </template>
                </draggable>
                <button class="flex justify-start w-[80%] pb-[2vh] pt-[2vh]" @click="store.criaTarefa(), router.push('/criaTarefa').then(() => {
            window.location.reload()
        });">
                    <p :style="corDoTexto(propriedade.propriedade)">+ Nova</p>
                </button>
            </div>
        </div>
        <span class="pr-4">

            <button class="novaPropriedade " @click="popUpStatus = true">
                <h1>+Novo</h1>
            </button>
        </span>
    </div>
    <div v-if="popUpStatus == true">
        <div class="flex justify-end">
            <img src="../imagem-vetores/triangulo.svg">
        </div>
        <div class="flex flex-row justify-between">
            <div class="pl-2">
                <Input largura="10" conteudoInput="Nome Propriedade" fontSize="1rem" altura="2"
                    v-model="nomeStatus"></Input>
            </div>
            <div class="pr-2">
                <ColorPicker v-model="corStatus" class="rounded-sm" />
            </div>

        </div>
        <div class="flex justify-between">
            <div class="pl-2 pt-2 pb-2">
                <Botao preset="Sair" tamanhoPadrao="pequeno" :funcaoClick="popUpStatus = false"></Botao>
            </div>
            <div class="pr-2 pt-2 pb-2">

                <Botao preset="Confirmar" tamanhoPadrao="pequeno" :funcaoClick="criaStatusBack">
                </Botao>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import CardTarefas from './cardTarefas.vue';
import { conexaoBD } from '../stores/conexaoBD';
import VueCookies from "vue-cookies"
import draggable from "vuedraggable";
import sortBy from 'sort-by'
import { criaTarefaEBuscaStore } from '../stores/criaTarefaEBusca';
import Botao from '../components/Botao.vue'
import { funcaoPopUpStore } from '../stores/funcaoPopUp'
import ColorPicker from 'primevue/colorpicker';
import tinycolor from "tinycolor2";
import router from '@/router'

let api = conexaoBD()
let projetoApi = api.buscarUm(VueCookies.get("IdProjetoAtual"), "/projeto")
let projeto = ref({})
let lista = ref([]);
let listaStyle = ''
let statusNovo = {}
let tarefaDrag = {}
let store = criaTarefaEBuscaStore()
let popUpStatus = ref(false);
let isFirstLoad = ref(true);
const propriedadeAtual = ref("STATUS");
const funcaoPopUp = funcaoPopUpStore()


onMounted(() => {
    cookies()
    defineListaDePropriedades().then(() => {
        ordenaTarefas()
    })
})

watch(propriedadeAtual, async () => {
    await defineListaDePropriedades()
})

async function cookies() {
    let usuario = await api.procurar("/usuario/" + VueCookies.get("IdUsuarioCookie"))
}

function verificaCorTexto(status) {
    if (tinycolor(status.cor).isDark()) {
        return "white"
    } else {
        return "black"
    }
}

function corDoTexto(status) {
    return {
        color: verificaCorTexto(status)
    }
}

function mudaStatus(propriedade ) {
    console.log(statusNovo)
    console.log(tarefaDrag)
    let tarefaPut = {}
    for(const propriedade of lista.value){
        propriedade.tarefas.forEach(async (tarefa, index) => {
            if (tarefa.nome != null) {
                if(tarefa.id == tarefaDrag.id){
                    tarefa.status = statusNovo;
                }
                tarefa.indice[3].indice = propriedade.tarefas.indexOf(tarefa);
                tarefaPut = {
                    id: tarefa.id,
                    nome: tarefa.nome,
                    descricao: tarefa.descricao,
                    status: tarefa.status,
                    cor: tarefa.cor,
                    status: tarefa.status,
                    valorPropriedadeTarefas: [...tarefa.valorPropriedadeTarefas],
                    comentarios: tarefa.comentarios,
                    arquivos: tarefa.arquivos,
                    indice: tarefa.indice,
                }
                console.log(tarefaPut)
                for (let valorPropriedadeTarefaPut of tarefaPut.valorPropriedadeTarefas) {
                    if (valorPropriedadeTarefaPut.propriedade.tipo == "TEXTO") {
                        valorPropriedadeTarefaPut.valor = {
                            id: valorPropriedadeTarefaPut.valor.id,
                            texto: valorPropriedadeTarefaPut.valor.valor ?? null,
                        }
                    } if (valorPropriedadeTarefaPut.propriedade.tipo == "DATA") {
                        valorPropriedadeTarefaPut.valor = {
                            id: valorPropriedadeTarefaPut.valor.id,
                            data: valorPropriedadeTarefaPut.valor.valor ?? null,
    
                        }
                    } if (valorPropriedadeTarefaPut.propriedade.tipo == "NUMERO") {
                        valorPropriedadeTarefaPutPut.valor = {
                            id: valorPropriedadeTarefaPut.valor.id,
                            numero: valorPropriedadeTarefaPut.valor.valor ?? null,
    
                        }
                    } if (valorPropriedadeTarefaPut.propriedade.tipo == "SELECAO") {
                        valorPropriedadeTarefaPutPut.valor = {
                            id: valorPropriedadeTarefaPut.valor.id,
                            valores: valorPropriedadeTarefaPut.valor.valor ?? null,
    
                        }
                    }
                }
                await api.atualizar(tarefaPut, '/tarefa').then((response) => {
                    console.log(response)
                    tarefa = {
                        id: tarefa.id,
                        nome: tarefa.nome,
                        descricao: tarefa.descricao,
                        status: tarefa.status,
                        cor: tarefa.cor,
                        status: tarefa.status,
                        valorPropriedadeTarefas: tarefa.valorPropriedadeTarefas,
                        comentarios: tarefa.comentarios,
                        arquivos: tarefa.arquivos,
                        indice: tarefa.indice,
                    }
                    for (let valorPropriedadeTarefaPut of tarefa.valorPropriedadeTarefas) {
                        if (valorPropriedadeTarefaPut.propriedade.tipo == "TEXTO") {
                            valorPropriedadeTarefaPut.valor = {
                                id: valorPropriedadeTarefaPut.valor.id,
                                valor: valorPropriedadeTarefaPut.valor.texto ?? null,
                            }
                        } if (valorPropriedadeTarefaPut.propriedade.tipo == "DATA") {
                            valorPropriedadeTarefaPut.valor = {
                                id: valorPropriedadeTarefaPut.valor.id,
                                valor: valorPropriedadeTarefaPut.valor.data ?? null,
    
                            }
                        } if (valorPropriedadeTarefaPut.propriedade.tipo == "NUMERO") {
                            valorPropriedadeTarefaPutPut.valor = {
                                id: valorPropriedadeTarefaPut.valor.id,
                                valor: valorPropriedadeTarefaPut.valor.numero ?? null,
    
                            }
                        } if (valorPropriedadeTarefaPut.propriedade.tipo == "SELECAO") {
                            valorPropriedadeTarefaPutPut.valor = {
                                id: valorPropriedadeTarefaPut.valor.id,
                                valor: valorPropriedadeTarefaPut.valor.valores ?? null,
    
                            }
                        }
                    }
                })
    
            }
        });
    }

}


function ordenaTarefas() {
    for (const propriedade of lista.value) {
        propriedade.tarefas.sort((tarefa, tarefa2) => {
            if (tarefa.nome != null && tarefa2.nome != null) {
                return tarefa.indice[3].indice - tarefa2.indice[3].indice
            }
        })
    }

}
function onDragEnd(propriedade) {

}

function fechaPopUp() {
    popUpStatus = false
}
async function defineListaDePropriedades() {
    let listaDePropriedades = []
    projeto.value = (await (projetoApi))
    if (propriedadeAtual.value == "STATUS") {
        for (const status of projeto.value.statusList) {
            let listaDeTarefas = []
            for (const tarefa of projeto.value.tarefas) {
                if (tarefa.status != null && status.id == tarefa.status.id) {
                    listaDeTarefas.push(tarefa)
                }
            }
            let tarefa2 = {
                propriedade: status,
                tarefas: listaDeTarefas,
                style: listaStyle = {
                    width: "15vw",
                    height: "max-content",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    backgroundColor: ("#" + status.cor),
                    paddingTop: "5px",
                    boxShadow: " 0px 5px 7px rgb(99, 99, 99)"
                }
            }
            listaDePropriedades.push(tarefa2)

        };
    }
    lista.value = []
    lista.value = listaDePropriedades
    listaDePropriedades = null;
}
function verificaListaVaziaBoolean(tarefas) {
    if (tarefas, length == 0) {
        listaVaziaBoolean = true
    }
}
</script>

<style scoped lang="scss">
@import url(../assets/main.css);

.divMaior {
    @apply bg-brancoNeve;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 72%;
    align-items: center;
    justify-content: center;
    clip-path: polygon(5% 0, 95% 0, 100% 9%, 100% 100%, 0 100%, 0 10%);
    overflow-y: scroll;
    overflow-x: auto;
    position: relative;
    box-shadow: "0px 2px rgb(189, 189, 189)";
}

.novaPropriedade {
    @apply w-[15vw] h-[50%] bg-[#A79DB0] flex justify-center items-center text-[2vw] p-[3.2vw];
    box-shadow: 0px 5px 7px rgb(99, 99, 99);

}
</style>
