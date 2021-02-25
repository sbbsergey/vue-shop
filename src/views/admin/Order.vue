<template>
  <app-loader v-if="loading" />
  <app-page
    v-else
    title="Заказ"
    :back-route="{name:'AdminOrders'}"
    back-route-text="Вернуться к списку заказов"
  >
    <h3>Заказ от {{ new Date(order.date).toLocaleDateString() }}, {{ new Date(order.date).toLocaleTimeString() }}</h3>
    <h4>Покупатель: {{ order.email}}</h4>
    <table class="table" >
      <thead>
      <tr>
        <th>Наименование товара</th>
        <th>Количество</th>
        <th>Цена</th>
        <th>Сумма</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(product, index ) in order.items" :key="index">
        <td>{{ product.name }}</td>
        <td> {{ product.count }}</td>
        <td>{{ currency(product.price) }}</td>
        <td>{{ currency(product.count * product.price) }}</td>
      </tr>
      </tbody>
    </table>
    <h4>Итого сумма: {{ currency(order.totalPrice) }}</h4>
  </app-page>
</template>

<script>
import { onMounted, ref } from 'vue'
import AppPage from '@/components/ui/AppPage'
import AppLoader from '@/components/ui/AppLoader'
import { useOrders } from '@/use/orders'
import { currency } from '@/utils/currency'

export default {
  props: ['id'],
  setup (props) {
    const loading = ref(false)

    const { loadById, order } = useOrders(props)

    onMounted(async () => {
      await loadById()
      loading.value = false
    })

    return {
      loading,
      order,
      currency
    }
  },
  components: { AppPage, AppLoader }
}
</script>
