<template>
  <tr class="admin-product">
    <td>{{ index + 1 }}</td>
    <td>{{ product.title }}</td>
    <td>
      <img class="img" :src="product.img">
    </td>
    <td>{{ currency(product.price) }}</td>
    <td>{{ product.category }}</td>
    <td>{{ product.count }}</td>
    <td>
      <button class="btn" @click="$emit('open', product.id)">Открыть</button>
    </td>
  </tr>
</template>

<script>
import { currency } from '@/utils/currency'
export default {
  emits: ['open'],
  props: {
    product: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  setup () {
    return {
      currency
    }
  }
}
</script>

<style scoped>
.td {
  height: 42px;
}
.img{
  max-width: 40px;
}
</style>
