<template>

       <div class="product-img">
         <img :src=product.img>
      </div>

      <div v-if="$slots.category">
        <slot name="category" :category="categoryTitle"></slot>
      </div>

      <div v-if="$slots.title">
        <slot name="title" :title="product.title"></slot>
      </div>

      <div v-if="product.count === 0">
        <h4 class="product-title">Товара нет в наличии</h4>
      </div>
      <template v-else>
        <div class="product-controls in-card" v-if="count">
          <cart-count-change
            :id="id"
          />
        </div>
        <div class="text-center" v-else>
          <button class="btn" @click.stop="inc(id)">{{ currency(product.price) }}</button>
        </div>
      </template>

</template>

<script>

import { currency } from '@/utils/currency'
import CartCountChange from '@/components/cart/CartCountChange'
import { useProducts } from '@/use/products'
import { useCart } from '@/use/cart'

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const { product, categoryTitle } = useProducts(props)
    const { count, inc } = useCart(props)

    return {
      product,
      categoryTitle,
      currency,
      count,
      inc
    }
  },
  components: { CartCountChange }
}
</script>
