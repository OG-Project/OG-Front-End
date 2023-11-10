<template>
        <div v-if="props.tipo === 'checkbox'">
            <input id="checkbox" type="checkbox" @click="check('checkbox')"/>
        </div>
    <div v-if="props.tipo === 'toggle'">
        <div id="bordaToggle" @click="check('toggle')">
            <svg style="width: 60px;height: 30px;">
                <circle id="toggle" :cx="posicaoBola" cy="14" r="12" fill="#620BA7"></circle>
            </svg>
        </div>
    </div>
</template>
<script setup>

    import mojs from '@mojs/core'

    const props = defineProps({
        tipo: {
            type: String,
            default: 'checkbox'
        }
    })

    let posicaoBola = 13;

    let ativo = false;
    function check(tipo) {
  if (ativo === false) {
    ativo = true;
    console.log(ativo);
    if (tipo === 'toggle') {
      const animation = new mojs.Html({
        el: '#toggle',
        x: { 0: 30, easing: 'sin.in' }, // Configuração de animação de translação
      });
      
      animation.play(); // Inicia a animação
    }
  } else {
    ativo = false;
    console.log(ativo);
    if (tipo === 'toggle') {
        const animation = new mojs.Html({
        el: '#toggle',
        x: { 30: 0, easing: 'sin.out' }, // Configuração de animação de translação  
      });
      animation.play();
    }
  }
}
</script>
<style scoped>
    #checkbox{
        width: 20px;
        height: 20px;
        background-color: #620BA7;
        border: 6px solid ;
        border-radius: 5px;
        cursor: pointer;
    }
    #bordaToggle {
        width: 60px;
        height: 30px;
        background-color: #fff;
        border: 1px solid #000;
        border-radius: 5px;
        cursor: pointer;
        position: relative;
        display: inline-block;
    }


</style>
