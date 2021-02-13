<template>
  <app-loader v-if="loading" />
  <app-page title="Категории">
    <template v-slot:header>
      <button class="btn primary" @click="modal = true">Добавить категорию</button>
    </template>
    <categories-table :categories="categories"></categories-table>
  </app-page>
  <teleport to="body">
    <app-modal v-if="modal" title="Добавить категорию" @close="modal = false">
      <category-form @created="modal = false" />
    </app-modal>
  </teleport>
</template>

<script>
import { onMounted, ref } from 'vue'
import AppLoader from '@/components/ui/AppLoader'
import AppPage from '@/components/ui/AppPage'
import AppModal from '@/components/ui/AppModal'
import { useCategories } from '@/use/categories'
import CategoriesTable from '@/components/admin/CategoriesTable'
import CategoryForm from '@/components/admin/CategoryForm'

export default {
  setup () {
    const loading = ref(true)
    const modal = ref(false)
    const {
      load,
      categories
    } = useCategories()

    onMounted(async () => {
      await load()
      loading.value = false
    })

    return {
      loading,
      categories,
      modal
    }
  },
  components: { AppLoader, AppPage, AppModal, CategoriesTable, CategoryForm }
}
</script>
