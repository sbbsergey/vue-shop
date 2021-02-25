<template>

  <img :src="img" width="150">
  <form @submit.prevent="onSubmit">
    <div class="form-control" :class="{invalid: titleError}">
      <label for="title">Название</label>
      <input type="text" id="title" v-model="title" @blur="titleBlur">
      <small v-if="titleError">{{titleError}}</small>
    </div>
    <div class="form-control" :class="{invalid: imgError}">
      <label for="title">Изображение</label>
      <input type="text" id="img" v-model="img" @blur="imgBlur">
      <small v-if="imgError">{{imgError}}</small>
    </div>
    <div class="form-control" :class="{invalid: priceError}">
      <label for="price">Цена, руб.</label>
      <input type="number" id="price" v-model="price" @blur="priceBlur">
      <small v-if="priceError">{{priceError}}</small>
    </div>
    <div class="form-control" :class="{invalid: countError}">
      <label for="count">Остаток на складе, шт</label>
      <input type="number" id="count" v-model="count" @blur="countBlur">
      <small v-if="countError">{{countError}}</small>
    </div>
    <div class="form-control" :class="{invalid: categoryError}">
      <label for="category">Категория</label>
      <select id="category" v-model="category"  @blur="categoryBlur">
        <option
          v-for="{type, title} in categories"
          :key="type"
          :value="type"
        >{{ title }}</option>
      </select>
      <small v-if="categoryError">{{categoryError}}</small>
    </div>

    <div v-if="$slots.add">
      <button class="btn primary" :disabled="isSubmitting || !meta.valid" >Добавить</button>
    </div>

    <div v-if="$slots.edit">
      <button class="btn danger" @click.prevent="confirmRemove = true" v-if="!changed">Удалить</button>
      <button class="btn" @click.prevent="$emit('close')" v-if="!changed">Закрыть</button>
      <button class="btn" @click.prevent="handleReset" v-if="changed">Отменить изменения</button>
      <button class="btn primary" :disabled="isSubmitting || !meta.valid" v-if="changed">Сохранить изменения</button>
    </div>

  </form>

  <app-confirm-route-leave v-if="confirmRouteLeave"
                           :changed="changed"
  />

  <app-confirm-action
    v-model:visible="confirmRemove"
    title="Товар будет удален. Продолжить?"
    @confirm="remove"
  />

</template>

<script>

import AppConfirmRouteLeave from '@/components/ui/AppConfirmRouteLeave'
import AppConfirmAction from '@/components/ui/AppConfirmAction'

import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useCategories } from '@/use/categories'
import { useProducts } from '@/use/products'

import { useProductForm } from '@/use/product-form'

export default {
  emits: ['remove', 'add', 'update', 'close'],
  props: {
    id: {
      type: String,
      required: false
    }
  },
  setup (props, { emit }) {
    const store = useStore()
    const initialValues = ref({})
    const confirmRemove = ref(false)
    const confirmRouteLeave = ref(true)

    const {
      load: loadCategories,
      categories
    } = useCategories(props)

    const {
      loadById,
      product
    } = useProducts(props)

    onMounted(async () => {
      await loadCategories()
      if (props.id) {
        await loadById()
      }
      initialValues.value = { ...store.getters['product/get'](props.id) }
    })

    const submit = async values => {
      if (props.id) {
        await emit('update', { id: props.id, ...values })
        initialValues.value = product.value
      } else {
        await emit('add', values)
      }
    }
    const remove = async () => {
      confirmRouteLeave.value = false
      emit('remove', props.id)
    }

    return {
      confirmRemove,
      confirmRouteLeave,
      categories,
      remove,
      ...useProductForm(submit, initialValues)
    }
  },
  components: { AppConfirmAction, AppConfirmRouteLeave }
}
</script>
