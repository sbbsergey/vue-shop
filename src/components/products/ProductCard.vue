<template>

       <div class="product-img">
         <img :src=product.img>
      </div>

      <div v-if="$slots.category">
        <slot name="category" category="какая-то категория"></slot>
      </div>

      <div v-if="$slots.title">
        <slot name="title" :title="product.title"></slot>
      </div>

      <div v-if="product.count === 0">
        <h4 class="product-title">Товара нет в наличии</h4>
      </div>
      <template v-else>
        <div class="product-controls in-card" v-if="count">
          <app-change-cart-count :id="id"></app-change-cart-count>
        </div>
        <div class="text-center" v-else>
          <button class="btn" @click.stop="$store.commit('cart/increment',id)">{{ currency(product.price) }}</button>
        </div>
      </template>

</template>

<script>

import { useStore } from 'vuex'
import { computed } from 'vue'
import { currency } from '@/utils/currency'
import AppChangeCartCount from '@/components/ui/AppChangeCartCount'
import { useProducts } from '@/use/products'

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const store = useStore()
    const {
      product
    } = useProducts(props)

    const count = computed(() => store.getters['cart/get'](props.id))

    return {
      product,
      currency,
      count
    }
  },
  components: { AppChangeCartCount }
}
</script>
