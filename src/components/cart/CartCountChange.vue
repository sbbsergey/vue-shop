<template>
  <button class="btn danger" @click.stop="dec(id)">-</button>
    {{ count }}
  <button class="btn primary" :disabled="count >= rest" @click.stop="inc(id)">+</button>
</template>

<script>

import { useCart } from '@/use/cart'
import { useProducts } from '@/use/products'

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const { count, inc, dec } = useCart(props)
    const { rest } = useProducts(props)

    return {
      count,
      inc,
      dec,
      rest
    }
  }
}
</script>
