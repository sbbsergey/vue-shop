<template>
  <app-loader v-if="loading" />
  <app-page title="Товары" v-else>
    <template v-slot:header>
      <button class="btn primary" @click="modal = true">Добавить товар</button>
    </template>
    <admin-products-table
      :products="productsOnPage"
      @open="open"
    />
    <app-pagination v-model="page" :count="products.length" :size="PAGE_SIZE" />
  </app-page>

  <teleport to="body">
    <app-modal v-if="modal" title="Добавить товар" @close="modal = false">
      <admin-product-form
        @add="add"
      >
        <template #add />
      </admin-product-form>
    </app-modal>
  </teleport>

</template>

<script>
import { onMounted, ref, computed, watch } from 'vue'
import AppLoader from '@/components/ui/AppLoader'
import AppPage from '@/components/ui/AppPage'
import AdminProductsTable from '@/components/admin/AdminProductsTable'
import AdminProductForm from '@/components/admin/AdminProductForm'
import AppModal from '@/components/ui/AppModal'
import { useProducts } from '@/use/products'
import { useRouter, useRoute } from 'vue-router'
import AppPagination from '@/components/ui/AppPagination'
import chunk from 'lodash.chunk'

export default {
  setup () {
    const loading = ref(true)
    const modal = ref(false)
    const router = useRouter()
    const route = useRoute()

    const {
      load,
      products,
      add: addProduct
    } = useProducts()

    onMounted(async () => {
      await load()
      loading.value = false
    })

    const page = ref(route.query.page ? +route.query.page : 1)
    const _setPage = () => router.replace({ query: { page: page.value } })
    onMounted(_setPage)
    watch(page, _setPage)
    const PAGE_SIZE = 8
    const productsOnPage = computed(() => chunk(products.value, PAGE_SIZE)[page.value - 1])

    const add = async (values) => {
      modal.value = false
      await addProduct(values)
      await router.push('/admin/products')
    }

    const open = (id) => {
      router.push(`/admin/product/${id}`)
    }

    return {
      loading,
      products,
      productsOnPage,
      page,
      PAGE_SIZE,
      modal,
      add,
      open
    }
  },
  components: { AppLoader, AppPage, AppPagination, AdminProductsTable, AdminProductForm, AppModal }
}
</script>
