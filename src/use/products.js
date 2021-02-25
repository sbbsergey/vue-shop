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
  const title = computed(() => store.getters['product/get'](props.id).title ?? '')
  const price = computed(() => store.getters['product/get'](props.id).price ?? 0)
  const rest = computed(() => parseInt(store.getters['product/get'](props.id).count) ?? 0)
  const categoryTitle = computed(() => {
    const categoryType = store.getters['product/get'](props.id).category
    const categories = store.getters['category/get']
    return categories.find(item => item.type === categoryType).title ?? ''
  })

  const remove = async (id) => await store.dispatch('product/remove', id)
  const update = async (data) => await store.dispatch('product/update', data)
  const add = async (data) => await store.dispatch('product/add', data)

  return {
    products,
    product,
    title,
    price,
    rest,
    load,
    update,
    loadById,
    remove,
    add,
    categoryTitle
  }
}
