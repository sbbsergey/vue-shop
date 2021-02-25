<template>
  <app-loader v-if="loading" />
  <app-page
    v-else
    :title="title"
    :back-route="{name:'AdminCategories'}"
    back-route-text="Вернуться к списку категорий"
  >
    <template #header />
    <admin-category-form
      :id="id"
      @remove="remove"
      @update="update"
      @close="close"
      >
      <template #edit />
    </admin-category-form>
  </app-page>

</template>

<script>
import AppLoader from '@/components/ui/AppLoader'
import AppPage from '@/components/ui/AppPage'
import AdminCategoryForm from '@/components/admin/AdminCategoryForm'
import { ref, onMounted, toRaw } from 'vue'
import { useCategories } from '@/use/categories'
import { useRouter } from 'vue-router'

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const loading = ref(true)
    const router = useRouter()
    const {
      load: loadCategories,
      title,
      remove: removeCategory,
      update: updateCategory
    } = useCategories(props)

    onMounted(async () => {
      await loadCategories()
      loading.value = false
    })

    const remove = async (id) => {
      console.log('remove', id)
      await router.push({ name: 'AdminCategories' })
      await removeCategory(id)
    }

    const update = async (values) => {
      console.log('update', values)
      await updateCategory(toRaw(values))
    }

    const close = async (values) => {
      await router.push({ name: 'AdminCategories' })
    }

    return {
      loading,
      title,
      remove,
      update,
      close

    }
  },
  components: { AppLoader, AppPage, AdminCategoryForm }
}
</script>
