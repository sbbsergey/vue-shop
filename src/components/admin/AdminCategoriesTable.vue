<template>
  <h3 class="text-center" v-if="categories.length === 0">Категорий пока нет</h3>
  <table class="table" v-else>
    <thead>
    <tr>
      <th>#</th>
      <th>Название</th>
      <th>Тип</th>
      <th>Действия</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="({id, title, type}, index) in categories" :key="id">
      <td>{{ index + 1 }}</td>
      <td>{{ title }}</td>
      <td>{{ type }}</td>
      <td>
        <button class="btn" @click="$emit('open',id)">Открыть</button>
        <button class="btn danger" @click="remove(id)">Удалить</button>
      </td>
    </tr>
    </tbody>
  </table>

  <app-confirm-action
    v-model:visible="confirmRemove"
    title="Категория будет удалена. Продолжить?"
    @confirm="$emit('remove',currentId)"
  />

</template>

<script>
import { ref } from 'vue'
import AppConfirmAction from '@/components/ui/AppConfirmAction'

export default {
  emits: ['remove', 'open'],
  props: {
    categories: {
      type: Object,
      required: true
    }
  },
  setup (_, { emit }) {
    const confirmRemove = ref(false)
    const currentId = ref(null)

    const remove = async (id) => {
      currentId.value = id
      confirmRemove.value = true
    }

    return {
      currentId,
      confirmRemove,
      remove
    }
  },
  components: { AppConfirmAction }
}
</script>
