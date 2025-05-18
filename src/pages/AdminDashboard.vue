<template>
  <div>
    <!-- Summary Cards -->
    <div class="row mb-5">
      <div class="col-md-3" v-for="card in summaryCards" :key="card.title">
        <div class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">{{ card.title }}</h5>
            <p class="card-text fs-4">{{ card.value }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts -->
    <div class="row">
      <div class="col-md-6 mb-4">
        <h5>Sales Over Time</h5>
        <BarChart :chart-data="salesChartData" />
      </div>
      <div class="col-md-6 mb-4">
        <h5>Revenue by Category</h5>
        <PieChart :chart-data="revenueChartData" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BarChart from '../charts/BarChart.vue'
import PieChart from '../charts/PieChart.vue'
import { useProductStore } from '@/stores/productStore'

const productStore = useProductStore()



// Dummy summary data
const summaryCards = ref([
  { title: 'Total Orders', value: 1200 },
  { title: 'Total Revenue', value: '$24,500' },
  { title: 'Total Products', value: productStore.totalProducts },
  { title: 'Low Stock Items', value: productStore.lowStockItems }
])

// Dummy chart data
const salesChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  datasets: [{
    label: 'Sales',
    backgroundColor: '#007bff',
    data: [4000, 3000, 5000, 2000, 6000]
  }]
}

const revenueChartData = {
  labels: ['Electronics', 'Clothing', 'Beauty', 'Books'],
  datasets: [{
    backgroundColor: ['#007bff', '#6610f2', '#20c997', '#fd7e14'],
    data: [10000, 4500, 3000, 2000]
  }]
}
</script>

<style scoped>
.card-title{
  font-weight: 600;
}
</style>