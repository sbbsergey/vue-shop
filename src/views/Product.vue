<template>
  <app-loader v-if="loading" />
  <app-page
    v-else
    header
    center :title="product.title"
    :back-route="{name:'Shop'}"
    back-route-text="Вернуться к выбору товаров"
  >
    <template #header></template>
    <product-card :id="id">
      <template #category="{ category }">
        <p> Категория: <strong> {{ category }} </strong></p>
      </template>
    </product-card>
  </app-page>
</template>

<script>

import AppLoader from '@/components/ui/AppLoader'
import AppPage from '@/components/ui/AppPage'
import { onMounted, ref } from 'vue'
import { currency } from '@/utils/currency'
import ProductCard from '@/components/products/ProductCard'
import { useCategories } from '@/use/categories'
import { useProducts } from '@/use/products'

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const loading = ref(true)
    const { load: loadCategories, category } = useCategories()
    const { loadById: LoadProductById, product } = useProducts(props)

    onMounted(async () => {
      await loadCategories()
      await LoadProductById()
      loading.value = false
    })

    return {
      loading,
      product,
      currency,
      category
    }
  },
  components: { AppLoader, AppPage, ProductCard }
}
</script>
