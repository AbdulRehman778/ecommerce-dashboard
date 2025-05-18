<template>
  <div>
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>
<script setup>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'
import { computed, defineProps } from 'vue'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

defineProps(['chartData'])

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true
    }
  },
  scales: {
    y: {
      beginAtZero: true
    }
  }
}))
</script>



<style scoped>
div {
  height: 300px;
}
</style>
