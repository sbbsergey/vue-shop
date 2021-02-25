<template>
  <app-loader v-if="loading" />
  <app-page title="Категории" v-else>
    <template v-slot:header>
      <button class="btn primary" @click="modal = true">Добавить категорию</button>
    </template>
    <admin-categories-table
      :categories="categories"
      @remove="remove"
      @open="open"
    />
  </app-page>
  <teleport to="body">
    <app-modal v-if="modal" title="Добавить категорию" @close="modal = false">
      <admin-category-form
        @add="add"
      >
        <template #add />
      </admin-category-form>

    </app-modal>
  </teleport>
</template>

<script>
import { onMounted, ref } from 'vue'
import AppLoader from '@/components/ui/AppLoader'
import AppPage from '@/components/ui/AppPage'
import AppModal from '@/components/ui/AppModal'
import { useCategories } from '@/use/categories'
import AdminCategoriesTable from '@/components/admin/AdminCategoriesTable'
import AdminCategoryForm from '@/components/admin/AdminCategoryForm'
import { useRouter } from 'vue-router'

export default {
  setup () {
    const loading = ref(true)
    const modal = ref(false)
    const router = useRouter()

    const {
      load,
      categories,
      remove: removeCategory,
      add: addCategory
    } = useCategories()

    onMounted(async () => {
      await load()
      loading.value = false
    })

    const remove = async (id) => {
      await removeCategory(id)
    }
    const add = async (values) => {
      modal.value = false
      await addCategory(values)
      await router.push('/admin/categories')
    }
    const open = (id) => {
      router.push(`/admin/category/${id}`)
    }

    return {
      loading,
      categories,
      remove,
      add,
      open,
      modal
    }
  },
  components: { AppLoader, AppPage, AppModal, AdminCategoriesTable, AdminCategoryForm }
}
</script>
