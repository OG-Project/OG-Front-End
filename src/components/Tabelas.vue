<script setup>
import Chart from 'chart.js/auto';
import { onMounted } from 'vue';

const props = defineProps({
  tipo: {
    type: String,
    default: 'line'
  },
  x: {
    type: [],
    default: [
    'Segunda-Feira',
    'Terça-Feira',
    'Quarta-Feira',
    'Quinta-Feira',
    'Sexta-Feira',
    'Sábado',
    'Domingo'
  ]
  },
  listaDeObjetos: {
    type: [],
    default: [{
      label: 'Tarefa 1',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [8, 0, 0, 0, 0, 0, 0],
    },
    {
    label: 'Tarefa 2',
      backgroundColor: 'rgb(99, 255, 132)',
      borderColor: 'rgb(99, 255, 132)',
      data: [8, 3, 4, 0,5, 7, 1],
    }
  ]
  },
  eixo:{
    type: String,
    default: 'x'
  }
});

const labels = props.x;

  const data = {
    labels: labels,
    datasets: props.listaDeObjetos
  };

  const config = {
    type: props.tipo,
    data: data,
    options: {indexAxis: props.eixo}
  };

  onMounted(() => {
    const novaTabela = new Chart(
      document.getElementById('tabela'),
      config
    );
  });

</script>
<template>
    <div>
        <canvas id="tabela"></canvas>
    </div>
</template>