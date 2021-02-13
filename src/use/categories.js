import { useStore } from 'vuex'
import { computed } from 'vue'

export function useCategories () {
  const store = useStore()

  const load = async () => {
    if (store.getters['category/isEmpty']) {
      await store.dispatch('category/load')
    }
  }

  // const categories = computed(() => store.getters['category/get'])
  const categories = computed(() => 'категория')

  const remove = async (id) => store.dispatch('category/remove', id)

  return {
    categories,
    load,
    remove
  }
}
