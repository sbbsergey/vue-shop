<template>
  <app-loader v-if="loading" />
  <app-page
    v-else
    header
    :title="title"
    :back-route="{name:'AdminProducts'}"
    back-route-text="Вернуться к списку товаров"
  >
    <template #header />
    <admin-product-form
      :id="id"
      @remove="remove"
      @update="update"
      @close="close"
    >
      <template #edit />
    </admin-product-form>
  </app-page>

</template>

<script>
import AppLoader from '@/components/ui/AppLoader'
import AppPage from '@/components/ui/AppPage'
import AdminProductForm from '@/components/admin/AdminProductForm'
import { ref, onMounted, toRaw } from 'vue'
import { useProducts } from '@/use/products'
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
    } = useProducts(props)

    onMounted(async () => {
      await loadCategories()
      loading.value = false
    })

    const remove = async (id) => {
      await router.push('/admin/products')
      await removeCategory(id)
    }

    const update = async (values) => {
      await updateCategory(toRaw(values))
    }

    const close = async (values) => {
      await router.push('/admin/products')
    }

    return {
      loading,
      title,
      remove,
      update,
      close

    }
  },
  components: { AppLoader, AppPage, AdminProductForm }
}
</script>
