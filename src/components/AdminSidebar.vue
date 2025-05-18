<template>
  <div class="sidebar p-3">
    <h4 class="mb-5 mt-2">Admin Panel</h4>
    <ul class="nav flex-column">
      <li class="nav-item mb-2">
        <a href="javascript:void(0)" class="nav-link text-white" @click="$emit('changeView', 'dashboard')">
          <i class="bi bi-speedometer2 me-2"></i> Dashboard
        </a>
      </li>
      <li class="nav-item">
        <a href="javascript:void(0)" class="nav-link text-white" @click="$emit('changeView', 'products')">
          <i class="bi bi-box-seam me-2"></i> Product List
        </a>
      </li>
    </ul>
  </div>
</template>


<style>
.sidebar {
  background-color: #212529;
  color: white;
  height: 100vh;
  width: 250px;
}
</style>
