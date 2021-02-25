<template>
  <app-loader v-if="loading" />
  <app-page v-else title="Заказы">
    <table class="table">
      <thead>
      <tr>
        <th>#</th>
        <th>Дата</th>
        <th>Время</th>
        <th>Покупатель</th>
        <th>Сумма</th>
        <th>Действие</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="({id, date, email, totalPrice}, index) in orders" :key="id">
        <td>{{ index + 1 }}</td>
        <td>
          {{ new Date(date).toLocaleDateString() }}
        </td>
        <td>
          {{ new Date(date).toLocaleTimeString() }}
        </td>
        <td>
          {{ email }}
        </td>
        <td>
          {{ currency(totalPrice) }}
        </td>
        <td><router-link :to="'/admin/order/' + id">Открыть</router-link></td>
      </tr>
      </tbody>
    </table>
  </app-page>
</template>

<script>
import { onMounted, ref } from 'vue'
import AppPage from '@/components/ui/AppPage'
import AppLoader from '@/components/ui/AppLoader'
import { useOrders } from '@/use/orders'
import { currency } from '@/utils/currency'

export default {
  setup () {
    const loading = ref(true)
    const { load, orders } = useOrders()

    onMounted(async () => {
      await load()
      loading.value = false
    })

    return { loading, orders, currency }
  },
  components: { AppPage, AppLoader }
}
</script>
