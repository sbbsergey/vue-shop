<template>
  <form @submit.prevent="onSubmit">

    <div :class="['form-control']">
      <label for="category">Категория</label>
      <select id="category" v-model="category">
        <option
          v-for="{id, type, title} in categories"
          :key="id"
          :value="type"
        >{{ title }}</option>
      </select>
      <small v-if="categoryError">{{categoryError}}</small>
    </div>

    <div class="form-control" :class="{invalid: titleError}">
      <label for="title">Название</label>
      <input type="text" id="title" v-model="title" @blur="titleBlur">
      <small v-if="titleError">{{titleError}}</small>
    </div>

    <div :class="['form-control', { invalid: imgError }]">
      <label for="img">Изображение</label>
      <input type="text" id="img" v-model="img" @blur="imgBlur">
      <small v-if="imgError">{{ imgError }}</small>
    </div>

    <div :class="['form-control', { invalid: priceError }]">
      <label for="price">Цена, руб.</label>
      <input type="number" id="price" v-model="price" @blur="priceBlur">
      <small v-if="priceError">{{ priceError }}</small>
    </div>

    <div :class="['form-control', { invalid: countError }]">
      <label for="count">Остаток, шт.</label>
      <input type="number" min="0" id="count" v-model="count" @blur="countBlur">
      <small v-if="countError">{{ countError }}</small>
    </div>

    <button class="btn primary" :disabled="isSubmitting">Добавить</button>
  </form>
</template>

<script>

import { useProductForm } from '@/use/product-form'
import { useCategories } from '@/use/categories'

import { useStore } from 'vuex'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  emits: ['addProduct'],
  setup (_, { emit }) {
    const store = useStore()
    const router = useRouter()
    const {
      load: loadCategories,
      categories
    } = useCategories()

    onMounted(async () => await loadCategories())

    const submit = async values => {
      await store.dispatch('product/add', values)
      await router.push('/admin/products')
      emit('addProduct')
    }

    return {
      ...useProductForm(submit),
      categories
    }
  }
}
</script>
