<template>
    <div>
        <select v-model="propriedadeAtual" class="w-[100%] h-[5%]">
            <option v-for="propriedade of propriedades" :key="propriedade.id" :value="propriedade.tipo">
                {{ propriedade.tipo }}
            </option>
        </select>

        <div class="divMaior">
            <div v-for="propriedade of propriedades" class="w-full h-full">
                <div v-if="propriedade.tipo==propriedadeAtual" class="w-[100%] h-max flex flex-row">
                    {{ propriedade.tipo }}
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { ref } from 'vue';
import { propriedades } from '../ObjetosTeste/propriedade.js';

export default {
    setup() {
        const propriedadeAtual = ref(null);

        return {
            propriedades,
            propriedadeAtual,
        };
    },
};
</script>
  
<style scoped>
@import url(../assets/main.css);

@layer components {
    .divMaior {
        display: flex;
        flex-direction: column;
        width: 90%;
        height: 72%;
        align-items: center;
        justify-content: center;
        background-color: blue;
        clip-path: polygon(5% 0, 95% 0, 100% 9%, 100% 100%, 0 100%, 0 10%);

    }
}
</style>
  