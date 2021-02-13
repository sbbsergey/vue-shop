<template>
  <form @submit.prevent="onSubmit">
    <pre>{{ meta }}</pre>
    <div class="form-control" :class="{invalid: titleError}">
      <label for="title">Название</label>
      <input type="text" id="title" v-model="title" @blur="titleBlur">
      <small v-if="titleError">{{titleError}}</small>
    </div>
    <div :class="['form-control', { invalid: typeError }]">
      <label for="img">Тип</label>
      <input type="text" id="img" v-model="type" @blur="typeBlur">
      <small v-if="typeError">{{ typeError }}</small>
    </div>
    <button class="btn primary" :disabled="isSubmitting || !meta.valid" >Добавить</button>
  </form>
</template>

<script>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useCategoryForm } from '@/use/category-form'

export default {
  emits: ['created'],
  setup (_, { emit }) {
    const store = useStore()
    const router = useRouter()

    const submit = async values => {
      await store.dispatch('category/add', values)
      await router.push('/admin/categories')
      emit('created')
    }

    return {
      ...useCategoryForm(submit)
    }
  }

}
</script>
