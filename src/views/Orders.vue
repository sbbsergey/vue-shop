<template>
  <app-loader v-if="loading" />
  <app-page v-else title="Мои заказы">
    <table class="table">
      <thead>
      <tr>
        <th>#</th>
        <th>Дата</th>
        <th>Время</th>
        <th>Сумма</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="({id, date, totalPrice}, index) in orders" :key="id">
        <td>{{ index + 1 }}</td>
        <td>
          {{ new Date(date).toLocaleDateString() }}
        </td>
        <td>
          {{ new Date(date).toLocaleTimeString() }}
        </td>
        <td>
          {{ currency(totalPrice) }}
        </td>
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
import { useUser } from '@/use/user'

export default {
  props: ['userId'],
  setup (props) {
    const loading = ref(true)
    const { user } = useUser()
    const { loadByUserId, orders } = useOrders()

    onMounted(async () => {
      await loadByUserId(props.userId)
      loading.value = false
    })

    return { loading, orders, currency, user }
  },
  components: { AppPage, AppLoader }
}
</script>
