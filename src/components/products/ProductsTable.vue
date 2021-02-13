<template>
  <div class="products-table">
    <div class="product-card" v-for="{ id } in products" :key="id"
                              @click="$emit('clickOnProductCard',id)">
      <product-card :id="id">
        <template #title="{ title }">
          <h4 class="product-title">{{ title }}</h4>
        </template>
      </product-card>

    </div>
  </div>
</template>

<script>
import { currency } from '@/utils/currency'
import ProductCard from '@/components/products/ProductCard'

export default {
  emits: ['clickOnProductCard'],
  props: {
    products: {
      type: Array,
      required: true
    }
  },
  setup () {
    return { currency }
  },
  components: { ProductCard }
}
</script>
