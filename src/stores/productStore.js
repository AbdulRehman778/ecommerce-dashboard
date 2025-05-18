import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useProductStore = defineStore('productStore', () => {
  const products = ref([
    { id: 1, name: 'Smartphone', description: 'Android Phone', price: 299, stock: 8, image: '', dailySalesAvg: 1.5 },
    { id: 2, name: 'Headphones', description: 'Noise Cancelling', price: 120, stock: 15, image: '', dailySalesAvg: 0.7 },
    { id: 3, name: 'Backpack', description: 'Travel Bag', price: 49, stock: 5, image: '', dailySalesAvg: 0.5 }
  ])

  const totalProducts = computed(() => products.value.length)
  const lowStockItems = computed(() => products.value.filter(p => p.stock <= 5).length)

  function addProduct(product) {
    product.id = Date.now() // Simple unique ID
    products.value.push(product)
  }

  function deleteProduct(id) {
    products.value = products.value.filter(p => p.id !== id)
  }

  return {
    products,
    totalProducts,
    lowStockItems,
    addProduct,
    deleteProduct
  }
})
