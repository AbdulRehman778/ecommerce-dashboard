<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h4 class="inventory-heading">Product Inventory</h4>
      <div v-if="lowStockProducts.length" class="alert alert-warning">
       <i class="bi bi-exclamation-triangle-fill"></i> {{ lowStockProducts.length }} product(s) have low stock. Please consider restocking.
      </div>
    

      <button class="btn btn-add" @click="openModal()">
        Add Product
      </button>
    </div>

    <!-- Search and Sort Controls -->
    <div class="row mb-3">
      <div class="col-md-4">
        <input v-model="searchQuery" type="text" class="form-control" placeholder="Search by name or description">
      </div>
      <div class="col-md-3">
        <select v-model="sortKey" class="form-select">
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="stock">Stock</option>
        </select>
      </div>
      <div class="col-md-2">
        <select v-model="sortOrder" class="form-select">
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>

    <!-- Product Table -->
    <table class="table table-bordered table-hover">
      <thead class="table-light">
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Image</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in filteredProducts" :key="product.id">
          <td>{{ product.name }}</td>
          <td>{{ product.description }}</td>
          <td>${{ product.price }}</td>
          <td>
            <div>
              <span :class="{ 'text-danger fw-bold': product.stock < lowStockThreshold }">{{ product.stock }}</span>
              <div v-if="forecastDaysLeft(product) <= 7" class="badge bg-danger ms-2">
                Restock Soon ({{ forecastDaysLeft(product) }}d)
              </div>
            </div>
          </td>
          <td>
            <img :src="product.image" alt="Product" width="60" height="40" v-if="product.image">
          </td>
          <td>
              <button class="btn btn-sm btn-outline-warning me-2" @click="openModal(product)">
                  <i class="bi bi-pencil me-1"></i> Edit
                </button>
                <button class="btn btn-sm btn-outline-danger" @click="deleteProduct(product.id)">
                  <i class="bi bi-trash me-1"></i> Delete
                </button>
           
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Product Modal -->
    <div class="modal fade" id="productModal" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <form @submit.prevent="handleFormSubmit">
            <div class="modal-header">
              <h5 class="modal-title">{{ isEditing ? 'Edit Product' : 'Add Product' }}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <div class="row text-start">
                <div class="col-md-6 mb-3">
                  <label class="form-label">Product Name</label>
                  <input v-model="formProduct.name" type="text" class="form-control" required>
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label">Description</label>
                  <input v-model="formProduct.description" type="text" class="form-control" required>
                </div>
                <div class="col-md-4 mb-3">
                  <label class="form-label">Price</label>
                  <input v-model.number="formProduct.price" type="number" class="form-control" required>
                </div>
                <div class="col-md-4 mb-3">
                  <label class="form-label">Stock</label>
                  <input v-model.number="formProduct.stock" type="number" class="form-control" required>
                </div>
                <div class="col-md-4 mb-3">
                  <label class="form-label">Daily Sales Avg</label>
                  <input v-model.number="formProduct.dailySalesAvg" type="number" step="0.1" class="form-control" required>
                </div>
                <div class="mb-3">
                  <label class="form-label">Image URL</label>
                  <input v-model="formProduct.image" type="text" class="form-control">
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="submit" class="btn btn-primary">{{ isEditing ? 'Update' : 'Add' }} Product</button>
            </div>
          </form>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import 'bootstrap/dist/js/bootstrap.bundle';
import * as bootstrap from 'bootstrap';
import { useProductStore } from '@/stores/productStore'
const productStore = useProductStore()


let modalInstance = null;
const lowStockThreshold = 10


const showForm = ref(false)
const editingProduct = ref(null)


const formProduct = ref({})
const isEditing = ref(false)


function openModal(product = null) {
  isEditing.value = !!product
  formProduct.value = product
    ? { ...product }
    : { name: '', description: '', price: 0, stock: 0, image: '', dailySalesAvg: 1 }

  if (!modalInstance) {
    const modalEl = document.getElementById('productModal')
    modalInstance = new bootstrap.Modal(modalEl)
  }
  modalInstance.show()
}


function handleFormSubmit() {
  if (isEditing.value) {
    productStore.updateProduct({ ...formProduct.value })
  } else {
    productStore.addProduct({
      ...formProduct.value,
      id: Date.now()
    })
  }
  modalInstance.hide()
}



const newProduct = ref({
  name: '', description: '', price: 0, stock: 0, image: '', dailySalesAvg: 1
})

const searchQuery = ref('')
const sortKey = ref('name')
const sortOrder = ref('asc')


function deleteProduct(id) {
  if (confirm('Are you sure you want to delete this product?')) {
    productStore.deleteProduct(id)
    if (editingProduct.value === id) {
      resetForm()
    }
  }
}


function resetForm() {
  newProduct.value = { name: '', description: '', price: 0, stock: 0, image: '' }
  editingProduct.value = null
  showForm.value = false
}



const filteredProducts = computed(() => {
  let result = productStore.products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
      result.sort((a, b) => {
        let aVal = a[sortKey.value]
        let bVal = b[sortKey.value]
        if (typeof aVal === 'string') {
          aVal = aVal.toLowerCase()
          bVal = bVal.toLowerCase()
        }
        if (sortOrder.value === 'asc') return aVal > bVal ? 1 : -1
        else return aVal < bVal ? 1 : -1
      })

  return result
})

const lowStockProducts = computed(() => {
  return productStore.products.filter(p => p.stock < lowStockThreshold)
})




function forecastDaysLeft(product) {
  if (!product.dailySalesAvg || product.dailySalesAvg === 0) return '∞'
  return Math.floor(product.stock / product.dailySalesAvg)
}

</script>

<style scoped>
table img {
  object-fit: cover;
  border-radius: 4px;
}
.btn-add{
  background-color: #212529;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
}
.btn-add:hover{
  background-color: #343a40;
  color: white;
}
.btn-outline-danger:hover{
  color: white !important;
}
.btn-outline-warning:hover{
  color: white !important;
}
.form-label{
  font-weight: 600;
}
.modal-title{
  font-weight: 600;
}
.inventory-heading{
  font-weight: 600;
}
</style>
