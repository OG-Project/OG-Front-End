<script setup>
import Chart from 'chart.js/auto';
import { onMounted } from 'vue';

const props = defineProps({
  tipo: {
    type: String,
  },
});

const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
  ];

  const data = {
    labels: labels,
    datasets: [{
      label: 'My First dataset',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [0, 10, 5, 2, 20, 30, 45],
    }]
  };

  const config = {
    type: 'line',
    data: data,
    options: {}
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