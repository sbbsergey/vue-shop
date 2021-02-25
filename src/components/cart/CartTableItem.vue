<template>
  <tr>
    <td>{{ title }}</td>
    <td>
      <cart-count-change
        :id="id"
      />
    </td>
    <td> {{ currency(price) }} руб.</td>
  </tr>
</template>

<script>
import { useProducts } from '@/use/products'
import { currency } from '@/utils/currency'
import CartCountChange from '@/components/cart/CartCountChange'

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const { title, price } = useProducts(props)
    return {
      title,
      price,
      currency
    }
  },
  components: { CartCountChange }
}
</script>
