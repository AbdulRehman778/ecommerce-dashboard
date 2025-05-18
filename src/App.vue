<template>
  <div class="d-flex">
    <AdminSidebar @changeView="currentView = $event" />

    <div class="flex-grow-1">
      <AdminHeader />

      <div class="p-4">
        <AdminDashboard v-if="currentView === 'dashboard'" />
        <ProductList v-else-if="currentView === 'products'" />
      </div>
    </div>
  </div>
</template>



<script>
import { ref } from 'vue'
import AdminDashboard from './pages/AdminDashboard.vue'
import ProductList from './pages/ProductList.vue'
import AdminSidebar from './components/AdminSidebar.vue'
import AdminHeader from './components/AdminHeader.vue'

export default {
  components: {
    AdminDashboard,
    ProductList,
    AdminSidebar,
    AdminHeader
  },
  setup() {
    const currentView = ref('dashboard')
    return { currentView }
  }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
}
.form-control:focus {
  border-color: #000 !important;
  border: 2px solid #000 !important;
  box-shadow: none !important;
}
.form-select:focus{
  border-color: #000 !important;
  border: 2px solid #000 !important;
  box-shadow: none !important;
}
</style>
