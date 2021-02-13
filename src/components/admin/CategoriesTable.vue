<template>
  <table class="table">
    <thead>
    <tr>
      <th>#</th>
      <th>Название</th>
      <th>Тип</th>
      <th>удалить</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="({id, title, type}, _, index) in categories"
        :key="id">
      <td>{{ index + 1 }}</td>
      <td>{{ title }}</td>
      <td>{{ type }}</td>
      <td>
        <button class="btn danger" @click="clickOnRemoveButton(id)">x</button>
      </td>
    </tr>
    </tbody>
  </table>

  <teleport to="body">
    <app-confirm
      v-if="confirm"
      title = "Вы уверены, что хотите удалить категорию?"
      @confirm="removeCategory"
      @reject="confirm = false"
    ></app-confirm>
  </teleport>

</template>

<script>
import { ref } from 'vue'
import AppConfirm from '@/components/ui/AppConfirm'
import { useCategories } from '@/use/categories'

export default {
  props: {
    categories: {
      type: Object,
      required: true
    }
  },
  setup () {
    const confirm = ref(false)
    const id = ref('')

    const {
      remove
    } = useCategories()

    return {
      confirm,
      id,
      clickOnRemoveButton: (currentId) => {
        confirm.value = true
        id.value = currentId
      },
      removeCategory: async () => {
        confirm.value = false
        await remove(id.value)
      }
    }
  },
  components: { AppConfirm }
}
</script>
