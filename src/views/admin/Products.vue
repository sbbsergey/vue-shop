<template>
  <app-loader v-if="loading" />
  <app-page title="Инвентарь">
    <template v-slot:header>
      <button class="btn primary" @click="modal = true">Добавить товар</button>
    </template>
    <admin-products-table :products="products"></admin-products-table>
  </app-page>

  <teleport to="body">
    <app-modal v-if="modal" title="Добавить товар" @close="modal = false">
      <product-form @addProduct="modal = false" />
    </app-modal>
  </teleport>

</template>

<script>
import { onMounted, ref } from 'vue'
import AppLoader from '@/components/ui/AppLoader'
import AppPage from '@/components/ui/AppPage'
import AdminProductsTable from '@/components/admin/AdminProductsTable'
import ProductForm from '@/components/products/ProductForm'
import AppModal from '@/components/ui/AppModal'
import { useProducts } from '@/use/products'

export default {
  setup () {
    const loading = ref(true)
    const modal = ref(false)
    const {
      load,
      products
    } = useProducts()

    onMounted(async () => {
      await load()
      loading.value = false
    })

    return {
      loading,
      products,
      modal
    }
  },
  components: { AppLoader, AppPage, AdminProductsTable, ProductForm, AppModal }
}
</script>
