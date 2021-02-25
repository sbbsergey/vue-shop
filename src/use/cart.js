import { useStore } from 'vuex'
import { computed } from 'vue'

export function useCart (props) {
  const store = useStore()

  const cart = computed(() => store.getters['cart/getAll'])
  const count = computed(() => store.getters['cart/get'](props.id))

  const totalCount = computed(() => {
    const items = store.getters['cart/getAll']
    return Object.keys(items).reduce((total, id) => total + items[id], 0)
  })

  const totalPrice = computed(() => {
    const items = store.getters['cart/getAll']
    return Object.keys(items).reduce((total, id) => total + store.getters['product/get'](id).price * items[id], 0)
  })

  const isEmpty = computed(() => Object.keys(store.getters['cart/getAll']).length === 0)

  const inc = (id) => store.commit('cart/inc', id)
  const dec = (id) => store.commit('cart/dec', id)

  return {
    cart,
    count,
    totalCount,
    totalPrice,
    isEmpty,
    inc,
    dec
  }
}
