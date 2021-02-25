import { useStore } from 'vuex'
import { computed } from 'vue'

export function useCategories (props) {
  const store = useStore()

  const load = async () => {
    if (store.getters['category/isEmpty']) {
      await store.dispatch('category/load')
    }
  }

  const categories = computed(() => store.getters['category/get'])
  const remove = async (id) => await store.dispatch('category/remove', id)
  const add = async (values) => await store.dispatch('category/add', values)
  const update = async (values) => await store.dispatch('category/update', values)

  const category = computed(() => store.getters['category/getById'](props.id))

  const title = computed(() => {
    const item = store.getters['category/getById'](props.id)
    if (item) {
      return item.title
    } else {
      return ''
    }
  })

  return {
    categories,
    category,
    title,
    load,
    remove,
    add,
    update
  }
}
