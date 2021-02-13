<template>
  <app-loader v-if="loading" />
  <app-page title="Товары" v-else :className="'card-filter'">
    <products-filter v-model="filter"
                     :categories="categories">
    </products-filter>
    <products-table :products="products"
                    @clickOnProductCard="routeToProductCard"
    ></products-table>
  </app-page>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import ProductsTable from '@/components/products/ProductsTable'
import ProductsFilter from '@/components/products/ProductsFilter'
import AppLoader from '@/components/ui/AppLoader'
import AppPage from '@/components/ui/AppPage'
import { useCategories } from '@/use/categories'
import { useProducts } from '@/use/products'

export default {
  setup () {
    const loading = ref(true)
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const filter = ref({
      search: route.query.search,
      category: route.query.category
    })

    const {
      load: loadCategories,
      categories
    } = useCategories()

    const {
      load: loadProducts
    } = useProducts()

    onMounted(async () => {
      await loadCategories()
      await loadProducts()
      loading.value = false
    })

    const routeToProductCard = (id) => router.push(`/product/${id}`)

    const products = computed(() => store.getters['product/getAll']
      .filter(product => {
        if (filter.value.search) {
          return product.title.toLowerCase().includes(filter.value.search.toLowerCase())
        }
        return product
      })
      .filter(product => {
        if (filter.value.category) {
          return filter.value.category === product.category
        }
        return product
      })
      .sort((a, b) => a.count > b.count ? -1 : 1)
    )

    return {
      loading,
      products,
      categories,
      filter,
      routeToProductCard
    }
  },
  components: { AppLoader, AppPage, ProductsTable, ProductsFilter }
}
</script>
