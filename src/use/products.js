import { useStore } from 'vuex'
import { computed } from 'vue'
import { useCategories } from '@/use/categories'

export function useProducts (props) {
  const store = useStore()
  const {
    load: loadCategories
  } = useCategories()

  const load = async () => {
    await loadCategories()
    await store.dispatch('product/loadAll')
  }

  const loadById = async () => {
    await loadCategories()
    await store.dispatch('product/loadById', props.id)
  }

  const products = computed(() => store.getters['product/getAll'])

  const product = computed(() => store.getters['product/get'](props.id))

  // !!! протестировать использование
  const productById = computed((id) => store.getters['product/get'](id))

  const remove = async (id) => {
    await store.dispatch('product/remove', id)
  }
  const update = async (data) => {
    await store.dispatch('product/update', data)
  }

  return {
    products,
    product,
    productById,
    load,
    update,
    loadById,
    remove
  }
}
