<template>
  <app-loader v-if="loading" />
  <app-page title="Корзина" v-else>
    <cart-table
      :cart="cart"
    />
  </app-page>
</template>

<script>

import { onMounted, ref } from 'vue'
import { useCart } from '@/use/cart'
import { useProducts } from '@/use/products'

import AppLoader from '@/components/ui/AppLoader'
import AppPage from '@/components/ui/AppPage'
import CartTable from '@/components/cart/CartTable'

export default {
  setup () {
    const loading = ref(true)

    const { cart } = useCart()
    const { load: loadProducts } = useProducts()

    onMounted(async () => {
      // TODO: реализовать загрузку запросом по фильтру товаров из корзины
      await loadProducts()
      loading.value = false
    })

    return {
      loading,
      cart
    }
  },
  components: { CartTable, AppLoader, AppPage }
}
</script>
