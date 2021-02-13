<template>
  <div class="products-filter">
    <div class="form-control">
      <input type="text" placeholder="Найти товар..." v-model="search">
      <span class="form-control-clear" @click="clearFilter">&times;</span>
    </div>
    <ul class="list">
      <li :class="['list-item', {'active':category === null}]" @click="clickOnCategory(null)">Все</li>
      <li :class="['list-item', {'active':category === type}]" v-for="{ type, title, id } in categories" :key="id" @click="clickOnCategory(type)">
        {{ title }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

export default {
  emits: ['update:modelValue'],
  props: {
    categories: {
      type: Object,
      required: true
    }
  },
  setup (_, { attrs, emit }) {
    const router = useRouter()
    const search = ref(attrs.modelValue.search)
    const category = ref(attrs.modelValue.category)

    watch([search, category], values => {
      const query = {}
      if (values[0]) {
        query.search = values[0]
      }
      if (values[1]) {
        query.category = values[1]
      }
      emit('update:modelValue', query)
      router.replace({ query: query })
    })

    return {
      search,
      category,
      clickOnCategory: (type) => { category.value = type },
      clearFilter: () => {
        search.value = ''
        category.value = null
      }
    }
  }

}
</script>
