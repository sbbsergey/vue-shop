<template>
  <app-loader v-if="loading" />
  <app-page :title="product.title" v-else>
    <img :src="product.img" :alt="product.title" width="150">
    <form @submit.prevent="update">
      <div class="form-control">
        <label for="title">Название товара</label>
        <input type="text" id="title" v-model="product.title">
      </div>
      <div class="form-control">
        <label for="img">Изображение</label>
        <input type="text" id="img" v-model="product.img">
      </div>
      <div class="form-control">
        <label for="price">Цена, руб.</label>
        <input type="number" id="price" v-model="product.price">
      </div>
      <div class="form-control">
        <label for="count">Остаток на складе, шт</label>
        <input type="number" id="count" v-model="product.count">
      </div>
      <div class="form-control">
        <label for="category">Категория</label>
        <select id="category" v-model="product.category">
          <option
            v-for="{type, title} in categories"
            :key="type"
            :value="type"
          >{{ title }}</option>
        </select>
      </div>
      <button class="btn danger" type="submit" @click="confirmRemove = true">Удалить</button>
      <button class="btn" type="submit" v-if="hasChanges" @click="updateProduct">Записать</button>
    </form>

    <teleport to="body">
      <app-confirm
        v-if="confirmRouteLeave"
        title = "Есть несохраненные изменения. Вы уверены, что хотите покинуть страницу?"
        @confirm="navigate"
        @reject="confirmRouteLeave = false"
      ></app-confirm>
    </teleport>

    <teleport to="body">
      <app-confirm
        v-if="confirmRemove"
        title = "Товар будет удален. Продолжить?"
        @confirm="removeProduct"
        @reject="confirmRemove = false"
      ></app-confirm>
    </teleport>

  </app-page>

</template>

<script>
import AppLoader from '@/components/ui/AppLoader'
import AppPage from '@/components/ui/AppPage'
import AppConfirm from '@/components/ui/AppConfirm'

import { ref, onMounted, computed, toRaw } from 'vue'
import { useStore } from 'vuex'
import { useCategories } from '@/use/categories'
import { useProducts } from '@/use/products'
import { useConfirmRouteLeave } from '@/use/confirm-route-leave'
import { useRouter } from 'vue-router'

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const store = useStore()
    const loading = ref(true)
    const product = ref({})
    const router = useRouter()

    const confirmRemove = ref(false)

    let initialProduct

    const {
      load: loadCategories,
      categories
    } = useCategories()

    const {
      loadById: loadProductById,
      remove,
      update
    } = useProducts(props)

    onMounted(async () => {
      await loadCategories()
      await loadProductById()
      loading.value = false
      initialProduct = store.getters['product/get'](props.id)
      product.value = { ...initialProduct }
    })
    const hasChanges = computed(() => {
      return Object.keys(product.value).some((key) => product.value[key] !== initialProduct[key])
    })

    const removeProduct = async () => {
      confirmRemove.value = false
      await remove(props.id)
      await router.push('/admin/products')
    }

    const updateProduct = async () => {
      await update(toRaw(product.value))
      initialProduct = store.getters['product/get'](props.id)
    }

    return {
      loading,
      product,
      removeProduct,
      updateProduct,
      categories,
      hasChanges,
      ...useConfirmRouteLeave(hasChanges)
    }
  },
  components: { AppLoader, AppPage, AppConfirm }
}
</script>
