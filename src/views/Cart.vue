<template>
  <app-loader v-if="loading" />
  <app-page title="Корзина" v-else>
    <h3 class="text-center" v-if="cartIsEmpty">В корзине пока ничего нет</h3>
    <cart-table v-else
                :cart="cart"
    ></cart-table>
  </app-page>
</template>

<script>

import { useStore } from 'vuex'
import { computed, onMounted, reactive, ref } from 'vue'

import AppLoader from '@/components/ui/AppLoader'
import AppPage from '@/components/ui/AppPage'
import CartTable from '@/components/cart/CartTable'

export default {
  setup () {
    const store = useStore()
    const loading = ref(true)

    const cart = reactive(store.getters['cart/getAll'])

    onMounted(async () => {
      // на будущее: реализовать загрузку запросом по фильтру
      await store.dispatch('product/loadAll')
      loading.value = false
    })

    const cartIsEmpty = computed(() => Object.keys(cart).length === 0)

    return {
      loading,
      cartIsEmpty,
      cart
    }
  },
  components: { CartTable, AppLoader, AppPage }
}
</script>
