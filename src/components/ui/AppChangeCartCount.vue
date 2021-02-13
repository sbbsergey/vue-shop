<template>
  <button class="btn danger" @click.stop="$store.commit('cart/decrement',id)">-</button>
  {{ count }}
  <button class="btn primary" :disabled="count === rest(id)" @click.stop="$store.commit('cart/increment',id)">+</button>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const store = useStore()
    const rest = id => store.getters['product/get'](props.id).count
    const count = computed(() => store.getters['cart/get'](props.id))

    return {
      count,
      rest
    }
  }
}
</script>
