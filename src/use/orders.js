import { useStore } from 'vuex'
import { computed } from 'vue'

export function useOrders (props) {
  const store = useStore()

  const load = async () => {
    await store.dispatch('order/load')
  }
  const orders = computed(() => store.getters['order/getAll'])
  const order = computed(() => store.getters['order/get'](props.id))

  const loadById = async (id) => {
    await store.dispatch('order/loadById', id)
  }
  const loadByUserId = async (userId) => {
    await store.dispatch('order/loadByUserId', userId)
  }

  return {
    load,
    loadById,
    loadByUserId,
    orders,
    order
  }
}
