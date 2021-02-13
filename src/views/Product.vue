<template>
  <app-loader v-if="loading" />
  <app-page back header center :title="product.title" v-else>
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
import { useStore } from 'vuex'
import { onMounted, computed, ref } from 'vue'
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
    const store = useStore()
    const loading = ref(true)
    const {
      load: loadCategories,
      category
    } = useCategories()

    const {
      loadById: LoadProductById,
      product
    } = useProducts(props)

    onMounted(async () => {
      await loadCategories()
      await LoadProductById()
      loading.value = false
    })

    const count = computed(() => store.getters['cart/get'](props.id))

    return {
      loading,
      product,
      currency,
      count,
      category
    }
  },
  components: { AppLoader, AppPage, ProductCard }
}
</script>
