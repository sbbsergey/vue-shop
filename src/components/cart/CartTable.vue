<template>
    <table class="table">
      <thead>
      <tr>
        <th>Наименование</th>
        <th>Количество</th>
        <th>Цена (шт)</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(_,id) in cart" :key="id">
        <td>{{ title(id) }}</td>
        <td>
          <app-change-cart-count :id="id"></app-change-cart-count>
        </td>
        <td> {{ currency(price(id)) }} руб.</td>
      </tr>
      </tbody>
    </table>
    <hr>
    <p class="text-right"><strong>Всего: {{ currency(total) }} руб.</strong></p>
    <p class="text-right">
      <button class="btn">Оплатить</button>
    </p>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
import { currency } from '@/utils/currency'
import AppChangeCartCount from '@/components/ui/AppChangeCartCount'

export default {
  props: {
    cart: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const store = useStore()

    const title = id => store.getters['product/get'](id).title
    const price = id => store.getters['product/get'](id).price

    const total = computed(() => {
      return Object.keys(props.cart).reduce(
        (acc, id) => acc + store.getters['product/get'](id).price * props.cart[id],
        0)
    })

    return {
      title,
      price,
      total,
      currency
    }
  },
  components: { AppChangeCartCount }

}
</script>
