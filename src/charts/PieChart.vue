<template>
  <div>
    <Pie :data="props.chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js'
import { Pie } from 'vue-chartjs'
import { computed, defineProps } from 'vue'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

const props = defineProps({
  chartData: Object
})

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom'
    }
  }
}))
</script>

<style scoped>
div {
  height: 300px;
}
</style>
